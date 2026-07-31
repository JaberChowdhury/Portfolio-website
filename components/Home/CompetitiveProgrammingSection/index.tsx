"use client"

import React from "react"
import Link from "next/link"

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { useTranslations } from "next-intl"
import type { Stat } from "./StatCard"
import type { Achievement } from "./AchievementCard"

// Stats and achievements are loaded from translations

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

function Reveal({
  delay = 0,
  className = "",
  children,
}: {
  delay?: number
  className?: string
  children: React.ReactNode
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const raf = requestAnimationFrame(() => el.classList.add("is-visible"))
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

export default function CompetitiveProgrammingSection() {
  const t = useTranslations("CompetitiveProgramming")
  const [isMounted, setIsMounted] = React.useState(false)

  const stats = t.raw("stats") as Stat[]
  const achievements = t.raw("achievements") as Achievement[]

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section id="programming" className="relative w-full overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        {/* Hanging section head */}
        <header className="head-hang">
          <div className="head-hang__eyebrow">
            <p className="mono-label">03 · {t("eyebrow")}</p>
          </div>

          <h2
            data-cursor="text"
            className="head-hang__title text-ink"
          >
            {t("title1")}
            <span className="hl">{t("title2")}</span>
            <br />
            {t("title3")}
          </h2>

          <p className="head-hang__body">{t("description")}</p>
        </header>

        {/* Codeforces profile */}
        <div className="mb-20 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-xl">
            <p className="mono-label">{t("codeforces.eyebrow")}</p>

            <h3
              data-cursor="text"
              className="mt-4 text-2xl font-semibold tracking-tight text-ink md:text-3xl"
            >
              {t("codeforces.name")}
            </h3>

            <p className="mt-3 text-ink-2">{t("codeforces.description")}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              href="https://codeforces.com/profile/YOUR_HANDLE"
              target="_blank"
              className="cta-word"
            >
              {t("codeforces.viewProfile")}
              <span className="cta-word__arrow">→</span>
            </Link>
          </Reveal>
        </div>

        {/* Stats + rating graph */}
        <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.06}>
                <div data-cursor="cover" className="aurora-card h-full">
                  <p className="mono-label">{stat.label}</p>

                  <p
                    data-cursor="text"
                    className="mt-4 text-3xl font-semibold tracking-tight text-ink"
                  >
                    {stat.value}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <div data-cursor="cover" className="aurora-card h-full">
              <h3
                data-cursor="text"
                className="text-lg font-semibold tracking-tight text-ink"
              >
                {t("graph.title")}
              </h3>

              <p className="mt-2 text-sm text-ink-2">
                {t("graph.description")}
              </p>

              <div className="mt-6 h-[320px] w-full">
                {isMounted && (
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                    minWidth={0}
                    minHeight={0}
                  >
                    <AreaChart data={ratingHistory}>
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
                            stopColor="var(--cyan)"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="100%"
                            stopColor="var(--cyan)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--ink-2)"
                        opacity={0.15}
                      />

                      <XAxis
                        dataKey="contest"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "var(--ink-2)" }}
                      />

                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "var(--ink-2)" }}
                      />

                      <Tooltip
                        contentStyle={{
                          background: "var(--paper-2)",
                          border: "none",
                          borderRadius: "12px",
                        }}
                        labelStyle={{ color: "var(--ink)" }}
                        itemStyle={{ color: "var(--cyan)" }}
                      />

                      <Area
                        type="monotone"
                        dataKey="rating"
                        stroke="var(--cyan)"
                        strokeWidth={2.5}
                        fill="url(#ratingGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Achievements + toolbox */}
        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          <div>
            {achievements.map((achievement, i) => (
              <Reveal key={achievement.title} delay={i * 0.06} className="mb-10 last:mb-0">
                <div data-cursor="cover" className="aurora-card">
                  <h3
                    data-cursor="text"
                    className="text-xl font-semibold tracking-tight text-ink"
                  >
                    {achievement.title}
                  </h3>

                  <p className="mt-3 text-ink-2">{achievement.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div>
              <h3
                data-cursor="text"
                className="text-xl font-semibold tracking-tight text-ink"
              >
                {t("toolbox.title")}
              </h3>

              <p className="mt-3 text-ink-2">{t("toolbox.description")}</p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-paper-2 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.12em] text-ink-2 uppercase transition-colors duration-300 hover:text-cyan"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
