"use client"

import { useEffect, useState } from "react"
import type { CSSProperties } from "react"
import {
  BookA as BookOpen,
  Brain,
  Code2,
  GraduationCap,
  School,
  Target,
} from "lucide-react"
import { useTranslations } from "next-intl"
import type { EducationCardProps } from "./EducationCard"
import type { Highlight } from "./HighlightCard"

// Highlights and history are now loaded dynamically from translations

export default function EducationSection() {
  const t = useTranslations("Education")

  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Need to re-attach icons since JSON doesn't store components
  const rawHighlights = t.raw("highlights") as Highlight[]
  const highlightIcons = [Code2, Brain, Target]
  const highlights = rawHighlights.map((h, i) => ({
    ...h,
    icon: highlightIcons[i],
  }))

  const rawHistory = t.raw("history") as EducationCardProps[]
  const historyIcons = [GraduationCap, BookOpen, School, School]
  const academicHistory = rawHistory.map((h, i) => ({
    ...h,
    icon: historyIcons[i],
  }))

  const yearsOf = (edu: EducationCardProps) =>
    edu.progress.find((p) =>
      /year|duration|status|completion/i.test(p.label)
    )?.value

  return (
    <section
      id="education"
      className="relative w-full pb-[clamp(4rem,10vw,7.5rem)]"
    >
      <div className="mx-auto w-full max-w-3xl px-6 md:px-10">
        {/* Header */}
        <div
          className={"head-hang reveal" + (visible ? " is-visible" : "")}
          style={{ "--reveal-delay": "0s" } as CSSProperties}
        >
          <div className="head-hang__eyebrow">
            <span className="mono-label">( 07 )</span>
            <span className="mono-label">{t("eyebrow")}</span>
          </div>

          <h2 data-cursor="text" className="head-hang__title">
            {t("title1")}
            <br />
            {t("title2")}
            <span className="hl">{t("title3")}</span>.
          </h2>

          <p className="head-hang__body">{t("description")}</p>
        </div>

        {/* Academic History */}
        <div className="mt-8 flex flex-col gap-16 md:gap-20">
          {academicHistory.map((edu, index) => {
            const Icon = edu.icon ?? GraduationCap
            const years = yearsOf(edu)

            return (
              <article
                key={edu.title}
                className={"reveal" + (visible ? " is-visible" : "")}
                style={
                  {
                    "--reveal-delay": `${(index + 1) * 0.1}s`,
                  } as CSSProperties
                }
              >
                <p className="mono-label flex items-center gap-2">
                  <span className="text-cyan">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span>{edu.subtitle}</span>
                  {years && <span className="text-ink-2">· {years}</span>}
                </p>

                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                  {edu.title}
                </h3>

                <p className="mt-3 max-w-2xl font-serif text-ink-2">
                  {edu.description}
                </p>

                {edu.subjects.length > 0 && (
                  <p className="mt-5 font-serif text-sm text-ink-2">
                    {edu.subjects.join(" · ")}
                  </p>
                )}
              </article>
            )
          })}
        </div>

        {/* Highlights */}
        <div className="mt-24">
          <h3
            className={"mono-label reveal" + (visible ? " is-visible" : "")}
            style={{ "--reveal-delay": "0.5s" } as CSSProperties}
          >
            {t("academicFocus")}
          </h3>

          <div className="mt-8 flex flex-col gap-6">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon

              return (
                <div
                  key={highlight.title}
                  className={"aurora-card reveal" + (visible ? " is-visible" : "")}
                  style={
                    {
                      "--reveal-delay": `${0.6 + index * 0.1}s`,
                    } as CSSProperties
                  }
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-1 shrink-0 text-cyan">
                      <Icon className="h-4 w-4" />
                    </span>

                    <div>
                      <h4 className="text-lg font-semibold tracking-tight text-ink">
                        {highlight.title}
                      </h4>

                      <p className="mt-2 font-serif text-ink-2">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Academic Progress */}
        <div
          className={"mt-20 reveal" + (visible ? " is-visible" : "")}
          style={{ "--reveal-delay": "0.9s" } as CSSProperties}
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
            <h4 className="font-semibold tracking-tight text-ink">
              {t("progressTitle")}
            </h4>

            <p className="font-serif text-sm text-ink-2">{t("progressDesc")}</p>
          </div>

          <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-ink-2/15">
            <div className="h-full w-[25%] rounded-full bg-cyan" />
          </div>
        </div>
      </div>
    </section>
  )
}
