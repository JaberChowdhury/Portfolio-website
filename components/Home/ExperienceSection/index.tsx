"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

const experiences = [
  {
    role: "Software Engineer Intern",
    company: "Tech Company",
    period: "2025 — Present",
    description:
      "Building scalable web applications using Next.js, TypeScript, and modern backend infrastructure. Focused on performance optimization and developer experience.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
  },
  {
    role: "Open Source Contributor",
    company: "GitHub",
    period: "2024 — Present",
    description:
      "Contributed to open-source projects, improved documentation, fixed issues, and collaborated with maintainers across multiple repositories.",
    tech: ["Git", "Open Source", "CI/CD", "Node.js"],
  },
  {
    role: "Competitive Programming Mentor",
    company: "Programming Community",
    period: "2023 — Present",
    description:
      "Guided aspiring programmers in algorithms, data structures, contest preparation, and problem-solving strategies.",
    tech: ["Algorithms", "Data Structures", "Codeforces"],
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

export default function ExperienceSection() {
  return (
    <section className="relative w-full overflow-hidden py-28">
      {/* Background Aura */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[600px] rounded-full bg-foreground/5 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mb-16">
          <p className="mb-4 text-xs tracking-[0.35em] text-muted-foreground uppercase">
            Professional History
          </p>

          <h2 className="text-4xl leading-[1.05] font-semibold tracking-tight md:text-6xl">
            Building products,
            <br />
            contributing to{" "}
            <span className="animate-[gradientMove_6s_linear_infinite] bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-transparent">
              engineering communities
            </span>
            .
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A timeline of internships, engineering experiences, open-source
            contributions, and technical leadership roles.
          </p>
        </div>

        {/* Timeline */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Vertical Line */}
          <div className="absolute top-0 left-5 hidden h-full w-px bg-border/60 md:block" />

          <div className="space-y-10">
            {experiences.map((experience, index) => (
              <motion.div key={index} variants={item} className="relative">
                {/* Timeline Dot */}
                <div className="absolute top-8 left-[13px] hidden h-4 w-4 rounded-full border-4 border-background bg-primary md:block" />

                <div className="md:ml-16">
                  <Card className="group overflow-hidden border border-border/60 bg-card/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.25)]">
                    {/* Hover Glow */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
                    </div>

                    <CardHeader className="relative z-10">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-3 text-xl transition-colors group-hover:text-primary">
                            <Briefcase className="h-5 w-5" />
                            {experience.role}
                          </CardTitle>

                          <CardDescription className="mt-2 text-base">
                            {experience.company}
                          </CardDescription>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {experience.period}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="relative z-10">
                      <p className="leading-relaxed text-muted-foreground">
                        {experience.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {experience.tech.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="rounded-full border border-border/50 bg-muted/40 px-3 py-1 text-[11px] tracking-wide"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        View Details
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
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
