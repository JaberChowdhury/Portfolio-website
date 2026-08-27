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
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12 2xl:max-w-[1440px]">
        {/* Section Header */}
        <div className="mb-4 flex flex-col justify-between gap-3 sm:mb-7 sm:flex-row sm:items-end">
          <div>
            {/* Hallmark Hum Section Eyebrow with Cyan Indicator */}
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-3 py-1 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase shadow-2xs sm:mb-2.5 sm:px-3.5 sm:py-1.5 sm:text-sm sm:tracking-[0.25em]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-sky-500" />
              <span>03 ⁄ {t("eyebrow")}</span>
            </div>

            {/* Confident Headline with Hallmark Hum Multi-Accent Highlighting */}
            <h2
              data-cursor="text"
              className="text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
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
            <p className="mt-1.5 max-w-2xl text-xs leading-relaxed font-normal text-muted-foreground sm:mt-2 sm:text-sm md:text-base">
              {t("description")}
            </p>
          </div>

          {/* Explore All Projects Tactile Pill with Spring Physics */}
          <div className="shrink-0">
            <a
              href="https://github.com/JaberChowdhury"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-border/90 bg-card px-4 py-2 text-xs font-semibold tracking-wider text-foreground shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-500/40 hover:bg-card active:scale-95 sm:px-5 sm:py-2.5 sm:text-sm md:text-base"
            >
              <Sparkles className="h-3.5 w-3.5 text-sky-600 sm:h-4 sm:w-4 dark:text-sky-400" />
              <span>Explore All Projects</span>
              <ArrowRight className="h-3.5 w-3.5 text-sky-600 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4 dark:text-sky-400" />
            </a>
          </div>
        </div>

        {/* 3 Compact Hallmark Hum Project Cards Grid */}
        <div className="grid gap-3.5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
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
