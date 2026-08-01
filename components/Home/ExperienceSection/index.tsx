"use client"

import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useTranslations } from "next-intl"

import { Eyebrow, Heading, Highlight, Text } from "@/components/pouf/text"
import type { Tone } from "@/components/pouf/tone"
import { ExperienceCard, type Experience } from "./ExperienceCard"

const tones: Tone[] = ["purple", "blue", "mint", "pink"]

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

export default function ExperienceSection() {
  const t = useTranslations("Experience")
  const experiences = t.raw("items") as Experience[]

  return (
    <section id="experience" className="relative w-full overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col gap-(--s3)">
            <Eyebrow>04 · {t("eyebrow")}</Eyebrow>
            <Heading level={2}>
              {t("title1")}
              <br />
              {t("title2")}
              <Highlight>{t("title3")}</Highlight>.
            </Heading>
            <Text muted>{t("description")}</Text>
          </div>
        </Reveal>

        <div className="mt-(--s8) flex flex-col gap-(--s4)">
          {experiences.map((experience, index) => (
            <Reveal key={index} delay={index * 0.06}>
              <ExperienceCard
                experience={experience}
                tone={tones[index % tones.length]}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
