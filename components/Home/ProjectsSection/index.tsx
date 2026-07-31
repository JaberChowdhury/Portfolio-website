"use client"

import { motion } from "framer-motion"

import { useTranslations } from "next-intl"
import { ProjectCard, type Project } from "./ProjectCard"

// Projects array is now loaded dynamically from translations

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const accents = [
  "hum-card--pear",
  "hum-card--cyan",
  "hum-card--mint",
  "hum-card--lav",
]

export default function ProjectsSection() {
  const t = useTranslations("Projects")
  const projects = t.raw("items") as Project[]

  return (
    <section id="projects" className="relative w-full overflow-hidden py-28">
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-16">
          {/* Eyebrow */}
          <p className="mono-label mb-4 text-ink-2">{t("eyebrow")}</p>

          {/* Big Typographic Title */}
          <h2
            data-cursor="text"
            className="max-w-4xl text-4xl leading-[1.05] font-bold tracking-[-0.025em] text-ink md:text-6xl"
          >
            {t("title1")}
            <span className="hl hl--pear">{t("title2")}</span>
            <br />
            {t("title3")}
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
            {t("description")}
          </p>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
        >
          {projects.map((project, i) => (
            <motion.div key={i} variants={item} className="h-full">
              <ProjectCard
                project={project}
                accent={accents[i % accents.length]}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
