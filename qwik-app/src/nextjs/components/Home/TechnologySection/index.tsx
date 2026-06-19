/** @jsxImportSource react */
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
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import { useTranslations } from "next-intl"
import { TECH_STACK_DATA, TechItem } from "./techdata"

type Direction = "top" | "bottom" | "left" | "right"
const directions: Direction[] = ["top", "bottom", "left", "right"]

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

function TechCell({
  technologies,
  startIndex,
}: {
  technologies: TechItem[]
  startIndex: number
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
      className={`relative flex h-14 w-[170px] max-w-[170px] min-w-[170px] items-center justify-center overflow-hidden rounded-xl border border-input shadow-sm transition-all duration-500 ease-out hover:scale-105 hover:shadow-md ${tech.bg} ${tech.text}`}
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
          className="absolute flex items-center gap-2.5 px-3"
        >
          <span className="flex h-5 w-5 items-center justify-center">
            {tech.icon}
          </span>
          <span className="truncate text-sm font-semibold tracking-wide">
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
      {/* Background aura */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-0 h-[400px] w-[600px] -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-0 right-1/4 h-[300px] w-[500px] rounded-full bg-foreground/5 blur-[120px]" />
      </div>

      {/* Massive Background Text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-15 dark:opacity-20">
        <AnimatedGradientText
          colorFrom="var(--color-muted-primary)"
          colorTo="var(--color-muted-foreground)"
          className="text-[15vw] leading-none font-black tracking-tighter whitespace-nowrap uppercase select-none"
        >
          {t("backgroundText")}
        </AnimatedGradientText>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center">
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
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("description")}
          </p>
        </div>

        {/* Tech Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.05 },
            },
          }}
          className="grid grid-cols-2 items-center justify-center gap-5 md:grid-cols-6"
        >
          {Array.from({ length: 24 }).map((_, index) => (
            <motion.div
              data-cursor="cover"
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                show: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
            >
              <TechCell
                technologies={technologies}
                startIndex={index % technologies.length}
              />
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

export default TechnologySection
