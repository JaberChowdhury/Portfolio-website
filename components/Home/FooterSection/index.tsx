"use client"

import * as React from "react"
import { Link } from "@/i18n/routing"
import { Mail, ArrowUpRight, Trophy, Globe2 } from "lucide-react"
import { navLinks } from "@/components/Navbar"
import { useTranslations } from "next-intl"
import { LanguageToggle } from "@/components/LanguageToggle"
import { ThemeToggle } from "@/components/ThemeToggle"

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3.5 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" r="2" cy="4" />
    </svg>
  )
}

export function FooterSection() {
  const t = useTranslations()

  return (
    <section
      id="footer"
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground"
    >
      {/* Decorative lavender blob */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "10%",
          width: "35vw",
          height: "35vw",
          maxWidth: "400px",
          maxHeight: "400px",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-lavender) 8%, transparent) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-3.5 sm:px-6 md:px-10 lg:px-12 2xl:max-w-[1440px]">
        {/* ==================================================================== */}
        {/* MOBILE VIEW (Below md:) — Single Row / Stacked card components       */}
        {/* ==================================================================== */}
        <div className="flex flex-col gap-2.5 md:hidden">
          {/* Top CTA Banner */}
          <div className="hum-card group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-3.5 text-card-foreground shadow-xs">
            <div
              className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[var(--color-pear)]/60 via-[var(--color-pear)] to-[var(--color-pear)]/60"
              aria-hidden="true"
            />
            <div className="flex items-center justify-between gap-2.5">
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 flex items-center gap-1.5">
                  <span className="mono-label text-[9px]">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-lavender)]" />{" "}
                    09 ⁄ {t("Footer.finalDestination")}
                  </span>
                </div>
                <h2
                  data-cursor="text"
                  className="text-sm font-bold tracking-tight whitespace-normal text-card-foreground xs:text-base"
                >
                  {t("Footer.title1")} {t("Footer.title2")}{" "}
                  <span className="text-[var(--color-pear)]">
                    {t("Footer.title3")}
                  </span>
                </h2>
              </div>
              <a
                href="mailto:jaberhc2002@gmail.com"
                className="hum-btn hum-btn--lav !min-h-[34px] shrink-0 !px-3 !py-1.5 !font-mono !text-[11px] !font-bold"
              >
                <span>{t("Footer.startConversation")}</span>
                <ArrowUpRight className="hum-arrow h-3.5 w-3.5 shrink-0" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Card */}
          <div
            data-cursor="cover"
            className="hum-card rounded-2xl border border-border/80 bg-card p-3 text-card-foreground shadow-xs"
          >
            <div className="mb-2 flex items-center justify-between border-b border-border/60 pb-1.5">
              <h4 className="mono-label text-[9.5px] tracking-wider text-muted-foreground uppercase">
                {t("Footer.navigation")}
              </h4>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[var(--color-mint)]" />
                <Globe2 className="h-3 w-3 shrink-0 text-[var(--color-mint)]" />
                <span className="whitespace-normal">
                  {t("Footer.availableForRemote")}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-2 gap-y-1.5 text-[11px]">
              {navLinks.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                >
                  {t(`Navigation.${item.id}`)}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect & Socials Card (Single horizontal row of 4 badges) */}
          <div className="hum-card rounded-2xl border border-border/80 bg-card p-3 text-card-foreground shadow-xs">
            <h4 className="mono-label mb-2 text-[9.5px] tracking-wider text-muted-foreground uppercase">
              {t("Footer.connect")}
            </h4>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {/* GitHub */}
              <a
                href="https://github.com/JaberChowdhury"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="group flex min-h-[34px] items-center justify-between rounded-xl border border-border/70 bg-secondary/50 px-2.5 py-1 text-[11px] font-medium text-card-foreground transition-all duration-200 hover:border-[var(--color-lavender)]/30 hover:bg-[var(--color-lavender)]/10"
              >
                <span className="flex items-center gap-1.5">
                  <GithubIcon className="h-3.5 w-3.5 shrink-0 text-[var(--color-lavender)]" />
                  <span>GitHub</span>
                </span>
                <ArrowUpRight className="hum-arrow h-3 w-3 shrink-0 text-muted-foreground opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/md-jaber-hossain-chowdhury-543335252/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="group flex min-h-[34px] items-center justify-between rounded-xl border border-border/70 bg-secondary/50 px-2.5 py-1 text-[11px] font-medium text-card-foreground transition-all duration-200 hover:border-[var(--color-cyan)]/30 hover:bg-[var(--color-cyan)]/10"
              >
                <span className="flex items-center gap-1.5">
                  <LinkedinIcon className="h-3.5 w-3.5 shrink-0 text-[var(--color-cyan)]" />
                  <span>LinkedIn</span>
                </span>
                <ArrowUpRight className="hum-arrow h-3 w-3 shrink-0 text-muted-foreground opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </a>

              {/* Codeforces */}
              <a
                href="https://codeforces.com/profile/jaber02"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Codeforces Profile"
                className="group flex min-h-[34px] items-center justify-between rounded-xl border border-border/70 bg-secondary/50 px-2.5 py-1 text-[11px] font-medium text-card-foreground transition-all duration-200 hover:border-[var(--color-pear)]/30 hover:bg-[var(--color-pear)]/10"
              >
                <span className="flex items-center gap-1.5">
                  <Trophy className="h-3.5 w-3.5 shrink-0 text-[var(--color-pear)]" />
                  <span>Codeforces</span>
                </span>
                <ArrowUpRight className="hum-arrow h-3 w-3 shrink-0 text-muted-foreground opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </a>

              {/* Email */}
              <a
                href="mailto:jaberhc2002@gmail.com"
                aria-label="Send Email"
                className="group flex min-h-[34px] items-center justify-between rounded-xl border border-border/70 bg-secondary/50 px-2.5 py-1 text-[11px] font-medium text-card-foreground transition-all duration-200 hover:border-[var(--color-coral)]/30 hover:bg-[var(--color-coral)]/10"
              >
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-[var(--color-coral)]" />
                  <span>Email</span>
                </span>
                <ArrowUpRight className="hum-arrow h-3 w-3 shrink-0 text-muted-foreground opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          {/* Compact Bottom Bar */}
          <div className="flex items-center justify-between border-t border-border/60 pt-2.5 text-[10px]">
            <p className="mono-label text-[9.5px]">
              © {new Date().getFullYear()} {t("Footer.yourName")}
            </p>
            <div className="flex shrink-0 items-center gap-1.5">
              <ThemeToggle showKeyIndicator={false} />
              <LanguageToggle />
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* DESKTOP VIEW (md: and up) — Preserved full 3-column Hallmark cards   */}
        {/* ==================================================================== */}
        <div className="hidden md:block">
          {/* Top CTA Banner — hum-card styling with pear accent */}
          <div className="hum-card group relative mb-5 flex flex-row items-center justify-between gap-5 overflow-hidden rounded-3xl border border-border/80 bg-card p-6 text-card-foreground shadow-xs transition-all duration-300 hover:border-[var(--color-pear)]/40 md:p-7">
            <div
              className="absolute inset-x-0 top-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-[var(--color-pear)]/60 via-[var(--color-pear)] to-[var(--color-pear)]/60"
              aria-hidden="true"
            />
            <div>
              <div className="mb-2 flex items-center gap-1.5">
                <span className="mono-label text-xs">
                  <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-lavender)]" />{" "}
                  09 ⁄ {t("Footer.finalDestination")}
                </span>
              </div>
              <h2
                data-cursor="text"
                className="text-2xl font-bold tracking-tight text-card-foreground sm:text-3xl md:text-4xl"
              >
                {t("Footer.title1")} {t("Footer.title2")}{" "}
                <span className="text-[var(--color-pear)]">
                  {t("Footer.title3")}
                </span>{" "}
                {t("Footer.title4")}
              </h2>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {t("Footer.description")}
              </p>
            </div>

            <a
              href="mailto:jaberhc2002@gmail.com"
              className="hum-btn hum-btn--lav shrink-0 justify-center self-center !px-5 !py-3 !font-mono !text-sm !font-bold"
            >
              <span>{t("Footer.startConversation")}</span>
              <ArrowUpRight className="hum-arrow h-4.5 w-4.5 shrink-0" />
            </a>
          </div>

          {/* 3-Column Info Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Brand / Bio */}
            <div
              data-cursor="cover"
              className="hum-card flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 text-card-foreground"
            >
              <div>
                <h3 className="text-xl font-bold text-card-foreground">
                  {t("Footer.yourName")}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {t("Footer.bio")}
                </p>
              </div>
              <div className="mt-5 flex items-center gap-2 border-t border-border/70 pt-3.5 text-xs text-muted-foreground md:text-sm">
                <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[var(--color-mint)]" />
                <Globe2 className="h-4 w-4 shrink-0 text-[var(--color-mint)]" />
                <span className="truncate">
                  {t("Footer.availableForRemote")}
                </span>
              </div>
            </div>

            {/* Quick Navigation */}
            <div
              data-cursor="cover"
              className="hum-card rounded-2xl border border-border/80 bg-card p-6 text-card-foreground"
            >
              <h4 className="mono-label mb-3.5 text-xs">
                {t("Footer.navigation")}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {navLinks.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="py-0.5 font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                  >
                    {t(`Navigation.${item.id}`)}
                  </Link>
                ))}
                <Link
                  href="/#skills"
                  className="py-0.5 font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                >
                  {t("Navigation.skills") || "Tech Stack"}
                </Link>
              </div>
            </div>

            {/* Connect & Socials — multi-accent system */}
            <div className="hum-card rounded-2xl border border-border/80 bg-card p-6 text-card-foreground">
              <h4 className="mono-label mb-3.5 text-xs">
                {t("Footer.connect")}
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {/* GitHub — lavender */}
                <a
                  href="https://github.com/JaberChowdhury"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[40px] items-center justify-between rounded-xl border border-border/70 bg-secondary/50 p-2.5 text-sm font-medium text-card-foreground transition-all duration-200 hover:border-[var(--color-lavender)]/30 hover:bg-[var(--color-lavender)]/10"
                >
                  <span className="flex items-center gap-2 truncate">
                    <GithubIcon className="h-4 w-4 shrink-0 text-[var(--color-lavender)]" />
                    <span className="truncate">GitHub</span>
                  </span>
                  <ArrowUpRight className="hum-arrow h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                </a>

                {/* LinkedIn — cyan */}
                <a
                  href="https://www.linkedin.com/in/md-jaber-hossain-chowdhury-543335252/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[40px] items-center justify-between rounded-xl border border-border/70 bg-secondary/50 p-2.5 text-sm font-medium text-card-foreground transition-all duration-200 hover:border-[var(--color-cyan)]/30 hover:bg-[var(--color-cyan)]/10"
                >
                  <span className="flex items-center gap-2 truncate">
                    <LinkedinIcon className="h-4 w-4 shrink-0 text-[var(--color-cyan)]" />
                    <span className="truncate">LinkedIn</span>
                  </span>
                  <ArrowUpRight className="hum-arrow h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                </a>

                {/* Codeforces — pear */}
                <a
                  href="https://codeforces.com/profile/jaber02"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[40px] items-center justify-between rounded-xl border border-border/70 bg-secondary/50 p-2.5 text-sm font-medium text-card-foreground transition-all duration-200 hover:border-[var(--color-pear)]/30 hover:bg-[var(--color-pear)]/10"
                >
                  <span className="flex items-center gap-2 truncate">
                    <Trophy className="h-4 w-4 shrink-0 text-[var(--color-pear)]" />
                    <span className="truncate">Codeforces</span>
                  </span>
                  <ArrowUpRight className="hum-arrow h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                </a>

                {/* Email — coral */}
                <a
                  href="mailto:jaberhc2002@gmail.com"
                  className="group flex min-h-[40px] items-center justify-between rounded-xl border border-border/70 bg-secondary/50 p-2.5 text-sm font-medium text-card-foreground transition-all duration-200 hover:border-[var(--color-coral)]/30 hover:bg-[var(--color-coral)]/10"
                >
                  <span className="flex items-center gap-2 truncate">
                    <Mail className="h-4 w-4 shrink-0 text-[var(--color-coral)]" />
                    <span className="truncate">Email</span>
                  </span>
                  <ArrowUpRight className="hum-arrow h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar — hum-eyebrow labels */}
          <div className="mt-5 flex flex-row items-center justify-between border-t border-border/70 pt-4 text-left">
            <p className="mono-label text-xs">
              © {new Date().getFullYear()} {t("Footer.yourName")}.{" "}
              {t("Footer.rights")}.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="mono-label text-xs">
                {t("Footer.builtWith")}
              </span>
              <div className="flex items-center gap-2.5 border-l border-border/70 pl-3">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FooterSection
