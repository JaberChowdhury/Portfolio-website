"use client"
import { useEffect, useState, type CSSProperties } from "react"

import { useTranslations } from "next-intl"
import { TECH_STACK_DATA } from "./techdata"

const TechnologySection = () => {
  const t = useTranslations("Technology")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="technology" className="relative w-full">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Section head */}
        <header className="head-hang">
          <div className="head-hang__eyebrow">
            <span className="mono-label">01 · {t("eyebrow")}</span>
          </div>
          <h2 className="head-hang__title text-ink">
            {t("title1")}
            <span className="hl">{t("title2")}</span>
          </h2>
          <p className="head-hang__body font-serif text-lg">{t("description")}</p>
        </header>

        {/* Tech grid */}
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {TECH_STACK_DATA.map((tech, index) => (
            <li
              key={tech.id}
              className={`reveal${mounted ? " is-visible" : ""}`}
              style={{ "--reveal-delay": `${index * 0.04}s` } as CSSProperties}
            >
              <span className="mono-label block rounded-full border border-white/10 bg-paper-2/70 px-4 py-2.5 text-center">
                {tech.label}
              </span>
            </li>
          ))}
        </ul>

        <p className="mono-label pb-28 text-center opacity-50">
          {t("backgroundText")}
        </p>
      </div>
    </section>
  )
}

export default TechnologySection
