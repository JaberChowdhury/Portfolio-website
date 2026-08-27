"use client"

import * as React from "react"
import { Link } from "@/i18n/routing"
import { Mail, ArrowUpRight, Trophy, Globe2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { navLinks } from "@/components/Navbar"
import { useTranslations } from "next-intl"
import { LanguageToggle } from "@/components/LanguageToggle"

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
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12 2xl:max-w-[1440px]">
        {/* Top CTA Banner */}
        <div className="mb-4 flex flex-col justify-between gap-4 rounded-xl border border-border/80 bg-card p-4 text-card-foreground shadow-xs transition-all duration-300 hover:border-purple-500/40 sm:mb-5 sm:flex-row sm:items-center sm:gap-5 sm:rounded-2xl sm:p-6 md:p-7">
          <div>
            <div className="mb-1.5 flex items-center gap-2 sm:mb-2">
              <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase sm:text-sm sm:tracking-[0.25em]">
                <span className="h-2 w-2 rounded-full bg-purple-500" />
                08 ⁄ {t("Footer.finalDestination")}
              </span>
            </div>
            <h2
              data-cursor="text"
              className="text-2xl font-bold tracking-tight text-card-foreground sm:text-3xl md:text-4xl"
            >
              {t("Footer.title1")} {t("Footer.title2")}{" "}
              <span className="text-purple-600 dark:text-purple-400">
                {t("Footer.title3")}
              </span>{" "}
              {t("Footer.title4")}
            </h2>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:mt-1.5 sm:text-sm md:text-base">
              {t("Footer.description")}
            </p>
          </div>

          <Button
            variant="purple"
            size="lg"
            href="mailto:your@email.com"
            className="self-start sm:self-center"
          >
            <span>{t("Footer.startConversation")}</span>
            <ArrowUpRight className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
          </Button>
        </div>

        {/* 3-Column Info Grid */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4.5 md:grid-cols-3 md:gap-6">
          {/* Brand / Bio */}
          <div className="flex flex-col justify-between rounded-xl border border-border/80 bg-card p-4 text-card-foreground shadow-xs transition-all duration-300 hover:border-border sm:rounded-2xl sm:p-5 md:p-6">
            <div>
              <h3 className="text-base font-bold text-card-foreground sm:text-lg md:text-xl">
                {t("Footer.yourName")}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm md:text-base">
                {t("Footer.bio")}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 border-t border-border/70 pt-3 text-xs text-muted-foreground sm:mt-5 sm:pt-3.5 sm:text-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <Globe2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Available for remote & freelance</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="rounded-xl border border-border/80 bg-card p-4 text-card-foreground shadow-xs transition-all duration-300 hover:border-border sm:rounded-2xl sm:p-5 md:p-6">
            <h4 className="mb-2.5 font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase sm:mb-3.5 sm:text-sm">
              {t("Footer.navigation")}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
              {navLinks.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                >
                  {t(`Navigation.${item.id}`)}
                </Link>
              ))}
              <Link
                href="/#skills"
                className="font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
              >
                {t("Navigation.skills") || "Tech Stack"}
              </Link>
            </div>
          </div>

          {/* Connect & Socials */}
          <div className="rounded-xl border border-border/80 bg-card p-4 text-card-foreground shadow-xs transition-all duration-300 hover:border-border sm:col-span-2 sm:rounded-2xl sm:p-5 md:col-span-1 md:p-6">
            <h4 className="mb-2.5 font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase sm:mb-3.5 sm:text-sm">
              {t("Footer.connect")}
            </h4>
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              <a
                href="https://github.com/JaberChowdhury"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-border/70 bg-secondary/50 p-2.5 text-xs font-medium text-card-foreground transition-all duration-200 hover:border-purple-500/30 hover:bg-secondary sm:rounded-xl sm:text-sm"
              >
                <span className="flex items-center gap-2">
                  <GithubIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  GitHub
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </a>

              <a
                href="https://linkedin.com/in/JaberChowdhury"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-border/70 bg-secondary/50 p-2.5 text-xs font-medium text-card-foreground transition-all duration-200 hover:border-sky-500/30 hover:bg-secondary sm:rounded-xl sm:text-sm"
              >
                <span className="flex items-center gap-2">
                  <LinkedinIcon className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                  LinkedIn
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </a>

              <a
                href="https://codeforces.com/profile/YOUR_HANDLE"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-border/70 bg-secondary/50 p-2.5 text-xs font-medium text-card-foreground transition-all duration-200 hover:border-amber-500/30 hover:bg-secondary sm:rounded-xl sm:text-sm"
              >
                <span className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  Codeforces
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </a>

              <a
                href="mailto:your@email.com"
                className="group flex items-center justify-between rounded-lg border border-border/70 bg-secondary/50 p-2.5 text-xs font-medium text-card-foreground transition-all duration-200 hover:border-rose-500/30 hover:bg-secondary sm:rounded-xl sm:text-sm"
              >
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                  Email
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t border-border/70 pt-3 text-xs text-muted-foreground sm:mt-5 sm:flex-row sm:pt-4">
          <p className="font-mono text-xs sm:text-sm">
            © {new Date().getFullYear()} {t("Footer.yourName")}.{" "}
            {t("Footer.rights")}.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm">
              {t("Footer.builtWith")}
            </span>
            <div className="flex items-center gap-2 border-l border-border/70 pl-3">
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FooterSection
