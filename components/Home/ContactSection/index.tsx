"use client"

import React from "react"
import { Mail, ArrowUpRight, Trophy, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useTranslations } from "next-intl"

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

const SOCIAL_CONFIGS = [
  {
    icon: GithubIcon,
    href: "https://github.com/YOUR_USERNAME",
    iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    hoverBorder: "hover:border-purple-500/40",
  },
  {
    icon: Trophy,
    href: "https://codeforces.com/profile/YOUR_HANDLE",
    iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    hoverBorder: "hover:border-amber-500/40",
  },
  {
    icon: LinkedinIcon,
    href: "https://linkedin.com/in/YOUR_USERNAME",
    iconBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    hoverBorder: "hover:border-sky-500/40",
  },
  {
    icon: Mail,
    href: "mailto:your@email.com",
    iconBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    hoverBorder: "hover:border-rose-500/40",
  },
]

export function ContactSection() {
  const t = useTranslations("Contact")

  const rawSocials = t.raw("socials") as {
    title: string
    description: string
  }[]

  const socials = rawSocials.map((social, i) => ({
    ...social,
    ...SOCIAL_CONFIGS[i % SOCIAL_CONFIGS.length],
  }))

  return (
    <section
      id="contact"
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground"
    >
      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              07 ⁄ {t("eyebrow")}
            </span>
          </div>

          <h2
            data-cursor="text"
            className="text-3xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            {t("title1")}{" "}
            <span className="text-amber-600 dark:text-amber-400">
              {t("title2")}
            </span>{" "}
            {t("title3")}
          </h2>
        </div>

        {/* Start a Conversation Card */}
        <Card className="mb-4 rounded-2xl border border-border/80 bg-card p-5 text-card-foreground shadow-xs transition-all duration-300 hover:border-amber-500/40 hover:shadow-md md:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold tracking-wider text-emerald-700 dark:text-emerald-400 uppercase">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t("available")}</span>
              </div>
              <h3 className="mt-2.5 text-xl font-bold text-card-foreground md:text-2xl">
                {t("openTo")}
              </h3>
              <p className="mt-1 max-w-xl text-xs text-muted-foreground md:text-sm leading-relaxed">
                {t("ifYouHave") || t("description")}
              </p>
            </div>

            <a
              href="mailto:your@email.com"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>{t("sayHello")}</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Card>

        {/* 4 Multi-Accent Hum Social Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
          {socials.map((social) => {
            const Icon = social.icon
            return (
              <a
                key={social.title}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-4.5 text-card-foreground shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-[0.98] ${social.hoverBorder}`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105 ${social.iconBg}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground" />
                </div>
                <div className="mt-3.5">
                  <div className="text-sm font-bold text-card-foreground">
                    {social.title}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {social.description}
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ContactSection
