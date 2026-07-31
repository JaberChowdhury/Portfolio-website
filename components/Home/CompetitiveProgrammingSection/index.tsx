"use client"

import React from "react"
import { motion } from "motion/react"
import { ExternalLink } from "lucide-react"

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Button } from "@/components/ui/button"

import { useTranslations } from "next-intl"
import { StatCard, parseStatValue, type Stat } from "./StatCard"
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

const skills = [
  "Dynamic Programming",
  "Graphs",
  "Trees",
  "Greedy",
  "Binary Search",
  "Number Theory",
  "Segment Tree",
  "Bitmask DP",
  "Shortest Path",
  "DSU",
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const item = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export default function CompetitiveProgrammingSection() {
  const t = useTranslations("CompetitiveProgramming")
  const [isMounted, setIsMounted] = React.useState(false)

  const rawStats = t.raw("stats") as Stat[]

  const headlineIndex = rawStats.reduce((best, stat, index) => {
    const current = parseStatValue(stat.value).number
    const target = parseStatValue(rawStats[best].value).number
    return current != null && (target == null || current > target)
      ? index
      : best
  }, 0)

  const achievements = t.raw("achievements") as Achievement[]

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section
      id="programming"
      className="band-cyan relative w-full overflow-hidden py-28"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16">
          <p className="mono-label mb-4 text-ink-2">03 · {t("eyebrow")}</p>

          <h2
            data-cursor="text"
            className="text-4xl leading-[1.05] font-bold tracking-tight md:text-6xl"
          >
            {t("title1")}
            <span className="hl hl--cyan">{t("title2")}</span>
            <br />
            {t("title3")}
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
            {t("description")}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="hum-card hum-card--pear flex flex-col gap-6 rounded-2xl p-8 md:flex-row md:items-center md:justify-between md:p-9">
            <div>
              <p className="mono-label text-pear-deep">
                {t("codeforces.eyebrow")}
              </p>

              <h3
                data-cursor="text"
                className="mt-3 text-3xl font-bold tracking-tight text-ink"
              >
                {t("codeforces.name")}
              </h3>

              <p className="mt-3 max-w-xl text-ink-2">
                {t("codeforces.description")}
              </p>
            </div>

            <Button
              className="rounded-full px-7"
              nativeButton={false}
              render={
                <a
                  href="https://codeforces.com/profile/YOUR_HANDLE"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              {t("codeforces.viewProfile")}
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {rawStats.map((stat, index) => (
            <motion.div key={stat.label} variants={item}>
              <StatCard
                stat={stat}
                index={index}
                headline={index === headlineIndex}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="hum-card hum-card--plain rounded-2xl p-6 md:p-8">
            <div className="mb-6">
              <h3
                data-cursor="text"
                className="text-lg font-bold tracking-tight text-ink"
              >
                {t("graph.title")}
              </h3>

              <p className="mt-1 text-sm text-ink-2">
                {t("graph.description")}
              </p>
            </div>

            <div className="h-[320px] w-full">
              {isMounted && (
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  minWidth={0}
                  minHeight={0}
                >
                  <AreaChart
                    data={ratingHistory}
                    margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="ratingGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="100%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--muted-foreground))"
                      strokeOpacity={0.18}
                      vertical={false}
                    />

                    <XAxis
                      dataKey="contest"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                      tick={{
                        fill: "hsl(var(--muted-foreground))",
                        fontSize: 12,
                      }}
                    />

                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={6}
                      width={44}
                      tick={{
                        fill: "hsl(var(--muted-foreground))",
                        fontSize: 12,
                      }}
                    />

                    <Tooltip
                      cursor={{
                        stroke: "hsl(var(--muted-foreground))",
                        strokeOpacity: 0.3,
                      }}
                      contentStyle={{
                        background: "hsl(var(--paper))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.75rem",
                        boxShadow:
                          "0 12px 32px -16px oklch(0.2 0.012 250 / 0.25)",
                        padding: "0.75rem 1rem",
                      }}
                      labelStyle={{
                        color: "hsl(var(--ink))",
                        fontWeight: 700,
                      }}
                      itemStyle={{
                        color: "hsl(var(--ink))",
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="rating"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      strokeLinecap="round"
                      fill="url(#ratingGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-7 lg:grid-cols-2">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-5"
          >
            {achievements.map((achievement, index) => (
              <motion.div key={achievement.title} variants={item}>
                <AchievementCard achievement={achievement} index={index} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="hum-card hum-card--plain flex h-full flex-col rounded-2xl p-7 md:p-9">
              <h3
                data-cursor="text"
                className="text-lg font-bold tracking-tight text-ink"
              >
                {t("toolbox.title")}
              </h3>

              <p className="mt-1 text-sm text-ink-2">
                {t("toolbox.description")}
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-paper/80 px-4 py-1.5 text-sm font-medium text-ink-2 ring-1 ring-ink/10 transition-colors hover:bg-paper-3 hover:text-ink"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
