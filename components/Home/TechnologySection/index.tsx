"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { TECH_STACK_DATA } from "./techdata"

const CURATED_TECH_IDS = [
  "react",
  "nextjs",
  "typescript",
  "tailwind",
  "node",
  "python",
  "golang",
  "docker",
  "postgres",
  "redis",
  "aws",
  "linux",
]

export function TechnologySection() {
  const t = useTranslations("Technology")

  const curatedTechnologies = TECH_STACK_DATA.filter((tech) =>
    CURATED_TECH_IDS.includes(tech.id)
  )

  return (
    <section
      id="technology"
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground"
    >
      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-6">
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

          <p className="mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground md:text-sm font-normal">
            {t("description")}
          </p>
        </div>

        {/* 12 Curated Solid Tech Cards */}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 md:gap-4">
          {curatedTechnologies.map((tech) => (
            <div
              key={tech.id}
              className="group relative flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-3 text-foreground shadow-xs transition-all duration-200 hover:border-primary/40 hover:shadow-sm"
            >
              <div className="flex h-7 w-7 items-center justify-center text-foreground transition-transform duration-200 group-hover:scale-110 [&_svg]:h-5 [&_svg]:w-5">
                {tech.icon}
              </div>
              <span className="text-center text-xs font-semibold tracking-wide text-foreground">
                {tech.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechnologySection
