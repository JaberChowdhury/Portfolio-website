"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface UseCardStackOptions {
  total: number
  transitionDuration?: number
  wheelLockDuration?: number
}

export function useCardStack({
  total,
  transitionDuration = 480,
  wheelLockDuration = 420,
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
  const wheelLockedRef = useRef(false)
  const touchStartYRef = useRef(0)
  const touchStartXRef = useRef(0)

  const goTo = useCallback(
    (index: number) => {
      if (animatingRef.current) return
      const maxIndex = totalRef.current - 1
      if (index < 0 || index > maxIndex) return
      if (index === currentRef.current) return

      animatingRef.current = true
      setCurrent(index)

      setTimeout(() => {
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

  // Wheel listener: Guaranteed smooth & glitch-free
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()

      if (wheelLockedRef.current || animatingRef.current) return
      if (Math.abs(event.deltaY) < 6) return

      wheelLockedRef.current = true

      if (event.deltaY > 0) {
        next()
      } else {
        previous()
      }

      setTimeout(() => {
        wheelLockedRef.current = false
      }, wheelLockDuration)
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => {
      window.removeEventListener("wheel", handleWheel)
    }
  }, [next, previous, wheelLockDuration])

  // Touch gesture listener with mobile optimization
  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        touchStartYRef.current = event.touches[0].clientY
        touchStartXRef.current = event.touches[0].clientX
      }
    }

    const handleTouchEnd = (event: TouchEvent) => {
      if (
        event.changedTouches.length === 0 ||
        animatingRef.current ||
        wheelLockedRef.current
      )
        return
      const touchEndY = event.changedTouches[0].clientY
      const touchEndX = event.changedTouches[0].clientX
      const distanceY = touchStartYRef.current - touchEndY
      const distanceX = touchStartXRef.current - touchEndX

      // Ensure vertical swipe is intentional and exceeds threshold (45px)
      if (
        Math.abs(distanceY) > Math.abs(distanceX) * 1.2 &&
        Math.abs(distanceY) > 45
      ) {
        wheelLockedRef.current = true
        if (distanceY > 0) {
          next()
        } else {
          previous()
        }
        setTimeout(() => {
          wheelLockedRef.current = false
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

  // Keyboard navigation
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
        next()
      } else if (
        event.key === "ArrowUp" ||
        event.key === "PageUp" ||
        (event.key === " " && event.shiftKey)
      ) {
        event.preventDefault()
        previous()
      } else if (event.key === "Home") {
        event.preventDefault()
        goTo(0)
      } else if (event.key === "End") {
        event.preventDefault()
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
