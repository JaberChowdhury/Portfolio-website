"use client"

import React from "react"
import Image from "next/image"
import { ExternalLink, GitPullRequestClosed, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/m3/Button"

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

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const t = useTranslations("Projects")
  const formattedIndex = String(index + 1).padStart(2, "0")

  return (
    <article
      data-cursor="cover"
      className="group relative flex h-full flex-col justify-between overflow-hidden
        rounded-tl-3xl rounded-tr-[48px] rounded-bl-[48px] rounded-br-2xl
        border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/40
        bg-[var(--md-sys-color-surface-container-low,var(--card))]
        p-4 sm:p-6 md:p-7
        text-[var(--md-sys-color-on-surface,var(--foreground))]
        shadow-xs transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]
        hover:-translate-y-1.5 hover:shadow-xl hover:border-[var(--md-sys-color-primary,#2e8bc0)]/50
        hover:bg-[var(--md-sys-color-surface-container,var(--card))]"
    >
      {/* Decorative top asymmetric color accent indicator */}
      <div
        className="absolute top-0 right-0 h-16 w-16 -mr-8 -mt-8 rounded-full
          bg-[var(--md-sys-color-primary-container,#d0e4ff)]/40 blur-md
          pointer-events-none transition-transform duration-500 group-hover:scale-150"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col flex-1">
        {/* Card Header Micro-meta (Index + Category Tag) */}
        <div className="mb-3.5 flex items-center justify-between">
          <div
            className="inline-flex items-center gap-1.5 rounded-full
              border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.2))]/60
              bg-[var(--md-sys-color-surface-container-high,var(--secondary))]/80
              px-2.5 py-0.5 font-mono text-[11px] font-bold tracking-widest
              text-[var(--md-sys-color-primary,#2e8bc0)]"
          >
            <span
              className="h-2 w-2 rounded-full bg-[var(--md-sys-color-primary,#2e8bc0)] animate-pulse"
              aria-hidden="true"
            />
            <span>#{formattedIndex}</span>
          </div>

          <div
            className="inline-flex items-center gap-1.5 rounded-full
              border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.12))]/40
              bg-[var(--md-sys-color-surface-container-lowest,var(--background))]/60
              px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase
              text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))]"
          >
            <Sparkles className="h-3 w-3 text-[var(--md-sys-color-primary,#2e8bc0)]" />
            <span>FEATURED</span>
          </div>
        </div>

        {/* Optional Responsive Image Preview Container with asymmetric arch corners */}
        {project.image && (
          <div className="relative mb-4 h-40 w-full overflow-hidden rounded-t-[32px] rounded-b-xl border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/30 bg-muted/20 sm:h-48 md:h-52">
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
        <div className="space-y-2 flex-1">
          <h3 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-[var(--md-sys-color-on-surface,var(--foreground))]">
            {project.title}
          </h3>

          <p className="line-clamp-3 text-xs sm:text-sm leading-relaxed font-normal text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))]">
            {project.description}
          </p>
        </div>

        {/* Tonal Tech Pills */}
        <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((tech, idx) => (
            <span
              key={idx}
              className="inline-flex items-center rounded-full
                border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/40
                bg-[var(--md-sys-color-secondary-container,#f0eadc)] dark:bg-[var(--md-sys-color-secondary-container,#2c2921)]
                text-[var(--md-sys-color-on-secondary-container,#231b0e)] dark:text-[var(--md-sys-color-on-secondary-container,#f0eddf)]
                px-2.5 py-0.5 font-mono text-[10px] sm:text-[11px] font-medium tracking-wide
                transition-all duration-200 hover:scale-105 shadow-2xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* M3 Action Buttons (Tonal for Live Demo + Outlined for GitHub source) */}
      <div className="relative z-10 mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5 border-t border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/30 pt-3.5 sm:pt-4">
        <Button
          variant="tonal"
          size="sm"
          shape="full"
          href={project.live || "https://github.com"}
          target="_blank"
          rel="noopener noreferrer"
          trailingIcon={<ExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
          className="flex-1 min-w-[110px] font-medium !text-xs sm:!text-sm"
        >
          {t("liveDemo")}
        </Button>

        <Button
          variant="outlined"
          size="sm"
          shape="full"
          href={project.github || "https://github.com"}
          target="_blank"
          rel="noopener noreferrer"
          leadingIcon={<GitPullRequestClosed className="h-3.5 w-3.5 text-muted-foreground" />}
          className="flex-1 min-w-[110px] font-medium !text-xs sm:!text-sm"
        >
          {t("source")}
        </Button>
      </div>
    </article>
  )
}

export default ProjectCard
