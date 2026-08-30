"use client"

import React from "react"
import { Calendar, Briefcase, GitPullRequest, Award, LucideIcon } from "lucide-react"

export interface Experience {
  role: string
  company: string
  period: string
  description: string
  tech: string[]
}

interface ExperienceCardProps {
  experience: Experience
  index?: number
}

const ICONS: LucideIcon[] = [Briefcase, GitPullRequest, Award]

export function ExperienceCard({ experience, index = 0 }: ExperienceCardProps) {
  const IconComponent = ICONS[index % ICONS.length]

  return (
    <article
      data-cursor="cover"
      className="group relative flex flex-col justify-between overflow-hidden
        rounded-tl-3xl rounded-tr-xl rounded-bl-xl rounded-br-3xl
        border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.12))]/40
        bg-[var(--md-sys-color-surface-container-low,var(--card))]
        p-5 sm:p-6 md:p-7 text-[var(--md-sys-color-on-surface,var(--foreground))]
        shadow-xs transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]
        hover:-translate-y-1 hover:shadow-lg
        hover:border-[var(--md-sys-color-primary,#8b6fbf)]/50
        hover:bg-[var(--md-sys-color-surface-container,var(--card))]"
    >
      <div>
        {/* Header: Role, Company & Period Pill */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            {/* Expressive squircle icon badge */}
            <div
              className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-[14px]
                border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/40
                bg-[var(--md-sys-color-primary-container,#ede7f6)] dark:bg-[var(--md-sys-color-primary-container,#2a1e3b)]
                text-[var(--md-sys-color-on-primary-container,#321657)] dark:text-[var(--md-sys-color-on-primary-container,#e1d5f2)]
                shadow-2xs transition-transform duration-300 group-hover:scale-105 group-hover:rounded-full"
            >
              <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--md-sys-color-on-surface,var(--foreground))]">
                {experience.role}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-[var(--md-sys-color-primary,#8b6fbf)]">
                {experience.company}
              </p>
            </div>
          </div>

          {/* M3 Tonal Period Pill */}
          <div
            className="inline-flex items-center gap-1.5 self-start rounded-full
              border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/40
              bg-[var(--md-sys-color-secondary-container,#f3eef8)] dark:bg-[var(--md-sys-color-secondary-container,#27232d)]
              px-3 py-1 font-mono text-[11px] sm:text-xs font-semibold
              text-[var(--md-sys-color-on-secondary-container,#241a31)] dark:text-[var(--md-sys-color-on-secondary-container,#e9e0f4)]"
          >
            <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 opacity-70" />
            <span>{experience.period}</span>
          </div>
        </div>

        {/* Content & Description */}
        <div className="mt-4">
          <p className="text-xs sm:text-sm leading-relaxed font-normal text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))]">
            {experience.description}
          </p>

          {/* Tonal Tech Pills */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {experience.tech.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full
                  border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.12))]/30
                  bg-[var(--md-sys-color-surface-container-high,var(--secondary))]/80
                  px-2.5 py-0.5 font-mono text-[10px] sm:text-[11px] font-medium
                  text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))]
                  transition-all duration-200 hover:scale-105"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export default ExperienceCard
