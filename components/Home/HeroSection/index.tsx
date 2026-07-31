"use client"

import { useEffect, useState, type CSSProperties } from "react"
import withWaveDivider from "@/components/Wavedivider"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"

export function Hero() {
  const t = useTranslations("Hero")
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(true), 60)
    return () => window.clearTimeout(id)
  }, [])

  const reveal = (delay: string) =>
    ({ "--reveal-delay": delay } as CSSProperties)

  return (
    <section id="home" className="relative flex min-h-screen items-center">
      <div className="mx-auto w-full max-w-6xl px-6 py-28 md:px-10">
        <div className="max-w-3xl">
          <p
            className={`mono-label reveal ${visible ? "is-visible" : ""}`}
            style={reveal("0.05s")}
          >
            <span className="preserve-design">Jaber Chowdhury</span>
            <span aria-hidden="true"> — </span>
            {t("tag1")}
          </p>

          <p
            className={`mt-6 flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.12em] text-ink-2 uppercase reveal ${visible ? "is-visible" : ""}`}
            style={reveal("0.15s")}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan" />
            {t("available")}
          </p>

          <h1
            className={`preserve-design mt-10 font-sans text-[clamp(3rem,9vw,7rem)] leading-[0.95] font-semibold tracking-[-0.03em] text-ink reveal ${visible ? "is-visible" : ""}`}
            style={reveal("0.25s")}
          >
            Jaber <span className="hl">Chowdhury</span>
          </h1>

          <p
            className={`mt-8 max-w-xl text-lg leading-relaxed text-ink-2 reveal ${visible ? "is-visible" : ""}`}
            style={reveal("0.4s")}
          >
            {t("description")}
          </p>

          <div className={`mt-12 reveal ${visible ? "is-visible" : ""}`} style={reveal("0.55s")}>
            <Link href="/#projects" className="cta-word">
              View my work
              <span className="cta-word__arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          <div
            className={`mt-20 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[0.6875rem] tracking-[0.12em] text-ink-2/70 uppercase reveal ${visible ? "is-visible" : ""}`}
            style={reveal("0.7s")}
          >
            <span>{t("tag1")}</span>
            <span aria-hidden="true" className="text-cyan/50">
              /
            </span>
            <span>{t("tag2")}</span>
            <span aria-hidden="true" className="text-cyan/50">
              /
            </span>
            <span>{t("tag3")}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

const HeroSection = withWaveDivider(Hero)

export default HeroSection
