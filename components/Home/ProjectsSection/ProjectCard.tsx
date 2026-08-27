"use client"

import React from "react"
import { ExternalLink, GitPullRequestClosed, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface Project {
  title: string
  description: string
  tech: string[]
  live?: string
  github?: string
}

interface ProjectCardProps {
  project: Project
  index?: number
}

// Hallmark Hum multi-accent palette schemes
const CARD_ACCENTS = [
  {
    name: "cyan",
    topGradient: "from-sky-500/90 via-sky-400 to-cyan-400",
    indexBadge:
      "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-300",
    hoverBorder: "hover:border-sky-500/40",
    liveBtnHover:
      "hover:bg-sky-500/15 hover:border-sky-500/35 hover:text-sky-700 dark:hover:text-sky-300",
    dot: "bg-sky-500",
  },
  {
    name: "pear",
    topGradient: "from-amber-500/90 via-amber-400 to-yellow-400",
    indexBadge:
      "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    hoverBorder: "hover:border-amber-500/40",
    liveBtnHover:
      "hover:bg-amber-500/15 hover:border-amber-500/35 hover:text-amber-700 dark:hover:text-amber-300",
    dot: "bg-amber-500",
  },
  {
    name: "mint",
    topGradient: "from-emerald-500/90 via-emerald-400 to-teal-400",
    indexBadge:
      "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    hoverBorder: "hover:border-emerald-500/40",
    liveBtnHover:
      "hover:bg-emerald-500/15 hover:border-emerald-500/35 hover:text-emerald-700 dark:hover:text-emerald-300",
    dot: "bg-emerald-500",
  },
  {
    name: "coral",
    topGradient: "from-rose-500/90 via-rose-400 to-orange-400",
    indexBadge:
      "border-rose-500/25 bg-rose-500/10 text-rose-700 dark:text-rose-300",
    hoverBorder: "hover:border-rose-500/40",
    liveBtnHover:
      "hover:bg-rose-500/15 hover:border-rose-500/35 hover:text-rose-700 dark:hover:text-rose-300",
    dot: "bg-rose-500",
  },
  {
    name: "lilac",
    topGradient: "from-purple-500/90 via-purple-400 to-pink-400",
    indexBadge:
      "border-purple-500/25 bg-purple-500/10 text-purple-700 dark:text-purple-300",
    hoverBorder: "hover:border-purple-500/40",
    liveBtnHover:
      "hover:bg-purple-500/15 hover:border-purple-500/35 hover:text-purple-700 dark:hover:text-purple-300",
    dot: "bg-purple-500",
  },
]

// Hum Multi-Accent Tech Tag Badges
const TECH_TAG_STYLES: Record<string, string> = {
  "Next.js":
    "border-slate-500/20 bg-slate-500/10 text-foreground dark:text-slate-200",
  TypeScript: "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  Prisma:
    "border-purple-500/25 bg-purple-500/10 text-purple-700 dark:text-purple-300",
  Stripe:
    "border-indigo-500/25 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
  "OpenAI API":
    "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Tailwind:
    "border-cyan-500/25 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  PostgreSQL:
    "border-blue-500/25 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  "Framer Motion":
    "border-rose-500/25 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  Docker: "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-300",
}

const FALLBACK_TAG_STYLES = [
  "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  "border-sky-500/25 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  "border-rose-500/25 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  "border-purple-500/25 bg-purple-500/10 text-purple-700 dark:text-purple-300",
]

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length]
  const formattedIndex = String(index + 1).padStart(2, "0")

  return (
    <Card
      data-cursor="cover"
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-5 text-card-foreground shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xs ${accent.hoverBorder} sm:p-6 md:p-7`}
    >
      {/* Top Accent Color Highlight Ribbon */}
      <div
        className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accent.topGradient} opacity-90 transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div className="relative pt-1.5">
        {/* Card Header Micro-meta (Index + Category Tag) */}
        <div className="mb-3 flex items-center justify-between">
          <div
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 font-mono text-xs font-semibold tracking-widest uppercase ${accent.indexBadge}`}
          >
            <span className={`h-2 w-2 rounded-full ${accent.dot}`} />
            <span>#{formattedIndex}</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs font-medium tracking-wider text-muted-foreground/80 uppercase">
            <Sparkles className="h-3.5 w-3.5 text-muted-foreground/60" />
            <span>FEATURED</span>
          </div>
        </div>

        {/* Title and Description */}
        <CardHeader className="space-y-2 p-0">
          <CardTitle className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {project.title}
          </CardTitle>

          <CardDescription className="line-clamp-2 text-xs leading-relaxed font-normal text-muted-foreground sm:text-sm md:text-base">
            {project.description}
          </CardDescription>
        </CardHeader>

        {/* Hallmark Multi-Accent Tech Badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((tech, idx) => {
            const tagStyle =
              TECH_TAG_STYLES[tech] ||
              FALLBACK_TAG_STYLES[idx % FALLBACK_TAG_STYLES.length]

            return (
              <Badge
                key={idx}
                variant="secondary"
                className={`rounded-md border px-2.5 py-1 font-mono text-xs font-medium tracking-wide transition-colors ${tagStyle}`}
              >
                {tech}
              </Badge>
            )
          })}
          {project.tech.length > 4 && (
            <span className="self-center font-mono text-xs font-medium text-muted-foreground">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Tactile Live & Code Action Buttons */}
      <div className="mt-5 flex items-center gap-2.5 border-t border-border/80 pt-4">
        <Button
          variant={
            accent.name === "cyan"
              ? "sky"
              : accent.name === "pear"
                ? "amber"
                : accent.name === "mint"
                  ? "emerald"
                  : "rose"
          }
          size="sm"
          href={project.live || "https://github.com"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <span className="py-2">Live Demo</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Button>

        <Button
          variant="secondary"
          size="sm"
          href={project.github || "https://github.com"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <GitPullRequestClosed className="h-3.5 w-3.5" />
          <span className="py-2">Source</span>
        </Button>
      </div>
    </Card>
  )
}

export default ProjectCard
