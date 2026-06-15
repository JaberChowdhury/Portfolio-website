"use client"

import { useEffect, useRef } from "react"
import "./style.css"
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const outlineRef = useRef<HTMLDivElement>(null)

  const state = useRef({
    mouseX: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    mouseY: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
    outlineX: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    outlineY: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
    targetX: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    targetY: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
    activeElement: null as HTMLElement | null,
    isVisible: false, // Track visibility to fix the refresh bug
  })

  useEffect(() => {
    const dot = dotRef.current
    const outline = outlineRef.current
    if (!dot || !outline) return

    let reqId: number

    const updateActiveElement = () => {
      if (!state.current.activeElement) return
      const rect = state.current.activeElement.getBoundingClientRect()
      const computedStyle = window.getComputedStyle(state.current.activeElement)

      const padding = 8

      outline.style.width = `${rect.width + padding}px`
      outline.style.height = `${rect.height + padding}px`
      outline.style.borderRadius = computedStyle.borderRadius

      state.current.targetX = rect.left + rect.width / 2
      state.current.targetY = rect.top + rect.height / 2
    }

    const resetToDefault = () => {
      state.current.activeElement = null
      document.body.removeAttribute("data-cursor-state")

      outline.style.width = ""
      outline.style.height = ""
      outline.style.borderRadius = ""

      state.current.targetX = state.current.mouseX
      state.current.targetY = state.current.mouseY
    }

    const onMouseMove = (e: MouseEvent) => {
      // FIX: Ensure cursor becomes visible immediately on first move
      if (!state.current.isVisible) {
        dot.style.opacity = "1"
        outline.style.opacity = "1"
        state.current.isVisible = true
      }

      state.current.mouseX = e.clientX
      state.current.mouseY = e.clientY

      dot.style.left = `${state.current.mouseX}px`
      dot.style.top = `${state.current.mouseY}px`

      if (!state.current.activeElement) {
        state.current.targetX = state.current.mouseX
        state.current.targetY = state.current.mouseY
      }
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // EXPANDED: Automatically detect shadcn interactive components
      const coverTarget = target.closest(
        'button, a, [role="button"], [role="menuitem"], [role="tab"], [role="switch"], [role="checkbox"], [role="radio"], [role="combobox"], [data-cursor="cover"]'
      )

      // EXPANDED: Automatically detect text including shadcn Labels and list items
      const textTarget = target.closest(
        'input, textarea, p, h1, h2, h3, h4, h5, h6, label, li, th, td, [data-cursor="text"]'
      )

      if (coverTarget) {
        state.current.activeElement = coverTarget as HTMLElement
        document.body.setAttribute("data-cursor-state", "cover")
        updateActiveElement()
      } else if (
        textTarget &&
        !textTarget.closest('button, a, [role="button"]')
      ) {
        resetToDefault()
        document.body.setAttribute("data-cursor-state", "text")
      } else {
        resetToDefault()
      }
    }

    const onWindowLeave = () => {
      dot.style.opacity = "0"
      outline.style.opacity = "0"
      state.current.isVisible = false
    }

    const animateOutline = () => {
      const easing = 0.15
      state.current.outlineX +=
        (state.current.targetX - state.current.outlineX) * easing
      state.current.outlineY +=
        (state.current.targetY - state.current.outlineY) * easing

      outline.style.left = `${state.current.outlineX}px`
      outline.style.top = `${state.current.outlineY}px`

      reqId = requestAnimationFrame(animateOutline)
    }

    window.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseover", onMouseOver)
    document.addEventListener("mouseleave", onWindowLeave)
    window.addEventListener("scroll", updateActiveElement, { passive: true })
    window.addEventListener("resize", updateActiveElement)

    reqId = requestAnimationFrame(animateOutline)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseover", onMouseOver)
      document.removeEventListener("mouseleave", onWindowLeave)
      window.removeEventListener("scroll", updateActiveElement)
      window.removeEventListener("resize", updateActiveElement)
      cancelAnimationFrame(reqId)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        id="cursor-dot"
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground opacity-0 transition-opacity duration-300"
      />
      <div
        ref={outlineRef}
        id="cursor-outline"
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-foreground/50 opacity-0 transition-[width,height,border-radius,background-color,border-color] duration-300 ease-out"
      />
    </>
  )
}
