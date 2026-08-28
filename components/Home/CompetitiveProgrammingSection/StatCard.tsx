"use client"

import React, { ElementType } from "react"

export interface Stat {
  label: string
  value: string
  icon: ElementType
}

interface StatCardProps {
  stat: Stat
  index?: number
}

// 4 Distinct Hallmark Hum Multi-Accent Themes: Pear, Cyan, Mint, Coral
const STAT_THEMES = [
  {
    name: "pear",
    accentText: "text-[var(--color-pear-deep)] dark:text-[var(--color-pear)]",
    glyphBg:
      "bg-[var(--color-pear)]/10 border-[var(--color-pear)]/25 text-[var(--color-pear-deep)] dark:text-[var(--color-pear)]",
    hoverBorder: "hover:border-[var(--color-pear)]/40",
    microBadge:
      "border-[var(--color-pear)]/25 bg-[var(--color-pear)]/10 text-[var(--color-pear-deep)] dark:text-[var(--color-pear)]",
    dot: "bg-[var(--color-pear)]",
    tag: "CODEFORCES",
  },
  {
    name: "cyan",
    accentText: "text-[var(--color-cyan-deep)] dark:text-[var(--color-cyan)]",
    glyphBg:
      "bg-[var(--color-cyan)]/10 border-[var(--color-cyan)]/25 text-[var(--color-cyan-deep)] dark:text-[var(--color-cyan)]",
    hoverBorder: "hover:border-[var(--color-cyan)]/40",
    microBadge:
      "border-[var(--color-cyan)]/25 bg-[var(--color-cyan)]/10 text-[var(--color-cyan-deep)] dark:text-[var(--color-cyan)]",
    dot: "bg-[var(--color-cyan)]",
    tag: "BEECROWD",
  },
  {
    name: "mint",
    accentText: "text-[var(--color-mint-deep)] dark:text-[var(--color-mint)]",
    glyphBg:
      "bg-[var(--color-mint)]/10 border-[var(--color-mint)]/25 text-[var(--color-mint-deep)] dark:text-[var(--color-mint)]",
    hoverBorder: "hover:border-[var(--color-mint)]/40",
    microBadge:
      "border-[var(--color-mint)]/25 bg-[var(--color-mint)]/10 text-[var(--color-mint-deep)] dark:text-[var(--color-mint)]",
    dot: "bg-[var(--color-mint)]",
    tag: "TOTAL",
  },
  {
    name: "coral",
    accentText: "text-[var(--color-coral-deep)] dark:text-[var(--color-coral)]",
    glyphBg:
      "bg-[var(--color-coral)]/10 border-[var(--color-coral)]/25 text-[var(--color-coral-deep)] dark:text-[var(--color-coral)]",
    hoverBorder: "hover:border-[var(--color-coral)]/40",
    microBadge:
      "border-[var(--color-coral)]/25 bg-[var(--color-coral)]/10 text-[var(--color-coral-deep)] dark:text-[var(--color-coral)]",
    dot: "bg-[var(--color-coral)]",
    tag: "CONTEST",
  },
]

export function StatCard({ stat, index = 0 }: StatCardProps) {
  const Icon = stat.icon
  const theme = STAT_THEMES[index % STAT_THEMES.length]

  return (
    <div
      data-cursor="cover"
      className={`group relative flex flex-col justify-between rounded-xl border border-border/80 bg-card p-2 text-card-foreground shadow-2xs transition-all duration-300 hover:-translate-y-0.5 sm:p-2.5 md:p-3 ${theme.hoverBorder}`}
    >
      {/* Card Top: Glyph Container + Micro-tag */}
      <div className="flex items-center justify-between gap-1">
        <div
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-105 sm:h-7 sm:w-7 md:h-8 md:w-8 ${theme.glyphBg}`}
        >
          <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
        </div>

        <span
          className={`truncate rounded-full border px-1.5 py-0.5 font-mono text-[7.5px] font-bold tracking-wider uppercase sm:px-2 sm:text-[8.5px] md:text-[9px] ${theme.microBadge}`}
        >
          {theme.tag}
        </span>
      </div>

      {/* Card Body: Numeric Display + Label */}
      <div className="mt-1.5 sm:mt-2">
        <div
          data-cursor="text"
          className="tnum truncate font-mono text-base font-bold tracking-tight text-foreground sm:text-lg md:text-xl lg:text-2xl"
        >
          {stat.value}
        </div>

        <div className="mt-0.5 truncate text-[10px] font-medium tracking-wide text-muted-foreground sm:text-[11px] md:text-xs">
          {stat.label}
        </div>
      </div>
    </div>
  )
}

export default StatCard
