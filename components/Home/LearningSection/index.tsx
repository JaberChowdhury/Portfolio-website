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
import { Badge } from "@/components/ui/badge"

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
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground"
    >
      {/* Hallmark ambient glow blooms */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(224,93,68,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "8%",
          left: "5%",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(46,139,192,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-3.5 sm:px-6 md:px-10 lg:px-12 2xl:max-w-[1440px]">
        {/* Section Header */}
        <div className="mb-3 sm:mb-6">
          {/* Hallmark Eyebrow Badge with Coral Pulse Dot */}
          <div className="mb-1.5 flex items-center justify-between gap-2 sm:mb-2.5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/80 px-2.5 py-0.5 text-xs shadow-2xs transition-all duration-300 hover:border-[var(--color-coral)]/40 xs:px-3 xs:py-1 sm:gap-2 sm:px-3.5 sm:py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-coral)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-coral)]" />
              </span>
              <span className="mono-label">08 ⁄ {t("eyebrow")}</span>
            </div>

            {/* Mobile Switch Indicator */}
            <div className="flex items-center gap-1.5 md:hidden">
              <button
                type="button"
                onClick={handleMobilePrev}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border/70 bg-card text-muted-foreground transition-colors hover:text-foreground active:scale-95"
                aria-label="Previous learning subject"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="font-mono text-xs font-bold text-foreground">
                {mobileSlide + 1} / 2
              </span>
              <button
                type="button"
                onClick={handleMobileNext}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border/70 bg-card text-muted-foreground transition-colors hover:text-foreground active:scale-95"
                aria-label="Next learning subject"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <h2
            data-cursor="text"
            className="text-2xl font-black tracking-tight text-foreground xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {t("title1")}{" "}
            <span className="text-[var(--color-coral)]">{t("title2")}</span>
            {t("title3")}
          </h2>

          <p className="mt-1 max-w-2xl text-xs leading-relaxed font-normal text-muted-foreground sm:mt-2 sm:text-sm md:text-base">
            {t("description")}
          </p>
        </div>

        {/* ==================================================================== */}
        {/* DESKTOP VIEW (md: and up) — Dual Side-by-Side Hallmark Cards         */}
        {/* ==================================================================== */}
        <div className="hidden grid-cols-2 gap-4 md:grid lg:gap-6">
          {/* Card 1: Rust Language & Systems */}
          <div
            data-cursor="cover"
            className="hum-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-5 text-card-foreground shadow-xs transition-all duration-300 hover:border-[var(--color-coral)]/50 sm:rounded-3xl sm:p-6"
          >
            {/* Top Multi-Accent Decorative Ribbon */}
            <div
              className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[var(--color-coral)] via-[var(--color-pear)] to-[var(--color-coral)]"
              aria-hidden="true"
            />

            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-coral)]/30 bg-[var(--color-coral)]/10 text-[var(--color-coral-deep)] transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12 dark:text-[var(--color-coral)]">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="mono-label text-[10px] font-bold uppercase">
                        {t("rust.eyebrow")}
                      </span>
                      <span className="py-0.2 inline-flex items-center gap-1 rounded-full border border-[var(--color-coral)]/25 bg-[var(--color-coral)]/10 px-1.5 font-mono text-[8.5px] font-bold text-[var(--color-coral-deep)] dark:text-[var(--color-coral)]">
                        <span className="h-1 w-1 animate-pulse rounded-full bg-[var(--color-coral)]" />
                        {t("rust.status")}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-foreground sm:text-lg lg:text-xl">
                      {t("rust.name")}
                    </h3>
                  </div>
                </div>

                <span className="shrink-0 rounded-full border border-[var(--color-coral)]/30 bg-[var(--color-coral)]/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-[var(--color-coral-deep)] dark:text-[var(--color-coral)]">
                  {t("rust.metric")}
                </span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {t("rust.description")}
              </p>

              {/* Focus Topic Badges */}
              <div className="mt-3.5 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                {rustTopics.map((topic, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="rounded-full border border-[var(--color-coral)]/20 bg-[var(--color-coral)]/8 px-2.5 py-0.5 font-mono text-[10px] font-medium text-[var(--color-coral-deep)] transition-all duration-200 hover:scale-105 sm:text-xs dark:text-[var(--color-coral)]"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-5 flex items-center justify-between border-t border-border/80 pt-4">
              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <Terminal className="h-3.5 w-3.5 text-[var(--color-coral)]" />
                <span>tokio · rayon · cargo</span>
              </div>

              <a
                href={t("rust.repo")}
                target="_blank"
                rel="noopener noreferrer"
                className="hum-btn hum-btn--coral !min-h-[36px] !px-3.5 !py-1.5 !text-xs"
              >
                <span>{t("viewRepository")}</span>
                <ArrowUpRight className="hum-arrow h-3.5 w-3.5 shrink-0" />
              </a>
            </div>
          </div>

          {/* Card 2: PostgreSQL & Database Internals */}
          <div
            data-cursor="cover"
            className="hum-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-5 text-card-foreground shadow-xs transition-all duration-300 hover:border-[var(--color-cyan)]/50 sm:rounded-3xl sm:p-6"
          >
            {/* Top Multi-Accent Decorative Ribbon */}
            <div
              className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[var(--color-cyan)] via-[var(--color-mint)] to-[var(--color-cyan)]"
              aria-hidden="true"
            />

            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-cyan)]/30 bg-[var(--color-cyan)]/10 text-[var(--color-cyan-deep)] transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12 dark:text-[var(--color-cyan)]">
                    <Database className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="mono-label text-[10px] font-bold uppercase">
                        {t("postgres.eyebrow")}
                      </span>
                      <span className="py-0.2 inline-flex items-center gap-1 rounded-full border border-[var(--color-cyan)]/25 bg-[var(--color-cyan)]/10 px-1.5 font-mono text-[8.5px] font-bold text-[var(--color-cyan-deep)] dark:text-[var(--color-cyan)]">
                        <span className="h-1 w-1 animate-pulse rounded-full bg-[var(--color-cyan)]" />
                        {t("postgres.status")}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-foreground sm:text-lg lg:text-xl">
                      {t("postgres.name")}
                    </h3>
                  </div>
                </div>

                <span className="shrink-0 rounded-full border border-[var(--color-cyan)]/30 bg-[var(--color-cyan)]/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-[var(--color-cyan-deep)] dark:text-[var(--color-cyan)]">
                  {t("postgres.metric")}
                </span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {t("postgres.description")}
              </p>

              {/* Focus Topic Badges */}
              <div className="mt-3.5 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                {postgresTopics.map((topic, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="rounded-full border border-[var(--color-cyan)]/20 bg-[var(--color-cyan)]/8 px-2.5 py-0.5 font-mono text-[10px] font-medium text-[var(--color-cyan-deep)] transition-all duration-200 hover:scale-105 sm:text-xs dark:text-[var(--color-cyan)]"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-5 flex items-center justify-between border-t border-border/80 pt-4">
              <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <Server className="h-3.5 w-3.5 text-[var(--color-cyan)]" />
                <span>sql · indexing · rls</span>
              </div>

              <a
                href={t("postgres.repo")}
                target="_blank"
                rel="noopener noreferrer"
                className="hum-btn hum-btn--cyan !min-h-[36px] !px-3.5 !py-1.5 !text-xs"
              >
                <span>{t("viewRepository")}</span>
                <ArrowUpRight className="hum-arrow h-3.5 w-3.5 shrink-0" />
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
                className="hum-card relative overflow-hidden rounded-2xl border border-border/80 bg-card p-4 text-card-foreground shadow-xs"
              >
                <div
                  className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[var(--color-coral)] via-[var(--color-pear)] to-[var(--color-coral)]"
                  aria-hidden="true"
                />

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--color-coral)]/30 bg-[var(--color-coral)]/10 text-[var(--color-coral-deep)] dark:text-[var(--color-coral)]">
                      <Cpu className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="mono-label text-[9px] font-bold uppercase">
                        {t("rust.eyebrow")}
                      </span>
                      <h3 className="text-sm font-bold text-foreground">
                        {t("rust.name")}
                      </h3>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border border-[var(--color-coral)]/30 bg-[var(--color-coral)]/10 px-2 py-0.5 font-mono text-[10px] font-bold text-[var(--color-coral-deep)] dark:text-[var(--color-coral)]">
                    {t("rust.status")}
                  </span>
                </div>

                <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                  {t("rust.description")}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {rustTopics.map((topic, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="rounded-full border border-[var(--color-coral)]/20 bg-[var(--color-coral)]/8 px-2 py-0.5 font-mono text-[9.5px] font-medium text-[var(--color-coral-deep)] dark:text-[var(--color-coral)]"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>

                <div className="mt-3.5 flex items-center justify-between border-t border-border/80 pt-3">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    tokio · rayon · cargo
                  </span>
                  <a
                    href={t("rust.repo")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hum-btn hum-btn--coral !min-h-[30px] !px-3 !py-1 !font-mono !text-[11px]"
                  >
                    <span>{t("viewRepository")}</span>
                    <ArrowUpRight className="hum-arrow h-3 w-3 shrink-0" />
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
                className="hum-card relative overflow-hidden rounded-2xl border border-border/80 bg-card p-4 text-card-foreground shadow-xs"
              >
                <div
                  className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[var(--color-cyan)] via-[var(--color-mint)] to-[var(--color-cyan)]"
                  aria-hidden="true"
                />

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--color-cyan)]/30 bg-[var(--color-cyan)]/10 text-[var(--color-cyan-deep)] dark:text-[var(--color-cyan)]">
                      <Database className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="mono-label text-[9px] font-bold uppercase">
                        {t("postgres.eyebrow")}
                      </span>
                      <h3 className="text-sm font-bold text-foreground">
                        {t("postgres.name")}
                      </h3>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border border-[var(--color-cyan)]/30 bg-[var(--color-cyan)]/10 px-2 py-0.5 font-mono text-[10px] font-bold text-[var(--color-cyan-deep)] dark:text-[var(--color-cyan)]">
                    {t("postgres.status")}
                  </span>
                </div>

                <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                  {t("postgres.description")}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {postgresTopics.map((topic, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="rounded-full border border-[var(--color-cyan)]/20 bg-[var(--color-cyan)]/8 px-2 py-0.5 font-mono text-[9.5px] font-medium text-[var(--color-cyan-deep)] dark:text-[var(--color-cyan)]"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>

                <div className="mt-3.5 flex items-center justify-between border-t border-border/80 pt-3">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    sql · indexing · rls
                  </span>
                  <a
                    href={t("postgres.repo")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hum-btn hum-btn--cyan !min-h-[30px] !px-3 !py-1 !font-mono !text-[11px]"
                  >
                    <span>{t("viewRepository")}</span>
                    <ArrowUpRight className="hum-arrow h-3 w-3 shrink-0" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Architectural Philosophy Bottom Strip */}
        <div className="mt-3.5 flex items-center justify-between rounded-xl border border-border/60 bg-card/40 px-3.5 py-2.5 text-muted-foreground backdrop-blur-xs sm:mt-5 sm:rounded-2xl sm:px-5 sm:py-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-[var(--color-pear)] sm:h-4 sm:w-4" />
            <span className="text-[11px] leading-tight sm:text-xs md:text-sm">
              <span className="font-bold text-foreground">
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
