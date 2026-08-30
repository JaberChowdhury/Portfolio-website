"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"
import {
  ArrowDownRight,
  ArrowUpRight,
  Sparkles,
  Zap,
  Brain,
  Code2,
} from "lucide-react"
import { M3MorphingAvatar } from "@/components/m3/M3Shapes"

export function Hero() {
  const t = useTranslations("Hero")
  const [nameHovered, setNameHovered] = useState(false)

  return (
    <section
      id="home"
      data-section="hero"
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)] transition-colors duration-300"
    >
      {/* M3 Expressive Tonal Radial Background Accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-[10%] -right-[5%] h-[420px] w-[420px] rounded-full opacity-35 blur-3xl transition-all duration-700"
          style={{
            background:
              "radial-gradient(circle, var(--md-sys-color-primary-container) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-[10%] -left-[5%] h-[380px] w-[380px] rounded-full opacity-30 blur-3xl transition-all duration-700"
          style={{
            background:
              "radial-gradient(circle, var(--md-sys-color-tertiary-container) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-10 md:py-8 lg:px-12 2xl:max-w-360">
        <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
          {/* Main Hero Content (Left 7-8 cols on desktop) */}
          <div className="lg:col-span-8">
            {/* Status Badge: M3 Expressive Pill Chip with animated status indicator */}
            <div className="mb-3.5 inline-flex items-center gap-2.5 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-high)] px-3.5 py-1.5 shadow-2xs transition-all duration-300 hover:border-[var(--md-sys-color-primary)] sm:mb-5 sm:px-4 sm:py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-xs font-semibold tracking-wide text-[var(--md-sys-color-on-surface-variant)] uppercase">
                01 ⁄ {t("available")}
              </span>
            </div>

            {/* Typography: Full M3 Expressive Display Large / Headline scale */}
            <div className="flex flex-wrap items-baseline gap-x-4">
              <h1
                data-cursor="cover"
                className="preserve-design text-5xl font-black tracking-tight text-[var(--md-sys-color-on-surface)] uppercase xs:text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] leading-[0.95]"
                style={{
                  textShadow: nameHovered
                    ? "2px 4px 16px var(--md-sys-color-primary-container)"
                    : "none",
                  transition: "text-shadow 300ms ease",
                }}
                onMouseEnter={() => setNameHovered(true)}
                onMouseLeave={() => setNameHovered(false)}
              >
                JABER
              </h1>

              {/* Full Stack Pill Badge */}
              <div className="inline-flex -translate-y-1 items-center gap-1.5 rounded-full border border-[var(--md-sys-color-primary)]/40 bg-[var(--md-sys-color-primary-container)] px-3 py-1 font-mono text-xs font-bold text-[var(--md-sys-color-on-primary-container)] shadow-2xs sm:text-sm">
                <Code2 className="h-3.5 w-3.5" />
                <span>Full Stack</span>
              </div>
            </div>

            {/* Subtitle / Family Name */}
            <h2
              data-cursor="text"
              className="preserve-design mt-1 text-xl font-bold tracking-[0.14em] text-[var(--md-sys-color-primary)] uppercase sm:mt-2 sm:text-3xl md:text-4xl lg:text-5xl"
            >
              HOSSAIN CHOWDHURY
            </h2>

            {/* M3 Expressive Tonal Surface Container for Bio */}
            <div className="mt-3 space-y-3 rounded-2xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container)] p-3.5 sm:mt-5 sm:space-y-4 sm:p-5 md:p-6">
              <p className="max-w-3xl text-xs leading-relaxed font-normal text-[var(--md-sys-color-on-surface-variant)] sm:text-sm md:text-base lg:text-lg">
                {t("description")}
              </p>

              {/* Role Tags: M3 Expressive Filter / Assist Chips */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-high)] px-3 py-1 font-mono text-[11px] font-medium text-[var(--md-sys-color-on-surface)] transition-all hover:bg-[var(--md-sys-color-surface-container-highest)] sm:px-3.5 sm:py-1.5 sm:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--md-sys-color-primary)]" />
                  <span>{t("tag1")}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-high)] px-3 py-1 font-mono text-[11px] font-medium text-[var(--md-sys-color-on-surface)] transition-all hover:bg-[var(--md-sys-color-surface-container-highest)] sm:px-3.5 sm:py-1.5 sm:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--md-sys-color-secondary)]" />
                  <span>{t("tag2")}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-high)] px-3 py-1 font-mono text-[11px] font-medium text-[var(--md-sys-color-on-surface)] transition-all hover:bg-[var(--md-sys-color-surface-container-highest)] sm:px-3.5 sm:py-1.5 sm:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--md-sys-color-tertiary)]" />
                  <span>{t("tag3")}</span>
                </span>
              </div>
            </div>

            {/* Action Buttons: M3 Filled and Tonal Action Buttons */}
            <div className="mt-4 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center sm:gap-4">
              {/* Filled Button */}
              <a
                href="#projects"
                className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[var(--md-sys-color-primary)] px-6 py-2.5 font-mono text-xs font-bold text-[var(--md-sys-color-on-primary)] shadow-sm transition-all duration-200 hover:bg-[var(--md-sys-color-primary)]/90 hover:shadow-md active:scale-[0.98] sm:min-h-[48px] sm:px-7 sm:text-sm"
              >
                <span>{t("exploreWork")}</span>
                <ArrowDownRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>

              {/* Tonal Button */}
              <a
                href="#contact"
                className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-secondary-container)] px-6 py-2.5 font-mono text-xs font-bold text-[var(--md-sys-color-on-secondary-container)] transition-all duration-200 hover:bg-[var(--md-sys-color-secondary-container)]/80 active:scale-[0.98] sm:min-h-[48px] sm:px-7 sm:text-sm"
              >
                <span>{t("getInTouch")}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Micro Highlight Chips: Footer Row */}
            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-[var(--md-sys-color-outline-variant)]/60 pt-3.5 font-mono text-xs text-[var(--md-sys-color-on-surface-variant)] sm:mt-7 sm:pt-5 sm:text-sm">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[var(--md-sys-color-tertiary)]" />
                <span>{t("performantUi")}</span>
              </div>
              <span className="text-[var(--md-sys-color-outline-variant)]">⁄</span>
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-[var(--md-sys-color-primary)]" />
                <span>{t("icpcSolved")}</span>
              </div>
              <span className="text-[var(--md-sys-color-outline-variant)]">⁄</span>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[var(--md-sys-color-secondary)]" />
                <span>{t("modernStack")}</span>
              </div>
            </div>
          </div>

          {/* Hero Avatar / Profile Graphic (Right 4-5 cols on desktop, responsive) */}
          <div className="flex items-center justify-center py-4 lg:col-span-4 lg:justify-end">
            <M3MorphingAvatar size={290} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
