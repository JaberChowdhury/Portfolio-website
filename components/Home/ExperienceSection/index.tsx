"use client"

import React from "react"

import { useTranslations } from "next-intl"
import type { Experience } from "./ExperienceCard"

// Experiences array is loaded dynamically from translations

function Reveal({
  delay = 0,
  className = "",
  children,
}: {
  delay?: number
  className?: string
  children: React.ReactNode
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const raf = requestAnimationFrame(() => el.classList.add("is-visible"))
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

export default function ExperienceSection() {
  const t = useTranslations("Experience")
  const experiences = t.raw("items") as Experience[]

  return (
    <section id="experience" className="relative w-full overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        {/* Hanging section head */}
        <header className="head-hang">
          <div className="head-hang__eyebrow">
            <p className="mono-label">04 · {t("eyebrow")}</p>
          </div>

          <h2
            data-cursor="text"
            className="head-hang__title text-ink"
          >
            {t("title1")}
            <br />
            {t("title2")}
            <span className="hl">{t("title3")}</span>
            .
          </h2>

          <p className="head-hang__body">{t("description")}</p>
        </header>

        {/* Single-column timeline */}
        <div className="max-w-3xl">
          {experiences.map((experience, index) => (
            <Reveal key={index} delay={index * 0.08} className="mb-16 last:mb-0">
              <h3
                data-cursor="text"
                className="text-2xl font-semibold tracking-tight text-ink"
              >
                {experience.role}
              </h3>

              <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="mono-label">{experience.company}</span>
                <span className="font-mono text-[11px] tracking-[0.12em] text-ink-2 uppercase">
                  {experience.period}
                </span>
              </p>

              <p className="mt-4 text-ink-2">{experience.description}</p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {experience.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-paper-2 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.12em] text-ink-2 uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
