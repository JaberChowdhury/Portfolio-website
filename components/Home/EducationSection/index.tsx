"use client"

import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { GraduationCap, BookOpen, School } from "lucide-react"
import { useTranslations } from "next-intl"

import { Card } from "@/components/pouf/surface"
import { Eyebrow, Heading, Highlight as HighlightText, Text } from "@/components/pouf/text"
import { Progress } from "@/components/pouf/progress"
import type { IconName } from "@/components/pouf/Icon"
import type { Tone } from "@/components/pouf/tone"
import { EducationCard, type EducationCardProps } from "./EducationCard"
import { HighlightCard, type Highlight } from "./HighlightCard"

const highlightRoles: IconName[] = ["sword", "target", "performance"]
const highlightTones: Tone[] = ["purple", "blue", "mint"]
const historyIcons = [
  <GraduationCap key="bsc" size={20} />,
  <BookOpen key="hsc" size={20} />,
  <School key="ssc" size={20} />,
  <School key="jsc" size={20} />,
]
const historyTones: Tone[] = ["purple", "mint", "blue", "pink"]

function Reveal({
  delay = 0,
  className = "",
  children,
}: {
  delay?: number
  className?: string
  children: React.ReactNode
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export default function EducationSection() {
  const t = useTranslations("Education")

  const rawHighlights = t.raw("highlights") as Highlight[]
  const rawHistory = t.raw("history") as EducationCardProps[]

  return (
    <section id="education" className="relative w-full pb-[clamp(4rem,10vw,7.5rem)]">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col gap-(--s3)">
            <Eyebrow>( 07 ) · {t("eyebrow")}</Eyebrow>
            <Heading level={2}>
              {t("title1")}
              <br />
              {t("title2")}
              <HighlightText>{t("title3")}</HighlightText>.
            </Heading>
            <Text muted>{t("description")}</Text>
          </div>
        </Reveal>

        <div className="mt-(--s8) grid gap-(--s4) md:grid-cols-2">
          {rawHistory.map((edu, index) => (
            <Reveal key={edu.title} delay={(index % 2) * 0.06}>
              <EducationCard
                {...edu}
                icon={historyIcons[index % historyIcons.length]}
                tone={historyTones[index % historyTones.length]}
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-(--s8) flex flex-col gap-(--s4)">
          <Reveal>
            <Eyebrow>{t("academicFocus")}</Eyebrow>
          </Reveal>

          <div className="grid gap-(--s4) md:grid-cols-3">
            {rawHighlights.map((highlight, index) => (
              <Reveal key={highlight.title} delay={index * 0.05}>
                <HighlightCard
                  highlight={highlight}
                  icon={highlightRoles[index % highlightRoles.length]}
                  tone={highlightTones[index % highlightTones.length]}
                />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-(--s8)">
          <Reveal>
            <Card>
              <div className="flex flex-col gap-(--s3)">
                <Heading level={3}>{t("progressTitle")}</Heading>
                <Text muted>{t("progressDesc")}</Text>
                <Progress value={25} tone="purple" label={t("progressTitle")} />
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
