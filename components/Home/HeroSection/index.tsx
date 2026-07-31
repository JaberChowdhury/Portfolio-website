"use client"

import { useState } from "react"
import type { CSSProperties, MouseEvent } from "react"
import { useTranslations } from "next-intl"
import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"

export function Hero() {
  const t = useTranslations("Hero")
  const [stars, setStars] = useState<{ id: number; x: number; y: number }[]>([])

  const spawnStar = (e: MouseEvent<HTMLElement>) => {
    if (e.detail === 0) return
    const id = Date.now()
    setStars((prev) => [...prev, { id, x: e.clientX, y: e.clientY }])
    window.setTimeout(() => {
      setStars((prev) => prev.filter((star) => star.id !== id))
    }, 450)
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-paper text-ink"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[20%] -right-[15%] h-[560px] w-[560px] rounded-full bg-primary/15 blur-[140px]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-24 md:px-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <div className="mb-8 flex items-center gap-2.5">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-pear" />
            <p className="mono-label text-ink-2">{t("eyebrow")}</p>
          </div>

          <h1 className="preserve-design text-6xl leading-[0.95] font-bold tracking-[-0.03em] md:text-8xl">
            <span className="block">Jaber</span>
            <span className="block">
              <span className="last-name hl hl--pear">Hossain</span>
              <span
                aria-hidden="true"
                className="hum-char ml-3 inline-block h-6 w-6 md:h-7 md:w-7"
              />
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2 md:text-xl">
            {t("description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              className="px-8"
              nativeButton={false}
              render={<a href="mailto:your@email.com" />}
              onClick={spawnStar}
            >
              {t("ctaPrimary")}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="px-8"
              nativeButton={false}
              render={<Link href="/projects" />}
            >
              {t("ctaSecondary")}
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-14 flex flex-wrap gap-2.5">
            {(["tag1", "tag2", "tag3"] as const).map((key) => (
              <span
                key={key}
                className="mono-label rounded-full border border-border bg-paper-2 px-4 py-2 text-ink-2"
              >
                {t(key)}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          className="flex flex-col gap-5"
        >
          <div className="hum-card hum-card--cyan p-6">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyan"
              />
              <p className="mono-label text-ink">{t("available")}</p>
            </div>
          </div>

          <div className="hum-card hum-card--mint p-6">
            <p className="mono-label mb-3 text-ink-2">{t("ratingLabel")}</p>
            <p className="text-4xl font-bold tracking-tight text-ink">
              <span
                className="counter"
                data-target="1700"
                style={{ "--target": 1700 } as CSSProperties}
              />
              <span className="text-ink-2">+</span>
            </p>
          </div>
        </motion.div>
      </div>

      {stars.map((star) => (
        <span
          key={star.id}
          aria-hidden="true"
          className="star-burst z-10"
          style={{ left: star.x - 12, top: star.y - 12 }}
        />
      ))}
    </section>
  )
}

export default Hero
