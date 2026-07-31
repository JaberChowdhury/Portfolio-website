"use client"

import { useEffect, useState, type CSSProperties } from "react"

import { useTranslations } from "next-intl"
import { ProjectCard, type Project } from "./ProjectCard"

// Projects array is now loaded dynamically from translations

export default function ProjectsSection() {
  const t = useTranslations("Projects")
  const projects = t.raw("items") as Project[]
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="projects" className="relative w-full">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Section head */}
        <header className="head-hang">
          <div className="head-hang__eyebrow">
            <span className="mono-label">02 · {t("eyebrow")}</span>
          </div>
          <h2 className="head-hang__title text-ink">
            {t("title1")}
            <span className="hl">{t("title2")}</span>
            <br />
            {t("title3")}
          </h2>
          <p className="head-hang__body font-serif text-lg">{t("description")}</p>
        </header>

        {/* Projects Grid */}
        <div className="grid gap-6 pb-28 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`reveal h-full${mounted ? " is-visible" : ""}`}
              style={{ "--reveal-delay": `${index * 0.08}s` } as CSSProperties}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
