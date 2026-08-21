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
    glyphBg: "bg-amber-500/10 border-amber-500/25 text-amber-600 dark:text-amber-400",
    hoverBorder: "hover:border-amber-500/40",
    hoverShadow: "hover:shadow-amber-500/10",
    microBadge: "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    dot: "bg-amber-500",
    tag: "RATING",
  },
  {
    name: "cyan",
    accentText: "text-sky-700 dark:text-sky-300",
    glyphBg: "bg-sky-500/10 border-sky-500/25 text-sky-600 dark:text-sky-400",
    hoverBorder: "hover:border-sky-500/40",
    hoverShadow: "hover:shadow-sky-500/10",
    microBadge: "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-300",
    dot: "bg-sky-500",
    tag: "SOLVED",
  },
  {
    name: "mint",
    accentText: "text-emerald-700 dark:text-emerald-300",
    glyphBg: "bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400",
    hoverBorder: "hover:border-emerald-500/40",
    hoverShadow: "hover:shadow-emerald-500/10",
    microBadge: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    dot: "bg-emerald-500",
    tag: "RATED",
  },
  {
    name: "coral",
    accentText: "text-rose-700 dark:text-rose-300",
    glyphBg: "bg-rose-500/10 border-rose-500/25 text-rose-600 dark:text-rose-400",
    hoverBorder: "hover:border-rose-500/40",
    hoverShadow: "hover:shadow-rose-500/10",
    microBadge: "border-rose-500/25 bg-rose-500/10 text-rose-700 dark:text-rose-300",
    dot: "bg-rose-500",
    tag: "LEVEL",
  },
]

export function StatCard({ stat, index = 0 }: StatCardProps) {
  const Icon = stat.icon
  const theme = STAT_THEMES[index % STAT_THEMES.length]

  return (
    <div
      data-cursor="cover"
      className={`group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-3.5 text-card-foreground shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${theme.hoverBorder} ${theme.hoverShadow}`}
    >
      {/* Card Top: Glyph Container + Micro-tag */}
      <div className="flex items-center justify-between">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105 ${theme.glyphBg}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        <span
          className={`rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider uppercase ${theme.microBadge}`}
        >
          {theme.tag}
        </span>
      </div>

      {/* Card Body: Numeric Display + Label */}
      <div className="mt-3">
        <div
          data-cursor="text"
          className="font-mono text-xl font-bold tracking-tight text-foreground md:text-2xl tnum"
        >
          {stat.value}
        </div>

        <div className="mt-0.5 text-[11px] font-medium tracking-wide text-muted-foreground">
          {stat.label}
        </div>
      </div>
    </div>
  )
}

export default StatCard
