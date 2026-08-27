"use client"

import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
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
    <Card
      data-cursor="cover"
      className={`group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-4 text-card-foreground shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${theme.hoverBorder} ${theme.hoverGlow} sm:p-5`}
    >
      <div className="flex items-start gap-3.5">
        {/* Glyph Container */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11 ${theme.iconBg}`}
        >
          <Icon className="h-5 w-5" />
        </div>

        {/* Content & Chip */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span
              className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase sm:text-xs ${theme.chipBadge}`}
            >
              {theme.category}
            </span>
          </div>

          <CardHeader className="mt-2 space-y-1 p-0">
            <CardTitle className="text-sm font-bold text-foreground transition-colors sm:text-base md:text-lg">
              {achievement.title}
            </CardTitle>

            <CardDescription className="line-clamp-2 text-xs leading-relaxed font-normal text-muted-foreground sm:text-sm">
              {achievement.description}
            </CardDescription>
          </CardHeader>
        </div>
      </div>
    </Card>
  )
}

export default AchievementCard
