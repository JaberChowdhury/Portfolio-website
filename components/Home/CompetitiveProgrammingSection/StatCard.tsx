"use client"

import React, { ElementType } from "react"
import { LucideIcon } from "lucide-react"
import { M3FacetedBadge, M3Progress } from "@/components/m3/M3Shapes"

export interface Stat {
  label: string
  value: string
  icon: ElementType
}

interface StatCardProps {
  stat: Stat
  index?: number
  shape?: "cookie8" | "gem" | "diamond" | "cookie4"
  progressValue?: number
  sublabel?: string
}

const STAT_CONFIGS = [
  {
    shape: "cookie8" as const,
    tag: "CODEFORCES",
    color: "primary" as const,
    defaultProgress: 76,
    sublabel: "Specialist track",
  },
  {
    shape: "gem" as const,
    tag: "BEECROWD / LEETCODE",
    color: "secondary" as const,
    defaultProgress: 65,
    sublabel: "Algorithmic judge",
  },
  {
    shape: "diamond" as const,
    tag: "TOTAL SOLVED",
    color: "tertiary" as const,
    defaultProgress: 89,
    sublabel: "359+ Verified",
  },
  {
    shape: "cookie4" as const,
    tag: "ICPC / NCPC",
    color: "primary" as const,
    defaultProgress: 100,
    sublabel: "Regional Finalist",
  },
]

export function StatCard({
  stat,
  index = 0,
  shape,
  progressValue,
  sublabel,
}: StatCardProps) {
  const Icon = stat.icon as LucideIcon
  const config = STAT_CONFIGS[index % STAT_CONFIGS.length]
  const badgeShape = shape || config.shape
  const currentProgress = progressValue ?? config.defaultProgress
  const currentSublabel = sublabel ?? config.sublabel

  return (
    <div
      data-cursor="cover"
      className="group relative flex flex-col justify-between rounded-2xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container)] p-3 sm:p-4 text-[var(--md-sys-color-on-surface)] transition-all duration-300 hover:bg-[var(--md-sys-color-surface-container-high)] hover:border-[var(--md-sys-color-outline)] active:scale-[0.99]"
    >
      {/* Top Row: Faceted M3 Shape Badge + Pill Micro-tag */}
      <div className="flex items-center justify-between gap-2">
        <M3FacetedBadge
          shape={badgeShape}
          icon={Icon}
          size={38}
          iconClassName="h-4 w-4"
        />

        <span className="truncate rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-high)] px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider text-[var(--md-sys-color-on-surface-variant)] uppercase">
          {config.tag}
        </span>
      </div>

      {/* Numerical Stat Display */}
      <div className="mt-3">
        <div className="flex items-baseline justify-between gap-2">
          <div
            data-cursor="text"
            className="font-mono text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-[var(--md-sys-color-on-surface)] tabular-nums"
          >
            {stat.value}
          </div>
          <span className="font-mono text-[10px] text-[var(--md-sys-color-primary)] font-semibold">
            {currentSublabel}
          </span>
        </div>

        <div className="mt-0.5 truncate font-sans text-xs font-semibold text-[var(--md-sys-color-on-surface-variant)]">
          {stat.label}
        </div>

        {/* M3 Tonal Progress Bar Indicator */}
        <div className="mt-2.5">
          <M3Progress value={currentProgress} color={config.color} />
        </div>
      </div>
    </div>
  )
}

export default StatCard
