"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

// Geometrically matched 16-point cubic bezier paths for seamless spring morphing
// 200x200 coordinate space, centered at (100, 100)

export const M3_SHAPES = {
  // Smooth circle with radius 80
  circle:
    "M 100 20 C 121.43 20, 110.81 17.89, 130.61 26.09 C 150.41 34.29, 141.42 28.28, 156.57 43.43 C 171.73 58.58, 165.71 49.59, 173.91 69.39 C 182.11 89.19, 180 78.57, 180 100 C 180 121.43, 182.11 110.81, 173.91 130.61 C 165.71 150.41, 171.73 141.42, 156.57 156.57 C 141.42 171.73, 150.41 165.71, 130.61 173.91 C 110.81 182.11, 121.43 180, 100 180 C 78.57 180, 89.19 182.11, 69.39 173.91 C 49.59 165.71, 58.58 171.73, 43.43 156.57 C 28.28 141.42, 34.29 150.41, 26.09 130.61 C 17.89 110.81, 20 121.43, 20 100 C 20 78.57, 17.89 89.19, 26.09 69.39 C 34.29 49.59, 28.28 58.58, 43.43 43.43 C 58.58 28.28, 49.59 34.29, 69.39 26.09 C 89.19 17.89, 78.57 20, 100 20 Z",

  // Material 3 Expressive Cookie-4 (4 prominent rounded lobes)
  cookie4:
    "M 100 6 C 120.9 6, 114.51 10.38, 129.85 27.94 C 145.19 45.5, 129.07 41.39, 143.84 56.16 C 158.61 70.93, 154.5 54.81, 172.06 70.15 C 189.62 85.49, 194 79.11, 194 100 C 194 120.9, 189.62 114.51, 172.06 129.85 C 154.5 145.19, 158.61 129.07, 143.84 143.84 C 129.07 158.61, 145.19 154.5, 129.85 172.06 C 114.51 189.62, 120.9 194, 100 194 C 79.11 194, 85.49 189.62, 70.15 172.06 C 54.81 154.5, 70.93 158.61, 56.16 143.84 C 41.39 129.07, 45.5 145.19, 27.94 129.85 C 10.38 114.51, 6 120.9, 6 100 C 6 79.11, 10.38 85.49, 27.94 70.15 C 45.5 54.81, 41.39 70.93, 56.16 56.16 C 70.93 41.39, 54.81 45.5, 70.15 27.94 C 85.49 10.38, 79.11 6, 100 6 Z",

  // Material 3 Expressive Sunny (8-pointed scalloped sunburst)
  sunny:
    "M 100 6 C 117.68 6, 102 29.38, 125.26 39.02 C 148.52 48.66, 153.97 21.03, 166.47 33.53 C 178.97 46.03, 151.34 51.48, 160.98 74.74 C 170.62 98, 194 82.32, 194 100 C 194 117.68, 170.62 102, 160.98 125.26 C 151.34 148.52, 178.97 153.97, 166.47 166.47 C 153.97 178.97, 148.52 151.34, 125.26 160.98 C 102 170.62, 117.68 194, 100 194 C 82.32 194, 98 170.62, 74.74 160.98 C 51.48 151.34, 46.03 178.97, 33.53 166.47 C 21.03 153.97, 48.66 148.52, 39.02 125.26 C 29.38 102, 6 117.68, 6 100 C 6 82.32, 29.38 98, 39.02 74.74 C 48.66 51.48, 21.03 46.03, 33.53 33.53 C 46.03 21.03, 51.48 48.66, 74.74 39.02 C 98 29.38, 82.32 6, 100 6 Z",
}

// 100x100 coordinate space for compact badges
export const M3_BADGE_SHAPES = {
  // Cookie-8 scalloped shape
  cookie8:
    "M 50 8 C 58.1 8, 51.1 18, 61.5 22.3 C 71.9 26.6, 74 14.6, 79.7 20.3 C 85.4 26, 73.4 28.1, 77.7 38.5 C 82 48.9, 92 42, 92 50 C 92 58.1, 82 51.1, 77.7 61.5 C 73.4 71.9, 85.4 74, 79.7 79.7 C 74 85.4, 71.9 73.4, 61.5 77.7 C 51.1 82, 58.1 92, 50 92 C 42 92, 48.9 82, 38.5 77.7 C 28.1 73.4, 26 85.4, 20.3 79.7 C 14.6 74, 26.6 71.9, 22.3 61.5 C 18 51.1, 8 58.1, 8 50 C 8 42, 18 48.9, 22.3 38.5 C 26.6 28.1, 14.6 26, 20.3 20.3 C 26 14.6, 28.1 26.6, 38.5 22.3 C 48.9 18, 42 8, 50 8 Z",

  // Faceted Gem / Diamond (hexagonal facet with beveled corners)
  gem: "M 50 6 L 88 28 L 88 72 L 50 94 L 12 72 L 12 28 Z",

  // Diamond 4-point faceted rhombus
  diamond: "M 50 6 L 94 50 L 50 94 L 6 50 Z",

  // Cookie-4 badge
  cookie4:
    "M 50 6 C 60 6, 57 10, 65 19 C 73 28, 65 26, 72 33 C 79 40, 77 32, 86 40 C 95 48, 97 45, 97 55 C 97 65, 95 62, 86 70 C 77 78, 79 70, 72 77 C 65 84, 73 82, 65 91 C 57 100, 60 94, 50 94 C 40 94, 43 100, 35 91 C 27 82, 35 84, 28 77 C 21 70, 23 78, 14 70 C 5 62, 3 65, 3 55 C 3 45, 5 48, 14 40 C 23 32, 21 40, 28 33 C 35 26, 27 28, 35 19 C 43 10, 40 6, 50 6 Z",
}

interface M3MorphingAvatarProps {
  className?: string
  size?: number
}

/**
 * Material 3 Expressive Spring-Morphing Avatar
 * Springs between Cookie-4 and smooth Circle on hover/focus.
 */
export function M3MorphingAvatar({
  className = "",
  size = 280,
}: M3MorphingAvatarProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none cursor-pointer group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      role="img"
      aria-label="Jaber Chowdhury - Profile Avatar Graphic with Material 3 Expressive spring morphing shape"
    >
      {/* Outer ambient radiant glow */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle, var(--md-sys-color-primary) 0%, var(--md-sys-color-tertiary) 45%, transparent 70%)",
        }}
        animate={{
          scale: isHovered ? 1.15 : 1,
          rotate: isHovered ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      />

      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className="relative z-10 overflow-visible drop-shadow-md"
      >
        <defs>
          {/* Morphing clip path */}
          <clipPath id="m3-avatar-morph-clip">
            <motion.path
              d={isHovered ? M3_SHAPES.circle : M3_SHAPES.cookie4}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 22,
                mass: 0.8,
              }}
            />
          </clipPath>

          {/* Linear gradient for avatar background */}
          <linearGradient
            id="m3-avatar-surface-grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="var(--md-sys-color-primary-container)"
            />
            <stop
              offset="50%"
              stopColor="var(--md-sys-color-surface-container-high)"
            />
            <stop
              offset="100%"
              stopColor="var(--md-sys-color-secondary-container)"
            />
          </linearGradient>

          {/* Accent border gradient */}
          <linearGradient id="m3-avatar-border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--md-sys-color-primary)" />
            <stop offset="100%" stopColor="var(--md-sys-color-tertiary)" />
          </linearGradient>
        </defs>

        {/* Morphing Base Background */}
        <motion.path
          d={isHovered ? M3_SHAPES.circle : M3_SHAPES.cookie4}
          fill="url(#m3-avatar-surface-grad)"
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 22,
            mass: 0.8,
          }}
        />

        {/* Morphing Border Contour */}
        <motion.path
          d={isHovered ? M3_SHAPES.circle : M3_SHAPES.cookie4}
          fill="none"
          stroke="url(#m3-avatar-border-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 22,
            mass: 0.8,
          }}
        />

        {/* Content Inside Clipped Region */}
        <g clipPath="url(#m3-avatar-morph-clip)">
          {/* Subtle concentric decorative rings */}
          <circle
            cx="100"
            cy="100"
            r="64"
            fill="none"
            stroke="var(--md-sys-color-outline-variant)"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.35"
          />
          <circle
            cx="100"
            cy="100"
            r="44"
            fill="none"
            stroke="var(--md-sys-color-outline-variant)"
            strokeWidth="1"
            opacity="0.25"
          />

          {/* Stylized Developer Silhouette / Portrait Graphic */}
          <g className="transition-transform duration-300 group-hover:scale-105" transform="translate(0, 4)">
            {/* Torso / Shoulders */}
            <path
              d="M 52 172 C 52 136, 74 122, 100 122 C 126 122, 148 136, 148 172 Z"
              fill="var(--md-sys-color-primary)"
              opacity="0.9"
            />
            {/* Collar accent */}
            <path
              d="M 85 124 L 100 144 L 115 124 Z"
              fill="var(--md-sys-color-on-primary)"
              opacity="0.25"
            />
            {/* Neck */}
            <rect
              x="92"
              y="106"
              width="16"
              height="20"
              rx="4"
              fill="var(--md-sys-color-secondary)"
              opacity="0.85"
            />
            {/* Head */}
            <circle
              cx="100"
              cy="84"
              r="26"
              fill="var(--md-sys-color-secondary)"
            />
            {/* Hair flourish */}
            <path
              d="M 74 80 C 74 60, 88 52, 100 52 C 114 52, 126 62, 126 78 C 120 72, 110 70, 100 70 C 88 70, 80 74, 74 80 Z"
              fill="var(--md-sys-color-on-surface)"
            />
            {/* Developer Glasses */}
            <rect
              x="82"
              y="80"
              width="14"
              height="10"
              rx="3"
              fill="none"
              stroke="var(--md-sys-color-on-primary)"
              strokeWidth="2.5"
            />
            <rect
              x="104"
              y="80"
              width="14"
              height="10"
              rx="3"
              fill="none"
              stroke="var(--md-sys-color-on-primary)"
              strokeWidth="2.5"
            />
            <line
              x1="96"
              y1="85"
              x2="104"
              y2="85"
              stroke="var(--md-sys-color-on-primary)"
              strokeWidth="2.5"
            />
          </g>

          {/* Floating code tags in foreground */}
          <text
            x="100"
            y="184"
            textAnchor="middle"
            fill="var(--md-sys-color-on-surface-variant)"
            fontSize="10"
            fontFamily="var(--font-mono)"
            fontWeight="bold"
            letterSpacing="2"
          >
            &lt;JABER /&gt;
          </text>
        </g>
      </svg>

      {/* Interactive Micro Badge indicator */}
      <motion.div
        className="absolute -bottom-1 -right-1 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-highest)] shadow-sm font-mono text-[10px] font-bold text-[var(--md-sys-color-on-surface)]"
        animate={{
          scale: isHovered ? 1.08 : 1,
          y: isHovered ? -2 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <span
          className="h-2 w-2 rounded-full transition-colors duration-300"
          style={{
            backgroundColor: isHovered
              ? "var(--md-sys-color-primary)"
              : "var(--md-sys-color-tertiary)",
          }}
        />
        <span>{isHovered ? "Circle" : "Cookie-4"}</span>
      </motion.div>
    </div>
  )
}

interface M3FacetedBadgeProps {
  shape?: "cookie8" | "gem" | "diamond" | "cookie4"
  icon: LucideIcon
  className?: string
  iconClassName?: string
  size?: number
}

/**
 * Faceted M3 Shape Badge for StatCards & AchievementCards
 */
export function M3FacetedBadge({
  shape = "cookie8",
  icon: Icon,
  className = "",
  iconClassName = "h-5 w-5",
  size = 48,
}: M3FacetedBadgeProps) {
  const pathD = M3_BADGE_SHAPES[shape] || M3_BADGE_SHAPES.cookie8

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="absolute inset-0 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6"
      >
        <path
          d={pathD}
          fill="var(--md-sys-color-primary-container)"
          stroke="var(--md-sys-color-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Icon
        className={`relative z-10 text-[var(--md-sys-color-on-primary-container)] transition-transform duration-300 group-hover:scale-110 ${iconClassName}`}
      />
    </div>
  )
}

interface M3AssistChipProps {
  label: string
  icon?: LucideIcon
  onClick?: () => void
  active?: boolean
  className?: string
}

/**
 * Material 3 Assist Chip
 */
export function M3AssistChip({
  label,
  icon: Icon,
  onClick,
  active = false,
  className = "",
}: M3AssistChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border text-xs font-medium font-mono transition-all duration-200 select-none ${
        active
          ? "bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)] border-[var(--md-sys-color-primary)] shadow-2xs"
          : "bg-[var(--md-sys-color-surface-container-low)] text-[var(--md-sys-color-on-surface)] border-[var(--md-sys-color-outline-variant)] hover:bg-[var(--md-sys-color-surface-container-high)] hover:border-[var(--md-sys-color-outline)]"
      } ${className}`}
    >
      {Icon && (
        <Icon className="h-3.5 w-3.5 text-[var(--md-sys-color-primary)] shrink-0" />
      )}
      <span className="truncate">{label}</span>
    </button>
  )
}

interface M3ProgressProps {
  value: number // 0 - 100
  className?: string
  color?: "primary" | "secondary" | "tertiary"
}

/**
 * Material 3 Tonal Progress Bar
 */
export function M3Progress({
  value,
  className = "",
  color = "primary",
}: M3ProgressProps) {
  const safeValue = Math.min(Math.max(value, 0), 100)

  const colorClass =
    color === "secondary"
      ? "bg-[var(--md-sys-color-secondary)]"
      : color === "tertiary"
        ? "bg-[var(--md-sys-color-tertiary)]"
        : "bg-[var(--md-sys-color-primary)]"

  return (
    <div
      className={`relative h-2 w-full overflow-hidden rounded-full bg-[var(--md-sys-color-surface-container-highest)] ${className}`}
      role="progressbar"
      aria-valuenow={safeValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className={`h-full rounded-full ${colorClass}`}
        initial={{ width: 0 }}
        animate={{ width: `${safeValue}%` }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}
