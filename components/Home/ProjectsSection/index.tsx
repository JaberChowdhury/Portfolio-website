"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Eyebrow, Heading, Highlight, Text } from "@/components/pouf/text"
import { ProjectCard, type Project } from "./ProjectCard"

export default function ProjectsSection() {
  const t = useTranslations("Projects")
  const projects = t.raw("items") as Project[]
  const reduceMotion = useReducedMotion()

  return (
    <section id="projects" className="relative w-full pb-[clamp(4rem,10vw,7.5rem)]">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="max-w-2xl">
          <Eyebrow>02 · {t("eyebrow")}</Eyebrow>
          <Heading level={2}>
            {t("title1")}
            <Highlight>{t("title2")}</Highlight>
            <br />
            {t("title3")}
          </Heading>
          <div className="mt-(--s3)">
            <Text muted>{t("description")}</Text>
          </div>
        </div>

        <motion.div
          className="mt-(--s7) grid gap-(--s4) md:grid-cols-2 lg:grid-cols-3"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
