"use client"

import {
  Code2,
  Brain,
  Target,
  GraduationCap,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type Highlight } from "./HighlightCard"
import { type EducationCardProps } from "./EducationCard"

export function EducationSection() {
  const t = useTranslations("Education")

  const rawHighlights = t.raw("highlights") as Highlight[]
  const highlightIcons = [Code2, Brain, Target]
  const highlights = rawHighlights.map((h, i) => ({
    ...h,
    icon: highlightIcons[i],
  }))

  const rawHistory = t.raw("history") as EducationCardProps[]
  const primaryEdu = rawHistory[0]

  return (
    <section id="education" className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground">
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
              {t("title2")} {t("title3")}
            </span>
          </h2>
        </div>

        {/* 2-Column Academic Layout */}
        <div className="grid gap-4 md:grid-cols-12 md:gap-5">
          {/* Main Degree Card (Left Column) */}
          {primaryEdu && (
            <div className="md:col-span-7">
              <Card className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md md:p-6">
                <div>
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-[#b85d38] dark:text-[#e07a5f]">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-card-foreground md:text-xl">
                        {primaryEdu.title}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium text-muted-foreground md:text-sm">
                        {primaryEdu.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground md:text-sm">
                    {primaryEdu.description}
                  </p>
                </div>

                <div className="mt-5 border-t border-border pt-4">
                  <div className="mb-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                    Core Coursework
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {primaryEdu.subjects.map((sub) => (
                      <Badge
                        key={sub}
                        variant="secondary"
                        className="rounded-md border border-border/50 bg-secondary text-secondary-foreground px-2.5 py-0.5 text-[11px] font-medium transition-colors hover:bg-secondary/80"
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
            {highlights.slice(0, 3).map((h, i) => {
              const Icon = h.icon
              return (
                <div
                  key={i}
                  className="group flex items-center gap-3.5 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-[#b85d38] dark:text-[#e07a5f] transition-colors group-hover:bg-secondary/80">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-card-foreground">{h.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                      {h.description}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EducationSection
