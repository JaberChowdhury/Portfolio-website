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

import { Card, CardContent } from "@/components/ui/card"
import { useTranslations } from "next-intl"
import { EducationCard, type EducationCardProps } from "./EducationCard"
import { HighlightCard, type Highlight } from "./HighlightCard"

// Highlights and history are now loaded dynamically from translations

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

export default function EducationSection() {
  const t = useTranslations("Education")
  
  // Need to re-attach icons since JSON doesn't store components
  const rawHighlights = t.raw("highlights") as Highlight[]
  const highlightIcons = [Code2, Brain, Target]
  const highlights = rawHighlights.map((h, i) => ({ ...h, icon: highlightIcons[i] }))

  const rawHistory = t.raw("history") as EducationCardProps[]
  const historyIcons = [GraduationCap, BookOpen, School, School]
  const academicHistory = rawHistory.map((h, i) => ({ ...h, icon: historyIcons[i] }))

  return (
    <section id="education" className="relative w-full overflow-hidden py-28">
      {/* Background Aura */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[450px] w-[650px] rounded-full bg-foreground/5 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mb-16">
          <p className="mb-4 text-xs tracking-[0.35em] text-muted-foreground uppercase">
            {t("eyebrow")}
          </p>

          <h2
            data-cursor="text"
            className="text-4xl leading-[1.05] font-semibold tracking-tight md:text-6xl"
          >
            {t("title1")}
            <br />
            {t("title2")}
            <span className="animate-[gradientMove_6s_linear_infinite] bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-transparent">
              {t("title3")}
            </span>
            .
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("description")}
          </p>
        </div>

        {/* Academic History Timeline */}
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

        {/* Highlights Header */}
        <div className="mb-10">
          <h3
            data-cursor="text"
            className="text-2xl font-semibold tracking-tight"
          >
            {t("academicFocus")}
          </h3>
        </div>

        {/* Highlights */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-7 md:grid-cols-3"
        >
          {highlights.map((highlight) => (
            <motion.div key={highlight.title} variants={item}>
              <HighlightCard highlight={highlight} />
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <Card className="border border-border/60 bg-card/40 backdrop-blur-xl">
            <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />

                <div>
                  <h4 className="font-medium">{t("progressTitle")}</h4>

                  <p className="text-sm text-muted-foreground">
                    {t("progressDesc")}
                  </p>
                </div>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-muted md:w-80">
                <div className="h-full w-[25%] rounded-full bg-primary" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  )
}
