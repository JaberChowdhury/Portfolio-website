"use client"

import React from "react"
import { Trophy, Code2, Brain, Target, ExternalLink } from "lucide-react"
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

export function CompetitiveProgrammingSection() {
  const t = useTranslations("CompetitiveProgramming")
  const [isMounted, setIsMounted] = React.useState(false)

  const rawStats = t.raw("stats") as Stat[]
  const statIcons = [Trophy, Code2, Target, Brain]
  const stats = rawStats.map((stat, i) => ({ ...stat, icon: statIcons[i] }))
  const achievements = (t.raw("achievements") as Achievement[]).slice(0, 2)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section
      id="programming"
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground"
    >
      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-5">
          <p className="mb-1 text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
            {t("eyebrow")}
          </p>

          <h2
            data-cursor="text"
            className="text-2xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            {t("title1")}{" "}
            <span className="text-primary">
              {t("title2")}
            </span>{" "}
            {t("title3")}
          </h2>
        </div>

        {/* 2-Column Dashboard */}
        <div className="grid gap-4 md:grid-cols-12 md:gap-5">
          {/* Left Column: Codeforces profile + Stats Grid */}
          <div className="flex flex-col gap-3 md:col-span-6">
            <Card className="rounded-2xl border border-border bg-card p-3.5 text-card-foreground shadow-xs md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                    {t("codeforces.eyebrow")}
                  </span>
                  <h3 className="text-base font-bold text-foreground md:text-lg">
                    {t("codeforces.name")}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1 font-normal">
                    {t("codeforces.description")}
                  </p>
                </div>

                <a
                  href="https://codeforces.com/profile/YOUR_HANDLE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                >
                  <span>Profile</span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </a>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 md:grid-cols-2">
              {stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>
          </div>

          {/* Right Column: Chart + Top Achievements */}
          <div className="flex flex-col gap-3 md:col-span-6">
            <Card className="rounded-2xl border border-border bg-card p-3.5 text-card-foreground shadow-xs">
              <div className="mb-1 text-xs font-semibold text-foreground">Rating Progress</div>
              <div className="h-[120px] w-full">
                {isMounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={ratingHistory}
                      margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="ratingTerracottaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#c85a32" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#c85a32" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border" opacity={0.4} />
                      <XAxis dataKey="contest" stroke="currentColor" className="text-muted-foreground" fontSize={10} tickLine={false} />
                      <YAxis stroke="currentColor" className="text-muted-foreground" fontSize={10} domain={["dataMin - 100", "dataMax + 100"]} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          borderColor: "var(--border)",
                          borderRadius: "8px",
                          color: "var(--foreground)",
                          fontSize: "12px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                        itemStyle={{ color: "var(--foreground)" }}
                        labelStyle={{ color: "var(--muted-foreground)", fontWeight: 600 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="rating"
                        stroke="#c85a32"
                        strokeWidth={2}
                        fill="url(#ratingTerracottaGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full w-full animate-pulse rounded bg-muted/40" />
                )}
              </div>
            </Card>

            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-1">
              {achievements.map((ach) => (
                <AchievementCard key={ach.title} achievement={ach} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CompetitiveProgrammingSection
