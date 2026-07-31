"use client"

import React from "react"
import { useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export interface Stat {
  label: string
  value: string
}

const ACCENTS = [
  "hum-card--pear",
  "hum-card--cyan",
  "hum-card--mint",
  "hum-card--lav",
] as const

const BENGALI_DIGITS = "০১২৩৪৫৬৭৮৯"

export function parseStatValue(value: string) {
  const match = /^[0-9০-৯]+/.exec(value)
  if (!match) return { number: null as number | null, suffix: "" }
  let number = 0
  for (const ch of match[0]) {
    const bengali = BENGALI_DIGITS.indexOf(ch)
    number = number * 10 + (bengali >= 0 ? bengali : ch.charCodeAt(0) - 48)
  }
  return { number, suffix: value.slice(match[0].length) }
}

interface StatCardProps {
  stat: Stat
  index: number
  headline: boolean
}

export function StatCard({ stat, index, headline }: StatCardProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduceMotion = useReducedMotion()
  const { number, suffix } = parseStatValue(stat.value)

  React.useEffect(() => {
    const el = ref.current
    if (!el || !inView || number == null) return

    if (reduceMotion) {
      el.style.setProperty("--num", String(number))
      return
    }

    const duration = 1400
    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      el.style.setProperty("--num", String(Math.round(eased * number)))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, number, reduceMotion])

  return (
    <div
      data-cursor="cover"
      className={cn(
        "hum-card group p-6 md:p-8",
        ACCENTS[index % ACCENTS.length]
      )}
    >
      <div className="flex items-baseline">
        {number == null ? (
          <span className="text-5xl font-bold tracking-tight text-ink md:text-6xl">
            {stat.value}
          </span>
        ) : (
          <>
            <span
              ref={ref}
              className={cn(
                "counter text-5xl font-bold tracking-tight md:text-6xl",
                headline ? "text-coral" : "text-ink"
              )}
            />
            {suffix && (
              <span
                className={cn(
                  "ml-0.5 text-3xl font-bold tracking-tight md:text-4xl",
                  headline ? "text-coral" : "text-ink"
                )}
              >
                {suffix}
              </span>
            )}
          </>
        )}
      </div>

      <p className="mono-label mt-4 text-ink-2">{stat.label}</p>
    </div>
  )
}
