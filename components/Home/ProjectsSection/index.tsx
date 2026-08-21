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
      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            {/* Hallmark Hum Section Eyebrow with Cyan Indicator */}
            <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-3 py-1 text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase shadow-2xs backdrop-blur-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
              <span>03 ⁄ {t("eyebrow")}</span>
            </div>

            {/* Confident Headline with Hallmark Hum Multi-Accent Highlighting */}
            <h2
              data-cursor="text"
              className="text-3xl font-black tracking-tight text-foreground md:text-5xl"
            >
              {t("title1")}{" "}
              <span className="text-sky-600 dark:text-sky-400">
                {t("title2")}
              </span>{" "}
              <span className="text-muted-foreground font-normal">
                {t("title3")}
              </span>
            </h2>

            {/* Micro-description */}
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground md:text-sm font-normal">
              {t("description")}
            </p>
          </div>

          {/* Explore All Projects Tactile Pill with Spring Physics */}
          <div className="shrink-0">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full border border-border/90 bg-card/90 px-4 py-2 text-xs font-semibold tracking-wider text-foreground shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-500/40 hover:bg-card hover:shadow-md active:scale-95 md:text-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
              <span>Explore All Projects</span>
              <ArrowRight className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 3 Compact Hallmark Hum Project Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
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
