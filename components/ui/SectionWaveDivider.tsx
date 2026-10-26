"use client"

import React, { useId, useMemo } from "react"
import { cn } from "@/lib/utils"

export interface SectionWaveDividerProps {
  nextColor: string
  prevColor?: string
  /**
   * Number of wave cycles across the screen width.
   * - 1.0–2.0: Broad oceanic swells
   * - 3.0–5.0: Medium wave ripples
   * - 8.0–12.0: Ultra-dense fine wave ripples
   * @default 9.5
   */
  frequency?: number
  variant?: "left" | "right"
  className?: string
}

/**
 * Generates an SVG path using Hermite-to-Cubic-Bezier interpolation
 * to create a mathematically smooth, continuous sine wave with exact derivatives.
 */
function generateWavePath({
  frequency = 9.5,
  amplitude = 12,
  baseY = 75,
  phase = 0,
  width = 1440,
  height = 120,
}: {
  frequency?: number
  amplitude?: number
  baseY?: number
  phase?: number
  width?: number
  height?: number
}): string {
  const safeFreq = Math.max(0.5, frequency)
  // Adaptive subdivisions: 8 segments per cycle ensures continuous curvature
  const segments = Math.max(24, Math.round(safeFreq * 8))
  const dx = width / segments
  const k = (2 * Math.PI * safeFreq) / width

  const points: { x: number; y: number; slope: number }[] = []
  for (let i = 0; i <= segments; i++) {
    const x = i * dx
    const y = baseY + amplitude * Math.sin(k * x + phase)
    const slope = amplitude * k * Math.cos(k * x + phase)
    points.push({ x, y, slope })
  }

  let d = `M 0,${points[0].y.toFixed(2)}`
  for (let i = 0; i < segments; i++) {
    const p0 = points[i]
    const p1 = points[i + 1]
    const cp1x = (p0.x + dx / 3).toFixed(2)
    const cp1y = (p0.y + (p0.slope * dx) / 3).toFixed(2)
    const cp2x = (p1.x - dx / 3).toFixed(2)
    const cp2y = (p1.y - (p1.slope * dx) / 3).toFixed(2)
    const endX = p1.x.toFixed(2)
    const endY = p1.y.toFixed(2)
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`
  }

  // Close path along the bottom corners to form a solid base
  d += ` L ${width},${height} L 0,${height} Z`
  return d
}

export function SectionWaveDivider({
  nextColor,
  prevColor,
  frequency = 9.5,
  variant = "left",
  className,
}: SectionWaveDividerProps) {
  const uid = useId().replace(/:/g, "")
  const isLeft = variant === "left"
  const basePhase = isLeft ? 0 : Math.PI

  // Scale amplitude proportionally for dense frequencies to maintain harmonic wave slopes
  const ampScale = frequency > 4 ? Math.max(0.5, 4.5 / frequency) : 1
  const ampA = Math.round(24 * ampScale)
  const ampB = Math.round(19 * ampScale)
  const ampC = Math.round(15 * ampScale)

  // Generate the 3 layered wave paths dynamically based on frequency
  const pathA = useMemo(
    () =>
      generateWavePath({
        frequency,
        amplitude: ampA,
        baseY: 52,
        phase: basePhase + 0.5,
      }),
    [frequency, ampA, basePhase]
  )

  const pathB = useMemo(
    () =>
      generateWavePath({
        frequency,
        amplitude: ampB,
        baseY: 64,
        phase: basePhase + 1.0,
      }),
    [frequency, ampB, basePhase]
  )

  const pathC = useMemo(
    () =>
      generateWavePath({
        frequency,
        amplitude: ampC,
        baseY: 76,
        phase: basePhase,
      }),
    [frequency, ampC, basePhase]
  )

  const gradientStartColor = prevColor || nextColor

  return (
    <div
      className={cn(
        "pointer-events-none absolute right-0 bottom-0 left-0 z-20 w-full translate-y-[1px] overflow-hidden leading-none",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="block h-10 w-full sm:h-14 md:h-18 lg:h-22"
      >
        <defs>
          {/* Soft blur filter to diffuse the wave crest softly into the upper section */}
          <filter
            id={`wave-blur-${uid}`}
            x="-5%"
            y="-20%"
            width="110%"
            height="150%"
          >
            <feGaussianBlur stdDeviation="4.5" />
          </filter>

          {/* 2-side color-blend gradient transitioning between previous and next section colors */}
          <linearGradient
            id={`wave-grad-${uid}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              style={{
                stopColor: gradientStartColor,
                stopOpacity: prevColor ? 0.4 : 0.25,
              }}
            />
            <stop
              offset="100%"
              style={{ stopColor: nextColor, stopOpacity: 0.85 }}
            />
          </linearGradient>
        </defs>

        {/* 1. Blurred ambient wave layer (soft blur transition) */}
        <path
          d={pathA}
          style={{ fill: nextColor }}
          opacity="0.3"
          filter={`url(#wave-blur-${uid})`}
        />

        {/* 2. Semi-transparent secondary wave layer */}
        <path d={pathB} fill={`url(#wave-grad-${uid})`} opacity="0.55" />

        {/* 3. Solid foreground wave layer (seamlessly joins the next section) */}
        <path d={pathC} style={{ fill: nextColor }} />
      </svg>
    </div>
  )
}

export default SectionWaveDivider
