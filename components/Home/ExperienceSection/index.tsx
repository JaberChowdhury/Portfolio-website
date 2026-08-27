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
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12 2xl:max-w-[1440px]">
        {/* Section Header */}
        <div className="mb-4 sm:mb-7">
          <div className="mb-2 flex items-center gap-2 sm:mb-2.5">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase sm:text-sm sm:tracking-[0.25em]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              05 ⁄ {t("eyebrow")}
            </span>
          </div>

          <h2
            data-cursor="text"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {t("title1")}{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              {t("title2")} {t("title3")}
            </span>
          </h2>

          <p className="mt-1.5 max-w-2xl text-xs leading-relaxed font-normal text-muted-foreground sm:mt-2 sm:text-sm md:text-base">
            {t("description")}
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid gap-3.5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
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
