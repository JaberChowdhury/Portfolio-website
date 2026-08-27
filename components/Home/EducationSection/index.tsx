"use client"

import React, { useState } from "react"
import { Code2, Brain, Target, GraduationCap } from "lucide-react"
import { useTranslations } from "next-intl"
import { AnimatePresence, motion } from "framer-motion"
import { HighlightCard, type Highlight } from "./HighlightCard"
import { type EducationCardProps } from "./EducationCard"

export function EducationSection() {
  const t = useTranslations("Education")
  const [highlightIdx, setHighlightIdx] = useState(0)
  const [highlightDirection, setHighlightDirection] = useState(0)

  const rawHighlights = t.raw("highlights") as Highlight[]
  const highlightIcons = [Code2, Brain, Target]
  const highlights = rawHighlights.map((h, i) => ({
    ...h,
    icon: highlightIcons[i % highlightIcons.length],
  }))

  const handleHighlightNext = () => {
    setHighlightDirection(1)
    setHighlightIdx((prev) => (prev + 1) % 3)
  }

  const handleHighlightPrev = () => {
    setHighlightDirection(-1)
    setHighlightIdx((prev) => (prev === 0 ? 2 : prev - 1))
  }

  const rawHistory = t.raw("history") as EducationCardProps[]
  const primaryEdu = rawHistory[0]

  return (
    <section
      id="education"
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12 2xl:max-w-[1440px]">
        {/* Section Header */}
        <div className="mb-4 sm:mb-7">
          {/* Hum Eyebrow with Lavender Dot & Mobile Swipe Indicator */}
          <div className="mb-1.5 flex items-center justify-between gap-2 sm:mb-2.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-3 py-1 text-xs shadow-2xs transition-all duration-300 hover:border-lavender-accent/40">
              <span className="hum-dot hum-dot--lavender" />
              <span className="hum-eyebrow">06 ⁄ {t("eyebrow")}</span>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-border/60 bg-card/60 px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground md:hidden">
              <span className="animate-pulse">←</span>
              <span>Swipe Focus</span>
              <span className="animate-pulse">→</span>
            </div>
          </div>

          <h2
            data-cursor="text"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {t("title1")}{" "}
            <span className="hl-mint">
              {t("title2")} {t("title3")}
            </span>
          </h2>

          <p className="mt-1.5 max-w-2xl text-xs leading-relaxed font-normal text-muted-foreground sm:mt-2 sm:text-sm md:text-base">
            {t("description")}
          </p>
        </div>

        {/* 2-Column Academic Layout */}
        <div className="grid gap-3.5 sm:gap-5 md:grid-cols-12 md:gap-6">
          {/* Main Degree Card (Left Column) */}
          {primaryEdu && (
            <div className="md:col-span-7">
              <div className="hum-card group flex h-full flex-col justify-between rounded-2xl border border-border/80 p-4 transition-all duration-300 hover:border-lavender-accent/40 sm:p-6 md:p-7">
                <div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-lavender-accent/20 bg-lavender-accent/10 text-lavender-accent transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12 md:h-14 md:w-14">
                      <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold break-words text-card-foreground sm:text-xl md:text-2xl">
                        {primaryEdu.title}
                      </h3>
                      <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground sm:mt-1 sm:gap-2 sm:text-sm md:text-base">
                        <span className="hum-dot hum-dot--lavender shrink-0" />
                        <span className="break-words">
                          {primaryEdu.subtitle}
                        </span>
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm md:text-base">
                    {primaryEdu.description}
                  </p>

                  {/* Academic Milestones Micro Grid */}
                  {primaryEdu.progress && primaryEdu.progress.length > 0 && (
                    <div className="mt-3.5 grid grid-cols-2 gap-2 sm:mt-5 sm:grid-cols-4 sm:gap-3">
                      {primaryEdu.progress.map((item, i) => {
                        const bandClass =
                          i % 4 === 0
                            ? "hum-band-pear"
                            : i % 4 === 1
                              ? "hum-band-cyan"
                              : i % 4 === 2
                                ? "hum-band-coral"
                                : "hum-band-mint"
                        return (
                          <div
                            key={item.label}
                            className={`flex flex-col justify-center rounded-xl border border-border/40 p-2.5 sm:rounded-2xl sm:p-3 ${bandClass}`}
                          >
                            <div className="font-mono text-xs font-bold break-words text-card-foreground sm:text-sm md:text-base">
                              {item.value}
                            </div>
                            <p className="mt-0.5 font-mono text-[10px] break-words text-muted-foreground sm:text-xs">
                              {item.label}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div className="mt-4 hidden border-t border-border/70 pt-3.5 sm:mt-5 sm:block sm:pt-4">
                  <div className="mono-label mb-2 text-[10px] sm:mb-2.5 sm:text-xs">
                    Core Coursework
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {primaryEdu.subjects.map((sub) => (
                      <span
                        key={sub}
                        className="inline-flex items-center rounded-full border border-lavender-accent/20 bg-lavender-accent/8 px-2.5 py-0.5 font-mono text-[11px] font-medium text-lavender-accent transition-all duration-200 hover:scale-105 hover:bg-lavender-accent/15 sm:px-3 sm:py-1 sm:text-xs"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Academic Focus Highlights: Desktop Column */}
          <div className="hidden md:col-span-5 md:flex md:flex-col md:justify-between md:gap-3.5">
            {highlights.slice(0, 3).map((h, i) => (
              <div key={i} className="h-full">
                <HighlightCard highlight={h} index={i} />
              </div>
            ))}
          </div>

          {/* Academic Focus Highlights: Mobile Framer Motion Swipe Slider */}
          <div className="md:hidden">
            <div className="relative overflow-hidden py-1">
              <AnimatePresence mode="wait" custom={highlightDirection}>
                <motion.div
                  key={highlightIdx}
                  custom={highlightDirection}
                  variants={{
                    enter: (dir: number) => ({
                      x: dir > 0 ? 40 : -40,
                      opacity: 0,
                      scale: 0.97,
                    }),
                    center: {
                      x: 0,
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.28, ease: "easeOut" },
                    },
                    exit: (dir: number) => ({
                      x: dir > 0 ? -40 : 40,
                      opacity: 0,
                      scale: 0.97,
                      transition: { duration: 0.2, ease: "easeIn" },
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(_e, info) => {
                    if (info.offset.x < -35 || info.velocity.x < -250) {
                      handleHighlightNext()
                    } else if (info.offset.x > 35 || info.velocity.x > 250) {
                      handleHighlightPrev()
                    }
                  }}
                  className="w-full cursor-grab touch-pan-y active:cursor-grabbing"
                >
                  <HighlightCard
                    highlight={highlights[highlightIdx]}
                    index={highlightIdx}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots Indicator */}
            <div className="mt-2 flex items-center justify-center gap-1.5">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setHighlightDirection(idx > highlightIdx ? 1 : -1)
                    setHighlightIdx(idx)
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === highlightIdx
                      ? "w-6 bg-[var(--color-lavender)]"
                      : "w-1.5 bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to highlight ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EducationSection
