"use client"

import { motion } from "framer-motion"
import {
  GraduationCap,
  Calendar,
  BookA as BookOpen,
  Brain,
  Code2,
  Target,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

const subjects = [
  "Data Structures",
  "Algorithms",
  "Discrete Mathematics",
  "Object Oriented Programming",
  "Database Systems",
  "Operating Systems",
  "Computer Networks",
  "Software Engineering",
]

const highlights = [
  {
    title: "Competitive Programming",
    icon: Code2,
    description:
      "Actively solving algorithmic problems and participating in programming contests alongside academic studies.",
  },
  {
    title: "Problem Solving",
    icon: Brain,
    description:
      "Developing analytical thinking through data structures, algorithms, and mathematical reasoning.",
  },
  {
    title: "Engineering Growth",
    icon: Target,
    description:
      "Focused on becoming a well-rounded software engineer through projects, learning, and practical experience.",
  },
]

const progress = [
  {
    label: "Current Year",
    value: "1st",
  },
  {
    label: "Current Semester",
    value: "3rd",
  },
  {
    label: "Program Length",
    value: "4 Years",
  },
  {
    label: "Status",
    value: "In Progress",
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

export default function EducationSection() {
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
            Education
          </p>

          <h2 className="text-4xl leading-[1.05] font-semibold tracking-tight md:text-6xl">
            Learning the foundations
            <br />
            of{" "}
            <span className="animate-[gradientMove_6s_linear_infinite] bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-transparent">
              computer science
            </span>
            .
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Pursuing a bachelor's degree while actively developing practical
            software engineering skills and competitive programming expertise.
          </p>
        </div>

        {/* Main Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <Card className="overflow-hidden border border-border/60 bg-card/60 backdrop-blur-xl transition-all duration-500 hover:border-primary/30 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.25)]">
            <CardContent className="p-8 md:p-10">
              <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                {/* Left Side */}
                <div>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border/60 bg-muted/40">
                      <GraduationCap className="h-7 w-7 text-primary" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold">
                        Bachelor of Science
                      </h3>

                      <p className="text-muted-foreground">
                        Computer Science & Engineering
                      </p>
                    </div>
                  </div>

                  <p className="max-w-2xl leading-relaxed text-muted-foreground">
                    Currently pursuing a four-year undergraduate degree while
                    building expertise in software engineering, algorithms,
                    competitive programming, and modern web technologies.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {subjects.map((subject) => (
                      <Badge
                        key={subject}
                        variant="secondary"
                        className="rounded-full border border-border/50 bg-muted/40 px-3 py-1"
                      >
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Right Side Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {progress.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-border/60 bg-card/40 p-5"
                    >
                      <div className="text-2xl font-bold tracking-tight">
                        {item.value}
                      </div>

                      <p className="mt-2 text-sm text-muted-foreground">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Highlights */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-7 md:grid-cols-3"
        >
          {highlights.map((highlight) => {
            const Icon = highlight.icon

            return (
              <motion.div key={highlight.title} variants={item}>
                <Card className="group h-full border border-border/60 bg-card/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.25)]">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-muted/40">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>

                    <CardTitle className="transition-colors group-hover:text-primary">
                      {highlight.title}
                    </CardTitle>

                    <CardDescription className="leading-relaxed">
                      {highlight.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Timeline Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <Card className="border border-border/60 bg-card/40 backdrop-blur-xl">
            <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />

                <div>
                  <h4 className="font-medium">Academic Progress</h4>

                  <p className="text-sm text-muted-foreground">
                    Year 1 • Semester 3 of 8 • Bachelor's Degree In Progress
                  </p>
                </div>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-muted md:w-80">
                <div className="h-full w-[37.5%] rounded-full bg-primary" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
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
