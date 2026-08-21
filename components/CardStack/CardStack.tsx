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
  transitionDuration = 480,
  wheelLockDuration = 420,
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

              {/* Decorative Subtle Grid */}
              {section.showGrid !== false && (
                <div className="card-stack-grid"></div>
              )}

              {/* Inner Content Area */}
              <div className="card-stack-scroll-wrapper px-4 py-8 md:px-8 md:py-10">
                {ContentComponent ? (
                  <ContentComponent {...injectedProps} />
                ) : typeof section.content === "function" ? (
                  section.content(injectedProps)
                ) : (
                  section.content
                )}
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
