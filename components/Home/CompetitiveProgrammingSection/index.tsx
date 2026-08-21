"use client"

import React from "react"
import {
  Trophy,
  Code2,
  Brain,
  Target,
  ExternalLink,
  Terminal,
  TrendingUp,
} from "lucide-react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card } from "@/components/ui/card"
import { useTranslations } from "next-intl"
import { useMounted } from "@/hooks/use-mounted"
import { StatCard, type Stat } from "./StatCard"
import { AchievementCard, type Achievement } from "./AchievementCard"

const ratingHistory = [
  { contest: "C1", rating: 980 },
  { contest: "C5", rating: 1120 },
  { contest: "C10", rating: 1250 },
  { contest: "C15", rating: 1380 },
  { contest: "C20", rating: 1490 },
  { contest: "C25", rating: 1600 },
  { contest: "C30", rating: 1710 },
]

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}

function CustomChartTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border/90 bg-card/95 p-2.5 shadow-md backdrop-blur-xs">
        <div className="font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
          Contest {label}
        </div>
        <div className="mt-0.5 flex items-center gap-1.5 font-mono text-xs font-bold text-amber-700 dark:text-amber-300">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          <span>{payload[0].value} Rating</span>
        </div>
      </div>
    )
  }
  return null
}

export function CompetitiveProgrammingSection() {
  const t = useTranslations("CompetitiveProgramming")
  const isMounted = useMounted()

  const rawStats = t.raw("stats") as Stat[]
  const statIcons = [Trophy, Code2, Target, Brain]
  const stats = rawStats.map((stat, i) => ({ ...stat, icon: statIcons[i] }))
  const achievements = (t.raw("achievements") as Achievement[]).slice(0, 2)

  return (
    <section
      id="programming"
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground"
    >
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-3.5 sm:mb-5">
          {/* Hallmark Hum Eyebrow with Coral Indicator */}
          <div className="mb-1.5 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-2.5 py-0.5 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase shadow-2xs sm:mb-2.5 sm:px-3 sm:py-1 sm:tracking-[0.25em]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500" />
            <span>04 ⁄ {t("eyebrow")}</span>
          </div>

          <h2
            data-cursor="text"
            className="text-2xl font-black tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl"
          >
            {t("title1")}{" "}
            <span className="text-rose-600 dark:text-rose-400">
              {t("title2")}
            </span>{" "}
            <span className="font-normal text-muted-foreground">
              {t("title3")}
            </span>
          </h2>

          <p className="mt-1 max-w-xl text-xs leading-relaxed font-normal text-muted-foreground sm:mt-1.5 sm:text-sm">
            {t("description")}
          </p>
        </div>

        {/* 2-Column Hallmark Hum Dashboard Layout */}
        <div className="grid gap-3 sm:gap-4 md:grid-cols-12 md:gap-5">
          {/* Left Column: Codeforces Profile Hero + 4 Multi-Accent Stat Cards */}
          <div className="flex flex-col gap-2.5 sm:gap-3 md:col-span-6">
            {/* Codeforces Profile Hero Card */}
            <Card
              data-cursor="cover"
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-card p-3 text-card-foreground shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-500/35 hover:shadow-md sm:rounded-2xl sm:p-4"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500 opacity-80" />

              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-rose-500/25 bg-rose-500/10 text-rose-600 transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10 sm:rounded-xl dark:text-rose-400">
                    <Terminal className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="font-mono text-[9px] font-bold tracking-widest text-muted-foreground uppercase sm:text-[10px]">
                        {t("codeforces.eyebrow")}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[8px] font-bold tracking-wide text-emerald-700 sm:text-[9px] dark:text-emerald-300">
                        <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" />
                        ACTIVE
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-foreground sm:text-base md:text-lg">
                      {t("codeforces.name")}
                    </h3>

                    <p className="line-clamp-1 text-xs font-normal text-muted-foreground">
                      {t("codeforces.description")}
                    </p>
                  </div>
                </div>

                {/* Tactile Profile Link Button */}
                <div className="self-end sm:self-center">
                  <a
                    href="https://codeforces.com/profile/YOUR_HANDLE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/80 px-3 py-1 text-[11px] font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-500/40 hover:bg-card active:scale-95 sm:px-3.5 sm:py-1.5 sm:text-xs"
                  >
                    <span>{t("codeforces.viewProfile")}</span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:text-rose-500" />
                  </a>
                </div>
              </div>
            </Card>

            {/* 4 Distinct Hum Multi-Accent Stat Cards: Pear, Cyan, Mint, Coral */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
            </div>
          </div>

          {/* Right Column: Rating Progress Chart + Achievements */}
          <div className="flex flex-col gap-2.5 sm:gap-3 md:col-span-6">
            {/* Rating Progress Chart Card with Hallmark Hum Warm Gradient */}
            <Card className="rounded-xl border border-border/80 bg-card p-3 text-card-foreground shadow-xs transition-all duration-300 hover:border-amber-500/30 sm:rounded-2xl sm:p-4">
              {/* Chart Header Meta */}
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg border border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <TrendingUp className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-foreground">
                      {t("graph.title") || "Rating Progression"}
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[9px] font-bold tracking-wider text-amber-700 dark:text-amber-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <span>PEAK: 1710</span>
                </div>
              </div>

              {/* Area Chart Container */}
              <div className="h-[120px] w-full">
                {isMounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={ratingHistory}
                      margin={{ top: 8, right: 10, left: -25, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="humRatingWarmGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#f59e0b"
                            stopOpacity={0.38}
                          />
                          <stop
                            offset="60%"
                            stopColor="#f97316"
                            stopOpacity={0.12}
                          />
                          <stop
                            offset="100%"
                            stopColor="#f59e0b"
                            stopOpacity={0.0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="currentColor"
                        className="text-border"
                        opacity={0.35}
                      />
                      <XAxis
                        dataKey="contest"
                        stroke="currentColor"
                        className="font-mono text-muted-foreground"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="currentColor"
                        className="font-mono text-muted-foreground"
                        fontSize={10}
                        domain={["dataMin - 100", "dataMax + 100"]}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip content={<CustomChartTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="rating"
                        stroke="#f59e0b"
                        strokeWidth={2.5}
                        fill="url(#humRatingWarmGradient)"
                        activeDot={{
                          r: 4.5,
                          fill: "#f59e0b",
                          stroke: "var(--card)",
                          strokeWidth: 2,
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full w-full animate-pulse rounded-xl bg-muted/40" />
                )}
              </div>
            </Card>

            {/* Achievement Cards Grid */}
            <div className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-1">
              {achievements.map((ach, index) => (
                <AchievementCard
                  key={ach.title}
                  achievement={ach}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CompetitiveProgrammingSection
