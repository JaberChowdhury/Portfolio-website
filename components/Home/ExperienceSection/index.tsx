"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"

import { useTranslations } from "next-intl"
import {
  ExperienceCard,
  experienceAccents,
  accentDotClasses,
  type Experience,
} from "./ExperienceCard"

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

export default function ExperienceSection() {
  const t = useTranslations("Experience")
  const experiences = t.raw("items") as Experience[]

  return (
    <section id="experience" className="relative w-full overflow-hidden py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16">
          <p className="mono-label mb-4 text-ink-2">04 · {t("eyebrow")}</p>

          <h2
            data-cursor="text"
            className="text-4xl leading-[1.05] font-bold tracking-tight md:text-6xl"
          >
            {t("title1")}
            <br />
            {t("title2")}
            <span className="hl hl--pear">{t("title3")}</span>.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
            {t("description")}
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute top-0 left-5 hidden h-full w-px rounded-full bg-ink/10 md:block" />

          <div className="space-y-10">
            {experiences.map((experience, index) => {
              const accent = experienceAccents[index % experienceAccents.length]
              return (
                <motion.div key={index} variants={item} className="relative">
                  <div
                    className={cn(
                      "absolute top-7 left-2 hidden h-6 w-6 rounded-full ring-4 ring-paper md:block",
                      accentDotClasses[accent]
                    )}
                  />

                  <div className="md:ml-16">
                    <ExperienceCard experience={experience} accent={accent} />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
