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
  CheckCircle2,
} from "lucide-react"

import { useTranslations } from "next-intl"
import { AnimatePresence, motion } from "framer-motion"
import { useMounted } from "@/hooks/use-mounted"
import { StatCard } from "./StatCard"
import { M3FacetedBadge, M3Progress } from "@/components/m3/M3Shapes"

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
      data-section="competitions"
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)] transition-colors duration-300"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-10 md:py-8 lg:px-12 2xl:max-w-[1440px]">
        {/* Section Header */}
        <div className="mb-3 max-w-3xl sm:mb-5 md:mb-6">
          {/* M3 Expressive Pill Badge with Coral Accent Indicator */}
          <div className="mb-2 flex items-center justify-between gap-2 sm:mb-2.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-high)] px-3 py-1 font-mono text-xs font-semibold tracking-wider text-[var(--md-sys-color-on-surface-variant)] uppercase shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[var(--md-sys-color-primary)]" />
              <span>04 ⁄ {t("eyebrow")}</span>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-high)] px-2.5 py-0.5 font-mono text-[10px] font-medium text-[var(--md-sys-color-on-surface-variant)] md:hidden">
              <span className="animate-pulse">←</span>
              <span>Swipe</span>
              <span className="animate-pulse">→</span>
            </div>
          </div>

          {/* Section Main Title: Display Medium */}
          <h2
            data-cursor="text"
            className="text-2xl font-black tracking-tight text-[var(--md-sys-color-on-surface)] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
          >
            {t("title1")}{" "}
            <span className="text-[var(--md-sys-color-primary)]">
              {t("title2")}
            </span>{" "}
            <span className="font-normal text-[var(--md-sys-color-on-surface-variant)]">
              {t("title3")}
            </span>
          </h2>

          {/* Subtitle Description */}
          <p className="mt-1 max-w-2xl text-xs leading-relaxed font-normal text-[var(--md-sys-color-on-surface-variant)] sm:mt-2 sm:text-sm md:text-base">
            {t("description")}
          </p>
        </div>

        {/* Hub Cards: Desktop 3-Column Grid of Authentic M3 Expressive Tonal Containers */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-4 lg:gap-5">
          {/* Card 1: Platforms Hub (Codeforces & Beecrowd / LeetCode) */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container)] p-5 text-[var(--md-sys-color-on-surface)] transition-all duration-300 hover:bg-[var(--md-sys-color-surface-container-high)] hover:border-[var(--md-sys-color-primary)]">
            <div>
              <div className="flex items-center justify-between gap-2">
                <M3FacetedBadge
                  shape="cookie8"
                  icon={Terminal}
                  size={46}
                  iconClassName="h-5 w-5"
                />
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-highest)] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[var(--md-sys-color-on-surface-variant)] uppercase">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--md-sys-color-primary)]" />
                  {t("cards.platformsTag")}
                </span>
              </div>

              <div className="mt-3 font-mono text-lg font-black text-[var(--md-sys-color-on-surface)] sm:text-xl md:text-2xl">
                {t("cards.platformsTitle")}
              </div>
              <p className="mt-1 text-xs text-[var(--md-sys-color-on-surface-variant)] sm:text-sm">
                {t("cards.platformsDesc")}
              </p>

              {/* Progress Indicator */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--md-sys-color-on-surface-variant)] mb-1">
                  <span>Codeforces & Judges</span>
                  <span className="font-bold text-[var(--md-sys-color-primary)]">359 Solved</span>
                </div>
                <M3Progress value={85} color="primary" />
              </div>
            </div>

            <div className="mt-5 pt-2">
              <button
                type="button"
                onClick={() => setActiveModal("platforms")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--md-sys-color-primary-container)] px-4 py-2.5 font-mono text-xs font-bold text-[var(--md-sys-color-on-primary-container)] transition-all duration-200 hover:bg-[var(--md-sys-color-primary)] hover:text-[var(--md-sys-color-on-primary)] active:scale-[0.98]"
              >
                <span>{t("cards.platformsBtn")}</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Card 2: ICPC & NCPC Contests */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container)] p-5 text-[var(--md-sys-color-on-surface)] transition-all duration-300 hover:bg-[var(--md-sys-color-surface-container-high)] hover:border-[var(--md-sys-color-primary)]">
            <div>
              <div className="flex items-center justify-between gap-2">
                <M3FacetedBadge
                  shape="gem"
                  icon={Trophy}
                  size={46}
                  iconClassName="h-5 w-5"
                />
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-highest)] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[var(--md-sys-color-on-surface-variant)] uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--md-sys-color-primary)]" />
                  {t("cards.icpcTag")}
                </span>
              </div>

              <div className="mt-3 font-mono text-lg font-black text-[var(--md-sys-color-on-surface)] sm:text-xl md:text-2xl">
                {t("cards.icpcTitle")}
              </div>
              <p className="mt-1 text-xs text-[var(--md-sys-color-on-surface-variant)] sm:text-sm">
                {t("cards.icpcDesc")}
              </p>

              {/* Progress Indicator */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--md-sys-color-on-surface-variant)] mb-1">
                  <span>Regional & NCPC</span>
                  <span className="font-bold text-[var(--md-sys-color-primary)]">Honors Verified</span>
                </div>
                <M3Progress value={100} color="secondary" />
              </div>
            </div>

            <div className="mt-5 pt-2">
              <button
                type="button"
                onClick={() => setActiveModal("icpc")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--md-sys-color-primary)] px-4 py-2.5 font-mono text-xs font-bold text-[var(--md-sys-color-on-primary)] shadow-sm transition-all duration-200 hover:bg-[var(--md-sys-color-primary)]/90 hover:shadow-md active:scale-[0.98]"
              >
                <span>{t("cards.icpcBtn")}</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Card 3: Algorithmic Mindset & Complexity */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container)] p-5 text-[var(--md-sys-color-on-surface)] transition-all duration-300 hover:bg-[var(--md-sys-color-surface-container-high)] hover:border-[var(--md-sys-color-primary)]">
            <div>
              <div className="flex items-center justify-between gap-2">
                <M3FacetedBadge
                  shape="diamond"
                  icon={Brain}
                  size={46}
                  iconClassName="h-5 w-5"
                />
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-highest)] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[var(--md-sys-color-on-surface-variant)] uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--md-sys-color-tertiary)]" />
                  {t("cards.mindsetTag")}
                </span>
              </div>

              <div className="mt-3 font-mono text-lg font-black text-[var(--md-sys-color-on-surface)] sm:text-xl md:text-2xl">
                {t("cards.mindsetTitle")}
              </div>
              <p className="mt-1 text-xs text-[var(--md-sys-color-on-surface-variant)] sm:text-sm">
                {t("cards.mindsetDesc")}
              </p>

              {/* Progress Indicator */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--md-sys-color-on-surface-variant)] mb-1">
                  <span>Data Structures & DP</span>
                  <span className="font-bold text-[var(--md-sys-color-tertiary)]">Continuous Practice</span>
                </div>
                <M3Progress value={92} color="tertiary" />
              </div>
            </div>

            <div className="mt-5 pt-2">
              <button
                type="button"
                onClick={() => setActiveModal("mindset")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--md-sys-color-secondary-container)] px-4 py-2.5 font-mono text-xs font-bold text-[var(--md-sys-color-on-secondary-container)] transition-all duration-200 hover:bg-[var(--md-sys-color-secondary-container)]/80 active:scale-[0.98]"
              >
                <span>{t("cards.mindsetBtn")}</span>
                <ArrowUpRight className="h-4 w-4" />
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
                  <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container)] p-4 text-[var(--md-sys-color-on-surface)] shadow-xs">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <M3FacetedBadge
                          shape="cookie8"
                          icon={Terminal}
                          size={40}
                          iconClassName="h-4 w-4"
                        />
                        <span className="inline-flex items-center gap-1 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-highest)] px-2 py-0.5 font-mono text-[9px] font-bold text-[var(--md-sys-color-on-surface-variant)]">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--md-sys-color-primary)]" />
                          {t("cards.platformsTag")}
                        </span>
                      </div>
                      <div className="mt-2 font-mono text-base font-black text-[var(--md-sys-color-on-surface)]">
                        {t("cards.platformsTitle")}
                      </div>
                      <p className="mt-1 text-xs text-[var(--md-sys-color-on-surface-variant)]">
                        {t("cards.platformsDesc")}
                      </p>
                    </div>
                    <div className="mt-3.5 pt-1">
                      <button
                        type="button"
                        onClick={() => setActiveModal("platforms")}
                        className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--md-sys-color-primary-container)] py-2 font-mono text-xs font-bold text-[var(--md-sys-color-on-primary-container)]"
                      >
                        <span>{t("cards.platformsBtn")}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {hubIdx === 1 && (
                  <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container)] p-4 text-[var(--md-sys-color-on-surface)] shadow-xs">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <M3FacetedBadge
                          shape="gem"
                          icon={Trophy}
                          size={40}
                          iconClassName="h-4 w-4"
                        />
                        <span className="inline-flex items-center gap-1 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-highest)] px-2 py-0.5 font-mono text-[9px] font-bold text-[var(--md-sys-color-on-surface-variant)]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--md-sys-color-primary)]" />
                          {t("cards.icpcTag")}
                        </span>
                      </div>
                      <div className="mt-2 font-mono text-base font-black text-[var(--md-sys-color-on-surface)]">
                        {t("cards.icpcTitle")}
                      </div>
                      <p className="mt-1 text-xs text-[var(--md-sys-color-on-surface-variant)]">
                        {t("cards.icpcDesc")}
                      </p>
                    </div>
                    <div className="mt-3.5 pt-1">
                      <button
                        type="button"
                        onClick={() => setActiveModal("icpc")}
                        className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--md-sys-color-primary)] py-2 font-mono text-xs font-bold text-[var(--md-sys-color-on-primary)] shadow-sm"
                      >
                        <span>{t("cards.icpcBtn")}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {hubIdx === 2 && (
                  <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container)] p-4 text-[var(--md-sys-color-on-surface)] shadow-xs">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <M3FacetedBadge
                          shape="diamond"
                          icon={Brain}
                          size={40}
                          iconClassName="h-4 w-4"
                        />
                        <span className="inline-flex items-center gap-1 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-highest)] px-2 py-0.5 font-mono text-[9px] font-bold text-[var(--md-sys-color-on-surface-variant)]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--md-sys-color-tertiary)]" />
                          {t("cards.mindsetTag")}
                        </span>
                      </div>
                      <div className="mt-2 font-mono text-base font-black text-[var(--md-sys-color-on-surface)]">
                        {t("cards.mindsetTitle")}
                      </div>
                      <p className="mt-1 text-xs text-[var(--md-sys-color-on-surface-variant)]">
                        {t("cards.mindsetDesc")}
                      </p>
                    </div>
                    <div className="mt-3.5 pt-1">
                      <button
                        type="button"
                        onClick={() => setActiveModal("mindset")}
                        className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--md-sys-color-secondary-container)] py-2 font-mono text-xs font-bold text-[var(--md-sys-color-on-secondary-container)]"
                      >
                        <span>{t("cards.mindsetBtn")}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
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
                    ? "w-6 bg-[var(--md-sys-color-primary)]"
                    : "w-1.5 bg-[var(--md-sys-color-outline-variant)]"
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

      {/* Modal System: M3 Expressive Dialog with Tonal Containers */}
      {mounted &&
        activeModal !== null &&
        createPortal(
          <AnimatePresence>
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-2.5 sm:p-4 md:p-6">
              {/* Scrim Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModal(null)}
                className="absolute inset-0 bg-black"
              />

              {/* Modal Dialog: Surface Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
                className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container)] text-[var(--md-sys-color-on-surface)] shadow-2xl sm:max-h-[85vh]"
              >
                {/* Modal Top Bar */}
                <div className="flex shrink-0 items-center justify-between gap-2 border-b border-[var(--md-sys-color-outline-variant)]/60 px-3 py-2.5 sm:px-6 sm:py-4">
                  {/* Segmented Filter Pills */}
                  <div className="flex max-w-[calc(100%-2.5rem)] scrollbar-none flex-nowrap items-center gap-1 overflow-x-auto rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] p-1 sm:max-w-none sm:gap-1.5">
                    <button
                      type="button"
                      onClick={() => setActiveModal("platforms")}
                      className={`shrink-0 cursor-pointer rounded-full px-3 py-1 font-mono text-[11px] font-bold transition-all duration-200 sm:px-4 sm:py-1.5 sm:text-xs ${
                        activeModal === "platforms"
                          ? "bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] shadow-xs"
                          : "text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-on-surface)]"
                      }`}
                    >
                      {t("modals.tabs.platforms")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveModal("icpc")}
                      className={`shrink-0 cursor-pointer rounded-full px-3 py-1 font-mono text-[11px] font-bold transition-all duration-200 sm:px-4 sm:py-1.5 sm:text-xs ${
                        activeModal === "icpc"
                          ? "bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] shadow-xs"
                          : "text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-on-surface)]"
                      }`}
                    >
                      {t("modals.tabs.icpc")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveModal("mindset")}
                      className={`shrink-0 cursor-pointer rounded-full px-3 py-1 font-mono text-[11px] font-bold transition-all duration-200 sm:px-4 sm:py-1.5 sm:text-xs ${
                        activeModal === "mindset"
                          ? "bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] shadow-xs"
                          : "text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-on-surface)]"
                      }`}
                    >
                      {t("modals.tabs.mindset")}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    aria-label="Close modal"
                    className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-high)] text-[var(--md-sys-color-on-surface-variant)] transition-all hover:bg-[var(--md-sys-color-surface-container-highest)] hover:text-[var(--md-sys-color-on-surface)]"
                  >
                    <X className="h-4 w-4" />
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
                          <h3 className="text-base font-bold text-[var(--md-sys-color-on-surface)] sm:text-lg md:text-xl">
                            {t("modals.platformsHeading")}
                          </h3>
                          <p className="text-[11px] text-[var(--md-sys-color-on-surface-variant)] sm:text-xs md:text-sm">
                            {t("modals.platformsSubheading")}
                          </p>
                        </div>
                        <span className="shrink-0 self-start rounded-full border border-[var(--md-sys-color-primary)]/30 bg-[var(--md-sys-color-primary-container)] px-3 py-1 font-mono text-xs font-bold text-[var(--md-sys-color-on-primary-container)] sm:self-auto">
                          {t("modals.totalSolvedBadge")}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                        {/* Codeforces Card */}
                        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] p-4 text-[var(--md-sys-color-on-surface)] transition-all hover:bg-[var(--md-sys-color-surface-container-high)]">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-3">
                                <M3FacetedBadge
                                  shape="cookie8"
                                  icon={Terminal}
                                  size={44}
                                  iconClassName="h-5 w-5"
                                />
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-mono text-[10px] font-bold text-[var(--md-sys-color-on-surface-variant)] uppercase">
                                      {t("platforms.codeforces.eyebrow")}
                                    </span>
                                    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-highest)] px-1.5 py-0.2 font-mono text-[8px] font-bold text-emerald-600 dark:text-emerald-400">
                                      <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" />
                                      ACTIVE
                                    </span>
                                  </div>
                                  <h4 className="text-base font-bold text-[var(--md-sys-color-on-surface)]">
                                    {t("platforms.codeforces.name")}
                                  </h4>
                                </div>
                              </div>
                              <span className="shrink-0 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-highest)] px-2.5 py-0.5 font-mono text-xs font-bold text-[var(--md-sys-color-primary)]">
                                229 Solved
                              </span>
                            </div>

                            <p className="mt-3 text-xs leading-relaxed text-[var(--md-sys-color-on-surface-variant)]">
                              {t("platforms.codeforces.description")}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {cfTopics.map((topic) => (
                                <span
                                  key={topic}
                                  className="rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container)] px-2.5 py-0.5 font-mono text-[10px] font-medium text-[var(--md-sys-color-on-surface)]"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-4 border-t border-[var(--md-sys-color-outline-variant)]/60 pt-3">
                            <a
                              href="https://codeforces.com/profile/jaber02"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--md-sys-color-primary)] px-4 py-2 font-mono text-xs font-bold text-[var(--md-sys-color-on-primary)] shadow-sm hover:bg-[var(--md-sys-color-primary)]/90"
                            >
                              <span>{t("platforms.codeforces.viewProfile")}</span>
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </div>

                        {/* Beecrowd / LeetCode Card */}
                        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] p-4 text-[var(--md-sys-color-on-surface)] transition-all hover:bg-[var(--md-sys-color-surface-container-high)]">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-3">
                                <M3FacetedBadge
                                  shape="gem"
                                  icon={Target}
                                  size={44}
                                  iconClassName="h-5 w-5"
                                />
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-mono text-[10px] font-bold text-[var(--md-sys-color-on-surface-variant)] uppercase">
                                      {t("platforms.beecrowd.eyebrow")}
                                    </span>
                                    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-highest)] px-1.5 py-0.2 font-mono text-[8px] font-bold text-sky-600 dark:text-sky-400">
                                      <span className="h-1 w-1 animate-pulse rounded-full bg-sky-500" />
                                      ACTIVE
                                    </span>
                                  </div>
                                  <h4 className="text-base font-bold text-[var(--md-sys-color-on-surface)]">
                                    {t("platforms.beecrowd.name")}
                                  </h4>
                                </div>
                              </div>
                              <span className="shrink-0 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-highest)] px-2.5 py-0.5 font-mono text-xs font-bold text-[var(--md-sys-color-secondary)]">
                                130 Solved
                              </span>
                            </div>

                            <p className="mt-3 text-xs leading-relaxed text-[var(--md-sys-color-on-surface-variant)]">
                              {t("platforms.beecrowd.description")}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {beeTopics.map((topic) => (
                                <span
                                  key={topic}
                                  className="rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container)] px-2.5 py-0.5 font-mono text-[10px] font-medium text-[var(--md-sys-color-on-surface)]"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-4 border-t border-[var(--md-sys-color-outline-variant)]/60 pt-3">
                            <a
                              href="https://judge.beecrowd.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--md-sys-color-secondary-container)] px-4 py-2 font-mono text-xs font-bold text-[var(--md-sys-color-on-secondary-container)] hover:bg-[var(--md-sys-color-secondary-container)]/80"
                            >
                              <span>{t("platforms.beecrowd.viewProfile")}</span>
                              <ArrowUpRight className="h-3.5 w-3.5" />
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
                      className="space-y-4"
                    >
                      <div className="relative overflow-hidden rounded-2xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] p-5 text-[var(--md-sys-color-on-surface)] shadow-xs">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-3.5">
                            <M3FacetedBadge
                              shape="gem"
                              icon={Trophy}
                              size={52}
                              iconClassName="h-6 w-6"
                            />
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-[10px] font-bold tracking-widest text-[var(--md-sys-color-on-surface-variant)] uppercase">
                                  {t("icpc.eyebrow")}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-highest)] px-2 py-0.5 font-mono text-[10px] font-bold text-[var(--md-sys-color-primary)]">
                                  <Calendar className="h-3 w-3" />
                                  {t("icpc.date")}
                                </span>
                              </div>
                              <h4 className="mt-0.5 text-lg font-bold text-[var(--md-sys-color-on-surface)]">
                                {t("icpc.title")}
                              </h4>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5">
                            {icpcBadges.map((badge) => (
                              <span
                                key={badge}
                                className="rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container)] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--md-sys-color-on-surface)]"
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-[var(--md-sys-color-on-surface-variant)]">
                          {t("icpc.description")}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-2.5 border-t border-[var(--md-sys-color-outline-variant)]/60 pt-3.5">
                          <div className="flex items-center gap-2 font-mono text-xs text-[var(--md-sys-color-on-surface-variant)]">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            <span>{t("modals.attendanceVerified")}</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setShowCertificate(true)}
                            className="inline-flex items-center gap-2 rounded-full bg-[var(--md-sys-color-primary)] px-4 py-1.5 font-mono text-xs font-bold text-[var(--md-sys-color-on-primary)] shadow-sm hover:bg-[var(--md-sys-color-primary)]/90"
                          >
                            <Award className="h-3.5 w-3.5" />
                            <span>{t("modals.viewCertificate")}</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Contest Intelligence Metrics Grid */}
                      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                        <div className="rounded-xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] p-3 text-center">
                          <span className="font-mono text-[9px] text-[var(--md-sys-color-on-surface-variant)] uppercase">
                            {t("modals.metrics.teamDynamics")}
                          </span>
                          <div className="mt-1 font-mono text-xs sm:text-sm font-bold text-[var(--md-sys-color-on-surface)]">
                            {t("modals.metrics.teamDynamicsVal")}
                          </div>
                          <p className="mt-0.5 font-mono text-[9px] text-[var(--md-sys-color-on-surface-variant)]">
                            {t("modals.metrics.teamDynamicsDesc")}
                          </p>
                        </div>

                        <div className="rounded-xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] p-3 text-center">
                          <span className="font-mono text-[9px] text-[var(--md-sys-color-on-surface-variant)] uppercase">
                            {t("modals.metrics.duration")}
                          </span>
                          <div className="mt-1 font-mono text-xs sm:text-sm font-bold text-[var(--md-sys-color-on-surface)]">
                            {t("modals.metrics.durationVal")}
                          </div>
                          <p className="mt-0.5 font-mono text-[9px] text-[var(--md-sys-color-on-surface-variant)]">
                            {t("modals.metrics.durationDesc")}
                          </p>
                        </div>

                        <div className="rounded-xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] p-3 text-center">
                          <span className="font-mono text-[9px] text-[var(--md-sys-color-on-surface-variant)] uppercase">
                            {t("modals.metrics.stack")}
                          </span>
                          <div className="mt-1 font-mono text-xs sm:text-sm font-bold text-[var(--md-sys-color-on-surface)]">
                            {t("modals.metrics.stackVal")}
                          </div>
                          <p className="mt-0.5 font-mono text-[9px] text-[var(--md-sys-color-on-surface-variant)]">
                            {t("modals.metrics.stackDesc")}
                          </p>
                        </div>

                        <div className="rounded-xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] p-3 text-center">
                          <span className="font-mono text-[9px] text-[var(--md-sys-color-on-surface-variant)] uppercase">
                            {t("modals.metrics.domains")}
                          </span>
                          <div className="mt-1 font-mono text-xs sm:text-sm font-bold text-[var(--md-sys-color-on-surface)]">
                            {t("modals.metrics.domainsVal")}
                          </div>
                          <p className="mt-0.5 font-mono text-[9px] text-[var(--md-sys-color-on-surface-variant)]">
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
                        <h3 className="text-base font-bold text-[var(--md-sys-color-on-surface)] sm:text-lg md:text-xl">
                          {t("modals.mindsetHeading")}
                        </h3>
                        <p className="text-[11px] text-[var(--md-sys-color-on-surface-variant)] sm:text-xs md:text-sm">
                          {t("modals.mindsetSubheading")}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {highlights.map((item, idx) => {
                          const Icon = highlightIcons[idx] || Sparkles
                          const shapes = ["diamond", "cookie8", "gem"] as const
                          const shape = shapes[idx % shapes.length]

                          return (
                            <div
                              key={item.title}
                              className="group relative flex flex-col justify-between rounded-2xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] p-4 text-[var(--md-sys-color-on-surface)] transition-all hover:bg-[var(--md-sys-color-surface-container-high)]"
                            >
                              <div>
                                <div className="flex items-center gap-3">
                                  <M3FacetedBadge
                                    shape={shape}
                                    icon={Icon}
                                    size={40}
                                    iconClassName="h-4.5 w-4.5"
                                  />
                                  <h4 className="text-sm font-bold text-[var(--md-sys-color-on-surface)]">
                                    {item.title}
                                  </h4>
                                </div>

                                <p className="mt-2.5 text-xs leading-relaxed text-[var(--md-sys-color-on-surface-variant)]">
                                  {item.description}
                                </p>
                              </div>

                              <div className="mt-3.5 pt-2 border-t border-[var(--md-sys-color-outline-variant)]/60">
                                <M3Progress value={80 + idx * 8} />
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
              {/* Scrim Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setShowCertificate(false)}
                className="absolute inset-0 bg-black"
              />

              {/* Dialog Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container)] p-3 text-[var(--md-sys-color-on-surface)] shadow-2xl sm:p-5"
              >
                {/* Header */}
                <div className="mb-2 flex items-center justify-between gap-2 border-b border-[var(--md-sys-color-outline-variant)]/60 pb-2 sm:mb-3.5 sm:pb-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <M3FacetedBadge
                      shape="gem"
                      icon={Award}
                      size={36}
                      iconClassName="h-4 w-4"
                    />
                    <div className="min-w-0">
                      <h3 className="truncate text-xs font-bold text-[var(--md-sys-color-on-surface)] xs:text-sm sm:text-base md:text-lg">
                        {t("modals.certTitle")}
                      </h3>
                      <p className="hidden truncate font-mono text-[10px] text-[var(--md-sys-color-on-surface-variant)] xs:block sm:text-xs">
                        {t("modals.certSubtitle")}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <a
                      href="https://drive.google.com/file/d/1MPH7G7W5E90pciMGBCpsDr0GVBmhORhw/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-high)] px-3 py-1.5 font-mono text-xs font-medium text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-container-highest)]"
                      title="Open in Google Drive"
                    >
                      <span className="hidden xs:inline">
                        {t("modals.driveLink")}
                      </span>
                      <span className="xs:hidden">Drive</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setShowCertificate(false)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-high)] text-[var(--md-sys-color-on-surface-variant)] hover:bg-[var(--md-sys-color-surface-container-highest)] hover:text-[var(--md-sys-color-on-surface)]"
                      aria-label="Close Certificate Viewer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Certificate Frame */}
                <div className="relative flex max-h-[68vh] min-h-[180px] w-full items-center justify-center overflow-auto rounded-2xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-lowest)] p-2 xs:max-h-[72vh] sm:max-h-[75vh]">
                  {!certLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[var(--md-sys-color-surface-container-lowest)]/80 backdrop-blur-xs">
                      <Loader2 className="h-6 w-6 animate-spin text-[var(--md-sys-color-primary)]" />
                      <span className="font-mono text-xs text-[var(--md-sys-color-on-surface-variant)] animate-pulse">
                        {t("modals.loadingCert")}
                      </span>
                    </div>
                  )}

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://drive.usercontent.google.com/download?id=1MPH7G7W5E90pciMGBCpsDr0GVBmhORhw&authuser=0"
                    alt="ICPC 2025 Certificate of Participation"
                    className={`max-h-[66vh] w-auto max-w-full rounded-xl object-contain shadow-md transition-opacity duration-300 xs:max-h-[70vh] sm:max-h-[72vh] ${
                      certLoaded ? "opacity-100 scale-100" : "opacity-0 scale-98"
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
