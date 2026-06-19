/** @jsxImportSource react */
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

export default function ProjectsSection() {
  const t = useTranslations("Projects")
  const projects = t.raw("items") as Project[]

  return (
    <section id="projects" className="relative w-full overflow-hidden py-28">
      {/* Background aura */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[600px] rounded-full bg-foreground/5 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-16">
          {/* Eyebrow */}
          <p className="mb-4 text-xs tracking-[0.35em] text-muted-foreground uppercase">
            {t("eyebrow")}
          </p>

          {/* Big Typographic Title */}
          <h2
            data-cursor="text"
            className="text-4xl leading-[1.05] font-semibold tracking-tight text-foreground md:text-6xl"
          >
            {t("title1")}
            <span className="animate-[gradientMove_6s_linear_infinite] bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_100%] bg-clip-text text-transparent">
              {t("title2")}
            </span>
            <br />
            {t("title3")}
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("description")}
          </p>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, i) => (
            <motion.div key={i} variants={item}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Shared animation keyframes */}
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
