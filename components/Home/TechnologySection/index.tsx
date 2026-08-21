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
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-6 md:px-12">
        {/* Top Header & Eyebrow */}
        <div className="mb-4 sm:mb-6">
          {/* Hallmark Eyebrow with Pear Amber Dot */}
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-3 py-1 text-xs shadow-2xs backdrop-blur-xs transition-all duration-300 hover:border-amber-500/40">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="font-mono text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">
              02 ⁄ {t("eyebrow")}
            </span>
          </div>

          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
            <div>
              <h2
                data-cursor="text"
                className="marlin-font text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl"
              >
                {t("title1")}{" "}
                <span className="text-amber-600 dark:text-amber-400">
                  {t("title2")}
                </span>
              </h2>
              <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-muted-foreground sm:text-sm font-normal">
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

        {/* Hallmark Hum Category Filter Tabs */}
        <div className="mb-4 flex flex-wrap items-center gap-1.5 sm:gap-2">
          {TECH_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide transition-all duration-200 active:scale-[0.97] cursor-pointer ${
                  isActive
                    ? "bg-foreground text-background shadow-xs font-semibold"
                    : "border border-border/80 bg-card/60 text-muted-foreground hover:bg-card hover:text-foreground hover:border-border"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${cat.dotColor}`} />
                <span>{cat.label}</span>
                {cat.id !== "all" && (
                  <span
                    className={`font-mono text-[10px] ${
                      isActive ? "text-background/70" : "text-muted-foreground/60"
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
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-6 md:gap-3.5">
          {displayedTechnologies.map((tech: TechItem) => (
            <div
              key={tech.id}
              className={`group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-3 sm:p-3.5 text-card-foreground shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xs active:scale-[0.98] ${tech.accentBorder}`}
            >
              {/* Card Top: Category Dot & Tag */}
              <div className="flex items-center justify-between">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${tech.accentDot}`}
                />
                <span className="font-mono text-[9px] font-semibold tracking-wider text-muted-foreground/80 uppercase">
                  {tech.tag}
                </span>
              </div>

              {/* Card Center: Icon & Name */}
              <div className="my-2 flex flex-col items-center justify-center text-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${tech.bg} ${tech.text} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-2xs`}
                >
                  {tech.icon}
                </div>
                <span className="mt-2 text-xs font-bold tracking-tight text-foreground sm:text-sm line-clamp-1">
                  {tech.label}
                </span>
              </div>

              {/* Card Bottom: Micro Category Subtitle */}
              <div className="border-t border-border/50 pt-1.5 text-center">
                <span className="font-mono text-[10px] text-muted-foreground line-clamp-1">
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

