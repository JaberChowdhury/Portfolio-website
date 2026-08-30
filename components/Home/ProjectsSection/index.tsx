"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"
import { AnimatePresence, motion, type Variants } from "framer-motion"
import { ProjectCard, type Project } from "./ProjectCard"
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { Button } from "@/components/m3/Button"

const cardVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: [0.2, 0, 0, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -50 : 50,
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.2,
      ease: [0.2, 0, 0, 1],
    },
  }),
}

export function ProjectsSection() {
  const t = useTranslations("Projects")
  const projects = (t.raw("items") as Project[]).slice(0, 3)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [direction, setDirection] = useState(0)

  const handleNext = () => {
    setDirection(1)
    setCurrentIdx((prev) => (prev + 1) % projects.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIdx((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
  }

  return (
    <section
      id="projects"
      data-section="projects"
      className="relative w-full py-16 sm:py-20 md:py-28 text-[var(--md-sys-color-on-surface,var(--foreground))] transition-colors duration-500 overflow-hidden"
    >
      {/* Dynamic Azure / Cyan Section Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 h-96 w-96 rounded-full
          bg-[var(--md-sys-color-primary,#2e8bc0)]/10 blur-[100px] -z-10"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12 2xl:max-w-[1440px]">
        {/* Section Header */}
        <div className="mb-6 sm:mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            {/* M3 Expressive Eyebrow Pill */}
            <div className="mb-2.5 sm:mb-3 flex items-center justify-between gap-2">
              <div
                className="inline-flex items-center gap-2 rounded-full
                  border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/50
                  bg-[var(--md-sys-color-surface-container-high,var(--secondary))]/70
                  px-3 py-1 font-mono text-xs font-semibold tracking-wider
                  text-[var(--md-sys-color-primary,#2e8bc0)] shadow-2xs"
              >
                <span className="h-2 w-2 rounded-full bg-[var(--md-sys-color-primary,#2e8bc0)]" />
                <span className="uppercase">03 ⁄ {t("eyebrow")}</span>
              </div>

              {/* Mobile Previous / Next Quick Stepper */}
              <div className="flex items-center gap-1.5 md:hidden">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex h-8 w-8 items-center justify-center rounded-full
                    border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.2))]/50
                    bg-[var(--md-sys-color-surface-container,var(--card))]
                    text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))]
                    transition-all hover:text-[var(--md-sys-color-on-surface,var(--foreground))]
                    hover:border-[var(--md-sys-color-primary,#2e8bc0)] active:scale-95 shadow-2xs"
                  aria-label="Previous Project"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="font-mono text-xs font-bold text-[var(--md-sys-color-on-surface,var(--foreground))] px-1">
                  {currentIdx + 1} / {projects.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex h-8 w-8 items-center justify-center rounded-full
                    border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.2))]/50
                    bg-[var(--md-sys-color-surface-container,var(--card))]
                    text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))]
                    transition-all hover:text-[var(--md-sys-color-on-surface,var(--foreground))]
                    hover:border-[var(--md-sys-color-primary,#2e8bc0)] active:scale-95 shadow-2xs"
                  aria-label="Next Project"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Confident Headline with M3 Primary Color */}
            <h2
              data-cursor="text"
              className="text-2xl font-black tracking-tight text-[var(--md-sys-color-on-surface,var(--foreground))] xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {t("title1")}{" "}
              <span className="text-[var(--md-sys-color-primary,#2e8bc0)]">{t("title2")}</span>{" "}
              <span className="font-normal text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))]">
                {t("title3")}
              </span>
            </h2>

            {/* Micro-description */}
            <p className="mt-2 max-w-2xl text-xs leading-relaxed font-normal text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))] sm:text-sm md:text-base">
              {t("description")}
            </p>
          </div>

          {/* Explore All Projects — M3 Outlined Button */}
          <div className="shrink-0">
            <Button
              variant="outlined"
              size="md"
              shape="full"
              href="https://github.com/JaberChowdhury"
              target="_blank"
              rel="noopener noreferrer"
              leadingIcon={<Sparkles className="h-4 w-4 text-[var(--md-sys-color-primary,#2e8bc0)]" />}
              trailingIcon={<ArrowRight className="h-4 w-4 text-[var(--md-sys-color-primary,#2e8bc0)] transition-transform duration-200 group-hover:translate-x-1" />}
              className="border-[var(--md-sys-color-primary,#2e8bc0)]/40 hover:border-[var(--md-sys-color-primary,#2e8bc0)] font-semibold"
            >
              <span>{t("exploreAllProjects")}</span>
            </Button>
          </div>
        </div>

        {/* Desktop 3-Column Grid with M3 Asymmetric Cards */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
          {projects.map((project, index) => (
            <div key={index} className="h-full">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>

        {/* Mobile Swipe Carousel with Framer Motion */}
        <div className="md:hidden">
          <div className="relative overflow-hidden py-1">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIdx}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_e, info) => {
                  if (info.offset.x < -35 || info.velocity.x < -250) {
                    handleNext()
                  } else if (info.offset.x > 35 || info.velocity.x > 250) {
                    handlePrev()
                  }
                }}
                className="w-full cursor-grab touch-pan-y active:cursor-grabbing"
              >
                <ProjectCard
                  project={projects[currentIdx]}
                  index={currentIdx}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setDirection(idx > currentIdx ? 1 : -1)
                  setCurrentIdx(idx)
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIdx
                    ? "w-8 bg-[var(--md-sys-color-primary,#2e8bc0)] shadow-xs"
                    : "w-2 bg-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.2))]"
                }`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
