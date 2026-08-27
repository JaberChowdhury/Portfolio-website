"use client"

import React, { useState } from "react"
import { Mail, ArrowUpRight, Trophy } from "lucide-react"
import { useTranslations } from "next-intl"
import { AnimatePresence, motion } from "framer-motion"

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

const SOCIAL_CONFIGS = [
  {
    icon: GithubIcon,
    href: "https://github.com/JaberChowdhury",
    accentColor: "lavender",
    iconBg:
      "bg-[var(--color-lavender)]/10 text-[var(--color-lavender)] border-[var(--color-lavender)]/25",
    hoverBorder: "hover:border-[var(--color-lavender)]/50",
    ribbon:
      "from-[var(--color-lavender)]/80 via-[var(--color-lavender-light)] to-[var(--color-lavender)]",
    dot: "hum-dot hum-dot--lavender",
    badgeText: "CODE & REPOS",
    badgeStyle:
      "border-[var(--color-lavender)]/30 bg-[var(--color-lavender)]/10 text-[var(--color-lavender)]",
  },
  {
    icon: Trophy,
    href: "https://codeforces.com/profile/jaber02",
    accentColor: "pear",
    iconBg:
      "bg-[var(--color-pear)]/10 text-[var(--color-pear-deep)] dark:text-[var(--color-pear)] border-[var(--color-pear)]/25",
    hoverBorder: "hover:border-[var(--color-pear)]/50",
    ribbon:
      "from-[var(--color-pear)]/80 via-[var(--color-pear-light)] to-[var(--color-pear)]",
    dot: "hum-dot hum-dot--pear",
    badgeText: "229 SOLVED",
    badgeStyle:
      "border-[var(--color-pear)]/30 bg-[var(--color-pear)]/10 text-[var(--color-pear-deep)] dark:text-[var(--color-pear)]",
  },
  {
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/md-jaber-hossain-chowdhury-543335252/",
    accentColor: "cyan",
    iconBg:
      "bg-[var(--color-cyan)]/10 text-[var(--color-cyan-deep)] dark:text-[var(--color-cyan)] border-[var(--color-cyan)]/25",
    hoverBorder: "hover:border-[var(--color-cyan)]/50",
    ribbon:
      "from-[var(--color-cyan)]/80 via-[var(--color-cyan-light)] to-[var(--color-cyan)]",
    dot: "hum-dot hum-dot--cyan",
    badgeText: "CONNECT",
    badgeStyle:
      "border-[var(--color-cyan)]/30 bg-[var(--color-cyan)]/10 text-[var(--color-cyan-deep)] dark:text-[var(--color-cyan)]",
  },
  {
    icon: Mail,
    href: "mailto:jaberhc2002@gmail.com",
    accentColor: "coral",
    iconBg:
      "bg-[var(--color-coral)]/10 text-[var(--color-coral-deep)] dark:text-[var(--color-coral)] border-[var(--color-coral)]/25",
    hoverBorder: "hover:border-[var(--color-coral)]/50",
    ribbon:
      "from-[var(--color-coral)]/80 via-[var(--color-coral-light)] to-[var(--color-coral)]",
    dot: "hum-dot hum-dot--coral",
    badgeText: "INBOX",
    badgeStyle:
      "border-[var(--color-coral)]/30 bg-[var(--color-coral)]/10 text-[var(--color-coral-deep)] dark:text-[var(--color-coral)]",
  },
]

export function ContactSection() {
  const t = useTranslations("Contact")
  const [socialIdx, setSocialIdx] = useState(0)
  const [socialDirection, setSocialDirection] = useState(0)

  const handleSocialNext = () => {
    setSocialDirection(1)
    setSocialIdx((prev) => (prev + 1) % 4)
  }

  const handleSocialPrev = () => {
    setSocialDirection(-1)
    setSocialIdx((prev) => (prev === 0 ? 3 : prev - 1))
  }

  const rawSocials = t.raw("socials") as {
    title: string
    description: string
  }[]

  const socials = React.useMemo(() => {
    return (rawSocials || []).map((social, i) => ({
      ...social,
      ...SOCIAL_CONFIGS[i % SOCIAL_CONFIGS.length],
    }))
  }, [rawSocials])

  return (
    <section
      id="contact"
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground"
    >
      {/* Decorative ambient blobs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-15%",
          right: "5%",
          width: "45vw",
          height: "45vw",
          maxWidth: "500px",
          maxHeight: "500px",
          background:
            "radial-gradient(circle, rgba(212,160,23,0.09) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "5%",
          width: "40vw",
          height: "40vw",
          maxWidth: "450px",
          maxHeight: "450px",
          background:
            "radial-gradient(circle, rgba(61,171,110,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12 2xl:max-w-[1440px]">
        {/* Section Header */}
        <div className="mb-3 max-w-3xl sm:mb-5 md:mb-6">
          <div className="mb-1.5 flex items-center justify-between gap-2 sm:mb-2.5">
            <span className="hum-eyebrow inline-flex items-center gap-2">
              <span className="hum-dot hum-dot--pear" />
              07 ⁄ {t("eyebrow")}
            </span>
            <div className="flex items-center gap-1 rounded-full border border-border/60 bg-card/60 px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:hidden">
              <span className="animate-pulse">←</span>
              <span>Swipe Socials</span>
              <span className="animate-pulse">→</span>
            </div>
          </div>

          <h2
            data-cursor="text"
            className="text-2xl font-black tracking-tight text-foreground xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {t("title1")} <span className="em-hum">{t("title2")}</span>
            {t("title3")}
          </h2>

          <p className="mt-1 max-w-2xl text-xs leading-relaxed font-normal text-muted-foreground sm:mt-2 sm:text-sm md:text-base">
            {t("description")}
          </p>
        </div>

        {/* Start a Conversation Hub Card */}
        <div
          data-cursor="cover"
          className="hum-card group relative mb-3.5 overflow-hidden rounded-2xl border border-border/80 bg-card p-3.5 transition-all duration-300 hover:border-[var(--color-pear)]/50 sm:mb-5 sm:p-6 md:p-7"
        >
          {/* Top accent ribbon */}
          <div
            className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[var(--color-pear)] via-[var(--color-pear-light)] to-[var(--color-mint)] opacity-90 transition-opacity duration-300 group-hover:opacity-100 sm:h-1.5"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-mint)]/30 bg-[var(--color-mint)]/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-[var(--color-mint)] uppercase sm:px-3 sm:py-1 sm:text-xs">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-mint)] sm:h-2 sm:w-2" />
                <span>{t("available")}</span>
              </div>
              <h3 className="text-base font-bold text-card-foreground xs:text-lg sm:text-2xl md:text-3xl">
                {t("openTo")}
              </h3>
              <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-base">
                {t("ifYouHave")}
              </p>
            </div>

            {/* Canonical Hum Push Button */}
            <div className="w-full shrink-0 self-stretch sm:w-auto sm:self-center">
              <a
                href="mailto:jaberhc2002@gmail.com"
                className="hum-btn min-h-[44px] w-full justify-center !px-4 !py-2.5 font-mono text-xs font-bold sm:w-auto sm:!px-5 sm:!py-3 sm:text-sm"
              >
                <span>{t("sayHello")}</span>
                <ArrowUpRight className="hum-arrow h-4 w-4 shrink-0 sm:h-4.5 sm:w-4.5" />
              </a>
            </div>
          </div>
        </div>

        {/* 4 Multi-Accent Hum Social Cards: Desktop Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 sm:gap-3.5 md:grid-cols-4 md:gap-5">
          {socials.map((social) => {
            const Icon = social.icon
            return (
              <a
                key={social.title}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="cover"
                className={`hum-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-3.5 transition-all duration-300 hover:-translate-y-1 sm:p-4.5 md:p-5.5 ${social.hoverBorder}`}
              >
                {/* Top ribbon per card accent */}
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${social.ribbon} opacity-75 transition-opacity duration-300 group-hover:opacity-100`}
                  aria-hidden="true"
                />

                <div className="flex items-center justify-between gap-2">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10 md:h-11 md:w-11 ${social.iconBg}`}
                  >
                    <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5 md:h-5.5 md:w-5.5" />
                  </div>
                  <span
                    className={`mono-label max-w-[120px] shrink-0 truncate rounded-full border px-2 py-0.5 text-[8px] font-bold tracking-wider sm:text-[9px] ${social.badgeStyle}`}
                  >
                    {social.badgeText}
                  </span>
                </div>

                <div className="mt-3 sm:mt-3.5 md:mt-4">
                  <div className="flex items-center justify-between gap-1.5">
                    <h4 className="text-xs font-bold text-card-foreground sm:text-sm md:text-base">
                      {social.title}
                    </h4>
                    <ArrowUpRight className="hum-arrow h-3.5 w-3.5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-4 sm:w-4" />
                  </div>
                  <p className="mt-0.5 truncate font-mono text-[9px] text-muted-foreground sm:text-[10px] md:text-xs">
                    {social.description}
                  </p>
                </div>
              </a>
            )
          })}
        </div>

        {/* 4 Social Cards: Mobile Framer Motion Swipe Slider */}
        <div className="sm:hidden">
          <div className="relative overflow-hidden py-1">
            <AnimatePresence mode="wait" custom={socialDirection}>
              <motion.div
                key={socialIdx}
                custom={socialDirection}
                variants={{
                  enter: (dir: number) => ({
                    x: dir > 0 ? 40 : -40,
                    opacity: 0,
                    scale: 0.97,
                  }),
                  center: {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.28, ease: "easeOut" },
                  },
                  exit: (dir: number) => ({
                    x: dir > 0 ? -40 : 40,
                    opacity: 0,
                    scale: 0.97,
                    transition: { duration: 0.2, ease: "easeIn" },
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_e, info) => {
                  if (info.offset.x < -35 || info.velocity.x < -250) {
                    handleSocialNext()
                  } else if (info.offset.x > 35 || info.velocity.x > 250) {
                    handleSocialPrev()
                  }
                }}
                className="w-full cursor-grab touch-pan-y active:cursor-grabbing"
              >
                {(() => {
                  const social = socials[socialIdx]
                  const Icon = social.icon
                  return (
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`hum-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-4 shadow-xs ${social.hoverBorder}`}
                    >
                      <div
                        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${social.ribbon}`}
                        aria-hidden="true"
                      />
                      <div className="flex items-center justify-between gap-2">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl border ${social.iconBg}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span
                          className={`mono-label rounded-full border px-2.5 py-0.5 text-[9px] font-bold tracking-wider ${social.badgeStyle}`}
                        >
                          {social.badgeText}
                        </span>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between gap-1.5">
                          <h4 className="text-sm font-bold text-card-foreground">
                            {social.title}
                          </h4>
                          <ArrowUpRight className="hum-arrow h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                          {social.description}
                        </p>
                      </div>
                    </a>
                  )
                })()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="mt-2 flex items-center justify-center gap-1.5">
            {socials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSocialDirection(idx > socialIdx ? 1 : -1)
                  setSocialIdx(idx)
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === socialIdx
                    ? "w-6 bg-[var(--color-pear)]"
                    : "w-1.5 bg-muted-foreground/30"
                }`}
                aria-label={`Go to social card ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
