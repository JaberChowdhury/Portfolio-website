"use client"

import { useTranslations } from "next-intl"
import { ExperienceCard, type Experience } from "./ExperienceCard"

export function ExperienceSection() {
  const t = useTranslations("Experience")
  const experiences = (t.raw("items") as Experience[]).slice(0, 2)

  return (
    <section id="experience" className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground">
      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-[#2d6a4f] dark:text-[#52b788] uppercase">
            {t("eyebrow")}
          </p>

          <h2
            data-cursor="text"
            className="text-3xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            {t("title1")}{" "}
            <span className="text-[#2d6a4f] dark:text-[#52b788]">
              {t("title2")} {t("title3")}
            </span>
          </h2>

          <p className="mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground md:text-sm">
            {t("description")}
          </p>
        </div>

        {/* Experience Cards 2-Column Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:gap-5">
          {experiences.map((experience, index) => (
            <div key={index} className="h-full">
              <ExperienceCard experience={experience} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
