"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import {
  ArrowDownRight,
  ArrowUpRight,
  Sparkles,
  Zap,
  Brain,
  Code2,
} from "lucide-react"

export function Hero() {
  const t = useTranslations("Hero")
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  })

  return (
    <section
      id="home"
      onMouseMove={(e) => {
        setMouse({
          x: e.clientX,
          y: e.clientY,
        })
      }}
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

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-6 md:px-12">
        {/* Hallmark Hum Eyebrow with Pulsing Mint Dot */}
        <div className="mb-4 sm:mb-6 inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-card/90 px-3.5 py-1.5 shadow-2xs backdrop-blur-xs transition-all duration-300 hover:border-emerald-500/40 hover:shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">
            01 ⁄ {t("available")}
          </span>
        </div>

        {/* Editorial Confident Rounded Sans Display Typography */}
        <div className="flex flex-wrap items-center">
          <h1 className="marlin-font preserve-design text-5xl font-black tracking-tight text-foreground uppercase leading-none sm:text-7xl md:text-8xl lg:text-9xl">
            <span
              data-cursor="cover"
              className="preserve-design hero-title inline-block"
            >
              JABER
            </span>
          </h1>

          {/* Hallmark Hum Interactive Pill Badge */}
          <div className="ml-3 sm:ml-5 inline-flex -translate-y-1 sm:-translate-y-3 items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs sm:text-sm font-semibold tracking-normal text-amber-700 dark:text-amber-300 shadow-2xs backdrop-blur-xs transition-all duration-300 hover:scale-105 hover:border-amber-500/50">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Full Stack</span>
          </div>
        </div>

        {/* Subtitle Name in Clean Muted Typography */}
        <h2
          data-cursor="text"
          className="marlin-font preserve-design mt-1 sm:mt-2 text-xl font-bold tracking-[0.18em] text-muted-foreground uppercase sm:text-3xl md:text-4xl lg:text-5xl"
        >
          HOSSAIN CHOWDHURY
        </h2>

        {/* Bio / Description with Crisp Readability */}
        <p className="mt-3.5 sm:mt-5 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed text-muted-foreground font-normal">
          {t("description")}
        </p>

        {/* Hallmark Multi-Accent Role Pills (Pear, Cyan, Mint) */}
        <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Tag 1: Primary Pear */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-mono font-medium tracking-wide text-amber-800 dark:text-amber-200 shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-500/50 hover:shadow-xs active:scale-[0.98]">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span>{t("tag1")}</span>
          </div>

          {/* Tag 2: Sky Cyan */}
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1.5 text-xs font-mono font-medium tracking-wide text-sky-800 dark:text-sky-200 shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-500/50 hover:shadow-xs active:scale-[0.98]">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            <span>{t("tag2")}</span>
          </div>

          {/* Tag 3: Mint Green */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-mono font-medium tracking-wide text-emerald-800 dark:text-emerald-200 shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:shadow-xs active:scale-[0.98]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>{t("tag3")}</span>
          </div>
        </div>

        {/* Action Buttons & Tactile Feature Badges */}
        <div className="mt-6 sm:mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-border/60 pt-4 sm:pt-5">
          {/* Tactile Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs sm:text-sm font-semibold text-background shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 active:scale-[0.97]"
            >
              <span>Explore Work</span>
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>

            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/90 px-5 py-2.5 text-xs sm:text-sm font-medium text-foreground shadow-2xs backdrop-blur-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-500/40 hover:bg-card active:scale-[0.97]"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
            </a>
          </div>

          {/* Micro Highlight Chips */}
          <div className="hidden lg:flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-sky-500" />
              <span>Performant UI</span>
            </div>
            <span className="text-border">⁄</span>
            <div className="flex items-center gap-1.5">
              <Brain className="h-3.5 w-3.5 text-amber-500" />
              <span>1500+ CP Solved</span>
            </div>
            <span className="text-border">⁄</span>
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
              <span>Modern Stack</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

