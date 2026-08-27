"use client"

import React, { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import {
  Target,
  Trophy,
  Terminal,
  ExternalLink,
  Brain,
  CheckCircle2,
  Flame,
  Sparkles,
  X,
  Layers,
  ArrowUpRight,
  Code2,
  ChevronRight,
  Calendar,
} from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { AnimatePresence, motion } from "framer-motion"
import { StatCard, type Stat } from "./StatCard"

export type CPModalType = "platforms" | "icpc" | "mindset" | null

export interface HighlightItem {
  title: string
  description: string
}

export function CompetitiveProgrammingSection() {
  const t = useTranslations("CompetitiveProgramming")
  const [mounted, setMounted] = useState(false)
  const [activeModal, setActiveModal] = useState<CPModalType>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close on ESC key & prevent background scrolling when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveModal(null)
    }
    if (activeModal !== null) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeModal])

  const rawStats = t.raw("stats") as Stat[]
  const statIcons = [Terminal, Target, Trophy, Brain]
  const stats = rawStats.map((stat, i) => ({
    ...stat,
    icon: statIcons[i] || Brain,
  }))

  const highlights = (t.raw("highlights") as HighlightItem[]) || []
  const highlightIcons = [Brain, CheckCircle2, Flame]

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
        <div className="mb-4 max-w-3xl sm:mb-6">
          {/* Hallmark Eyebrow Badge */}
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-3.5 py-1.5 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase shadow-2xs sm:mb-3 sm:px-4 sm:py-2 sm:text-sm sm:tracking-[0.25em]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-rose-500" />
            <span>04 ⁄ {t("eyebrow")}</span>
          </div>

          {/* Grand Main Title */}
          <h2
            data-cursor="text"
            className="marlin-font text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {t("title1")}{" "}
            <span className="text-rose-600 dark:text-rose-400">
              {t("title2")}
            </span>{" "}
            <span className="font-normal text-muted-foreground">
              {t("title3")}
            </span>
          </h2>

          {/* Subtitle Description */}
          <p className="mt-2 max-w-2xl text-xs leading-relaxed font-normal text-muted-foreground sm:mt-3 sm:text-sm md:text-base">
            {t("description")}
          </p>
        </div>

        {/* 3 Focused Interactive Modal Hub Cards */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3 sm:gap-4 md:gap-5">
          {/* Card 1: Platforms Hub (Codeforces 229 + Beecrowd 130 = 359 Solved) */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-5 text-card-foreground shadow-xs transition-all duration-300 hover:border-amber-500/50 hover:shadow-md sm:p-6">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Terminal className="h-5 w-5" />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/25 bg-amber-500/10 px-2 py-0.5 font-mono text-[9px] font-bold text-amber-700 sm:text-[10px] dark:text-amber-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                  359 SOLVED
                </span>
              </div>

              <div className="mt-3 font-mono text-xl font-black text-foreground sm:text-2xl">
                Codeforces & Beecrowd
              </div>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                229 on Codeforces • 130 on Beecrowd with verified algorithmic topics.
              </p>
            </div>

            <div className="mt-5 pt-2">
              <Button
                variant="amber"
                size="sm"
                onClick={() => setActiveModal("platforms")}
                className="w-full rounded-full"
                frontClassName="rounded-full"
              >
                <span className="flex items-center justify-center gap-1.5 py-2.5 font-mono text-xs font-bold">
                  <span>View Platforms (359)</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Button>
            </div>
          </div>

          {/* Card 2: ICPC 2025 Contest Hub */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-5 text-card-foreground shadow-xs transition-all duration-300 hover:border-rose-500/50 hover:shadow-md sm:p-6">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  <Trophy className="h-5 w-5" />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/25 bg-rose-500/10 px-2 py-0.5 font-mono text-[9px] font-bold text-rose-700 sm:text-[10px] dark:text-rose-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                  DEC 2025
                </span>
              </div>

              <div className="mt-3 font-mono text-xl font-black text-foreground sm:text-2xl">
                ICPC 2025 Regional
              </div>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Official attendance in competitive programming team championship.
              </p>
            </div>

            <div className="mt-5 pt-2">
              <Button
                variant="rose"
                size="sm"
                onClick={() => setActiveModal("icpc")}
                className="w-full rounded-full"
                frontClassName="rounded-full"
              >
                <span className="flex items-center justify-center gap-1.5 py-2.5 font-mono text-xs font-bold">
                  <span>View ICPC '25 Honors</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Button>
            </div>
          </div>

          {/* Card 3: Algorithmic Mindset & Strengths Hub */}
          <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-5 text-card-foreground shadow-xs transition-all duration-300 hover:border-emerald-500/50 hover:shadow-md sm:p-6">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Brain className="h-5 w-5" />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-700 sm:text-[10px] dark:text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  METHODOLOGY
                </span>
              </div>

              <div className="mt-3 font-mono text-xl font-black text-foreground sm:text-2xl">
                Algorithmic Logic
              </div>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Problem deconstruction, performance complexity, and practice philosophy.
              </p>
            </div>

            <div className="mt-5 pt-2">
              <Button
                variant="emerald"
                size="sm"
                onClick={() => setActiveModal("mindset")}
                className="w-full rounded-full"
                frontClassName="rounded-full"
              >
                <span className="flex items-center justify-center gap-1.5 py-2.5 font-mono text-xs font-bold">
                  <span>View Methodology</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive In-Details Modal System with 3 Focused Views (Portaled to document.body ONLY when open) */}
      {mounted && activeModal !== null && createPortal(
        <AnimatePresence>
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 md:p-6">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Modal Dialog Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
              className="relative z-10 flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-border/90 bg-card text-card-foreground shadow-2xl"
            >
              {/* Modal Top Bar: Segmented 3-Tab Navigator & Close Button */}
              <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border/80 px-4 py-3 sm:px-6 sm:py-4">
                {/* 3 Focused Segmented Pills */}
                <div className="flex items-center gap-1.5 rounded-full border border-border/80 bg-secondary/50 p-1">
                  <button
                    type="button"
                    onClick={() => setActiveModal("platforms")}
                    className={`cursor-pointer rounded-full px-3 py-1 text-xs font-bold transition-all duration-200 ${
                      activeModal === "platforms"
                        ? "bg-amber-500 text-amber-950 shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    💻 Platforms (359)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModal("icpc")}
                    className={`cursor-pointer rounded-full px-3 py-1 text-xs font-bold transition-all duration-200 ${
                      activeModal === "icpc"
                        ? "bg-rose-600 text-white shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    🏆 ICPC 2025
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModal("mindset")}
                    className={`cursor-pointer rounded-full px-3 py-1 text-xs font-bold transition-all duration-200 ${
                      activeModal === "mindset"
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    🧠 Mindset
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  aria-label="Close modal"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-border/80 bg-secondary/50 text-muted-foreground transition-all duration-200 hover:scale-105 hover:bg-secondary hover:text-foreground sm:h-9 sm:w-9"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Content Viewport */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-7">
                {/* ─────────────────────────────────────────────────────────────
                    MODAL VIEW 1: PLATFORMS (Codeforces & Beecrowd Breakdown)
                   ───────────────────────────────────────────────────────────── */}
                {activeModal === "platforms" && (
                  <motion.div
                    key="platforms"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Header Summary */}
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-foreground sm:text-xl">
                          Competitive Programming Platforms
                        </h3>
                        <p className="text-xs text-muted-foreground sm:text-sm">
                          Verified solve count across Codeforces and Beecrowd online judges.
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-bold text-amber-700 dark:text-amber-300">
                        359 Total Solved
                      </span>
                    </div>

                    {/* 2 Platform Cards */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* Codeforces */}
                      <Card className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-5 text-card-foreground shadow-xs transition-all duration-300 hover:border-amber-500/40">
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500" />
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                <Terminal className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-mono text-[10px] font-bold text-muted-foreground uppercase">
                                    {t("platforms.codeforces.eyebrow")}
                                  </span>
                                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-1.5 py-0.2 font-mono text-[8px] font-bold text-emerald-700 dark:text-emerald-300">
                                    <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" />
                                    ACTIVE
                                  </span>
                                </div>
                                <h4 className="text-base font-bold text-foreground">
                                  {t("platforms.codeforces.name")}
                                </h4>
                              </div>
                            </div>
                            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-xs font-bold text-amber-700 dark:text-amber-300">
                              229 Solved
                            </span>
                          </div>

                          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                            {t("platforms.codeforces.description")}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-1">
                            {cfTopics.map((topic) => (
                              <Badge
                                key={topic}
                                variant="secondary"
                                className="rounded-full border border-border/60 bg-secondary/50 px-2.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground"
                              >
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 border-t border-border/80 pt-3">
                          <Button
                            variant="amber"
                            size="sm"
                            href="https://codeforces.com/profile/YOUR_HANDLE"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full rounded-full"
                            frontClassName="rounded-full"
                          >
                            <span className="py-2.5">
                              {t("platforms.codeforces.viewProfile")}
                            </span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </Card>

                      {/* Beecrowd */}
                      <Card className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-5 text-card-foreground shadow-xs transition-all duration-300 hover:border-sky-500/40">
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 via-emerald-500 to-sky-500" />
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400">
                                <Target className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-mono text-[10px] font-bold text-muted-foreground uppercase">
                                    {t("platforms.beecrowd.eyebrow")}
                                  </span>
                                  <span className="inline-flex items-center gap-1 rounded-full border border-sky-500/25 bg-sky-500/10 px-1.5 py-0.2 font-mono text-[8px] font-bold text-sky-700 dark:text-sky-300">
                                    <span className="h-1 w-1 animate-pulse rounded-full bg-sky-500" />
                                    ACTIVE
                                  </span>
                                </div>
                                <h4 className="text-base font-bold text-foreground">
                                  {t("platforms.beecrowd.name")}
                                </h4>
                              </div>
                            </div>
                            <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-0.5 font-mono text-xs font-bold text-sky-700 dark:text-sky-300">
                              130 Solved
                            </span>
                          </div>

                          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                            {t("platforms.beecrowd.description")}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-1">
                            {beeTopics.map((topic) => (
                              <Badge
                                key={topic}
                                variant="secondary"
                                className="rounded-full border border-border/60 bg-secondary/50 px-2.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground"
                              >
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 border-t border-border/80 pt-3">
                          <Button
                            variant="sky"
                            size="sm"
                            href="https://judge.beecrowd.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full rounded-full"
                            frontClassName="rounded-full"
                          >
                            <span className="py-2.5">
                              {t("platforms.beecrowd.viewProfile")}
                            </span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </motion.div>
                )}

                {/* ─────────────────────────────────────────────────────────────
                    MODAL VIEW 2: ICPC 2025 REGIONAL CONTEST
                   ───────────────────────────────────────────────────────────── */}
                {activeModal === "icpc" && (
                  <motion.div
                    key="icpc"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-foreground sm:text-xl">
                        ICPC 2025 Contest Participation
                      </h3>
                      <p className="text-xs text-muted-foreground sm:text-sm">
                        International Collegiate Programming Contest (Regional Attendance).
                      </p>
                    </div>

                    {/* Grand Trophy Card */}
                    <Card className="overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/15 via-card to-card p-5 text-card-foreground shadow-sm sm:p-7">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3.5">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/20 text-amber-600 sm:h-14 sm:w-14 dark:text-amber-400">
                            <Trophy className="h-6 w-6 sm:h-7 sm:w-7" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold tracking-widest text-amber-700 uppercase dark:text-amber-300">
                                {t("icpc.eyebrow")}
                              </span>
                              <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-700 dark:text-amber-300">
                                <Calendar className="h-3 w-3" />
                                {t("icpc.date")}
                              </span>
                            </div>
                            <h4 className="text-base font-bold text-foreground sm:text-lg md:text-xl">
                              {t("icpc.title")}
                            </h4>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          {icpcBadges.map((badge) => (
                            <Badge
                              key={badge}
                              variant="secondary"
                              className="rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 font-mono text-xs font-semibold text-amber-800 dark:text-amber-200"
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {t("icpc.description")}
                      </p>

                      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border/70 pt-4 sm:grid-cols-4">
                        <div className="rounded-xl border border-border/60 bg-card/60 p-3 text-center">
                          <div className="font-mono text-xs text-muted-foreground">Team Size</div>
                          <div className="mt-1 font-mono text-base font-bold text-foreground">3 Members</div>
                        </div>
                        <div className="rounded-xl border border-border/60 bg-card/60 p-3 text-center">
                          <div className="font-mono text-xs text-muted-foreground">Contest Length</div>
                          <div className="mt-1 font-mono text-base font-bold text-foreground">5 Hours</div>
                        </div>
                        <div className="rounded-xl border border-border/60 bg-card/60 p-3 text-center">
                          <div className="font-mono text-xs text-muted-foreground">Focus</div>
                          <div className="mt-1 font-mono text-base font-bold text-foreground">DSA & Logic</div>
                        </div>
                        <div className="rounded-xl border border-border/60 bg-card/60 p-3 text-center">
                          <div className="font-mono text-xs text-muted-foreground">Language</div>
                          <div className="mt-1 font-mono text-base font-bold text-foreground">C++ / STL</div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* ─────────────────────────────────────────────────────────────
                    MODAL VIEW 3: ALGORITHMIC MINDSET & PHILOSOPHY
                   ───────────────────────────────────────────────────────────── */}
                {activeModal === "mindset" && (
                  <motion.div
                    key="mindset"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-foreground sm:text-xl">
                        Algorithmic Philosophy & Strengths
                      </h3>
                      <p className="text-xs text-muted-foreground sm:text-sm">
                        Core habits, analytical thinking, and disciplined problem deconstruction.
                      </p>
                    </div>

                    <div className="grid gap-3.5 sm:grid-cols-3">
                      {highlights.map((item, idx) => {
                        const Icon = highlightIcons[idx] || Sparkles
                        const accentStyles = [
                          {
                            border: "border-emerald-500/30 hover:border-emerald-500/50",
                            iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
                          },
                          {
                            border: "border-sky-500/30 hover:border-sky-500/50",
                            iconBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
                          },
                          {
                            border: "border-amber-500/30 hover:border-amber-500/50",
                            iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
                          },
                        ][idx % 3]

                        return (
                          <Card
                            key={item.title}
                            className={`group rounded-2xl border bg-card p-4.5 text-card-foreground shadow-2xs transition-all duration-300 ${accentStyles.border}`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105 ${accentStyles.iconBg}`}
                              >
                                <Icon className="h-5 w-5" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <CardHeader className="p-0">
                                  <CardTitle className="text-sm font-bold text-card-foreground">
                                    {item.title}
                                  </CardTitle>
                                  <CardDescription className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                                    {item.description}
                                  </CardDescription>
                                </CardHeader>
                              </div>
                            </div>
                          </Card>
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
    </section>
  )
}

export default CompetitiveProgrammingSection
