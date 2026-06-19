/** @jsxImportSource react */
"use client"

import { cn } from "@/lib/utils"

interface AnimatedTextBorderProps {
  text: string
  className?: string
  strokeWidth?: number
  duration?: number
  fontSize?: string
}

export default function AnimatedTextBorder({
  text,
  className,
  strokeWidth = 1.5,
  duration = 6,
  fontSize = "12rem",
}: AnimatedTextBorderProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center text-foreground",
        className
      )}
    >
      <svg viewBox="0 0 1200 300" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient
            id="animated-stroke"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />

            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-1 0"
              to="1 0"
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>

        {/* Subtle fill */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="currentColor"
          fillOpacity="0.05"
          fontSize={fontSize}
          fontWeight="900"
          letterSpacing="-0.05em"
        >
          {text}
        </text>

        {/* Animated border */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="none"
          stroke="url(#animated-stroke)"
          strokeWidth={strokeWidth}
          strokeDasharray="12 8"
          fontSize={fontSize}
          fontWeight="900"
          letterSpacing="-0.05em"
        >
          {text}
        </text>
      </svg>
    </div>
  )
}
