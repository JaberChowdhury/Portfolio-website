/** @jsxImportSource react */
"use client"

import { motion } from "framer-motion"

import { useTranslations } from "next-intl"
import { ExperienceCard, type Experience } from "./ExperienceCard"

// Experiences array is now loaded dynamically from translations

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
      {/* Background Aura */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[600px] rounded-full bg-foreground/5 blur-[140px]" />
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

        {/* Timeline */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Vertical Line */}
          <div className="absolute top-0 left-5 hidden h-full w-px bg-border/60 md:block" />

          <div className="space-y-10">
            {experiences.map((experience, index) => (
              <motion.div key={index} variants={item} className="relative">
                {/* Timeline Dot */}
                <div className="absolute top-8 left-[13px] hidden h-4 w-4 rounded-full border-4 border-background bg-primary md:block" />

                <div className="md:ml-16">
                  <ExperienceCard experience={experience} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
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
