"use client"

import React from "react"
import { Mail, ArrowUpRight, Trophy } from "lucide-react"
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

export function ContactSection() {
  const t = useTranslations("Contact")

  const rawSocials = t.raw("socials") as {
    title: string
    description: string
  }[]
  const socialIcons = [GithubIcon, Trophy, LinkedinIcon, Mail]
  const socialLinks = [
    "https://github.com/YOUR_USERNAME",
    "https://codeforces.com/profile/YOUR_HANDLE",
    "https://linkedin.com/in/YOUR_USERNAME",
    "mailto:your@email.com",
  ]
  const socials = rawSocials.map((social, i) => ({
    ...social,
    icon: socialIcons[i],
    href: socialLinks[i],
  }))

  return (
    <section
      id="contact"
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground"
    >
      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-[#b85d38] dark:text-[#e07a5f] uppercase">
            {t("eyebrow")}
          </p>

          <h2
            data-cursor="text"
            className="text-3xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            {t("title1")}{" "}
            <span className="text-[#b85d38] dark:text-[#e07a5f]">
              {t("title2")}
            </span>{" "}
            {t("title3")}
          </h2>
        </div>

        {/* Start a Conversation Card */}
        <Card className="mb-4 rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md md:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-3 py-1 text-xs font-semibold tracking-wider text-[#b85d38] dark:text-[#e07a5f] uppercase">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t("available")}</span>
              </div>
              <h3 className="mt-2 text-xl font-bold text-card-foreground md:text-2xl">
                {t("openTo")}
              </h3>
              <p className="mt-1 max-w-xl text-xs text-muted-foreground md:text-sm">
                {t("ifYouHave") || t("description")}
              </p>
            </div>

            <a
              href="mailto:your@email.com"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-95"
            >
              <span>{t("sayHello")}</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Card>

        {/* 4 Social Handle Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
          {socials.map((social) => {
            const Icon = social.icon
            return (
              <a
                key={social.title}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-card-foreground transition-colors group-hover:bg-secondary/80 group-hover:text-primary">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </div>
                <div className="mt-3">
                  <div className="text-sm font-bold text-card-foreground">
                    {social.title}
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
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
