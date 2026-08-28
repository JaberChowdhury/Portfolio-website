"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface UseCardStackOptions {
  total: number
  transitionDuration?: number
  wheelLockDuration?: number
}

export function useCardStack({
  total,
  transitionDuration = 380,
  wheelLockDuration = 280,
}: UseCardStackOptions) {
  const [current, setCurrent] = useState(0)

  const currentRef = useRef(current)
  const totalRef = useRef(total)

  useEffect(() => {
    currentRef.current = current
  }, [current])

  useEffect(() => {
    totalRef.current = total
  }, [total])

  const animatingRef = useRef(false)
  const animTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const wheelLockedRef = useRef(false)
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastScrollDirectionRef = useRef<number>(0)

  const touchStartYRef = useRef(0)
  const touchStartXRef = useRef(0)
  const touchStartTimeRef = useRef(0)

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current)
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current)
    }
  }, [])

  const goTo = useCallback(
    (index: number) => {
      if (animatingRef.current) return
      const maxIndex = totalRef.current - 1
      if (index < 0 || index > maxIndex) return
      if (index === currentRef.current) return

      animatingRef.current = true
      currentRef.current = index
      setCurrent(index)

      if (animTimeoutRef.current) {
        clearTimeout(animTimeoutRef.current)
      }
      animTimeoutRef.current = setTimeout(() => {
        animatingRef.current = false
      }, transitionDuration)
    },
    [transitionDuration]
  )

  const next = useCallback(() => {
    if (currentRef.current < totalRef.current - 1) {
      goTo(currentRef.current + 1)
    }
  }, [goTo])

  const previous = useCallback(() => {
    if (currentRef.current > 0) {
      goTo(currentRef.current - 1)
    }
  }, [goTo])

  // Wheel listener: Inertia-protected, jitter-filtered, and direction-reversal enabled
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      // Prevent default scroll to avoid page jumping
      event.preventDefault()

      // Filter out micro-jitter (< 14px deltaY)
      if (Math.abs(event.deltaY) < 14) return

      const direction = event.deltaY > 0 ? 1 : -1

      // Direction-change detection: changing scroll direction immediately cancels any lingering lock and flips to opposite card
      if (wheelLockedRef.current || animatingRef.current) {
        if (
          lastScrollDirectionRef.current !== 0 &&
          direction !== lastScrollDirectionRef.current
        ) {
          if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current)
          if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current)
          wheelLockedRef.current = false
          animatingRef.current = false
        } else {
          return
        }
      }

      lastScrollDirectionRef.current = direction
      wheelLockedRef.current = true

      if (direction > 0) {
        next()
      } else {
        previous()
      }

      // Lock for Math.max(wheelLockDuration, transitionDuration - 60) (~320ms) to consume momentum without deadzones
      const lockDuration = Math.max(
        wheelLockDuration,
        transitionDuration - 60
      )
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current)
      wheelTimeoutRef.current = setTimeout(() => {
        wheelLockedRef.current = false
        lastScrollDirectionRef.current = 0
      }, lockDuration)
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => {
      window.removeEventListener("wheel", handleWheel)
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current)
    }
  }, [next, previous, wheelLockDuration, transitionDuration])

  // Touch gesture listener with mobile optimization & carousel protection
  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        touchStartYRef.current = event.touches[0].clientY
        touchStartXRef.current = event.touches[0].clientX
        touchStartTimeRef.current = performance.now()
      }
    }

    const handleTouchEnd = (event: TouchEvent) => {
      if (event.changedTouches.length === 0) return

      // If touch originated or happened inside a horizontal scroll container, do not flip section cards if horizontal swipe occurred
      const target = event.target as HTMLElement | null
      const isInsideHorizontalScroll = target?.closest(
        ".horizontal-scroll-container"
      )

      const touchEndY = event.changedTouches[0].clientY
      const touchEndX = event.changedTouches[0].clientX
      const distanceY = touchStartYRef.current - touchEndY
      const distanceX = touchStartXRef.current - touchEndX
      const deltaTime = Math.max(1, performance.now() - touchStartTimeRef.current)
      const velocityY = Math.abs(distanceY) / deltaTime

      // If user was swiping horizontally inside a scrollable carousel, skip section transition
      if (
        isInsideHorizontalScroll &&
        Math.abs(distanceX) > Math.abs(distanceY) * 0.8
      ) {
        return
      }

      const absY = Math.abs(distanceY)
      const absX = Math.abs(distanceX)
      const touchDirection = distanceY > 0 ? 1 : -1

      // Direction-change detection for touch gestures
      if (wheelLockedRef.current || animatingRef.current) {
        if (
          lastScrollDirectionRef.current !== 0 &&
          touchDirection !== lastScrollDirectionRef.current
        ) {
          if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current)
          if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current)
          wheelLockedRef.current = false
          animatingRef.current = false
        } else {
          return
        }
      }

      // Responsive touch gesture threshold: 35px threshold with velocity/distance ratio
      const isIntentionalSwipe =
        absY > absX * 1.15 && (absY > 35 || (velocityY >= 0.35 && absY >= 20))

      if (isIntentionalSwipe) {
        lastScrollDirectionRef.current = touchDirection
        wheelLockedRef.current = true

        if (touchDirection > 0) {
          next()
        } else {
          previous()
        }

        if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current)
        wheelTimeoutRef.current = setTimeout(() => {
          wheelLockedRef.current = false
          lastScrollDirectionRef.current = 0
        }, wheelLockDuration)
      }
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [next, previous, wheelLockDuration])

  // Keyboard navigation: instant transition without input latency
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return
      }

      if (
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        (event.key === " " && !event.shiftKey)
      ) {
        event.preventDefault()
        if (lastScrollDirectionRef.current === -1) {
          if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current)
          animatingRef.current = false
        }
        lastScrollDirectionRef.current = 1
        next()
      } else if (
        event.key === "ArrowUp" ||
        event.key === "PageUp" ||
        (event.key === " " && event.shiftKey)
      ) {
        event.preventDefault()
        if (lastScrollDirectionRef.current === 1) {
          if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current)
          animatingRef.current = false
        }
        lastScrollDirectionRef.current = -1
        previous()
      } else if (event.key === "Home") {
        event.preventDefault()
        if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current)
        animatingRef.current = false
        goTo(0)
      } else if (event.key === "End") {
        event.preventDefault()
        if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current)
        animatingRef.current = false
        goTo(totalRef.current - 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [next, previous, goTo])

  return {
    current,
    goTo,
    next,
    previous,
    mouseOffset: { x: 0, y: 0 },
  }
}
