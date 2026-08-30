"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { ExperienceCard, type Experience } from "./ExperienceCard"
import { Briefcase, CheckCircle2, Users, Laptop } from "lucide-react"

// SVG Cookie-6 Stepper Node Component
function Cookie6Node({ index }: { index: number }) {
  return (
    <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center">
      {/* SVG Cookie-6 silhouette */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full drop-shadow-sm transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
      >
        <path
          d="M 50 6 C 58 6, 62 16, 71 13 C 80 10, 87 18, 91 27 C 95 36, 90 44, 94 53 C 98 62, 91 71, 84 77 C 77 83, 72 79, 64 86 C 56 93, 44 93, 36 86 C 28 79, 23 83, 16 77 C 9 71, 2 62, 6 53 C 10 44, 5 36, 9 27 C 13 18, 20 10, 29 13 C 38 16, 42 6, 50 6 Z"
          className="fill-[var(--md-sys-color-primary-container,#ede7f6)] dark:fill-[var(--md-sys-color-primary-container,#2a1e3b)] stroke-[var(--md-sys-color-primary,#8b6fbf)] stroke-[3]"
        />
      </svg>
      {/* Index or icon centered */}
      <span className="relative z-10 font-mono text-xs sm:text-sm font-bold text-[var(--md-sys-color-on-primary-container,#321657)] dark:text-[var(--md-sys-color-on-primary-container,#e1d5f2)]">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  )
}

export function ExperienceSection() {
  const t = useTranslations("Experience")
  const experiences = (t.raw("items") as Experience[]) || []

  return (
    <section
      id="experience"
      data-section="experience"
      className="relative w-full py-16 sm:py-20 md:py-28 text-[var(--md-sys-color-on-surface,var(--foreground))] transition-colors duration-500 overflow-hidden"
    >
      {/* Dynamic Lavender / Iris Section Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-20 h-96 w-96 rounded-full
          bg-[var(--md-sys-color-primary,#8b6fbf)]/10 blur-[100px] -z-10"
      />

      <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-10 lg:px-12 2xl:max-w-6xl">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="mb-2.5 sm:mb-3 flex items-center gap-2">
            <div
              className="inline-flex items-center gap-2 rounded-full
                border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/50
                bg-[var(--md-sys-color-surface-container-high,var(--secondary))]/70
                px-3 py-1 font-mono text-xs font-semibold tracking-wider
                text-[var(--md-sys-color-primary,#8b6fbf)] shadow-2xs"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--md-sys-color-primary,#8b6fbf)] animate-pulse" />
              <span className="uppercase">05 ⁄ {t("eyebrow")}</span>
            </div>
          </div>

          <h2
            data-cursor="text"
            className="text-2xl font-black tracking-tight text-[var(--md-sys-color-on-surface,var(--foreground))] min-[380px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {t("title1")}{" "}
            <span className="text-[var(--md-sys-color-primary,#8b6fbf)]">
              {t("title2")} {t("title3")}
            </span>
          </h2>

          <p className="mt-2 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed font-normal text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))]">
            {t("description")}
          </p>
        </div>

        {/* Work Experience Timeline with M3 Expressive Cookie-6 Stepper Node Badges */}
        <div className="relative pl-6 sm:pl-10 md:pl-12 border-l-2 border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/60 space-y-8 sm:space-y-10">
          {experiences.map((exp, idx) => (
            <div key={exp.role || idx} className="group relative">
              {/* Stepper Node Badge anchored on timeline border line */}
              <div className="absolute -left-[37px] sm:-left-[45px] md:-left-[49px] top-1.5 z-20">
                <Cookie6Node index={idx} />
              </div>

              {/* Tonal Card */}
              <div className="pl-4 sm:pl-6">
                <ExperienceCard experience={exp} index={idx} />
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Stat Footer Pills */}
        <div className="mt-10 sm:mt-14 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
          <div
            className="inline-flex items-center gap-2 rounded-full
              border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/40
              bg-[var(--md-sys-color-surface-container-low,var(--card))]
              px-3.5 py-1.5 font-mono text-xs font-medium text-[var(--md-sys-color-on-surface,var(--foreground))] shadow-2xs"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-[var(--md-sys-color-primary,#8b6fbf)]" />
            <span>{t("openToWork")}</span>
          </div>

          <div
            className="inline-flex items-center gap-2 rounded-full
              border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/40
              bg-[var(--md-sys-color-surface-container-low,var(--card))]
              px-3.5 py-1.5 font-mono text-xs font-medium text-[var(--md-sys-color-on-surface,var(--foreground))] shadow-2xs"
          >
            <Users className="h-3.5 w-3.5 text-[var(--md-sys-color-primary,#8b6fbf)]" />
            <span>{t("teamPlayer")}</span>
          </div>

          <div
            className="inline-flex items-center gap-2 rounded-full
              border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/40
              bg-[var(--md-sys-color-surface-container-low,var(--card))]
              px-3.5 py-1.5 font-mono text-xs font-medium text-[var(--md-sys-color-on-surface,var(--foreground))] shadow-2xs"
          >
            <Laptop className="h-3.5 w-3.5 text-[var(--md-sys-color-primary,#8b6fbf)]" />
            <span>{t("remoteFriendly")}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
