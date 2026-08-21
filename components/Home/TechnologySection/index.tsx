"use client"

import React, { useState, useMemo } from "react"
import { useTranslations } from "next-intl"
import {
  TECH_STACK_DATA,
  TECH_CATEGORIES,
  type TechCategoryId,
  type TechItem,
} from "./techdata"

const CURATED_DEFAULT_IDS = [
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
  const [activeCategory, setActiveCategory] = useState<TechCategoryId>("all")

  // Filtered technologies based on selected category tab
  const displayedTechnologies = useMemo(() => {
    if (activeCategory === "all") {
      // Return 12 curated technologies for balanced visual layout
      return TECH_STACK_DATA.filter((tech) =>
        CURATED_DEFAULT_IDS.includes(tech.id)
      )
    }
    return TECH_STACK_DATA.filter((tech) => tech.category === activeCategory)
  }, [activeCategory])

  return (
    <section
      id="technology"
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-12">
        {/* Top Header & Eyebrow */}
        <div className="mb-3 sm:mb-6">
          {/* Hallmark Eyebrow with Pear Amber Dot */}
          <div className="mb-1.5 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-2.5 py-0.5 text-xs shadow-2xs transition-all duration-300 hover:border-amber-500/40 sm:mb-2 sm:px-3 sm:py-1">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase sm:text-xs sm:tracking-[0.25em]">
              02 ⁄ {t("eyebrow")}
            </span>
          </div>

          <div className="flex flex-col justify-between gap-1.5 md:flex-row md:items-end">
            <div>
              <h2
                data-cursor="text"
                className="marlin-font text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl"
              >
                {t("title1")}{" "}
                <span className="text-amber-600 dark:text-amber-400">
                  {t("title2")}
                </span>
              </h2>
              <p className="mt-1 max-w-xl text-xs leading-relaxed font-normal text-muted-foreground sm:text-sm">
                {t("description")}
              </p>
            </div>

            {/* Quick Category Summary Chip */}
            <div className="hidden items-center gap-1.5 rounded-full border border-border/60 bg-secondary/50 px-3 py-1 font-mono text-[11px] text-muted-foreground md:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>{TECH_STACK_DATA.length} Tools Ecosystem</span>
            </div>
          </div>
        </div>

        {/* Hallmark Hum Category Filter Tabs - horizontally scrollable on mobile */}
        <div className="mb-3 flex flex-nowrap items-center gap-1.5 overflow-x-auto pb-1 sm:mb-4 sm:flex-wrap sm:gap-2 sm:pb-0">
          {TECH_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide transition-all duration-200 active:scale-[0.97] sm:px-3 sm:py-1 sm:text-xs ${
                  isActive
                    ? "bg-foreground font-semibold text-background shadow-xs"
                    : "border border-border/80 bg-card/60 text-muted-foreground hover:border-border hover:bg-card hover:text-foreground"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${cat.dotColor}`} />
                <span>{cat.label}</span>
                {cat.id !== "all" && (
                  <span
                    className={`font-mono text-[9px] sm:text-[10px] ${
                      isActive
                        ? "text-background/70"
                        : "text-muted-foreground/60"
                    }`}
                  >
                    (
                    {
                      TECH_STACK_DATA.filter((i) => i.category === cat.id)
                        .length
                    }
                    )
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Multi-Accent Tactile Tech Cards Grid */}
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-6 md:gap-3.5">
          {displayedTechnologies.map((tech: TechItem) => (
            <div
              key={tech.id}
              className={`group relative flex flex-col justify-between rounded-xl border border-border/80 bg-card p-2 text-card-foreground shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xs active:scale-[0.98] sm:rounded-2xl sm:p-3 md:p-3.5 ${tech.accentBorder}`}
            >
              {/* Card Top: Category Dot & Tag */}
              <div className="flex items-center justify-between">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${tech.accentDot}`}
                />
                <span className="font-mono text-[8px] font-semibold tracking-wider text-muted-foreground/80 uppercase sm:text-[9px]">
                  {tech.tag}
                </span>
              </div>

              {/* Card Center: Icon & Name */}
              <div className="my-1.5 flex flex-col items-center justify-center text-center sm:my-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg sm:h-10 sm:w-10 sm:rounded-xl ${tech.bg} ${tech.text} shadow-2xs transition-transform duration-300 group-hover:scale-110 [&_svg]:h-4 [&_svg]:w-4 sm:[&_svg]:h-5 sm:[&_svg]:w-5`}
                >
                  {tech.icon}
                </div>
                <span className="mt-1.5 line-clamp-1 text-[11px] font-bold tracking-tight text-foreground sm:mt-2 sm:text-xs md:text-sm">
                  {tech.label}
                </span>
              </div>

              {/* Card Bottom: Micro Category Subtitle */}
              <div className="border-t border-border/50 pt-1 text-center">
                <span className="line-clamp-1 font-mono text-[9px] text-muted-foreground sm:text-[10px]">
                  {tech.categoryLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechnologySection
