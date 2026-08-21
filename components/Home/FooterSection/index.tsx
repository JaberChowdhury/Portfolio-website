"use client"

import * as React from "react"
import { Link } from "@/i18n/routing"
import {
  Mail,
  ArrowUpRight,
  Trophy,
  Globe2,
} from "lucide-react"
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
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
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
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function FooterSection() {
  const t = useTranslations()

  return (
    <section id="footer" className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground">
      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-12">
        {/* Top CTA Banner */}
        <div className="mb-4 flex flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md sm:flex-row sm:items-center md:p-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-[#b85d38] dark:text-[#e07a5f] uppercase">
              {t("Footer.finalDestination")}
            </p>
            <h2
              data-cursor="text"
              className="mt-1 text-2xl font-bold tracking-tight text-card-foreground md:text-3xl"
            >
              {t("Footer.title1")} {t("Footer.title2")}{" "}
              <span className="text-[#2d6a4f] dark:text-[#52b788]">{t("Footer.title3")}</span> {t("Footer.title4")}
            </h2>
            <p className="mt-1 max-w-xl text-xs text-muted-foreground md:text-sm">
              {t("Footer.description")}
            </p>
          </div>

          <Link
            href="mailto:your@email.com"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-95 shrink-0"
          >
            <span>{t("Footer.startConversation")}</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 3-Column Info Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          {/* Brand / Bio */}
          <div className="rounded-2xl border border-border bg-card p-4.5 text-card-foreground shadow-sm transition-all hover:border-primary/40 md:p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-card-foreground md:text-lg">
                {t("Footer.yourName")}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground md:text-sm">
                {t("Footer.bio")}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground border-t border-border pt-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <Globe2 className="h-3.5 w-3.5 text-[#2d6a4f] dark:text-[#52b788]" />
              <span>Available for remote & freelance</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="rounded-2xl border border-border bg-card p-4.5 text-card-foreground shadow-sm transition-all hover:border-primary/40 md:p-5">
            <h4 className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              {t("Footer.navigation")}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="text-muted-foreground font-medium transition-colors hover:text-foreground hover:underline"
                >
                  {t(`Navigation.${item.id}`)}
                </Link>
              ))}
              <Link
                href="/dungeon"
                className="text-[#b85d38] dark:text-[#e07a5f] font-semibold transition-colors hover:underline"
              >
                {t("Footer.dungeon")} ⚔️
              </Link>
            </div>
          </div>

          {/* Connect & Socials */}
          <div className="rounded-2xl border border-border bg-card p-4.5 text-card-foreground shadow-sm transition-all hover:border-primary/40 md:p-5 sm:col-span-2 md:col-span-1">
            <h4 className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              {t("Footer.connect")}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://github.com/YOUR_USERNAME"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-2 text-xs font-medium text-card-foreground transition-all hover:bg-secondary hover:border-primary/40"
              >
                <span className="flex items-center gap-2">
                  <GithubIcon className="h-3.5 w-3.5 text-foreground" />
                  GitHub
                </span>
                <ArrowUpRight className="h-3 w-3 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </a>

              <a
                href="https://linkedin.com/in/YOUR_USERNAME"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-2 text-xs font-medium text-card-foreground transition-all hover:bg-secondary hover:border-primary/40"
              >
                <span className="flex items-center gap-2">
                  <LinkedinIcon className="h-3.5 w-3.5 text-[#0a66c2]" />
                  LinkedIn
                </span>
                <ArrowUpRight className="h-3 w-3 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </a>

              <a
                href="https://codeforces.com/profile/YOUR_HANDLE"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-2 text-xs font-medium text-card-foreground transition-all hover:bg-secondary hover:border-primary/40"
              >
                <span className="flex items-center gap-2">
                  <Trophy className="h-3.5 w-3.5 text-amber-500" />
                  Codeforces
                </span>
                <ArrowUpRight className="h-3 w-3 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </a>

              <a
                href="mailto:your@email.com"
                className="group flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-2 text-xs font-medium text-card-foreground transition-all hover:bg-secondary hover:border-primary/40"
              >
                <span className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-[#b85d38] dark:text-[#e07a5f]" />
                  Email
                </span>
                <ArrowUpRight className="h-3 w-3 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t border-border pt-3 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {t("Footer.yourName")}. {t("Footer.rights")}.
          </p>

          <div className="flex items-center gap-3">
            <span>{t("Footer.builtWith")}</span>
            <div className="flex items-center gap-2 border-l border-border pl-3">
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FooterSection
