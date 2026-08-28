"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"
import { AnimatePresence, motion, type Variants } from "framer-motion"
import { ProjectCard, type Project } from "./ProjectCard"
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

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
      ease: "easeOut",
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -50 : 50,
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.2,
      ease: "easeIn",
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
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden py-4 text-foreground sm:py-6 md:py-8 lg:py-0"
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "0%",
          width: "40vw",
          height: "40vw",
          maxWidth: "500px",
          maxHeight: "500px",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-cyan) 8%, transparent) 0%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div className="relative mx-auto w-full max-w-7xl px-3 xs:px-4 sm:px-6 md:px-10 lg:px-12 2xl:max-w-[1440px]">
        {/* Section Header */}
        <div className="mb-3 flex flex-col justify-between gap-2.5 xs:mb-4 sm:mb-7 sm:flex-row sm:items-end sm:gap-3">
          <div>
            {/* Hum Eyebrow with Cyan Dot & Mobile Swipe Indicator */}
            <div className="mb-1.5 flex items-center justify-between gap-2 sm:mb-2.5">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card px-2.5 py-0.5 text-xs shadow-2xs transition-all duration-300 hover:border-[var(--color-cyan)]/40 xs:px-3 xs:py-1 sm:gap-2 sm:px-3.5 sm:py-1.5">
                <span className="hum-dot hum-dot--cyan" />
                <span className="hum-eyebrow">03 ⁄ {t("eyebrow")}</span>
              </div>
              <div className="flex items-center gap-1.5 md:hidden">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-border/70 bg-card text-muted-foreground transition-colors hover:text-foreground active:scale-95"
                  aria-label="Previous Project"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="font-mono text-xs font-bold text-foreground">
                  {currentIdx + 1} / {projects.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-border/70 bg-card text-muted-foreground transition-colors hover:text-foreground active:scale-95"
                  aria-label="Next Project"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Confident Headline with Cyan Accent */}
            <h2
              data-cursor="text"
              className="text-2xl font-black tracking-tight text-foreground xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {t("title1")}{" "}
              <span className="text-[var(--color-cyan)]">{t("title2")}</span>{" "}
              <span className="font-normal text-muted-foreground">
                {t("title3")}
              </span>
            </h2>

            {/* Micro-description */}
            <p className="mt-1 max-w-2xl text-xs leading-relaxed font-normal text-muted-foreground sm:mt-2 sm:text-sm md:text-base">
              {t("description")}
            </p>
          </div>

          {/* Explore All Projects — hum-btn--outline with cyan accent */}
          <div className="shrink-0">
            <a
              href="https://github.com/JaberChowdhury"
              target="_blank"
              rel="noopener noreferrer"
              className="hum-btn hum-btn--outline group !border-[var(--color-cyan)]/30 !px-3 !py-1.5 !text-xs !text-foreground hover:!border-[var(--color-cyan)] hover:!bg-[var(--color-cyan-light)]/10 sm:!px-4 sm:!py-2 sm:!text-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-[var(--color-cyan)] sm:h-4 sm:w-4" />
              <span>{t("exploreAllProjects")}</span>
              <ArrowRight className="h-3.5 w-3.5 text-[var(--color-cyan)] transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4" />
            </a>
          </div>
        </div>

        {/* Desktop 3-Column Grid */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-4.5 lg:grid-cols-3">
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
          <div className="mt-2.5 flex items-center justify-center gap-1.5">
            {projects.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setDirection(idx > currentIdx ? 1 : -1)
                  setCurrentIdx(idx)
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIdx
                    ? "w-6 bg-[var(--color-cyan)]"
                    : "w-1.5 bg-muted-foreground/30"
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
