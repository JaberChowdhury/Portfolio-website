"use client"

import { useEffect, useState } from "react"
import type { CSSProperties } from "react"
import Link from "next/link"
import {
  AArrowDown as Github,
  AArrowUp as Linkedin,
  Mail,
  Trophy,
} from "lucide-react"
import { useTranslations } from "next-intl"

// Socials array is loaded from translations

const socialIcons = [Github, Trophy, Linkedin, Mail]

const socialLinks = [
  "https://github.com/YOUR_USERNAME",
  "https://codeforces.com/profile/YOUR_HANDLE",
  "https://linkedin.com/in/YOUR_USERNAME",
  "mailto:your@email.com",
]

export default function ContactSection() {
  const t = useTranslations("Contact")

  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Map icons for socials
  const rawSocials = t.raw("socials") as {
    title: string
    description: string
  }[]
  const socials = rawSocials.map((social, i) => ({
    ...social,
    icon: socialIcons[i],
    href: socialLinks[i],
  }))

  return (
    <section
      id="contact"
      className="relative w-full pb-[clamp(4rem,10vw,7.5rem)]"
    >
      <div className="mx-auto w-full max-w-3xl px-6 md:px-10">
        {/* Header */}
        <div
          className={"head-hang reveal" + (visible ? " is-visible" : "")}
          style={{ "--reveal-delay": "0s" } as CSSProperties}
        >
          <div className="head-hang__eyebrow">
            <span className="mono-label">( 06 )</span>
            <span className="mono-label">{t("eyebrow")}</span>
          </div>

          <h2 data-cursor="text" className="head-hang__title">
            {t("title1")}
            <br />
            <span className="hl">{t("title2")}</span>
            {t("title3")}
          </h2>

          <p className="head-hang__body">{t("description")}</p>
        </div>

        {/* Availability CTA */}
        <div
          className={"mt-14 reveal" + (visible ? " is-visible" : "")}
          style={{ "--reveal-delay": "0.1s" } as CSSProperties}
        >
          <p className="mono-label">{t("available")}</p>

          <p className="mt-5 max-w-2xl text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            {t("openTo")}
          </p>

          <p className="mt-4 max-w-2xl font-serif text-ink-2">
            {t("ifYouHave")}
          </p>

          <Link
            href="mailto:your@email.com"
            className="cta-word mt-10 inline-flex"
          >
            {t("sayHello")}
            <span aria-hidden="true" className="cta-word__arrow">
              →
            </span>
          </Link>
        </div>

        {/* Socials */}
        <div
          className={"mt-20 reveal" + (visible ? " is-visible" : "")}
          style={{ "--reveal-delay": "0.2s" } as CSSProperties}
        >
          <ul className="flex flex-col gap-12">
            {socials.map((social) => {
              const Icon = social.icon

              return (
                <li key={social.title}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline gap-4"
                  >
                    <span className="shrink-0 text-cyan">
                      <Icon className="h-4 w-4" />
                    </span>

                    <span>
                      <span className="cta-word">
                        {social.title}
                        <span aria-hidden="true" className="cta-word__arrow">
                          →
                        </span>
                      </span>

                      <span className="mt-1 block font-serif text-sm text-ink-2">
                        {social.description}
                      </span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
