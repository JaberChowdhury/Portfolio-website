"use client"

import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useTranslations } from "next-intl"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card } from "@/components/pouf/surface"
import { Eyebrow, Heading, Highlight, Text } from "@/components/pouf/text"
import { Badge } from "@/components/pouf/media"
import { buttonClasses } from "@/components/pouf/Button"
import type { IconName } from "@/components/pouf/Icon"
import type { Tone } from "@/components/pouf/tone"
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

const statIcons: IconName[] = ["chart", "ok", "calendar", "flame"]
const statTones: Tone[] = ["purple", "mint", "blue", "pink"]
const achievementIcons: IconName[] = ["sword", "target", "flame"]
const achievementTones: Tone[] = ["purple", "blue", "mint"]
const badgeTones: Tone[] = ["purple", "blue", "mint", "pink", "yellow"]

function Reveal({
  delay = 0,
  className = "",
  children,
}: {
  delay?: number
  className?: string
  children: React.ReactNode
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
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
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col gap-(--s3)">
            <Eyebrow>03 · {t("eyebrow")}</Eyebrow>
            <Heading level={2}>
              {t("title1")}
              <Highlight>{t("title2")}</Highlight>
              <br />
              {t("title3")}
            </Heading>
            <Text muted>{t("description")}</Text>
          </div>
        </Reveal>

        <div className="mt-(--s8) flex flex-col gap-(--s5) md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-xl">
            <div className="flex flex-col gap-(--s2)">
              <Eyebrow>{t("codeforces.eyebrow")}</Eyebrow>
              <Heading level={3}>{t("codeforces.name")}</Heading>
              <Text muted>{t("codeforces.description")}</Text>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <a
              href="https://codeforces.com/profile/YOUR_HANDLE"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses({ tone: "purple", size: "md" })}
            >
              {t("codeforces.viewProfile")}
            </a>
          </Reveal>
        </div>

        <div className="mt-(--s8) grid gap-(--s4) lg:grid-cols-[minmax(0,420px)_1fr]">
          <div className="grid grid-cols-2 gap-(--s3)">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.05} className="h-full">
                <StatCard
                  stat={stat}
                  icon={statIcons[i % statIcons.length]}
                  tone={statTones[i % statTones.length]}
                />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <Card>
              <div className="flex flex-col gap-(--s1)">
                <Heading level={3}>{t("graph.title")}</Heading>
                <Text muted>{t("graph.description")}</Text>
              </div>

              <div className="mt-(--s5) h-[320px] w-full">
                {isMounted && (
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
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
                            stopColor="var(--purple)"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="100%"
                            stopColor="var(--purple)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>

                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--muted)"
                        opacity={0.15}
                      />

                      <XAxis
                        dataKey="contest"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "var(--muted)" }}
                      />

                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "var(--muted)" }}
                      />

                      <Tooltip
                        contentStyle={{
                          background: "var(--surface)",
                          border: "none",
                          borderRadius: "16px",
                          boxShadow: "0 10px 20px rgba(58,46,92,0.15)",
                        }}
                        labelStyle={{ color: "var(--ink)" }}
                        itemStyle={{ color: "var(--purple)" }}
                      />

                      <Area
                        type="monotone"
                        dataKey="rating"
                        stroke="var(--purple)"
                        strokeWidth={2.5}
                        fill="url(#ratingGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Card>
          </Reveal>
        </div>

        <div className="mt-(--s8) grid gap-(--s5) lg:grid-cols-2">
          <div className="flex flex-col gap-(--s3)">
            {achievements.map((achievement, i) => (
              <Reveal key={achievement.title} delay={i * 0.05}>
                <AchievementCard
                  achievement={achievement}
                  icon={achievementIcons[i % achievementIcons.length]}
                  tone={achievementTones[i % achievementTones.length]}
                />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-(--s3)">
              <Heading level={3}>{t("toolbox.title")}</Heading>
              <Text muted>{t("toolbox.description")}</Text>

              <div className="flex flex-wrap gap-(--s2)">
                {skills.map((skill, i) => (
                  <Badge key={skill} tone={badgeTones[i % badgeTones.length]}>
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
