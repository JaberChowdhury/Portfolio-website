"use client"

import React, { useState } from "react"
import { Code2, Brain, Target, GraduationCap } from "lucide-react"
import { useTranslations } from "next-intl"
import { AnimatePresence, motion } from "framer-motion"
import { HighlightCard, type Highlight } from "./HighlightCard"
import { EducationCard, type EducationCardProps } from "./EducationCard"

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
      data-section="education"
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)] transition-colors duration-300"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-10 md:py-8 lg:px-12 2xl:max-w-[1440px]">
        {/* Section Header */}
        <div className="mb-4 sm:mb-6">
          {/* M3 Expressive Pill Badge with Lavender Accent Indicator */}
          <div className="mb-2 flex items-center justify-between gap-2 sm:mb-2.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-high)] px-3 py-1 font-mono text-xs font-semibold tracking-wider text-[var(--md-sys-color-on-surface-variant)] uppercase shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[var(--md-sys-color-primary)]" />
              <span>06 ⁄ {t("eyebrow")}</span>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-high)] px-2.5 py-0.5 font-mono text-[10px] font-medium text-[var(--md-sys-color-on-surface-variant)] md:hidden">
              <span className="animate-pulse">←</span>
              <span>Swipe Focus</span>
              <span className="animate-pulse">→</span>
            </div>
          </div>

          <h2
            data-cursor="text"
            className="text-2xl font-black tracking-tight text-[var(--md-sys-color-on-surface)] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
          >
            {t("title1")}{" "}
            <span className="text-[var(--md-sys-color-primary)]">
              {t("title2")} {t("title3")}
            </span>
          </h2>

          <p className="mt-1 max-w-2xl text-xs leading-relaxed font-normal text-[var(--md-sys-color-on-surface-variant)] sm:mt-2 sm:text-sm md:text-base">
            {t("description")}
          </p>
        </div>

        {/* 2-Column Academic Layout: Arch & Asymmetric Corner Containers */}
        <div className="grid gap-4 sm:gap-5 md:grid-cols-12 md:gap-6">
          {/* Main Degree Card (Left 7 Cols on desktop): Arch / Asymmetric Corner Card */}
          {primaryEdu && (
            <div className="md:col-span-7">
              <EducationCard
                title={primaryEdu.title}
                subtitle={primaryEdu.subtitle}
                description={primaryEdu.description}
                subjects={primaryEdu.subjects}
                progress={primaryEdu.progress}
                icon={GraduationCap}
                asymmetric={true}
              />
            </div>
          )}

          {/* Academic Focus Highlights: Desktop Column (Right 5 Cols) */}
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
                      ? "w-6 bg-[var(--md-sys-color-primary)]"
                      : "w-1.5 bg-[var(--md-sys-color-outline-variant)]"
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
