"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { ProjectCard, type Project } from "./ProjectCard"
import { Link } from "@/i18n/routing"
import { ArrowRight, Sparkles } from "lucide-react"

export function ProjectsSection() {
  const t = useTranslations("Projects")
  const projects = (t.raw("items") as Project[]).slice(0, 3)

  return (
    <section
      id="projects"
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground"
    >
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-3.5 flex flex-col justify-between gap-2.5 sm:mb-6 sm:flex-row sm:items-end">
          <div>
            {/* Hallmark Hum Section Eyebrow with Cyan Indicator */}
            <div className="mb-1.5 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-2.5 py-0.5 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase shadow-2xs sm:mb-2.5 sm:px-3 sm:py-1 sm:tracking-[0.25em]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-500" />
              <span>03 ⁄ {t("eyebrow")}</span>
            </div>

            {/* Confident Headline with Hallmark Hum Multi-Accent Highlighting */}
            <h2
              data-cursor="text"
              className="text-2xl font-black tracking-tight text-foreground sm:text-3xl md:text-5xl"
            >
              {t("title1")}{" "}
              <span className="text-sky-600 dark:text-sky-400">
                {t("title2")}
              </span>{" "}
              <span className="font-normal text-muted-foreground">
                {t("title3")}
              </span>
            </h2>

            {/* Micro-description */}
            <p className="mt-1 max-w-xl text-xs leading-relaxed font-normal text-muted-foreground sm:mt-2 sm:text-sm">
              {t("description")}
            </p>
          </div>

          {/* Explore All Projects Tactile Pill with Spring Physics */}
          <div className="shrink-0">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 rounded-full border border-border/90 bg-card px-3.5 py-1.5 text-[11px] font-semibold tracking-wider text-foreground shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-500/40 hover:bg-card active:scale-95 sm:gap-2 sm:px-4 sm:py-2 sm:text-xs md:text-sm"
            >
              <Sparkles className="h-3 w-3 text-sky-600 sm:h-3.5 sm:w-3.5 dark:text-sky-400" />
              <span>Explore All Projects</span>
              <ArrowRight className="h-3 w-3 text-sky-600 transition-transform duration-300 group-hover:translate-x-1 sm:h-3.5 sm:w-3.5 dark:text-sky-400" />
            </Link>
          </div>
        </div>

        {/* 3 Compact Hallmark Hum Project Cards Grid */}
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          {projects.map((project, index) => (
            <div key={index} className="h-full">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
