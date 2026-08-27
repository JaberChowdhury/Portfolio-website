"use client"

import React from "react"
import { Trophy, Zap, Target, Award } from "lucide-react"

export interface Achievement {
  title: string
  description: string
}

interface AchievementCardProps {
  achievement: Achievement
  index?: number
}

// Hallmark Hum Multi-Accent Themes for Achievement Cards
const ACHIEVEMENT_THEMES = [
  {
    name: "coral",
    chipBadge:
      "border-rose-500/25 bg-rose-500/10 text-rose-700 dark:text-rose-300",
    hoverBorder: "hover:border-rose-500/40",
    hoverGlow: "hover:shadow-rose-500/10",
    iconBg:
      "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    icon: Trophy,
    category: "CODEFORCES",
  },
  {
    name: "cyan",
    chipBadge: "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-300",
    hoverBorder: "hover:border-sky-500/40",
    hoverGlow: "hover:shadow-sky-500/10",
    iconBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    icon: Target,
    category: "BEECROWD",
  },
  {
    name: "mint",
    chipBadge:
      "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    hoverBorder: "hover:border-emerald-500/40",
    hoverGlow: "hover:shadow-emerald-500/10",
    iconBg:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    icon: Zap,
    category: "PROBLEM SOLVING",
  },
  {
    name: "pear",
    chipBadge:
      "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    hoverBorder: "hover:border-amber-500/40",
    hoverGlow: "hover:shadow-amber-500/10",
    iconBg:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    icon: Award,
    category: "DISCIPLINE",
  },
]

export function AchievementCard({
  achievement,
  index = 0,
}: AchievementCardProps) {
  const theme = ACHIEVEMENT_THEMES[index % ACHIEVEMENT_THEMES.length]
  const Icon = theme.icon

  return (
    <div
      data-cursor="cover"
      className={`hum-card group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-3 text-card-foreground shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-4 md:p-5 ${theme.hoverBorder} ${theme.hoverGlow}`}
    >
      <div className="flex items-start gap-2.5 sm:gap-3.5">
        {/* Glyph Container */}
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10 md:h-11 md:w-11 ${theme.iconBg}`}
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>

        {/* Content & Chip */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1.5">
            <span
              className={`rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider uppercase sm:px-2.5 sm:text-[10px] md:text-xs ${theme.chipBadge}`}
            >
              {theme.category}
            </span>
          </div>

          <div className="mt-1.5 space-y-0.5 sm:mt-2 sm:space-y-1">
            <h3 className="text-xs font-bold text-foreground transition-colors sm:text-sm md:text-base lg:text-lg">
              {achievement.title}
            </h3>

            <p className="line-clamp-2 text-[11px] leading-relaxed font-normal text-muted-foreground sm:text-xs md:text-sm">
              {achievement.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AchievementCard
