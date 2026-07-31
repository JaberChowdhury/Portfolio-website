"use client"

import { motion } from "framer-motion"
import {
  Calendar,
  BookA as BookOpen,
  Brain,
  Code2,
  Target,
  GraduationCap,
  School,
} from "lucide-react"

import { useTranslations } from "next-intl"
import { EducationCard, type EducationCardProps } from "./EducationCard"
import { HighlightCard, type Highlight } from "./HighlightCard"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const item = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const highlightTints = ["pear", "cyan", "mint"] as const

export default function EducationSection() {
  const t = useTranslations("Education")

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

  return (
    <section id="education" className="relative w-full overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-28 md:px-10">
        <div className="mb-16">
          <p className="mono-label mb-4 text-ink-2">{t("eyebrow")}</p>

          <h2
            data-cursor="text"
            className="text-4xl leading-[1.05] font-bold tracking-[-0.025em] md:text-6xl"
          >
            {t("title1")}
            <br />
            {t("title2")}
            <span className="hl hl--cyan">{t("title3")}</span>
            .
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
            {t("description")}
          </p>
        </div>

        <div className="mb-20 flex flex-col gap-10">
          {academicHistory.map((edu, index) => (
            <motion.div
              key={edu.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <EducationCard {...edu} />
            </motion.div>
          ))}
        </div>

        <div className="mb-10">
          <h3
            data-cursor="text"
            className="text-2xl font-bold tracking-[-0.025em] md:text-3xl"
          >
            {t("academicFocus")}
          </h3>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-7 md:grid-cols-3"
        >
          {highlights.map((highlight, index) => (
            <motion.div key={highlight.title} variants={item} className="h-full">
              <HighlightCard
                highlight={highlight}
                tint={highlightTints[index]}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 pb-28"
        >
          <div className="hum-card hum-card--plain flex flex-col gap-4 rounded-2xl p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                <Calendar className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h4 className="font-bold tracking-[-0.025em]">
                  {t("progressTitle")}
                </h4>

                <p className="text-sm text-ink-2">{t("progressDesc")}</p>
              </div>
            </div>

            <div className="h-2.5 w-full overflow-hidden rounded-full bg-paper-3 md:w-80">
              <div className="h-full w-[25%] rounded-full bg-primary" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
