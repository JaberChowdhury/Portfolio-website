"use client"

import React, { useEffect } from "react"
import {
  SectionConfig,
  CardStackOptions,
  SectionInjectedProps,
  CardPosition,
  CardStackProps,
} from "./types"
import { useCardStack } from "./useCardStack"

export function getCardPosition(index: number, current: number): CardPosition {
  const difference = index - current
  if (difference === 0) return "active"
  if (difference === -1) return "pushed-1"
  if (difference === -2) return "pushed-2"
  if (difference < -2) return "pushed-more"
  if (difference === 1) return "next-1"
  return "next-more"
}

/**
 * Declarative CardStack Component
 */
export function CardStack({
  sections,
  transitionDuration = 380,
  wheelLockDuration = 280,
  showProgress = false,
  showCounter = false,
  className = "",
  renderProgress,
  renderCounter,
}: CardStackProps) {
  // Lock body scroll while in CardStack
  useEffect(() => {
    const origOverflow = document.body.style.overflow
    const origHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = origOverflow
      document.documentElement.style.overflow = origHtmlOverflow
    }
  }, [])

  const total = sections.length
  const { current, goTo, next, previous, mouseOffset } = useCardStack({
    total,
    transitionDuration,
    wheelLockDuration,
  })

  // DOM Pre-warm & Cache:
  // Track all cards that have been mounted so React keeps them in the DOM subtree
  // and eliminates mount/unmount frame drops during active 3D transitions.
  const [mountedIndices, setMountedIndices] = React.useState<Set<number>>(() => {
    const initial = new Set<number>()
    for (let i = 0; i < total; i++) {
      if (Math.abs(i - 0) <= 2) {
        initial.add(i)
      }
    }
    return initial
  })
  const [prevCurrent, setPrevCurrent] = React.useState(current)

  if (prevCurrent !== current) {
    setPrevCurrent(current)
    const nextSet = new Set(mountedIndices)
    for (let i = 0; i < total; i++) {
      if (Math.abs(i - current) <= 2) {
        nextSet.add(i)
      }
    }
    setMountedIndices(nextSet)
  }

  // Idle pre-warm: background load all remaining sections during browser idle time
  useEffect(() => {
    const prewarmAll = () => {
      setMountedIndices((prev) => {
        if (prev.size >= total) return prev
        const nextSet = new Set(prev)
        for (let i = 0; i < total; i++) {
          nextSet.add(i)
        }
        return nextSet
      })
    }

    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        const handle = (
          window as unknown as {
            requestIdleCallback: (
              cb: () => void,
              opts?: { timeout: number }
            ) => number
          }
        ).requestIdleCallback(prewarmAll, { timeout: 1200 })

        return () => {
          if ("cancelIdleCallback" in window) {
            ;(
              window as unknown as {
                cancelIdleCallback: (id: number) => void
              }
            ).cancelIdleCallback(handle)
          }
        }
      } else {
        const timer = setTimeout(prewarmAll, 400)
        return () => clearTimeout(timer)
      }
    }
  }, [total])

  // Smooth Section Navigation via Hash & Link Click Interception
  useEffect(() => {
    const navigateToHash = () => {
      const hash = window.location.hash.replace("#", "").split("?")[0]
      if (!hash) return
      const targetIndex = sections.findIndex(
        (s) =>
          s.id === hash || String(s.id).toLowerCase() === hash.toLowerCase()
      )
      if (targetIndex !== -1 && targetIndex !== current) {
        goTo(targetIndex)
      }
    }

    // Check hash on initial load
    navigateToHash()

    const onHashChange = () => navigateToHash()
    window.addEventListener("hashchange", onHashChange)

    // Intercept in-page anchor clicks across Navbar, Hero, Footer, etc.
    const onDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        "a, button[data-section-target]"
      )
      if (!target) return

      let targetId = ""
      if (target.hasAttribute("data-section-target")) {
        targetId = target.getAttribute("data-section-target") || ""
      } else {
        const href = target.getAttribute("href")
        if (!href) return

        // Skip non-hash or external links
        if (
          href.startsWith("http://") ||
          href.startsWith("https://") ||
          href.startsWith("//") ||
          href.startsWith("mailto:") ||
          href.startsWith("tel:")
        ) {
          try {
            const url = new URL(href, window.location.origin)
            if (url.origin !== window.location.origin) return
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
        const targetIndex = sections.findIndex(
          (s) =>
            s.id === targetId ||
            String(s.id).toLowerCase() === targetId.toLowerCase()
        )
        if (targetIndex !== -1) {
          e.preventDefault()
          e.stopPropagation()
          goTo(targetIndex)
          if (window.location.hash !== `#${targetId}`) {
            window.history.pushState(null, "", `#${targetId}`)
          }
        }
      }
    }

    document.addEventListener("click", onDocumentClick, true)

    return () => {
      window.removeEventListener("hashchange", onHashChange)
      document.removeEventListener("click", onDocumentClick, true)
    }
  }, [sections, current, goTo])

  const currentFormatted = String(current + 1).padStart(2, "0")
  const totalFormatted = String(total).padStart(2, "0")

  return (
    <div className={`card-stack-viewport ${className}`}>
      {/* 3D Stack Container */}
      <main className="card-stack-container" id="card-stack-main">
        {sections.map((section, index) => {
          const position = getCardPosition(index, current)
          const isActive = position === "active"

          const injectedProps: SectionInjectedProps = {
            index,
            current,
            isActive,
            position,
            total,
            goTo,
            next,
            previous,
            mouseOffset,
          }

          // DOM Optimization & Pre-warm:
          // Keep mounted cards cached and pre-render cards within proximate view (+/- 2)
          const shouldRenderContent =
            Math.abs(index - current) <= 2 || mountedIndices.has(index)
          const ContentComponent = section.Component

          return (
            <section
              key={section.id ?? index}
              id={section.id ? String(section.id) : undefined}
              className={`card-stack-item ${position} ${
                section.className ?? ""
              }`}
              style={{
                backgroundColor: section.backgroundColor ?? "var(--background)",
              }}
              data-title={section.navLabel ?? `Section ${index + 1}`}
            >
              {/* Depth Shade overlay */}
              <div className="card-stack-shade" />

              {/* Decorative Subtle Pattern */}
              {section.showGrid !== false && (
                <div className="card-stack-grid" aria-hidden="true" />
              )}

              {/* Inner Content Area — rendered when proximate to active view or cached */}
              <div className="card-stack-scroll-wrapper px-3.5 py-4 sm:px-6 sm:py-8 md:px-8 md:py-10">
                {shouldRenderContent &&
                  (ContentComponent ? (
                    <ContentComponent {...injectedProps} />
                  ) : typeof section.content === "function" ? (
                    section.content(injectedProps)
                  ) : (
                    section.content
                  ))}
              </div>
            </section>
          )
        })}
      </main>

      {/* Optional Progress Dots (Disabled by default) */}
      {showProgress &&
        (renderProgress ? (
          renderProgress({
            sections,
            current,
            onSelect: goTo,
          })
        ) : (
          <div className="card-stack-progress" aria-label="Page Sections">
            {sections.map((sec, idx) => (
              <div
                key={sec.id ?? idx}
                className={`card-stack-progress-item ${
                  idx === current ? "active" : ""
                }`}
                onClick={() => goTo(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    goTo(idx)
                  }
                }}
                aria-label={`Go to ${sec.navLabel ?? `Section ${idx + 1}`}`}
              >
                {sec.navLabel && (
                  <span className="card-stack-progress-label">
                    {sec.navLabel}
                  </span>
                )}
                <span className="card-stack-progress-dot"></span>
              </div>
            ))}
          </div>
        ))}

      {/* Optional Slide Counter (Disabled by default) */}
      {showCounter &&
        (renderCounter ? (
          renderCounter({ current, total })
        ) : (
          <div className="card-stack-counter">
            <strong>{currentFormatted}</strong>
            <span> / {totalFormatted}</span>
          </div>
        ))}
    </div>
  )
}

/**
 * Higher-Order Component wrapper
 */
export function withCardStack<P extends object = object>(
  sections: SectionConfig[] | ((props: P) => SectionConfig[]),
  options: CardStackOptions = {}
): React.FC<P> {
  const CardStackHOC: React.FC<P> = (props) => {
    const resolvedSections =
      typeof sections === "function" ? sections(props) : sections

    return <CardStack sections={resolvedSections} {...options} />
  }

  CardStackHOC.displayName = "withCardStack"
  return CardStackHOC
}

export default CardStack
