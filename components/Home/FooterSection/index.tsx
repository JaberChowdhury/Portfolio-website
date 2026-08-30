"use client"

import * as React from "react"
import { Link } from "@/i18n/routing"
import { Mail, ArrowUpRight, Trophy, Globe2, Heart, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"
import { LanguageToggle } from "@/components/LanguageToggle"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/m3/Button"

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
      <circle cx="4" r="2" />
    </svg>
  )
}

const NAV_ITEMS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "programming", label: "Competitions", href: "#programming" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "education", label: "Education", href: "#education" },
  { id: "contact", label: "Contact", href: "#contact" },
  { id: "learning", label: "Learning", href: "#learning" },
]

export function FooterSection() {
  const t = useTranslations()

  return (
    <footer
      id="footer"
      data-section="contact"
      className="relative w-full border-t border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.12))]/50
        bg-[var(--md-sys-color-surface-container,var(--card))]
        py-12 sm:py-16 md:py-20 text-[var(--md-sys-color-on-surface,var(--foreground))] transition-colors duration-500"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12 2xl:max-w-[1440px]">
        {/* Top M3 Surface Container: CTA Banner */}
        <div
          className="relative mb-10 sm:mb-12 overflow-hidden rounded-3xl
            border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/40
            bg-[var(--md-sys-color-surface-container-high,var(--secondary))]/80
            p-6 sm:p-8 md:p-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Subtle Top Accent Ribbon */}
          <div
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--md-sys-color-primary,#d4a017)]/70 via-[var(--md-sys-color-primary,#d4a017)] to-[var(--md-sys-color-tertiary,#2e8bc0)]"
            aria-hidden="true"
          />

          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/40 bg-[var(--md-sys-color-surface-container-lowest,var(--background))] px-3 py-1 font-mono text-xs font-semibold text-[var(--md-sys-color-primary,#d4a017)]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>09 ⁄ {t("Footer.finalDestination")}</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[var(--md-sys-color-on-surface,var(--foreground))]">
              {t("Footer.title1")} {t("Footer.title2")}{" "}
              <span className="text-[var(--md-sys-color-primary,#d4a017)]">
                {t("Footer.title3")}
              </span>
            </h3>
            <p className="max-w-xl text-xs sm:text-sm text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))] leading-relaxed">
              {t("Footer.description")}
            </p>
          </div>

          <div className="shrink-0">
            <Button
              variant="filled"
              size="md"
              shape="full"
              href="mailto:jaberhc2002@gmail.com"
              trailingIcon={<ArrowUpRight className="h-4 w-4" />}
              className="px-6 font-bold shadow-sm hover:shadow-md transition-all"
            >
              {t("Footer.startConversation")}
            </Button>
          </div>
        </div>

        {/* Middle Row: Quick Navigation Pills & Social Channels */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.12))]/40">
          {/* Brand & Status (md:col-span-4) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-lg font-black tracking-tight text-[var(--md-sys-color-on-surface,var(--foreground))]">
              {t("Footer.yourName")}
            </h4>
            <p className="text-xs sm:text-sm text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))] leading-relaxed">
              {t("Footer.bio")}
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/40 bg-[var(--md-sys-color-surface-container-low,var(--card))] px-3 py-1 text-xs text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <Globe2 className="h-3.5 w-3.5 text-emerald-500" />
              <span>{t("Footer.availableForRemote")}</span>
            </div>
          </div>

          {/* Quick Navigation Pills (md:col-span-5) */}
          <div className="md:col-span-5 space-y-3">
            <h5 className="font-mono text-xs font-bold tracking-wider text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))] uppercase">
              {t("Footer.navigation")}
            </h5>
            <div className="flex flex-wrap gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="inline-flex items-center rounded-full
                    border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/40
                    bg-[var(--md-sys-color-surface-container-low,var(--card))]
                    px-3 py-1 font-mono text-xs font-medium
                    text-[var(--md-sys-color-on-surface,var(--foreground))]
                    shadow-2xs transition-all duration-200
                    hover:border-[var(--md-sys-color-primary,#d4a017)]/50
                    hover:bg-[var(--md-sys-color-surface-container-high,var(--secondary))]
                    hover:scale-105"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social Channels (md:col-span-3) */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-mono text-xs font-bold tracking-wider text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))] uppercase">
              {t("Footer.connect")}
            </h5>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://github.com/JaberChowdhury"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.12))]/40 bg-[var(--md-sys-color-surface-container-low,var(--card))] text-xs font-medium text-[var(--md-sys-color-on-surface,var(--foreground))] hover:border-[var(--md-sys-color-primary,#d4a017)]/40 hover:bg-[var(--md-sys-color-surface-container-high,var(--secondary))] transition-all"
              >
                <GithubIcon className="h-4 w-4 text-[var(--md-sys-color-tertiary,#2e8bc0)]" />
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/md-jaber-hossain-chowdhury-543335252/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.12))]/40 bg-[var(--md-sys-color-surface-container-low,var(--card))] text-xs font-medium text-[var(--md-sys-color-on-surface,var(--foreground))] hover:border-[var(--md-sys-color-primary,#d4a017)]/40 hover:bg-[var(--md-sys-color-surface-container-high,var(--secondary))] transition-all"
              >
                <LinkedinIcon className="h-4 w-4 text-[var(--md-sys-color-primary,#d4a017)]" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://codeforces.com/profile/jaber02"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.12))]/40 bg-[var(--md-sys-color-surface-container-low,var(--card))] text-xs font-medium text-[var(--md-sys-color-on-surface,var(--foreground))] hover:border-[var(--md-sys-color-primary,#d4a017)]/40 hover:bg-[var(--md-sys-color-surface-container-high,var(--secondary))] transition-all"
              >
                <Trophy className="h-4 w-4 text-[var(--md-sys-color-primary,#d4a017)]" />
                <span>Codeforces</span>
              </a>

              <a
                href="mailto:jaberhc2002@gmail.com"
                className="flex items-center gap-2 p-2.5 rounded-xl border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.12))]/40 bg-[var(--md-sys-color-surface-container-low,var(--card))] text-xs font-medium text-[var(--md-sys-color-on-surface,var(--foreground))] hover:border-[var(--md-sys-color-primary,#d4a017)]/40 hover:bg-[var(--md-sys-color-surface-container-high,var(--secondary))] transition-all"
              >
                <Mail className="h-4 w-4 text-[var(--md-sys-color-tertiary,#2e8bc0)]" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))] text-center sm:text-left">
            © {new Date().getFullYear()} {t("Footer.yourName")}. {t("Footer.rights")}.
          </p>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))] hidden sm:inline">
              Material 3 Expressive
            </span>
            <div className="flex items-center gap-2 border-l border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/40 pl-3">
              <ThemeToggle showKeyIndicator={false} />
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
