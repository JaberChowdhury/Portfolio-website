"use client"

import { motion } from "framer-motion"
import { ExternalLink, GitPullRequestClosed } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A production-ready commerce system with seamless checkout flows, authentication, and scalable backend architecture.",
    tech: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    live: "#",
    github: "#",
  },
  {
    title: "AI Chat Interface",
    description:
      "Realtime streaming AI chat experience with persistent memory, modern UI state handling, and smooth transitions.",
    tech: ["Next.js", "OpenAI API", "Tailwind", "PostgreSQL"],
    live: "#",
    github: "#",
  },
  {
    title: "Portfolio System",
    description:
      "A motion-driven personal portfolio with layered typography, micro-interactions, and responsive design system.",
    tech: ["Next.js", "Framer Motion", "Tailwind"],
    live: "#",
    github: "#",
  },
  {
    title: "E-Commerce Platform",
    description:
      "A production-ready commerce system with seamless checkout flows, authentication, and scalable backend architecture.",
    tech: ["Next.js", "TypeScript", "Prisma", "Stripe"],
    live: "#",
    github: "#",
  },
  {
    title: "AI Chat Interface",
    description:
      "Realtime streaming AI chat experience with persistent memory, modern UI state handling, and smooth transitions.",
    tech: ["Next.js", "OpenAI API", "Tailwind", "PostgreSQL"],
    live: "#",
    github: "#",
  },
  {
    title: "Portfolio System",
    description:
      "A motion-driven personal portfolio with layered typography, micro-interactions, and responsive design system.",
    tech: ["Next.js", "Framer Motion", "Tailwind"],
    live: "#",
    github: "#",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function ProjectsSection() {
  return (
    <section className="relative w-full overflow-hidden py-28">
      {/* Background aura */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[600px] rounded-full bg-foreground/5 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-16">
          {/* Eyebrow */}
          <p className="mb-4 text-xs tracking-[0.35em] text-muted-foreground uppercase">
            Selected Work
          </p>

          {/* Big Typographic Title */}
          <h2 className="text-4xl leading-[1.05] font-semibold tracking-tight text-foreground md:text-6xl">
            Crafting{" "}
            <span className="animate-[gradientMove_6s_linear_infinite] bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-transparent">
              digital systems
            </span>
            <br />
            that feel alive.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A curated set of engineering-focused projects emphasizing
            performance, scalable architecture, and refined UI motion design.
          </p>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, i) => (
            <motion.div key={i} variants={item}>
              <Card className="group relative overflow-hidden border border-border/60 bg-card/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.25)]">
                {/* Soft hover glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
                </div>

                <CardHeader className="space-y-3">
                  {/* Project Title Typography */}
                  <CardTitle className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                    {project.title}
                  </CardTitle>

                  <CardDescription className="min-h-20 leading-relaxed text-muted-foreground">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Tech Pills */}
                  <div className="flex min-h-20 flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="rounded-full border border-border/50 bg-muted/40 px-3 py-1 text-[11px] tracking-wide"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <Button
                      // size="sm"
                      className="rounded-full px-14 text-xs tracking-wide"
                      // asChild
                    >
                      <Link
                        href={project.live}
                        target="_blank"
                        className="flex items-start justify-start"
                      >
                        Live
                        <ExternalLink className="ml-2 h-3.5 w-3.5" />
                      </Link>
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full border-border/60 bg-card/30 px-5 text-xs tracking-wide backdrop-blur-md"
                      // asChild
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        className="flex items-start justify-start"
                      >
                        Code
                        <GitPullRequestClosed className="ml-2 h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Shared animation keyframes */}
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
