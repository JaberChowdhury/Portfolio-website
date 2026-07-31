"use client"
import React, { useEffect, useMemo, useState } from "react"

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}

import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"
import { TECH_STACK_DATA, TechItem } from "./techdata"

type Direction = "top" | "bottom" | "left" | "right"
const directions: Direction[] = ["top", "bottom", "left", "right"]

const accents = [
  "hum-card--pear",
  "hum-card--cyan",
  "hum-card--mint",
  "hum-card--lav",
]

const cellVariants = {
  initial: (dir: Direction) => {
    switch (dir) {
      case "top":
        return { opacity: 0, y: 20, x: 0 }
      case "bottom":
        return { opacity: 0, y: -20, x: 0 }
      case "left":
        return { opacity: 0, x: 20, y: 0 }
      case "right":
        return { opacity: 0, x: -20, y: 0 }
    }
  },
  animate: { opacity: 1, y: 0, x: 0 },
  exit: (dir: Direction) => {
    switch (dir) {
      case "top":
        return { opacity: 0, y: -20, x: 0 }
      case "bottom":
        return { opacity: 0, y: 20, x: 0 }
      case "left":
        return { opacity: 0, x: -20, y: 0 }
      case "right":
        return { opacity: 0, x: 20, y: 0 }
    }
  },
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function TechCell({
  technologies,
  startIndex,
  accent,
}: {
  technologies: TechItem[]
  startIndex: number
  accent: string
}) {
  const [currentIndex, setCurrentIndex] = useState(startIndex)
  const [direction, setDirection] = useState<Direction>("top")

  const duration = useMemo(() => 3000 + Math.random() * 3000, [])
  const initialDelay = useMemo(() => Math.random() * 3000, [])

  useEffect(() => {
    const starter = setTimeout(() => {
      const interval = setInterval(() => {
        setDirection(directions[Math.floor(Math.random() * directions.length)])
        setCurrentIndex((prev) => (prev + 1) % technologies.length)
      }, duration)

      return () => clearInterval(interval)
    }, initialDelay)

    return () => clearTimeout(starter)
  }, [duration, initialDelay, technologies.length])

  const tech = technologies[currentIndex]

  return (
    <div
      className={`hum-card relative flex h-20 items-center justify-center overflow-hidden rounded-2xl px-3 py-3 ${accent}`}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={tech.id}
          custom={direction}
          variants={cellVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute inset-0 flex w-full flex-col items-center justify-center gap-2 px-3"
        >
          <span className="flex h-5 w-5 items-center justify-center text-ink">
            {tech.icon}
          </span>
          <span className="w-full truncate text-center text-xs font-semibold tracking-wide text-ink">
            {tech.label}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

const TechnologySection = () => {
  const t = useTranslations("Technology")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const technologies = useMemo(() => {
    if (!mounted) return TECH_STACK_DATA
    return shuffleArray(TECH_STACK_DATA)
  }, [mounted])

  return (
    <section id="technology" className="relative w-full overflow-hidden py-28">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none">
        <span className="font-mono text-[13vw] font-medium tracking-[0.2em] whitespace-nowrap uppercase text-ink/5 md:text-[11vw]">
          {t("backgroundText")}
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 flex flex-col items-center text-center">
          <p className="mono-label mb-4 text-ink-2">{t("eyebrow")}</p>

          <h2
            data-cursor="text"
            className="max-w-4xl text-4xl leading-[1.05] font-bold tracking-[-0.025em] text-ink md:text-6xl"
          >
            {t("title1")}
            <span className="hl hl--pear">{t("title2")}</span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
            {t("description")}
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:gap-4"
        >
          {Array.from({ length: 24 }).map((_, index) => (
            <motion.div
              data-cursor="cover"
              key={index}
              variants={item}
            >
              <TechCell
                technologies={technologies}
                startIndex={index % technologies.length}
                accent={accents[index % accents.length]}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TechnologySection
