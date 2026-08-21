"use client"

import { useTranslations } from "next-intl"
import { ProjectCard, type Project } from "./ProjectCard"
import { Link } from "@/i18n/routing"
import { ArrowRight } from "lucide-react"

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
        <div className="mb-6 flex flex-col justify-between gap-2 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
              {t("eyebrow")}
            </p>

            <h2
              data-cursor="text"
              className="text-3xl font-bold tracking-tight text-foreground md:text-5xl"
            >
              {t("title1")}{" "}
              <span className="text-primary">
                {t("title2")}
              </span>
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-foreground md:text-sm"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Projects Grid (3 compact cards) */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          {projects.map((project, i) => (
            <div key={i}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
