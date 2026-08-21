"use client"

import { Code2, Brain, Target, GraduationCap } from "lucide-react"
import { useTranslations } from "next-intl"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HighlightCard, type Highlight } from "./HighlightCard"
import { type EducationCardProps } from "./EducationCard"

export function EducationSection() {
  const t = useTranslations("Education")

  const rawHighlights = t.raw("highlights") as Highlight[]
  const highlightIcons = [Code2, Brain, Target]
  const highlights = rawHighlights.map((h, i) => ({
    ...h,
    icon: highlightIcons[i % highlightIcons.length],
  }))

  const rawHistory = t.raw("history") as EducationCardProps[]
  const primaryEdu = rawHistory[0]

  return (
    <section
      id="education"
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground"
    >
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-3.5 sm:mb-6">
          <div className="mb-1.5 flex items-center gap-2 sm:mb-2">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase sm:tracking-[0.25em]">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              06 ⁄ {t("eyebrow")}
            </span>
          </div>

          <h2
            data-cursor="text"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-5xl"
          >
            {t("title1")}{" "}
            <span className="text-rose-600 dark:text-rose-400">
              {t("title2")} {t("title3")}
            </span>
          </h2>

          <p className="mt-1 max-w-xl text-xs leading-relaxed font-normal text-muted-foreground sm:mt-2 sm:text-sm">
            {t("description")}
          </p>
        </div>

        {/* 2-Column Academic Layout */}
        <div className="grid gap-3 sm:gap-4 md:grid-cols-12 md:gap-5">
          {/* Main Degree Card (Left Column) */}
          {primaryEdu && (
            <div className="md:col-span-7">
              <Card className="group flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card p-5 text-card-foreground shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-rose-500/40 hover:shadow-md active:scale-[0.99] md:p-6">
                <div>
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-600 transition-transform duration-300 group-hover:scale-105 dark:text-rose-400">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-card-foreground md:text-xl">
                        {primaryEdu.title}
                      </h3>
                      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground md:text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                        {primaryEdu.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground md:text-sm">
                    {primaryEdu.description}
                  </p>

                  {/* Progress Metric Chips */}
                  {primaryEdu.progress && primaryEdu.progress.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {primaryEdu.progress.map((item) => (
                        <div
                          key={item.label}
                          className="flex flex-col justify-center rounded-xl border border-border/60 bg-secondary/40 p-2.5"
                        >
                          <div className="font-mono text-xs font-bold text-card-foreground">
                            {item.value}
                          </div>
                          <p className="font-mono text-[10px] text-muted-foreground">
                            {item.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 border-t border-border/70 pt-3.5">
                  <div className="mb-2 font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                    Core Coursework
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {primaryEdu.subjects.map((sub) => (
                      <Badge
                        key={sub}
                        variant="secondary"
                        className="rounded-full border border-border/60 bg-secondary/50 px-2.5 py-0.5 font-mono text-[11px] font-medium text-muted-foreground transition-all duration-200 hover:scale-105 hover:bg-secondary hover:text-foreground"
                      >
                        {sub}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Academic Focus Highlights (Right Column) */}
          <div className="flex flex-col justify-between gap-3 md:col-span-5">
            {highlights.slice(0, 3).map((h, i) => (
              <HighlightCard key={i} highlight={h} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EducationSection
