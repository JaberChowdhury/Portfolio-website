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
    accentText: "text-amber-700 dark:text-amber-300",
    glyphBg:
      "bg-amber-500/10 border-amber-500/25 text-amber-600 dark:text-amber-400",
    hoverBorder: "hover:border-amber-500/40",
    microBadge:
      "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500",
    tag: "CODEFORCES",
  },
  {
    name: "cyan",
    accentText: "text-sky-700 dark:text-sky-300",
    glyphBg: "bg-sky-500/10 border-sky-500/25 text-sky-600 dark:text-sky-400",
    hoverBorder: "hover:border-sky-500/40",
    microBadge:
      "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-300",
    dot: "bg-sky-500",
    tag: "BEECROWD",
  },
  {
    name: "mint",
    accentText: "text-emerald-700 dark:text-emerald-300",
    glyphBg:
      "bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400",
    hoverBorder: "hover:border-emerald-500/40",
    microBadge:
      "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    dot: "bg-emerald-500",
    tag: "TOTAL",
  },
  {
    name: "coral",
    accentText: "text-rose-700 dark:text-rose-300",
    glyphBg:
      "bg-rose-500/10 border-rose-500/25 text-rose-600 dark:text-rose-400",
    hoverBorder: "hover:border-rose-500/40",
    microBadge:
      "border-rose-500/25 bg-rose-500/10 text-rose-700 dark:text-rose-300",
    dot: "bg-rose-500",
    tag: "CONTEST",
  },
]

export function StatCard({ stat, index = 0 }: StatCardProps) {
  const Icon = stat.icon
  const theme = STAT_THEMES[index % STAT_THEMES.length]

  return (
    <div
      data-cursor="cover"
      className={`group relative flex flex-col justify-between rounded-xl border border-border/80 bg-card p-2.5 text-card-foreground shadow-2xs transition-all duration-300 hover:-translate-y-0.5 sm:p-3 ${theme.hoverBorder}`}
    >
      {/* Card Top: Glyph Container + Micro-tag */}
      <div className="flex items-center justify-between">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-105 sm:h-8 sm:w-8 ${theme.glyphBg}`}
        >
          <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </div>

        <span
          className={`rounded-full border px-1.5 py-0.5 font-mono text-[8px] font-bold tracking-wider uppercase sm:px-2 sm:text-[9px] ${theme.microBadge}`}
        >
          {theme.tag}
        </span>
      </div>

      {/* Card Body: Numeric Display + Label */}
      <div className="mt-1.5 sm:mt-2">
        <div
          data-cursor="text"
          className="tnum font-mono text-lg font-bold tracking-tight text-foreground sm:text-xl md:text-2xl"
        >
          {stat.value}
        </div>

        <div className="mt-0.5 text-[11px] font-medium tracking-wide text-muted-foreground sm:text-xs">
          {stat.label}
        </div>
      </div>
    </div>
  )
}

export default StatCard
