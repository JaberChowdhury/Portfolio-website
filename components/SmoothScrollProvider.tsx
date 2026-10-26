"use client"

import React, { useEffect } from "react"
import { ReactLenis, useLenis } from "lenis/react"
import "lenis/dist/lenis.css"

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

/**
 * Global smooth anchor handler that integrates Lenis with in-page anchor links
 */
function LenisAnchorHandler() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        'a[href*="#"], button[data-section-target]'
      )
      if (!target) return

      let targetId = ""
      if (target.hasAttribute("data-section-target")) {
        targetId = target.getAttribute("data-section-target") || ""
      } else {
        const href = target.getAttribute("href")
        if (!href) return

        // Skip non-local or non-hash links
        if (
          href.startsWith("http://") ||
          href.startsWith("https://") ||
          href.startsWith("//") ||
          href.startsWith("mailto:") ||
          href.startsWith("tel:")
        ) {
          try {
            const url = new URL(href, window.location.origin)
            if (url.origin !== window.location.origin || !url.hash) return
            targetId = url.hash.replace(/^#/, "")
          } catch {
            return
          }
        } else if (href.includes("#")) {
          targetId = href.split("#")[1]
        }
      }

      if (targetId) {
        targetId = targetId.split("?")[0].replace(/^\/+|\/+$/g, "")
        const element = document.getElementById(targetId)
        if (element) {
          e.preventDefault()
          lenis.scrollTo(element, {
            offset: -80,
            duration: 1.2,
          })
          if (window.location.hash !== `#${targetId}`) {
            window.history.pushState(null, "", `#${targetId}`)
          }
        }
      }
    }

    // Scroll to initial hash if present on mount
    const initialHash = window.location.hash.replace(/^#/, "").split("?")[0]
    if (initialHash) {
      const timer = setTimeout(() => {
        const element = document.getElementById(initialHash)
        if (element) {
          lenis.scrollTo(element, { offset: -80, immediate: true })
        }
      }, 150)
      return () => {
        clearTimeout(timer)
        document.removeEventListener("click", handleAnchorClick, true)
      }
    }

    document.addEventListener("click", handleAnchorClick, true)
    return () => {
      document.removeEventListener("click", handleAnchorClick, true)
    }
  }, [lenis])

  return null
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      }}
    >
      <LenisAnchorHandler />
      {children}
    </ReactLenis>
  )
}

export default SmoothScrollProvider
