"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import {
  ArrowDownRight,
  ArrowUpRight,
  Sparkles,
  Zap,
  Brain,
} from "lucide-react"

export function Hero() {
  const t = useTranslations("Hero")

  return (
    <section
      id="home"
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground"
    >
      {/* Ambient Spotlight / Shadow blurs behind section commented out to prevent rendering glitches
      <div
        className="pointer-events-none absolute top-0 left-0 h-[450px] w-[450px] rounded-full bg-amber-500/[0.04] blur-[120px] transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${mouse.x - 225}px, ${mouse.y - 225}px)`,
        }}
      />
      <div
        className="pointer-events-none absolute top-0 left-0 h-[380px] w-[380px] rounded-full bg-sky-500/[0.03] blur-[100px] transition-transform duration-150 ease-out"
        style={{
          transform: `translate(${mouse.x - 190}px, ${mouse.y - 190}px)`,
        }}
      />
      */}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12 2xl:max-w-360">
        {/* Hallmark Hum Eyebrow with Pulsing Mint Dot */}
        <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/90 px-3.5 py-1.5 shadow-2xs transition-all duration-300 hover:border-emerald-500/40 sm:mb-6 sm:px-4 sm:py-2">
          <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 sm:h-2.5 sm:w-2.5" />
          </span>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase sm:text-sm sm:tracking-[0.25em]">
            01 ⁄ {t("available")}
          </span>
        </div>

        {/* Editorial Confident Rounded Sans Display Typography */}
        <div className="flex flex-wrap items-center">
          <h1 className="marlin-font preserve-design text-5xl leading-none font-black tracking-tight text-foreground uppercase sm:text-7xl md:text-9xl lg:text-[10rem] 2xl:text-[11.5rem]">
            <span
              data-cursor="cover"
              className="preserve-design hero-title inline-block"
            >
              JABER
            </span>
          </h1>

          {/* Hallmark Hum Interactive Pill Badge */}
          <div className="ml-3 inline-flex -translate-y-1 items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-semibold tracking-normal text-amber-700 shadow-2xs transition-all duration-300 hover:scale-105 hover:border-amber-500/50 sm:ml-6 sm:-translate-y-3 sm:px-4 sm:py-1.5 sm:text-sm md:text-base dark:text-amber-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
            <span>Full Stack</span>
          </div>
        </div>

        {/* Subtitle Name in Clean Muted Typography */}
        <h2
          data-cursor="text"
          className="marlin-font preserve-design mt-1.5 text-xl font-bold tracking-[0.14em] text-muted-foreground uppercase sm:mt-3 sm:text-3xl sm:tracking-[0.18em] md:text-4xl lg:text-5xl 2xl:text-6xl"
        >
          HOSSAIN CHOWDHURY
        </h2>

        {/* Bio / Description with Crisp Readability */}
        <p className="mt-3 max-w-3xl text-sm leading-relaxed font-normal text-muted-foreground sm:mt-5 sm:text-base md:text-lg lg:text-xl">
          {t("description")}
        </p>

        {/* Hallmark Multi-Accent Role Pills (Pear, Cyan, Mint) */}
        <div className="mt-5 flex flex-wrap items-center gap-2 sm:mt-7 sm:gap-3">
          {/* Tag 1: Primary Pear */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 font-mono text-xs font-medium tracking-wide text-amber-800 shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-500/50 active:scale-[0.98] sm:px-4.5 sm:py-2 sm:text-sm dark:text-amber-200">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span>{t("tag1")}</span>
          </div>

          {/* Tag 2: Sky Cyan */}
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1.5 font-mono text-xs font-medium tracking-wide text-sky-800 shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-500/50 active:scale-[0.98] sm:px-4.5 sm:py-2 sm:text-sm dark:text-sky-200">
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            <span>{t("tag2")}</span>
          </div>

          {/* Tag 3: Mint Green */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 font-mono text-xs font-medium tracking-wide text-emerald-800 shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/50 active:scale-[0.98] sm:px-4.5 sm:py-2 sm:text-sm dark:text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>{t("tag3")}</span>
          </div>
        </div>

        {/* Action Buttons & Tactile Feature Badges */}
        <div className="mt-6 flex flex-col gap-4 border-t-2 border-dashed border-border/80 pt-4 sm:mt-9 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
          {/* Tactile Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Button
              variant="default"
              href="#projects"
              className="rounded-full"
              frontClassName="rounded-full"
            >
              <span className="py-3">Explore Work</span>
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 sm:h-4.5 sm:w-4.5" />
            </Button>

            <Button
              variant="outline"
              href="#contact"
              className="rounded-full"
              frontClassName="rounded-full"
            >
              <span className="py-3">Get in Touch</span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground sm:h-4.5 sm:w-4.5" />
            </Button>
          </div>

          {/* Micro Highlight Chips */}
          <div className="hidden items-center gap-4 font-mono text-xs text-muted-foreground md:text-sm lg:flex">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-sky-500" />
              <span>Performant UI</span>
            </div>
            <span className="text-border">⁄</span>
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-amber-500" />
              <span>ICPC &apos;25 • 359 Solved</span>
            </div>
            <span className="text-border">⁄</span>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-500" />
              <span>Modern Stack</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
