"use client"

import React from "react"
import { Trophy, Zap, Target, Award, LucideIcon } from "lucide-react"
import { M3FacetedBadge, M3Progress } from "@/components/m3/M3Shapes"

export interface Achievement {
  title: string
  description: string
  rating?: string
  progress?: number
  category?: string
}

interface AchievementCardProps {
  achievement: Achievement
  index?: number
}

const ACHIEVEMENT_CONFIGS = [
  {
    icon: Trophy,
    shape: "gem" as const,
    category: "ICPC / NCPC CONTEST",
    color: "primary" as const,
    defaultProgress: 95,
  },
  {
    icon: Target,
    shape: "cookie8" as const,
    category: "CODEFORCES",
    color: "secondary" as const,
    defaultProgress: 82,
  },
  {
    icon: Zap,
    shape: "diamond" as const,
    category: "LEETCODE / JUDGE",
    color: "tertiary" as const,
    defaultProgress: 75,
  },
  {
    icon: Award,
    shape: "cookie4" as const,
    category: "ALGORITHMIC DISCIPLINE",
    color: "primary" as const,
    defaultProgress: 90,
  },
]

export function AchievementCard({
  achievement,
  index = 0,
}: AchievementCardProps) {
  const config = ACHIEVEMENT_CONFIGS[index % ACHIEVEMENT_CONFIGS.length]
  const Icon = config.icon as LucideIcon
  const categoryLabel = achievement.category || config.category
  const progressValue = achievement.progress ?? config.defaultProgress

  return (
    <div
      data-cursor="cover"
      className="group relative flex flex-col justify-between rounded-2xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container)] p-4 sm:p-5 text-[var(--md-sys-color-on-surface)] transition-all duration-300 hover:bg-[var(--md-sys-color-surface-container-high)] hover:border-[var(--md-sys-color-outline)] active:scale-[0.99]"
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          {/* Faceted M3 Shape Icon Badge */}
          <M3FacetedBadge
            shape={config.shape}
            icon={Icon}
            size={44}
            iconClassName="h-5 w-5"
          />

          {/* M3 Assist Pill / Category Tag */}
          <span className="rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-highest)] px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-wider text-[var(--md-sys-color-on-surface-variant)] uppercase sm:text-[10px]">
            {categoryLabel}
          </span>
        </div>

        <div className="mt-3.5 space-y-1">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-sans text-sm sm:text-base font-bold text-[var(--md-sys-color-on-surface)]">
              {achievement.title}
            </h3>
            {achievement.rating && (
              <span className="font-mono text-xs font-bold text-[var(--md-sys-color-primary)]">
                {achievement.rating}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-[var(--md-sys-color-on-surface-variant)]">
            {achievement.description}
          </p>
        </div>
      </div>

      {/* Tonal Progress & Metric Bar */}
      <div className="mt-4 pt-2 border-t border-[var(--md-sys-color-outline-variant)]/60">
        <div className="flex items-center justify-between text-[10px] font-mono text-[var(--md-sys-color-on-surface-variant)] mb-1.5">
          <span>Mastery / Milestone</span>
          <span className="font-bold text-[var(--md-sys-color-primary)]">{progressValue}%</span>
        </div>
        <M3Progress value={progressValue} color={config.color} />
      </div>
    </div>
  )
}

export default AchievementCard
