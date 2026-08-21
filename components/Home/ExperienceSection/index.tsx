"use client"

import { useTranslations } from "next-intl"
import { ExperienceCard, type Experience } from "./ExperienceCard"

export function ExperienceSection() {
  const t = useTranslations("Experience")
  const experiences = (t.raw("items") as Experience[]).slice(0, 3)

  return (
    <section
      id="experience"
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground"
    >
      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              05 ⁄ {t("eyebrow")}
            </span>
          </div>

          <h2
            data-cursor="text"
            className="text-3xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            {t("title1")}{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              {t("title2")} {t("title3")}
            </span>
          </h2>

          <p className="mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground md:text-sm font-normal">
            {t("description")}
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
          {experiences.map((experience, index) => (
            <div key={index} className="h-full">
              <ExperienceCard experience={experience} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
