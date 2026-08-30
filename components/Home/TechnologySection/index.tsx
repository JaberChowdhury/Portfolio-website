"use client"

import React, { useState, useMemo } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Sparkles } from "lucide-react"
import {
  TECH_STACK_DATA,
  TECH_CATEGORIES,
  type TechCategoryName,
  type TechItem,
} from "./techdata"

// Expressive chip corner silhouettes
const CHIP_SHAPES: Record<string, string> = {
  all: "rounded-full", // Pill
  frontend: "rounded-t-full rounded-b-md", // Semicircle / Arch
  languages: "rounded-2xl", // Clover / Squircle
  backend: "rounded-b-full rounded-t-md", // Semicircle inverted
  devops: "rounded-full", // Pill
  tools: "rounded-2xl", // Clover / Squircle
}

export function TechnologySection() {
  const t = useTranslations("Technology")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Filter items based on selected category
  const filteredTechnologies = useMemo(() => {
    if (selectedCategory === "all") {
      return TECH_STACK_DATA
    }
    return TECH_STACK_DATA.filter((tech) => tech.category === selectedCategory)
  }, [selectedCategory])

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: TECH_STACK_DATA.length }
    TECH_STACK_DATA.forEach((tech) => {
      counts[tech.category] = (counts[tech.category] || 0) + 1
    })
    return counts
  }, [])

  return (
    <section
      id="skills"
      data-section="skills"
      className="relative w-full py-16 sm:py-20 md:py-28 text-[var(--md-sys-color-on-surface,var(--foreground))] transition-colors duration-500 overflow-hidden"
    >
      {/* Dynamic Emerald / Mint Section Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-20 h-96 w-96 rounded-full
          bg-[var(--md-sys-color-primary,#10b981)]/10 blur-[100px] -z-10"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12 2xl:max-w-[1440px]">
        {/* Top Header & Eyebrow */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <div className="mb-2.5 sm:mb-3 flex items-center justify-between gap-2">
            <div
              className="inline-flex items-center gap-2 rounded-full
                border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/50
                bg-[var(--md-sys-color-surface-container-high,var(--secondary))]/70
                px-3 py-1 font-mono text-xs font-semibold tracking-wider
                text-[var(--md-sys-color-primary,#10b981)] shadow-2xs"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--md-sys-color-primary,#10b981)] animate-pulse" />
              <span className="uppercase">02 ⁄ {t("eyebrow")}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))]">
              <span className="font-bold text-[var(--md-sys-color-on-surface,var(--foreground))]">
                {filteredTechnologies.length}
              </span>
              <span>/</span>
              <span>{TECH_STACK_DATA.length} Tools</span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
            <div>
              <h2
                data-cursor="text"
                className="text-2xl font-black tracking-tight text-[var(--md-sys-color-on-surface,var(--foreground))] min-[380px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              >
                {t("title1")}{" "}
                <span className="text-[var(--md-sys-color-primary,#10b981)]">{t("title2")}</span>
              </h2>
              <p className="mt-2 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed font-normal text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))]">
                {t("description")}
              </p>
            </div>
          </div>
        </div>

        {/* Category Filter Chips Bar (M3 Expressive: Pill, Semicircle, Clover shapes) */}
        <div className="mb-8 flex flex-wrap items-center gap-2 sm:gap-2.5">
          {TECH_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id
            const shapeClass = CHIP_SHAPES[cat.id] || "rounded-full"
            const count = categoryCounts[cat.id] ?? 0

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative inline-flex items-center gap-2 h-9 px-3.5 sm:px-4 text-xs sm:text-sm font-medium tracking-wide
                  transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] select-none cursor-pointer
                  focus-visible:outline-2 focus-visible:outline-[var(--md-sys-color-primary,#10b981)] focus-visible:outline-offset-2
                  ${shapeClass}
                  ${
                    isSelected
                      ? "bg-[var(--md-sys-color-secondary-container,#d1fae5)] dark:bg-[var(--md-sys-color-secondary-container,#064e3b)] text-[var(--md-sys-color-on-secondary-container,#065f46)] dark:text-[var(--md-sys-color-on-secondary-container,#a7f3d0)] font-semibold shadow-xs border border-transparent scale-[1.02]"
                      : "bg-[var(--md-sys-color-surface-container-low,var(--card))] text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))] border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/50 hover:border-[var(--md-sys-color-primary,#10b981)]/40 hover:bg-[var(--md-sys-color-surface-container,var(--card))]"
                  }`}
              >
                {/* State Layer */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none rounded-[inherit] bg-current opacity-0 transition-opacity duration-200 hover:opacity-[0.08] active:opacity-[0.12]"
                />

                {/* Animated check icon for selected chip */}
                <AnimatePresence initial={false} mode="wait">
                  {isSelected && (
                    <motion.span
                      key="selected-check"
                      initial={{ scale: 0, opacity: 0, width: 0 }}
                      animate={{ scale: 1, opacity: 1, width: "auto" }}
                      exit={{ scale: 0, opacity: 0, width: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="inline-flex shrink-0 items-center justify-center overflow-hidden"
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </motion.span>
                  )}
                </AnimatePresence>

                <span>{cat.label}</span>
                <span
                  className={`text-[10px] sm:text-xs font-mono font-normal opacity-70 ${
                    isSelected ? "text-current" : "text-muted-foreground"
                  }`}
                >
                  ({count})
                </span>
              </button>
            )
          })}
        </div>

        {/* Tech Items Grid — inside M3 Surface Containers (surface-container-low) with subtle spring hover lift */}
        <motion.div
          layout
          className="grid grid-cols-2 min-[420px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredTechnologies.map((tech: TechItem) => {
              return (
                <motion.div
                  layout
                  key={tech.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 28,
                  }}
                  data-cursor="cover"
                  className="group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl
                    border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.12))]/40
                    bg-[var(--md-sys-color-surface-container-low,var(--card))]
                    text-[var(--md-sys-color-on-surface,var(--foreground))]
                    shadow-2xs cursor-pointer select-none
                    transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]
                    hover:-translate-y-1.5 hover:shadow-lg
                    hover:border-[var(--md-sys-color-primary,#10b981)]/50
                    hover:bg-[var(--md-sys-color-surface-container,var(--card))]"
                >
                  {/* Expressive M3 Icon Container (Squircle silhouette) */}
                  <div
                    className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-[18px]
                      border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/30
                      bg-[var(--md-sys-color-surface-container-high,var(--secondary))]/80
                      transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]
                      group-hover:scale-110 group-hover:rounded-full group-hover:border-[var(--md-sys-color-primary,#10b981)]/40
                      [&_svg]:h-6 [&_svg]:w-6 sm:[&_svg]:h-7 sm:[&_svg]:w-7"
                    style={{ color: tech.brandColor }}
                  >
                    {tech.icon}
                  </div>

                  {/* Label */}
                  <p className="mt-3 max-w-full truncate text-xs sm:text-sm font-bold text-[var(--md-sys-color-on-surface,var(--foreground))] group-hover:text-[var(--md-sys-color-primary,#10b981)] transition-colors">
                    {tech.label}
                  </p>

                  {/* Category Sublabel */}
                  <span className="mt-0.5 max-w-full truncate font-mono text-[9px] sm:text-[10px] font-medium text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))]">
                    {tech.categoryLabel}
                  </span>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default TechnologySection
