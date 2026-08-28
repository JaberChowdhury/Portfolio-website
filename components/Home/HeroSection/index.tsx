"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import {
  ArrowDownRight,
  ArrowUpRight,
  Sparkles,
  Zap,
  Brain,
} from "lucide-react"

export function Hero() {
  const t = useTranslations("Hero")
  const [nameHovered, setNameHovered] = useState(false)

  return (
    <section
      id="home"
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground"
    >
      {/* Animated gradient mesh background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {/* Pear blob — top-right quadrant */}
        <div
          style={{
            position: "absolute",
            top: "5%",
            right: "8%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-pear) 12%, transparent) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Cyan blob — bottom-left quadrant */}
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "4%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-cyan) 10%, transparent) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Mint blob — top-left */}
        <div
          style={{
            position: "absolute",
            top: "8%",
            left: "6%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-mint) 8%, transparent) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12 2xl:max-w-360">
        {/* Eyebrow badge — mono label with mint pulse dot */}
        <div className="hum-reveal mb-3.5 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/90 px-3.5 py-1.5 shadow-2xs transition-all duration-300 hover:border-[var(--color-mint)]/40 sm:mb-6 sm:px-4 sm:py-2">
          <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-mint)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-mint)] sm:h-2.5 sm:w-2.5" />
          </span>
          <span className="mono-label">01 ⁄ {t("available")}</span>
        </div>

        {/* Display name — Plus Jakarta Sans */}
        <div
          className="hum-reveal flex flex-wrap items-center"
          style={{ animationDelay: "80ms" }}
        >
          <h1
            data-cursor="cover"
            className="preserve-design hero-title inline-block text-4xl leading-none font-black tracking-tight text-foreground uppercase xs:text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] 2xl:text-[11.5rem]"
            style={{
              textShadow: nameHovered
                ? "2px 4px 12px color-mix(in srgb, var(--color-pear) 25%, transparent)"
                : "none",
              transition: "text-shadow 300ms ease",
            }}
            onMouseEnter={() => setNameHovered(true)}
            onMouseLeave={() => setNameHovered(false)}
          >
            JABER
          </h1>

          {/* Full Stack pill — pear accent */}
          <div className="ml-2 inline-flex -translate-y-0.5 items-center gap-1.5 rounded-full border border-[var(--color-pear)]/30 bg-[var(--color-pear)]/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-normal text-[var(--color-pear-deep)] shadow-2xs transition-all duration-300 hover:scale-105 hover:border-[var(--color-pear)]/50 sm:ml-6 sm:-translate-y-3 sm:px-4 sm:py-1.5 sm:text-sm md:text-base dark:text-[var(--color-pear)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-pear)] sm:h-2 sm:w-2" />
            <span>Full Stack</span>
          </div>
        </div>

        {/* Subtitle */}
        <h2
          data-cursor="text"
          className="preserve-design mt-1.5 text-lg font-bold tracking-[0.12em] text-muted-foreground uppercase sm:mt-3 sm:text-2xl sm:tracking-[0.14em] md:text-4xl lg:text-5xl 2xl:text-6xl"
        >
          HOSSAIN CHOWDHURY
        </h2>

        {/* Glassmorphism bio card — wraps bio + role pills */}
        <div
          className="hum-reveal mt-3 space-y-2.5 rounded-2xl border border-border/50 bg-card/40 p-3 backdrop-blur-sm sm:mt-5 sm:space-y-4 sm:p-4 md:p-5"
          style={{ animationDelay: "160ms" }}
        >
          {/* Bio */}
          <p className="max-w-3xl text-xs leading-relaxed font-normal break-words whitespace-normal text-muted-foreground sm:text-sm md:text-base lg:text-lg">
            {t("description")}
          </p>

          {/* Multi-accent role pills: pear, cyan, mint */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
            {/* Tag 1: Pear */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-pear)]/30 bg-[var(--color-pear)]/10 px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide text-[var(--color-pear-deep)] shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-pear)]/50 active:scale-[0.98] sm:gap-2 sm:px-4.5 sm:py-2 sm:text-sm dark:text-[var(--color-pear)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-pear)] sm:h-2 sm:w-2" />
              <span>{t("tag1")}</span>
            </div>

            {/* Tag 2: Cyan */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-cyan)]/30 bg-[var(--color-cyan)]/10 px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide text-[var(--color-cyan-deep)] shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-cyan)]/50 active:scale-[0.98] sm:gap-2 sm:px-4.5 sm:py-2 sm:text-sm dark:text-[var(--color-cyan)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)] sm:h-2 sm:w-2" />
              <span>{t("tag2")}</span>
            </div>

            {/* Tag 3: Mint */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-mint)]/30 bg-[var(--color-mint)]/10 px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide text-[var(--color-mint)] shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-mint)]/50 active:scale-[0.98] sm:gap-2 sm:px-4.5 sm:py-2 sm:text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint)] sm:h-2 sm:w-2" />
              <span>{t("tag3")}</span>
            </div>
          </div>
        </div>

        {/* Action buttons & feature chips */}
        <div
          className="hum-reveal mt-4 flex flex-col gap-3.5 border-t-2 border-dashed border-border/80 pt-3.5 sm:mt-9 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-6"
          style={{ animationDelay: "320ms" }}
        >
          {/* CTA buttons — hum-btn system */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
            <a
              href="#projects"
              className="hum-btn min-h-[40px] px-4 py-2 text-xs sm:min-h-[44px] sm:px-5 sm:py-2.5 sm:text-sm"
            >
              <span>{t("exploreWork")}</span>
              <ArrowDownRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5 sm:h-4.5 sm:w-4.5" />
            </a>

            <a
              href="#contact"
              className="hum-btn hum-btn--soft min-h-[40px] px-4 py-2 text-xs sm:min-h-[44px] sm:px-5 sm:py-2.5 sm:text-sm"
            >
              <span>{t("getInTouch")}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-4.5 sm:w-4.5" />
            </a>
          </div>

          {/* Micro highlight chips — multi-accent icons */}
          <div className="hidden items-center gap-4 font-mono text-xs text-muted-foreground md:text-sm lg:flex">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-[var(--color-cyan)]" />
              <span>{t("performantUi")}</span>
            </div>
            <span className="text-border">⁄</span>
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-[var(--color-pear)]" />
              <span>{t("icpcSolved")}</span>
            </div>
            <span className="text-border">⁄</span>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[var(--color-mint)]" />
              <span>{t("modernStack")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
