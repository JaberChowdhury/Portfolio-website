"use client"

import React, { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import {
  Target,
  Trophy,
  Terminal,
  Brain,
  Sparkles,
  X,
  ArrowUpRight,
  Calendar,
  Award,
  Loader2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { useTranslations } from "next-intl"
import { AnimatePresence, motion } from "framer-motion"
import { useMounted } from "@/hooks/use-mounted"
import { StatCard } from "./StatCard"

export type CPModalType = "platforms" | "icpc" | "mindset" | null

export interface HighlightItem {
  title: string
  description: string
}

export function CompetitiveProgrammingSection() {
  const t = useTranslations("CompetitiveProgramming")
  const mounted = useMounted()
  const [activeModal, setActiveModal] = useState<CPModalType>(null)
  const [showCertificate, setShowCertificate] = useState(false)
  const [certLoaded, setCertLoaded] = useState(false)
  const [hubIdx, setHubIdx] = useState(0)
  const [hubDirection, setHubDirection] = useState(0)

  const handleHubNext = () => {
    setHubDirection(1)
    setHubIdx((prev) => (prev + 1) % 3)
  }

  const handleHubPrev = () => {
    setHubDirection(-1)
    setHubIdx((prev) => (prev === 0 ? 2 : prev - 1))
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showCertificate) {
          setShowCertificate(false)
        } else {
          setActiveModal(null)
        }
      }
    }
    if (activeModal !== null || showCertificate) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeModal, showCertificate])

  const highlights = (t.raw("highlights") as HighlightItem[]) || []
  const highlightIcons = [Brain, Sparkles, Trophy]

  const statIcons = [Terminal, Target, Sparkles, Trophy]
  const statsData = (t.raw("stats") as { label: string; value: string }[]) || [
    { label: "Codeforces Solved", value: "229" },
    { label: "Beecrowd Solved", value: "130" },
    { label: "Total Solved", value: "359" },
    { label: "Contest", value: "ICPC 2025" },
  ]

  const cfTopics = (t.raw("platforms.codeforces.topics") as string[]) || [
    "Greedy",
    "Math",
    "Binary Search",
    "Implementation",
    "Two Pointers",
    "Sorting",
    "Brute Force",
  ]

  const beeTopics = (t.raw("platforms.beecrowd.topics") as string[]) || [
    "Strings",
    "Math",
    "Ad-Hoc",
    "Data Structures",
    "Recursion",
    "Conditionals",
    "Arrays",
  ]

  const icpcBadges = (t.raw("icpc.badges") as string[]) || [
    "ICPC 2025",
    "Dec 2025",
    "Team Contest",
    "Algorithms",
    "Data Structures",
  ]

  return (
    <section
      id="programming"
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12 2xl:max-w-[1440px]">
        {/* Section Header */}
        <div className="mb-3 max-w-3xl sm:mb-5 md:mb-6">
          {/* Hum Eyebrow with Coral Dot & Mobile Swipe Indicator */}
          <div className="mb-2 flex items-center justify-between gap-2 sm:mb-2.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-3 py-1 font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase shadow-2xs">
              <span className="hum-dot hum-dot--coral" />
              <span>04 ⁄ {t("eyebrow")}</span>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-border/60 bg-card/60 px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground md:hidden">
              <span className="animate-pulse">←</span>
              <span>Swipe</span>
              <span className="animate-pulse">→</span>
            </div>
          </div>

          {/* Grand Main Title */}
          <h2
            data-cursor="text"
            className="marlin-font text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
          >
            {t("title1")} <span className="hl-coral">{t("title2")}</span>{" "}
            <span className="font-normal text-muted-foreground">
              {t("title3")}
            </span>
          </h2>

          {/* Subtitle Description */}
          <p className="mt-1 max-w-2xl text-xs leading-relaxed font-normal text-muted-foreground sm:mt-2 sm:text-sm md:text-base">
            {t("description")}
          </p>
        </div>

        {/* Hub Cards: Desktop 3-Column Grid */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-4">
          {/* Card 1: Platforms Hub — Pear accent */}
          <div className="hum-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-4 text-card-foreground transition-all duration-300 hover:border-[var(--color-pear)]/50 sm:p-5 md:p-6">
            <div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--color-pear)]/30 bg-[var(--color-pear)]/10 text-[var(--color-pear-deep)] dark:text-[var(--color-pear)] sm:h-9 sm:w-9 md:h-10 md:w-10">
                  <Terminal className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
                </div>
                <span className="mono-label inline-flex items-center gap-1 rounded-full border border-[var(--color-pear)]/25 bg-[var(--color-pear)]/10 px-2 py-0.5 text-[9px] font-bold text-[var(--color-pear-deep)] sm:text-[10px] dark:text-[var(--color-pear)]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-pear)]" />
                  {t("cards.platformsTag")}
                </span>
              </div>

              <div className="mt-2.5 font-mono text-lg font-black text-foreground sm:mt-3 sm:text-xl md:text-2xl">
                {t("cards.platformsTitle")}
              </div>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {t("cards.platformsDesc")}
              </p>
            </div>

            <div className="mt-4 pt-1 sm:mt-5 sm:pt-2">
              <button
                type="button"
                onClick={() => setActiveModal("platforms")}
                className="hum-btn w-full"
              >
                <span className="flex items-center justify-center gap-1.5 py-2 font-mono text-xs font-bold sm:py-2.5 sm:text-sm">
                  <span>{t("cards.platformsBtn")}</span>
                  <ArrowUpRight className="hum-arrow h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>
              </button>
            </div>
          </div>

          {/* Card 2: ICPC 2025 — Coral accent */}
          <div className="hum-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-4 text-card-foreground transition-all duration-300 hover:border-[var(--color-coral)]/50 sm:p-5 md:p-6">
            <div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--color-coral)]/30 bg-[var(--color-coral)]/10 text-[var(--color-coral-deep)] dark:text-[var(--color-coral)] sm:h-9 sm:w-9 md:h-10 md:w-10">
                  <Trophy className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
                </div>
                <span className="mono-label inline-flex items-center gap-1 rounded-full border border-[var(--color-coral)]/25 bg-[var(--color-coral)]/10 px-2 py-0.5 text-[9px] font-bold text-[var(--color-coral-deep)] sm:text-[10px] dark:text-[var(--color-coral)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-coral)]" />
                  {t("cards.icpcTag")}
                </span>
              </div>

              <div className="mt-2.5 font-mono text-lg font-black text-foreground sm:mt-3 sm:text-xl md:text-2xl">
                {t("cards.icpcTitle")}
              </div>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {t("cards.icpcDesc")}
              </p>
            </div>

            <div className="mt-4 pt-1 sm:mt-5 sm:pt-2">
              <button
                type="button"
                onClick={() => setActiveModal("icpc")}
                className="hum-btn hum-btn--coral w-full"
              >
                <span className="flex items-center justify-center gap-1.5 py-2 font-mono text-xs font-bold sm:py-2.5 sm:text-sm">
                  <span>{t("cards.icpcBtn")}</span>
                  <ArrowUpRight className="hum-arrow h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>
              </button>
            </div>
          </div>

          {/* Card 3: Algorithmic Mindset — Mint accent */}
          <div className="hum-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-4 text-card-foreground transition-all duration-300 hover:border-[var(--color-mint)]/50 sm:p-5 md:p-6">
            <div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--color-mint)]/30 bg-[var(--color-mint)]/10 text-[var(--color-mint-deep)] dark:text-[var(--color-mint)] sm:h-9 sm:w-9 md:h-10 md:w-10">
                  <Brain className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5" />
                </div>
                <span className="mono-label inline-flex items-center gap-1 rounded-full border border-[var(--color-mint)]/25 bg-[var(--color-mint)]/10 px-2 py-0.5 text-[9px] font-bold text-[var(--color-mint-deep)] sm:text-[10px] dark:text-[var(--color-mint)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint)]" />
                  {t("cards.mindsetTag")}
                </span>
              </div>

              <div className="mt-2.5 font-mono text-lg font-black text-foreground sm:mt-3 sm:text-xl md:text-2xl">
                {t("cards.mindsetTitle")}
              </div>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {t("cards.mindsetDesc")}
              </p>
            </div>

            <div className="mt-4 pt-1 sm:mt-5 sm:pt-2">
              <button
                type="button"
                onClick={() => setActiveModal("mindset")}
                className="hum-btn hum-btn--mint w-full"
              >
                <span className="flex items-center justify-center gap-1.5 py-2 font-mono text-xs font-bold sm:py-2.5 sm:text-sm">
                  <span>{t("cards.mindsetBtn")}</span>
                  <ArrowUpRight className="hum-arrow h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Hub Cards: Mobile Framer Motion Swipe Slider */}
        <div className="md:hidden">
          <div className="relative overflow-hidden py-1">
            <AnimatePresence mode="wait" custom={hubDirection}>
              <motion.div
                key={hubIdx}
                custom={hubDirection}
                variants={{
                  enter: (dir: number) => ({
                    x: dir > 0 ? 45 : -45,
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
                    x: dir > 0 ? -45 : 45,
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
                    handleHubNext()
                  } else if (info.offset.x > 35 || info.velocity.x > 250) {
                    handleHubPrev()
                  }
                }}
                className="w-full cursor-grab touch-pan-y active:cursor-grabbing"
              >
                {hubIdx === 0 && (
                  <div className="hum-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-4 text-card-foreground shadow-xs">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--color-pear)]/30 bg-[var(--color-pear)]/10 text-[var(--color-pear-deep)] dark:text-[var(--color-pear)]">
                          <Terminal className="h-4 w-4" />
                        </div>
                        <span className="mono-label inline-flex items-center gap-1 rounded-full border border-[var(--color-pear)]/25 bg-[var(--color-pear)]/10 px-2 py-0.5 text-[9px] font-bold text-[var(--color-pear-deep)] dark:text-[var(--color-pear)]">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-pear)]" />
                          {t("cards.platformsTag")}
                        </span>
                      </div>
                      <div className="mt-2 font-mono text-base font-black text-foreground">
                        {t("cards.platformsTitle")}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {t("cards.platformsDesc")}
                      </p>
                    </div>
                    <div className="mt-3.5 pt-1">
                      <button
                        type="button"
                        onClick={() => setActiveModal("platforms")}
                        className="hum-btn w-full"
                      >
                        <span className="flex items-center justify-center gap-1.5 py-2 font-mono text-xs font-bold">
                          <span>{t("cards.platformsBtn")}</span>
                          <ArrowUpRight className="hum-arrow h-3.5 w-3.5" />
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {hubIdx === 1 && (
                  <div className="hum-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-4 text-card-foreground shadow-xs">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--color-coral)]/30 bg-[var(--color-coral)]/10 text-[var(--color-coral-deep)] dark:text-[var(--color-coral)]">
                          <Trophy className="h-4 w-4" />
                        </div>
                        <span className="mono-label inline-flex items-center gap-1 rounded-full border border-[var(--color-coral)]/25 bg-[var(--color-coral)]/10 px-2 py-0.5 text-[9px] font-bold text-[var(--color-coral-deep)] dark:text-[var(--color-coral)]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-coral)]" />
                          {t("cards.icpcTag")}
                        </span>
                      </div>
                      <div className="mt-2 font-mono text-base font-black text-foreground">
                        {t("cards.icpcTitle")}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {t("cards.icpcDesc")}
                      </p>
                    </div>
                    <div className="mt-3.5 pt-1">
                      <button
                        type="button"
                        onClick={() => setActiveModal("icpc")}
                        className="hum-btn hum-btn--coral w-full"
                      >
                        <span className="flex items-center justify-center gap-1.5 py-2 font-mono text-xs font-bold">
                          <span>{t("cards.icpcBtn")}</span>
                          <ArrowUpRight className="hum-arrow h-3.5 w-3.5" />
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {hubIdx === 2 && (
                  <div className="hum-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-4 text-card-foreground shadow-xs">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--color-mint)]/30 bg-[var(--color-mint)]/10 text-[var(--color-mint-deep)] dark:text-[var(--color-mint)]">
                          <Brain className="h-4 w-4" />
                        </div>
                        <span className="mono-label inline-flex items-center gap-1 rounded-full border border-[var(--color-mint)]/25 bg-[var(--color-mint)]/10 px-2 py-0.5 text-[9px] font-bold text-[var(--color-mint-deep)] dark:text-[var(--color-mint)]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint)]" />
                          {t("cards.mindsetTag")}
                        </span>
                      </div>
                      <div className="mt-2 font-mono text-base font-black text-foreground">
                        {t("cards.mindsetTitle")}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {t("cards.mindsetDesc")}
                      </p>
                    </div>
                    <div className="mt-3.5 pt-1">
                      <button
                        type="button"
                        onClick={() => setActiveModal("mindset")}
                        className="hum-btn hum-btn--mint w-full"
                      >
                        <span className="flex items-center justify-center gap-1.5 py-2 font-mono text-xs font-bold">
                          <span>{t("cards.mindsetBtn")}</span>
                          <ArrowUpRight className="hum-arrow h-3.5 w-3.5" />
                        </span>
                      </button>
                    </div>
                  </div>
                )}
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
                  setHubDirection(idx > hubIdx ? 1 : -1)
                  setHubIdx(idx)
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === hubIdx
                    ? "w-6 bg-[var(--color-coral)]"
                    : "w-1.5 bg-muted-foreground/30"
                }`}
                aria-label={`Go to hub card ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Row Below Hub Cards */}
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 md:mt-5">
          {statsData.map((stat, idx) => (
            <StatCard
              key={stat.label}
              stat={{
                label: stat.label,
                value: stat.value,
                icon: statIcons[idx] || Sparkles,
              }}
              index={idx}
            />
          ))}
        </div>
      </div>

      {/* Modal System */}
      {mounted &&
        activeModal !== null &&
        createPortal(
          <AnimatePresence>
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-2.5 sm:p-4 md:p-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModal(null)}
                className="absolute inset-0 bg-background/80 backdrop-blur-md"
              />

              {/* Modal Dialog */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
                className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border/90 bg-card text-card-foreground shadow-2xl sm:max-h-[85vh] sm:rounded-3xl"
              >
                {/* Modal Top Bar */}
                <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border/80 px-3 py-2.5 sm:px-6 sm:py-4">
                  {/* Segmented Tabs — Hallmark Hum buttons */}
                  <div className="flex max-w-[calc(100%-2.5rem)] scrollbar-none flex-nowrap items-center gap-1 overflow-x-auto rounded-full border border-border/80 bg-secondary/50 p-0.5 py-1 sm:max-w-none sm:gap-1.5 sm:p-1">
                    <button
                      type="button"
                      onClick={() => setActiveModal("platforms")}
                      className={`shrink-0 cursor-pointer rounded-full px-2.5 py-1 font-mono text-[11px] font-bold transition-all duration-200 sm:px-3.5 sm:py-1.5 sm:text-xs ${
                        activeModal === "platforms"
                          ? "bg-[var(--color-pear)] text-zinc-950 shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t("modals.tabs.platforms")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveModal("icpc")}
                      className={`shrink-0 cursor-pointer rounded-full px-2.5 py-1 font-mono text-[11px] font-bold transition-all duration-200 sm:px-3.5 sm:py-1.5 sm:text-xs ${
                        activeModal === "icpc"
                          ? "bg-[var(--color-coral)] text-white shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t("modals.tabs.icpc")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveModal("mindset")}
                      className={`shrink-0 cursor-pointer rounded-full px-2.5 py-1 font-mono text-[11px] font-bold transition-all duration-200 sm:px-3.5 sm:py-1.5 sm:text-xs ${
                        activeModal === "mindset"
                          ? "bg-[var(--color-mint)] text-zinc-950 shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t("modals.tabs.mindset")}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    aria-label="Close modal"
                    className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border/80 bg-secondary/50 text-muted-foreground transition-all duration-200 hover:scale-105 hover:bg-secondary hover:text-foreground sm:h-8 sm:w-8 md:h-9 md:w-9"
                  >
                    <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto overscroll-contain p-3.5 sm:p-6 md:p-7">
                  {/* ─── PLATFORMS VIEW ─── */}
                  {activeModal === "platforms" && (
                    <motion.div
                      key="platforms"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-base font-bold text-foreground sm:text-lg md:text-xl">
                            {t("modals.platformsHeading")}
                          </h3>
                          <p className="text-[11px] text-muted-foreground sm:text-xs md:text-sm">
                            {t("modals.platformsSubheading")}
                          </p>
                        </div>
                        <span className="shrink-0 self-start rounded-full border border-[var(--color-pear)]/30 bg-[var(--color-pear)]/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-[var(--color-pear-deep)] sm:self-auto sm:px-3 sm:py-1 sm:text-xs dark:text-[var(--color-pear)]">
                          {t("modals.totalSolvedBadge")}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                        {/* Codeforces */}
                        <div
                          data-cursor="cover"
                          className="hum-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-3.5 text-card-foreground transition-all duration-300 hover:border-[var(--color-pear)]/50 sm:p-5"
                        >
                          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-pear)] via-[var(--color-coral)] to-[var(--color-pear)]" />
                          <div>
                            <div className="flex items-start justify-between gap-2 sm:gap-3">
                              <div className="flex items-center gap-2.5 sm:gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--color-pear)]/30 bg-[var(--color-pear)]/10 text-[var(--color-pear-deep)] sm:h-10 sm:w-10 dark:text-[var(--color-pear)]">
                                  <Terminal className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="mono-label text-[9px] font-bold uppercase sm:text-[10px]">
                                      {t("platforms.codeforces.eyebrow")}
                                    </span>
                                    <span className="mono-label py-0.2 inline-flex items-center gap-1 rounded-full border border-[var(--color-mint)]/25 bg-[var(--color-mint)]/10 px-1.5 text-[8px] font-bold text-[var(--color-mint)]">
                                      <span className="h-1 w-1 animate-pulse rounded-full bg-[var(--color-mint)]" />
                                      ACTIVE
                                    </span>
                                  </div>
                                  <h4 className="text-sm font-bold text-foreground sm:text-base">
                                    {t("platforms.codeforces.name")}
                                  </h4>
                                </div>
                              </div>
                              <span className="shrink-0 rounded-full border border-[var(--color-pear)]/30 bg-[var(--color-pear)]/10 px-2 py-0.5 font-mono text-[11px] font-bold text-[var(--color-pear-deep)] sm:px-2.5 sm:text-xs dark:text-[var(--color-pear)]">
                                229 Solved
                              </span>
                            </div>

                            <p className="mt-2.5 text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
                              {t("platforms.codeforces.description")}
                            </p>

                            <div className="mt-2.5 flex flex-wrap gap-1 sm:mt-3">
                              {cfTopics.map((topic) => (
                                <Badge
                                  key={topic}
                                  variant="secondary"
                                  className="rounded-full border border-border/60 bg-secondary/50 px-2 py-0.5 font-mono text-[9px] font-medium text-muted-foreground sm:px-2.5 sm:text-[10px]"
                                >
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="mt-3 border-t border-border/80 pt-2.5 sm:mt-4 sm:pt-3">
                            <a
                              href="https://codeforces.com/profile/jaber02"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hum-btn w-full !py-2 sm:!py-2.5"
                            >
                              <span className="flex items-center justify-center gap-1.5 font-mono text-xs font-bold">
                                <span>
                                  {t("platforms.codeforces.viewProfile")}
                                </span>
                                <ArrowUpRight className="hum-arrow h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              </span>
                            </a>
                          </div>
                        </div>

                        {/* Beecrowd */}
                        <div
                          data-cursor="cover"
                          className="hum-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-3.5 text-card-foreground transition-all duration-300 hover:border-[var(--color-cyan)]/50 sm:p-5"
                        >
                          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--color-cyan)] via-[var(--color-mint)] to-[var(--color-cyan)]" />
                          <div>
                            <div className="flex items-start justify-between gap-2 sm:gap-3">
                              <div className="flex items-center gap-2.5 sm:gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--color-cyan)]/30 bg-[var(--color-cyan)]/10 text-[var(--color-cyan-deep)] sm:h-10 sm:w-10 dark:text-[var(--color-cyan)]">
                                  <Target className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="mono-label text-[9px] font-bold uppercase sm:text-[10px]">
                                      {t("platforms.beecrowd.eyebrow")}
                                    </span>
                                    <span className="mono-label py-0.2 inline-flex items-center gap-1 rounded-full border border-[var(--color-cyan)]/25 bg-[var(--color-cyan)]/10 px-1.5 text-[8px] font-bold text-[var(--color-cyan-deep)] dark:text-[var(--color-cyan)]">
                                      <span className="h-1 w-1 animate-pulse rounded-full bg-[var(--color-cyan)]" />
                                      ACTIVE
                                    </span>
                                  </div>
                                  <h4 className="text-sm font-bold text-foreground sm:text-base">
                                    {t("platforms.beecrowd.name")}
                                  </h4>
                                </div>
                              </div>
                              <span className="shrink-0 rounded-full border border-[var(--color-cyan)]/30 bg-[var(--color-cyan)]/10 px-2 py-0.5 font-mono text-[11px] font-bold text-[var(--color-cyan-deep)] sm:px-2.5 sm:text-xs dark:text-[var(--color-cyan)]">
                                130 Solved
                              </span>
                            </div>

                            <p className="mt-2.5 text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
                              {t("platforms.beecrowd.description")}
                            </p>

                            <div className="mt-2.5 flex flex-wrap gap-1 sm:mt-3">
                              {beeTopics.map((topic) => (
                                <Badge
                                  key={topic}
                                  variant="secondary"
                                  className="rounded-full border border-border/60 bg-secondary/50 px-2 py-0.5 font-mono text-[9px] font-medium text-muted-foreground sm:px-2.5 sm:text-[10px]"
                                >
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="mt-3 border-t border-border/80 pt-2.5 sm:mt-4 sm:pt-3">
                            <a
                              href="https://judge.beecrowd.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hum-btn hum-btn--cyan w-full !py-2 sm:!py-2.5"
                            >
                              <span className="flex items-center justify-center gap-1.5 font-mono text-xs font-bold">
                                <span>
                                  {t("platforms.beecrowd.viewProfile")}
                                </span>
                                <ArrowUpRight className="hum-arrow h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ─── ICPC VIEW ─── */}
                  {activeModal === "icpc" && (
                    <motion.div
                      key="icpc"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3.5 sm:space-y-4.5"
                    >
                      {/* Top Header Card — Hallmark Coral Ribbon */}
                      <div
                        data-cursor="cover"
                        className="hum-card group relative overflow-hidden rounded-2xl border border-[var(--color-coral)]/30 bg-gradient-to-br from-[var(--color-coral)]/15 via-card to-card p-4 text-card-foreground shadow-xs sm:p-5 md:p-6"
                      >
                        <div
                          className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[var(--color-coral)] via-[var(--color-coral-light)] to-[var(--color-coral)]"
                          aria-hidden="true"
                        />

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-3 sm:gap-3.5">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--color-coral)]/30 bg-[var(--color-coral)]/20 text-[var(--color-coral-deep)] transition-transform duration-300 group-hover:scale-105 sm:h-13 sm:w-13 sm:rounded-2xl md:h-14 md:w-14 dark:text-[var(--color-coral)]">
                              <Trophy className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                <span className="mono-label text-[9px] font-bold tracking-widest uppercase sm:text-[10px]">
                                  {t("icpc.eyebrow")}
                                </span>
                                <span className="mono-label inline-flex items-center gap-1 rounded-full border border-[var(--color-coral)]/30 bg-[var(--color-coral)]/10 px-2 py-0.5 text-[9px] font-bold text-[var(--color-coral-deep)] sm:text-[10px] dark:text-[var(--color-coral)]">
                                  <Calendar className="h-3 w-3" />
                                  {t("icpc.date")}
                                </span>
                              </div>
                              <h4 className="mt-0.5 text-base font-bold text-foreground sm:text-lg md:text-xl">
                                {t("icpc.title")}
                              </h4>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                            {icpcBadges.map((badge) => (
                              <Badge
                                key={badge}
                                variant="secondary"
                                className="rounded-full border border-[var(--color-coral)]/25 bg-[var(--color-coral)]/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--color-coral-deep)] sm:px-3 sm:py-1 sm:text-xs dark:text-[var(--color-coral)]"
                              >
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {t("icpc.description")}
                        </p>

                        {/* Certificate Action & Verification Row */}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-2.5 border-t border-border/70 pt-3 sm:mt-5 sm:pt-4">
                          <div className="flex items-center gap-2">
                            <span className="hum-dot hum-dot--coral animate-pulse" />
                            <span className="mono-label text-[10px] text-muted-foreground sm:text-xs">
                              {t("modals.attendanceVerified")}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setShowCertificate(true)}
                            className="hum-btn hum-btn--coral !min-h-[36px] !px-3.5 !py-1.5 !font-mono !text-xs !font-bold"
                          >
                            <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span>{t("modals.viewCertificate")}</span>
                            <ArrowUpRight className="hum-arrow h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Organized Contest Intelligence Metrics Grid */}
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                        <div className="hum-card rounded-xl border border-border/70 bg-card/70 p-2.5 text-center sm:p-3.5">
                          <span className="mono-label text-[9px] text-muted-foreground uppercase sm:text-[10px]">
                            {t("modals.metrics.teamDynamics")}
                          </span>
                          <div className="mt-1 font-mono text-xs font-bold text-foreground sm:text-sm md:text-base">
                            {t("modals.metrics.teamDynamicsVal")}
                          </div>
                          <p className="mt-0.5 font-mono text-[9px] text-muted-foreground">
                            {t("modals.metrics.teamDynamicsDesc")}
                          </p>
                        </div>

                        <div className="hum-card rounded-xl border border-border/70 bg-card/70 p-2.5 text-center sm:p-3.5">
                          <span className="mono-label text-[9px] text-muted-foreground uppercase sm:text-[10px]">
                            {t("modals.metrics.duration")}
                          </span>
                          <div className="mt-1 font-mono text-xs font-bold text-foreground sm:text-sm md:text-base">
                            {t("modals.metrics.durationVal")}
                          </div>
                          <p className="mt-0.5 font-mono text-[9px] text-muted-foreground">
                            {t("modals.metrics.durationDesc")}
                          </p>
                        </div>

                        <div className="hum-card rounded-xl border border-border/70 bg-card/70 p-2.5 text-center sm:p-3.5">
                          <span className="mono-label text-[9px] text-muted-foreground uppercase sm:text-[10px]">
                            {t("modals.metrics.stack")}
                          </span>
                          <div className="mt-1 font-mono text-xs font-bold text-foreground sm:text-sm md:text-base">
                            {t("modals.metrics.stackVal")}
                          </div>
                          <p className="mt-0.5 font-mono text-[9px] text-muted-foreground">
                            {t("modals.metrics.stackDesc")}
                          </p>
                        </div>

                        <div className="hum-card rounded-xl border border-border/70 bg-card/70 p-2.5 text-center sm:p-3.5">
                          <span className="mono-label text-[9px] text-muted-foreground uppercase sm:text-[10px]">
                            {t("modals.metrics.domains")}
                          </span>
                          <div className="mt-1 font-mono text-xs font-bold text-foreground sm:text-sm md:text-base">
                            {t("modals.metrics.domainsVal")}
                          </div>
                          <p className="mt-0.5 font-mono text-[9px] text-muted-foreground">
                            {t("modals.metrics.domainsDesc")}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ─── MINDSET VIEW ─── */}
                  {activeModal === "mindset" && (
                    <motion.div
                      key="mindset"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="mb-3 sm:mb-4">
                        <h3 className="text-base font-bold text-foreground sm:text-lg md:text-xl">
                          {t("modals.mindsetHeading")}
                        </h3>
                        <p className="text-[11px] text-muted-foreground sm:text-xs md:text-sm">
                          {t("modals.mindsetSubheading")}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3.5">
                        {highlights.map((item, idx) => {
                          const Icon = highlightIcons[idx] || Sparkles
                          const accentStyles = [
                            {
                              border:
                                "border-[var(--color-mint)]/30 hover:border-[var(--color-mint)]/50",
                              iconBg:
                                "bg-[var(--color-mint)]/10 text-[var(--color-mint)] border-[var(--color-mint)]/20",
                              ribbon: "bg-[var(--color-mint)]",
                            },
                            {
                              border:
                                "border-[var(--color-cyan)]/30 hover:border-[var(--color-cyan)]/50",
                              iconBg:
                                "bg-[var(--color-cyan)]/10 text-[var(--color-cyan-deep)] dark:text-[var(--color-cyan)] border-[var(--color-cyan)]/20",
                              ribbon: "bg-[var(--color-cyan)]",
                            },
                            {
                              border:
                                "border-[var(--color-pear)]/30 hover:border-[var(--color-pear)]/50",
                              iconBg:
                                "bg-[var(--color-pear)]/10 text-[var(--color-pear-deep)] dark:text-[var(--color-pear)] border-[var(--color-pear)]/20",
                              ribbon: "bg-[var(--color-pear)]",
                            },
                          ][idx % 3]

                          return (
                            <div
                              key={item.title}
                              data-cursor="cover"
                              className={`hum-card group relative overflow-hidden rounded-2xl border bg-card p-3.5 text-card-foreground sm:p-4.5 ${accentStyles.border}`}
                            >
                              <div
                                className={`absolute inset-x-0 top-0 h-1 ${accentStyles.ribbon} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
                                aria-hidden="true"
                              />
                              <div className="flex items-start gap-3">
                                <div
                                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10 ${accentStyles.iconBg}`}
                                >
                                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div>
                                    <h4 className="text-xs font-bold text-card-foreground sm:text-sm">
                                      {item.title}
                                    </h4>
                                    <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground sm:mt-1.5 sm:text-xs">
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </AnimatePresence>,
          document.body
        )}

      {/* ICPC Certificate Image Viewer Modal */}
      {mounted &&
        showCertificate &&
        createPortal(
          <AnimatePresence>
            <div className="fixed inset-0 z-[100000] flex items-center justify-center p-2.5 sm:p-4 md:p-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setShowCertificate(false)}
                className="absolute inset-0 bg-background/85 backdrop-blur-md"
              />

              {/* Certificate Image Dialog */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[var(--color-coral)]/40 bg-card p-3 text-card-foreground shadow-2xl sm:rounded-3xl sm:p-5"
              >
                {/* Header with Title & Close Button */}
                <div className="mb-2 flex items-center justify-between gap-2 border-b border-border/70 pb-2 sm:mb-3.5 sm:pb-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[var(--color-coral)]/30 bg-[var(--color-coral)]/15 text-[var(--color-coral-deep)] sm:h-8 sm:w-8 sm:rounded-xl dark:text-[var(--color-coral)]">
                      <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-xs font-bold text-foreground xs:text-sm sm:text-base md:text-lg">
                        {t("modals.certTitle")}
                      </h3>
                      <p className="hidden truncate font-mono text-[10px] text-muted-foreground xs:block sm:text-xs">
                        {t("modals.certSubtitle")}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5">
                    <a
                      href="https://drive.google.com/file/d/1MPH7G7W5E90pciMGBCpsDr0GVBmhORhw/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hum-btn hum-btn--outline !min-h-[28px] !px-2 !py-1 !font-mono !text-[9px] sm:!min-h-[32px] sm:!px-2.5 sm:!text-xs"
                      title="Open in Google Drive"
                    >
                      <span className="hidden xs:inline">
                        {t("modals.driveLink")}
                      </span>
                      <span className="xs:hidden">Drive</span>
                      <ArrowUpRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setShowCertificate(false)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/80 bg-secondary/80 text-muted-foreground transition-all hover:border-destructive/40 hover:bg-destructive/15 hover:text-destructive active:scale-95 sm:h-8 sm:w-8 sm:rounded-xl"
                      aria-label="Close Certificate Viewer"
                    >
                      <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                </div>

                {/* Certificate Image Frame */}
                <div className="relative flex max-h-[68vh] min-h-[180px] w-full items-center justify-center overflow-auto rounded-xl border border-border/60 bg-muted/30 p-1 xs:max-h-[72vh] sm:max-h-[75vh] sm:p-2">
                  {/* Loading Skeleton / Spinner */}
                  {!certLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-card/60 backdrop-blur-xs sm:gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-coral)]/30 bg-[var(--color-coral)]/10 text-[var(--color-coral)] sm:h-10 sm:w-10 sm:rounded-xl">
                        <Loader2 className="h-4 w-4 animate-spin sm:h-5 sm:w-5" />
                      </div>
                      <span className="mono-label animate-pulse text-[10px] text-muted-foreground sm:text-xs">
                        {t("modals.loadingCert")}
                      </span>
                    </div>
                  )}

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://drive.usercontent.google.com/download?id=1MPH7G7W5E90pciMGBCpsDr0GVBmhORhw&authuser=0"
                    alt="ICPC 2025 Certificate of Participation"
                    className={`max-h-[66vh] w-auto max-w-full rounded-lg object-contain shadow-md transition-opacity duration-300 xs:max-h-[70vh] sm:max-h-[72vh] ${
                      certLoaded
                        ? "scale-100 opacity-100"
                        : "scale-98 opacity-0"
                    }`}
                    loading="eager"
                    decoding="async"
                    onLoad={() => setCertLoaded(true)}
                  />
                </div>
              </motion.div>
            </div>
          </AnimatePresence>,
          document.body
        )}
    </section>
  )
}

export default CompetitiveProgrammingSection
