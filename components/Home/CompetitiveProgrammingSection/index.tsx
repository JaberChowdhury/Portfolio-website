"use client"

import { motion } from "framer-motion"
import Link from "next/link"
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

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

const stats = [
  {
    label: "Codeforces Rating",
    value: "1700+",
    icon: Trophy,
  },
  {
    label: "Problems Solved",
    value: "1500+",
    icon: Code2,
  },
  {
    label: "Contests",
    value: "80+",
    icon: Target,
  },
  {
    label: "DSA Expertise",
    value: "Advanced",
    icon: Brain,
  },
]

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

const achievements = [
  {
    title: "Contest Experience",
    description:
      "Regular participation in rated contests with strong emphasis on speed, optimization, and problem decomposition.",
  },
  {
    title: "Advanced Problem Solving",
    description:
      "Comfortable solving medium-to-hard algorithmic challenges involving graphs, DP, data structures, and mathematics.",
  },
  {
    title: "Competitive Mindset",
    description:
      "Developed analytical thinking, debugging skills, and performance-focused solutions under strict time constraints.",
  },
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
  return (
    <section className="relative w-full overflow-hidden py-28">
      {/* Background Aura */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[450px] w-[650px] rounded-full bg-foreground/5 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mb-16">
          <p className="mb-4 text-xs tracking-[0.35em] text-muted-foreground uppercase">
            Competitive Programming
          </p>

          <h2 className="text-4xl leading-[1.05] font-semibold tracking-tight md:text-6xl">
            Solving{" "}
            <span className="animate-[gradientMove_6s_linear_infinite] bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-transparent">
              algorithmic challenges
            </span>
            <br />
            with speed and precision.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Competitive programming sharpened my analytical thinking,
            optimization mindset, and ability to solve complex problems under
            pressure.
          </p>
        </div>

        {/* Codeforces Profile */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <Card className="overflow-hidden border border-border/60 bg-card/60 backdrop-blur-xl transition-all duration-500 hover:border-primary/30 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.25)]">
            <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm tracking-[0.25em] text-muted-foreground uppercase">
                  Primary Platform
                </p>

                <h3 className="mt-2 text-3xl font-semibold">Codeforces</h3>

                <p className="mt-3 max-w-xl text-muted-foreground">
                  Active competitive programmer focused on algorithms, data
                  structures, optimization, and contest problem solving.
                </p>
              </div>

              <Link
                href="https://codeforces.com/profile/YOUR_HANDLE"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-6 py-3 text-sm font-medium transition-all hover:border-primary/40 hover:text-primary"
              >
                View Profile
                <ExternalLink className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats + Graph */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Card className="overflow-hidden border border-border/60 bg-card/60 backdrop-blur-xl">
            <CardContent className="p-6 md:p-8">
              <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
                {/* Left Side Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat) => {
                    const Icon = stat.icon

                    return (
                      <div
                        key={stat.label}
                        className="group rounded-2xl border border-border/60 bg-card/40 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_10px_40px_-15px_hsl(var(--primary)/0.3)]"
                      >
                        <Icon className="mb-4 h-5 w-5 text-primary" />

                        <h3 className="text-3xl font-bold tracking-tight">
                          {stat.value}
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                          {stat.label}
                        </p>
                      </div>
                    )
                  })}
                </div>

                {/* Rating Graph */}
                <div className="rounded-2xl border border-border/60 bg-card/40 p-5">
                  <div className="mb-5">
                    <h3 className="text-lg font-semibold">
                      Rating Progression
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      Growth trajectory across competitive programming contests.
                    </p>
                  </div>

                  <div className="h-[320px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
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
                              stopColor="hsl(var(--primary))"
                              stopOpacity={0.35}
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
                          stroke="hsl(var(--border))"
                          opacity={0.25}
                        />

                        <XAxis
                          dataKey="contest"
                          tickLine={false}
                          axisLine={false}
                          tick={{
                            fill: "hsl(var(--muted-foreground))",
                          }}
                        />

                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tick={{
                            fill: "hsl(var(--muted-foreground))",
                          }}
                        />

                        <Tooltip
                          contentStyle={{
                            background: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "12px",
                          }}
                        />

                        <Area
                          type="monotone"
                          dataKey="rating"
                          stroke="hsl(var(--primary))"
                          strokeWidth={3}
                          fill="url(#ratingGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom Section */}
        <div className="grid gap-7 lg:grid-cols-2">
          {/* Achievements */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-7"
          >
            {achievements.map((achievement) => (
              <motion.div key={achievement.title} variants={item}>
                <Card className="group border border-border/60 bg-card/60 backdrop-blur-xl transition-all duration-500 hover:border-primary/30 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.25)]">
                  <CardHeader>
                    <CardTitle className="transition-colors group-hover:text-primary">
                      {achievement.title}
                    </CardTitle>

                    <CardDescription className="leading-relaxed">
                      {achievement.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Skills */}
          <motion.div
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Card className="h-full border border-border/60 bg-card/60 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Algorithm Toolbox</CardTitle>

                <CardDescription>
                  Core concepts frequently used during contests and advanced
                  problem solving.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="rounded-full border border-border/50 bg-muted/40 px-3 py-1"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  )
}
