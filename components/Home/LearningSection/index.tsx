"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import {
  Cpu,
  Database,
  ArrowUpRight,
  Sparkles,
  Terminal,
  Server,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { M3FacetedBadge, M3Progress } from "@/components/m3/M3Shapes"

export function LearningSection() {
  const t = useTranslations("Learning")
  const [mobileSlide, setMobileSlide] = useState(0)
  const [slideDirection, setSlideDirection] = useState(0)

  const rustTopics = t.raw("rust.topics") as string[]
  const postgresTopics = t.raw("postgres.topics") as string[]

  const handleMobileNext = () => {
    setSlideDirection(1)
    setMobileSlide((prev) => (prev === 0 ? 1 : 0))
  }

  const handleMobilePrev = () => {
    setSlideDirection(-1)
    setMobileSlide((prev) => (prev === 0 ? 1 : 0))
  }

  return (
    <section
      id="learning"
      data-section="learning"
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)] transition-colors duration-300"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-10 md:py-8 lg:px-12 2xl:max-w-[1440px]">
        {/* Section Header */}
        <div className="mb-3 sm:mb-6">
          {/* M3 Expressive Pill Badge with Mint Accent Indicator */}
          <div className="mb-2 flex items-center justify-between gap-2 sm:mb-2.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-high)] px-3 py-1 text-xs shadow-2xs transition-all duration-300 hover:border-[var(--md-sys-color-primary)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--md-sys-color-primary)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--md-sys-color-primary)]" />
              </span>
              <span className="font-mono text-xs font-semibold tracking-wider text-[var(--md-sys-color-on-surface-variant)] uppercase">
                08 ⁄ {t("eyebrow")}
              </span>
            </div>

            {/* Mobile Switch Indicator */}
            <div className="flex items-center gap-1.5 md:hidden">
              <button
                type="button"
                onClick={handleMobilePrev}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-high)] text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-on-surface)] active:scale-95"
                aria-label="Previous learning subject"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="font-mono text-xs font-bold text-[var(--md-sys-color-on-surface)]">
                {mobileSlide + 1} / 2
              </span>
              <button
                type="button"
                onClick={handleMobileNext}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-high)] text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-on-surface)] active:scale-95"
                aria-label="Next learning subject"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Title: Display Medium */}
          <h2
            data-cursor="text"
            className="text-2xl font-black tracking-tight text-[var(--md-sys-color-on-surface)] xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {t("title1")}{" "}
            <span className="text-[var(--md-sys-color-primary)]">
              {t("title2")}
            </span>
            {t("title3")}
          </h2>

          <p className="mt-1 max-w-2xl text-xs leading-relaxed font-normal text-[var(--md-sys-color-on-surface-variant)] sm:mt-2 sm:text-sm md:text-base">
            {t("description")}
          </p>
        </div>

        {/* ==================================================================== */}
        {/* DESKTOP VIEW (md: and up) — Dual Side-by-Side M3 Surface Containers */}
        {/* ==================================================================== */}
        <div className="hidden grid-cols-2 gap-4 md:grid lg:gap-6">
          {/* Card 1: Rust Language & Systems */}
          <div
            data-cursor="cover"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container)] p-5 text-[var(--md-sys-color-on-surface)] shadow-xs transition-all duration-300 hover:bg-[var(--md-sys-color-surface-container-high)] hover:border-[var(--md-sys-color-primary)] sm:p-6"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <M3FacetedBadge
                    shape="gem"
                    icon={Cpu}
                    size={48}
                    iconClassName="h-6 w-6"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-[var(--md-sys-color-on-surface-variant)] uppercase">
                        {t("rust.eyebrow")}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-highest)] px-2 py-0.5 font-mono text-[9px] font-bold text-[var(--md-sys-color-primary)]">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--md-sys-color-primary)]" />
                        {t("rust.status")}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[var(--md-sys-color-on-surface)] sm:text-lg lg:text-xl">
                      {t("rust.name")}
                    </h3>
                  </div>
                </div>

                <span className="shrink-0 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-highest)] px-3 py-1 font-mono text-xs font-bold text-[var(--md-sys-color-primary)]">
                  {t("rust.metric")}
                </span>
              </div>

              <p className="mt-3.5 text-xs leading-relaxed text-[var(--md-sys-color-on-surface-variant)] sm:text-sm">
                {t("rust.description")}
              </p>

              {/* Topic Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--md-sys-color-on-surface-variant)] mb-1.5">
                  <span>Syllabus & Systems Progress</span>
                  <span className="font-bold text-[var(--md-sys-color-primary)]">78%</span>
                </div>
                <M3Progress value={78} color="primary" />
              </div>

              {/* Focus Topic Assist Chips */}
              <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                {rustTopics.map((topic, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] px-3 py-1 font-mono text-[10px] font-medium text-[var(--md-sys-color-on-surface)] transition-all hover:bg-[var(--md-sys-color-surface-container-highest)] sm:text-xs"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-5 flex items-center justify-between border-t border-[var(--md-sys-color-outline-variant)]/60 pt-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--md-sys-color-on-surface-variant)]">
                <Terminal className="h-4 w-4 text-[var(--md-sys-color-primary)]" />
                <span>tokio · rayon · cargo</span>
              </div>

              <a
                href={t("rust.repo")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--md-sys-color-primary)] px-4 py-2 font-mono text-xs font-bold text-[var(--md-sys-color-on-primary)] shadow-sm hover:bg-[var(--md-sys-color-primary)]/90 active:scale-[0.98] transition-all"
              >
                <span>{t("viewRepository")}</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
              </a>
            </div>
          </div>

          {/* Card 2: PostgreSQL & Database Internals */}
          <div
            data-cursor="cover"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container)] p-5 text-[var(--md-sys-color-on-surface)] shadow-xs transition-all duration-300 hover:bg-[var(--md-sys-color-surface-container-high)] hover:border-[var(--md-sys-color-primary)] sm:p-6"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <M3FacetedBadge
                    shape="cookie8"
                    icon={Database}
                    size={48}
                    iconClassName="h-6 w-6"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-[var(--md-sys-color-on-surface-variant)] uppercase">
                        {t("postgres.eyebrow")}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-highest)] px-2 py-0.5 font-mono text-[9px] font-bold text-[var(--md-sys-color-secondary)]">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--md-sys-color-secondary)]" />
                        {t("postgres.status")}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[var(--md-sys-color-on-surface)] sm:text-lg lg:text-xl">
                      {t("postgres.name")}
                    </h3>
                  </div>
                </div>

                <span className="shrink-0 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-highest)] px-3 py-1 font-mono text-xs font-bold text-[var(--md-sys-color-secondary)]">
                  {t("postgres.metric")}
                </span>
              </div>

              <p className="mt-3.5 text-xs leading-relaxed text-[var(--md-sys-color-on-surface-variant)] sm:text-sm">
                {t("postgres.description")}
              </p>

              {/* Topic Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--md-sys-color-on-surface-variant)] mb-1.5">
                  <span>Architecture & Query Optimization</span>
                  <span className="font-bold text-[var(--md-sys-color-secondary)]">84%</span>
                </div>
                <M3Progress value={84} color="secondary" />
              </div>

              {/* Focus Topic Assist Chips */}
              <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                {postgresTopics.map((topic, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] px-3 py-1 font-mono text-[10px] font-medium text-[var(--md-sys-color-on-surface)] transition-all hover:bg-[var(--md-sys-color-surface-container-highest)] sm:text-xs"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-5 flex items-center justify-between border-t border-[var(--md-sys-color-outline-variant)]/60 pt-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--md-sys-color-on-surface-variant)]">
                <Server className="h-4 w-4 text-[var(--md-sys-color-secondary)]" />
                <span>sql · indexing · rls</span>
              </div>

              <a
                href={t("postgres.repo")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--md-sys-color-secondary-container)] px-4 py-2 font-mono text-xs font-bold text-[var(--md-sys-color-on-secondary-container)] border border-[var(--md-sys-color-outline-variant)] hover:bg-[var(--md-sys-color-secondary-container)]/80 active:scale-[0.98] transition-all"
              >
                <span>{t("viewRepository")}</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* MOBILE VIEW (Below md:) — Animated Framer Motion Swipe Switcher      */}
        {/* ==================================================================== */}
        <div className="md:hidden">
          <AnimatePresence mode="wait" custom={slideDirection}>
            {mobileSlide === 0 ? (
              /* Mobile Rust Card */
              <motion.div
                key="rust-mobile"
                custom={slideDirection}
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
                dragElastic={0.15}
                onDragEnd={(_e, info) => {
                  if (info.offset.x < -40 || info.velocity.x < -300) {
                    handleMobileNext()
                  } else if (info.offset.x > 40 || info.velocity.x > 300) {
                    handleMobilePrev()
                  }
                }}
                className="relative overflow-hidden rounded-2xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container)] p-4 text-[var(--md-sys-color-on-surface)] shadow-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <M3FacetedBadge
                      shape="gem"
                      icon={Cpu}
                      size={40}
                      iconClassName="h-4.5 w-4.5"
                    />
                    <div>
                      <span className="font-mono text-[9px] font-bold text-[var(--md-sys-color-on-surface-variant)] uppercase">
                        {t("rust.eyebrow")}
                      </span>
                      <h3 className="text-sm font-bold text-[var(--md-sys-color-on-surface)]">
                        {t("rust.name")}
                      </h3>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-highest)] px-2 py-0.5 font-mono text-[10px] font-bold text-[var(--md-sys-color-primary)]">
                    {t("rust.status")}
                  </span>
                </div>

                <p className="mt-2.5 text-xs leading-relaxed text-[var(--md-sys-color-on-surface-variant)]">
                  {t("rust.description")}
                </p>

                <div className="mt-3">
                  <M3Progress value={78} color="primary" />
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {rustTopics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] px-2 py-0.5 font-mono text-[9.5px] font-medium text-[var(--md-sys-color-on-surface)]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="mt-3.5 flex items-center justify-between border-t border-[var(--md-sys-color-outline-variant)]/60 pt-3">
                  <span className="font-mono text-[10px] text-[var(--md-sys-color-on-surface-variant)]">
                    tokio · rayon · cargo
                  </span>
                  <a
                    href={t("rust.repo")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[var(--md-sys-color-primary)] px-3 py-1 font-mono text-[11px] font-bold text-[var(--md-sys-color-on-primary)]"
                  >
                    <span>{t("viewRepository")}</span>
                    <ArrowUpRight className="h-3 w-3 shrink-0" />
                  </a>
                </div>
              </motion.div>
            ) : (
              /* Mobile Postgres Card */
              <motion.div
                key="postgres-mobile"
                custom={slideDirection}
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
                dragElastic={0.15}
                onDragEnd={(_e, info) => {
                  if (info.offset.x < -40 || info.velocity.x < -300) {
                    handleMobileNext()
                  } else if (info.offset.x > 40 || info.velocity.x > 300) {
                    handleMobilePrev()
                  }
                }}
                className="relative overflow-hidden rounded-2xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container)] p-4 text-[var(--md-sys-color-on-surface)] shadow-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <M3FacetedBadge
                      shape="cookie8"
                      icon={Database}
                      size={40}
                      iconClassName="h-4.5 w-4.5"
                    />
                    <div>
                      <span className="font-mono text-[9px] font-bold text-[var(--md-sys-color-on-surface-variant)] uppercase">
                        {t("postgres.eyebrow")}
                      </span>
                      <h3 className="text-sm font-bold text-[var(--md-sys-color-on-surface)]">
                        {t("postgres.name")}
                      </h3>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-highest)] px-2 py-0.5 font-mono text-[10px] font-bold text-[var(--md-sys-color-secondary)]">
                    {t("postgres.status")}
                  </span>
                </div>

                <p className="mt-2.5 text-xs leading-relaxed text-[var(--md-sys-color-on-surface-variant)]">
                  {t("postgres.description")}
                </p>

                <div className="mt-3">
                  <M3Progress value={84} color="secondary" />
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {postgresTopics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] px-2 py-0.5 font-mono text-[9.5px] font-medium text-[var(--md-sys-color-on-surface)]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="mt-3.5 flex items-center justify-between border-t border-[var(--md-sys-color-outline-variant)]/60 pt-3">
                  <span className="font-mono text-[10px] text-[var(--md-sys-color-on-surface-variant)]">
                    sql · indexing · rls
                  </span>
                  <a
                    href={t("postgres.repo")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[var(--md-sys-color-secondary-container)] px-3 py-1 font-mono text-[11px] font-bold text-[var(--md-sys-color-on-secondary-container)] border border-[var(--md-sys-color-outline-variant)]"
                  >
                    <span>{t("viewRepository")}</span>
                    <ArrowUpRight className="h-3 w-3 shrink-0" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Architectural Philosophy Bottom Strip: M3 Surface Container */}
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] px-4 py-3 text-[var(--md-sys-color-on-surface-variant)] sm:mt-6 sm:px-5 sm:py-3.5">
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 shrink-0 text-[var(--md-sys-color-primary)]" />
            <span className="text-xs sm:text-sm leading-relaxed">
              <span className="font-bold text-[var(--md-sys-color-on-surface)]">
                {t("whyThisMatters")}:
              </span>{" "}
              {t("philosophy")}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LearningSection
