"use client"

import * as React from "react"
import { Link } from "@/i18n/routing"
import { useTheme } from "next-themes"
import {
  AArrowDown as Github,
  Asterisk as Linkedin,
  Mail,
  ArrowUpRight,
  Trophy,
} from "lucide-react"
import { navLinks } from "../Navbar"
import { AnimatedGradientText } from "../ui/animated-gradient-text"
import { Globe, GLOBE_CONFIG } from "../ui/globe"
import { Meteors } from "../ui/meteors"
import { useTranslations } from "next-intl"
import { LanguageToggle } from "../LanguageToggle"
import { useMounted } from "@/hooks/use-mounted"

export default function Footer() {
  const t = useTranslations()
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()

  const isDark = resolvedTheme === "dark"
  const inverseThemeClass = mounted ? (isDark ? "light" : "dark") : ""

  return (
    <footer
      className={`relative overflow-hidden bg-background text-foreground ${inverseThemeClass} `}
    >
      {/* Background Meteors (full width, theme oriented) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Meteors number={130} angle={-95} />
      </div>

      {/* Themed glow (adapts automatically in dark/light) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 h-[400px] w-[900px] -translate-x-1/2 rounded-full bg-primary/5 blur-[140px]" />
      </div>

      {/* Watermark (low contrast, theme-aware) */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <h2
          data-cursor="text"
          className="text-[18vw] font-black tracking-tighter text-foreground/[0.03] select-none"
        >
          DEV
        </h2>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        {/* CTA */}
        <div className="relative overflow-hidden border-b border-border/40 py-14 sm:py-18 md:py-24">
          <div className="relative z-10 max-w-4xl">
            <p className="mb-3 text-xs tracking-[0.3em] text-muted-foreground uppercase sm:tracking-[0.35em]">
              {t("Footer.finalDestination")}
            </p>

            <h2
              data-cursor="text"
              className="text-3xl leading-[1.1] font-bold tracking-tight break-words sm:text-5xl md:text-7xl"
            >
              {t("Footer.title1")}
              <br />
              {t("Footer.title2")}
              <AnimatedGradientText
                colorFrom="#f5f4e2"
                colorTo="oklch(0.252 0.009 68.2)"
                className="text-3xl leading-[1.1] font-bold tracking-tight sm:text-5xl md:text-7xl"
              >
                {t("Footer.title3")}
              </AnimatedGradientText>
              {t("Footer.title4")}
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-base md:text-lg">
              {t("Footer.description")}
            </p>

            <Link
              href="mailto:jaberhc2002@gmail.com"
              className="group mt-6 inline-flex items-center rounded-full border border-border px-5 py-2.5 text-xs font-medium transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background active:scale-95 sm:mt-10 sm:px-7 sm:py-3 sm:text-sm"
            >
              {t("Footer.startConversation")}
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          {/* Background Globe, bottom right, large, cut off by overflow-hidden */}
          <div className="pointer-events-none absolute -right-[20%] -bottom-[15%] z-0 h-[280px] w-[280px] opacity-35 sm:-right-[15%] sm:-bottom-[20%] sm:h-[500px] sm:w-[500px] md:-right-[10%] md:-bottom-[40%] md:h-[800px] md:w-[800px]">
            <Globe
              className="absolute inset-0 size-full"
              config={{
                ...GLOBE_CONFIG,
                dark: isDark ? 1 : 0,
                baseColor: isDark ? [1, 1, 1] : [0.1, 0.1, 0.1],
                glowColor: isDark ? [0.1, 0.1, 0.1] : [0.95, 0.95, 0.95],
              }}
            />
          </div>
        </div>

        {/* GRID */}
        <div className="grid gap-8 py-10 sm:gap-12 sm:py-16 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3
              data-cursor="text"
              className="text-lg font-bold tracking-tight sm:text-xl"
            >
              {t("Footer.yourName")}
            </h3>

            <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
              {t("Footer.bio")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase sm:mb-5 sm:text-sm">
              {t("Footer.navigation")}
            </h4>

            <div className="flex flex-col gap-2.5 text-xs sm:gap-3 sm:text-sm">
              {navLinks.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="w-fit text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(`Navigation.${item.id}`)}
                </Link>
              ))}
              <Link
                href="/#skills"
                className="w-fit text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("Navigation.skills") || "Tech Stack"}
              </Link>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h4 className="mb-4 text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase sm:mb-5 sm:text-sm">
              {t("Footer.connect")}
            </h4>

            <div className="space-y-2.5 text-xs sm:space-y-4 sm:text-sm">
              <Link
                href="/projects"
                className="group flex items-center justify-between rounded-xl border border-border p-3 transition-all hover:border-foreground/30 hover:shadow-sm sm:p-4"
              >
                <div className="flex items-center gap-3">
                  <Github className="h-4 w-4" />
                  GitHub
                </div>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              <Link
                href="https://www.linkedin.com/in/md-jaber-hossain-chowdhury-543335252/"
                target="_blank"
                className="group flex items-center justify-between rounded-xl border border-border p-3 transition-all hover:border-foreground/30 hover:shadow-sm sm:p-4"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </div>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              <Link
                href="https://codeforces.com/profile/jaber02"
                target="_blank"
                className="group flex items-center justify-between rounded-xl border border-border p-3 transition-all hover:border-foreground/30 hover:shadow-sm sm:p-4"
              >
                <div className="flex items-center gap-3">
                  <Trophy className="h-4 w-4" />
                  Codeforces
                </div>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              <Link
                href="mailto:jaberhc2002@gmail.com"
                className="group flex items-center justify-between rounded-xl border border-border p-3 transition-all hover:border-foreground/30 hover:shadow-sm sm:p-4"
              >
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4" />
                  Email
                </div>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-center text-xs text-muted-foreground sm:py-8 sm:text-sm md:flex-row md:text-left">
          <div className="flex items-center gap-4">
            <p>
              © {new Date().getFullYear()} {t("Footer.yourName")}.{" "}
              {t("Footer.rights")}.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:justify-end">
            <p>{t("Footer.builtWith")}</p>
            <div className="flex items-center gap-2 border-l border-border pl-3 sm:pl-4">
              <span>{t("Footer.language")}</span>
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
