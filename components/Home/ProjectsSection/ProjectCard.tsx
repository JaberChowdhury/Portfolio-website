"use client"

import React from "react"
import Image from "next/image"
import { ExternalLink, GitPullRequestClosed, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export interface Project {
  title: string
  description: string
  tech: string[]
  image?: string
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
    topGradient:
      "from-[var(--color-cyan)] via-[var(--color-cyan-light)] to-[var(--color-cyan)]",
    indexBadge:
      "border-[var(--color-cyan)]/30 bg-[var(--color-cyan)]/10 text-[var(--color-cyan-deep)] dark:text-[var(--color-cyan)]",
    hoverBorder: "hover:border-[var(--color-cyan)]/50",
    dot: "bg-[var(--color-cyan)]",
    btnClass: "hum-btn hum-btn--cyan",
  },
  {
    name: "pear",
    topGradient:
      "from-[var(--color-pear)] via-[var(--color-pear-light)] to-[var(--color-pear)]",
    indexBadge:
      "border-[var(--color-pear)]/30 bg-[var(--color-pear)]/10 text-[var(--color-pear-deep)] dark:text-[var(--color-pear)]",
    hoverBorder: "hover:border-[var(--color-pear)]/50",
    dot: "bg-[var(--color-pear)]",
    btnClass: "hum-btn",
  },
  {
    name: "mint",
    topGradient:
      "from-[var(--color-mint)] via-[var(--color-mint-light)] to-[var(--color-mint)]",
    indexBadge:
      "border-[var(--color-mint)]/30 bg-[var(--color-mint)]/10 text-[var(--color-mint)]",
    hoverBorder: "hover:border-[var(--color-mint)]/50",
    dot: "bg-[var(--color-mint)]",
    btnClass: "hum-btn hum-btn--mint",
  },
  {
    name: "coral",
    topGradient:
      "from-[var(--color-coral)] via-[var(--color-coral-light)] to-[var(--color-coral)]",
    indexBadge:
      "border-[var(--color-coral)]/30 bg-[var(--color-coral)]/10 text-[var(--color-coral-deep)] dark:text-[var(--color-coral)]",
    hoverBorder: "hover:border-[var(--color-coral)]/50",
    dot: "bg-[var(--color-coral)]",
    btnClass: "hum-btn hum-btn--coral",
  },
  {
    name: "lavender",
    topGradient:
      "from-[var(--color-lavender)] via-[var(--color-lavender-light)] to-[var(--color-lavender)]",
    indexBadge:
      "border-[var(--color-lavender)]/30 bg-[var(--color-lavender)]/10 text-[var(--color-lavender)]",
    hoverBorder: "hover:border-[var(--color-lavender)]/50",
    dot: "bg-[var(--color-lavender)]",
    btnClass: "hum-btn hum-btn--lav",
  },
]

// Hum Multi-Accent Tech Tag Badges
const TECH_TAG_STYLES: Record<string, string> = {
  "Next.js": "border-border bg-secondary/80 text-foreground",
  TypeScript:
    "border-[var(--color-cyan)]/25 bg-[var(--color-cyan)]/10 text-[var(--color-cyan-deep)] dark:text-[var(--color-cyan)]",
  Prisma:
    "border-[var(--color-lavender)]/25 bg-[var(--color-lavender)]/10 text-[var(--color-lavender)]",
  Stripe:
    "border-[var(--color-lavender)]/25 bg-[var(--color-lavender)]/10 text-[var(--color-lavender)]",
  "OpenAI API":
    "border-[var(--color-mint)]/25 bg-[var(--color-mint)]/10 text-[var(--color-mint)]",
  Tailwind:
    "border-[var(--color-cyan)]/25 bg-[var(--color-cyan)]/10 text-[var(--color-cyan-deep)] dark:text-[var(--color-cyan)]",
  PostgreSQL:
    "border-[var(--color-cyan)]/25 bg-[var(--color-cyan)]/10 text-[var(--color-cyan-deep)] dark:text-[var(--color-cyan)]",
  "Framer Motion":
    "border-[var(--color-coral)]/25 bg-[var(--color-coral)]/10 text-[var(--color-coral-deep)] dark:text-[var(--color-coral)]",
  Docker:
    "border-[var(--color-cyan)]/25 bg-[var(--color-cyan)]/10 text-[var(--color-cyan-deep)] dark:text-[var(--color-cyan)]",
}

const FALLBACK_TAG_STYLES = [
  "border-[var(--color-pear)]/25 bg-[var(--color-pear)]/10 text-[var(--color-pear-deep)] dark:text-[var(--color-pear)]",
  "border-[var(--color-cyan)]/25 bg-[var(--color-cyan)]/10 text-[var(--color-cyan-deep)] dark:text-[var(--color-cyan)]",
  "border-[var(--color-mint)]/25 bg-[var(--color-mint)]/10 text-[var(--color-mint)]",
  "border-[var(--color-coral)]/25 bg-[var(--color-coral)]/10 text-[var(--color-coral-deep)] dark:text-[var(--color-coral)]",
  "border-[var(--color-lavender)]/25 bg-[var(--color-lavender)]/10 text-[var(--color-lavender)]",
]

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length]
  const formattedIndex = String(index + 1).padStart(2, "0")

  return (
    <div
      data-cursor="cover"
      className={`hum-card group relative flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card p-3.5 text-card-foreground shadow-xs transition-all duration-300 ${accent.hoverBorder} xs:p-4 sm:p-5 md:p-6 lg:p-7`}
    >
      {/* Top Accent Color Highlight Ribbon */}
      <div
        className={`absolute inset-x-0 top-0 h-1.5 rounded-t-2xl bg-gradient-to-r ${accent.topGradient} opacity-90 transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div className="relative pt-1.5">
        {/* Card Header Micro-meta (Index + Category Tag) */}
        <div className="mb-2.5 flex items-center justify-between sm:mb-3">
          <div
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-widest uppercase sm:gap-1.5 sm:px-3 sm:text-xs ${accent.indexBadge}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2 ${accent.dot}`}
            />
            <span>#{formattedIndex}</span>
          </div>

          <div className="flex items-center gap-1 font-mono text-[10px] font-medium tracking-wider text-muted-foreground/80 uppercase sm:gap-1.5 sm:text-xs">
            <Sparkles className="h-3 w-3 text-muted-foreground/60 sm:h-3.5 sm:w-3.5" />
            <span>FEATURED</span>
          </div>
        </div>

        {/* Optional Responsive Image Preview Container */}
        {project.image && (
          <div className="relative mb-3 h-36 w-full overflow-hidden rounded-xl border border-border/60 bg-muted/30 xs:h-40 sm:h-48 md:h-52">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        {/* Title and Description */}
        <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
          <h3 className="text-sm font-bold tracking-tight text-foreground sm:text-base md:text-lg">
            {project.title}
          </h3>

          <p className="line-clamp-2 text-xs leading-relaxed font-normal text-muted-foreground sm:text-sm">
            {project.description}
          </p>
        </div>

        {/* Hallmark Multi-Accent Tech Badges */}
        <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
          {project.tech.slice(0, 4).map((tech, idx) => {
            const tagStyle =
              TECH_TAG_STYLES[tech] ||
              FALLBACK_TAG_STYLES[idx % FALLBACK_TAG_STYLES.length]

            return (
              <Badge
                key={idx}
                variant="secondary"
                className={`rounded-md border px-2 py-0.5 font-mono text-[9px] font-medium tracking-wide transition-all duration-200 hover:scale-105 sm:text-xs ${tagStyle}`}
              >
                {tech}
              </Badge>
            )
          })}
          {project.tech.length > 4 && (
            <span className="self-center font-mono text-[9px] font-medium text-muted-foreground sm:text-xs">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Tactile Hum Action Push Buttons */}
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/80 pt-3 sm:mt-5 sm:gap-3 sm:pt-4">
        <a
          href={project.live || "https://github.com"}
          target="_blank"
          rel="noopener noreferrer"
          className={`${accent.btnClass} min-w-[100px] flex-1 !px-3 !py-2 !text-xs sm:!text-sm`}
        >
          <span>Live Demo</span>
          <ExternalLink className="hum-arrow h-3.5 w-3.5 shrink-0" />
        </a>

        <a
          href={project.github || "https://github.com"}
          target="_blank"
          rel="noopener noreferrer"
          className="hum-btn hum-btn--soft min-w-[100px] flex-1 !px-3 !py-2 !text-xs sm:!text-sm"
        >
          <GitPullRequestClosed className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <span>Source</span>
        </a>
      </div>
    </div>
  )
}

export default ProjectCard
