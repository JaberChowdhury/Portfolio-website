"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"
import { AnimatePresence, motion } from "framer-motion"
import { ExperienceCard, type Experience } from "./ExperienceCard"

export function ExperienceSection() {
  const t = useTranslations("Experience")
  const experiences = (t.raw("items") as Experience[]).slice(0, 3)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [direction, setDirection] = useState(0)

  const handleNext = () => {
    setDirection(1)
    setCurrentIdx((prev) => (prev + 1) % experiences.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIdx((prev) => (prev === 0 ? experiences.length - 1 : prev - 1))
  }

  return (
    <section
      id="experience"
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground"
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-15%",
          left: "-5%",
          width: "40vw",
          height: "40vw",
          maxWidth: "500px",
          maxHeight: "500px",
          background:
            "radial-gradient(circle, rgba(61,171,110,0.08) 0%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12 2xl:max-w-[1440px]">
        {/* Section Header */}
        <div className="mb-3 sm:mb-5 md:mb-7">
          {/* Hum Eyebrow with Mint Dot & Mobile Swipe Indicator */}
          <div className="mb-1.5 flex items-center justify-between gap-2 sm:mb-2.5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/80 px-2.5 py-1 text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase shadow-2xs sm:px-3.5 sm:py-1.5 sm:text-xs sm:tracking-[0.2em] md:px-4 md:py-2 md:text-sm md:tracking-[0.25em]">
              <span className="hum-dot hum-dot--mint" />
              <span>05 ⁄ {t("eyebrow")}</span>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-border/60 bg-card/60 px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground md:hidden">
              <span className="animate-pulse">←</span>
              <span>Swipe</span>
              <span className="animate-pulse">→</span>
            </div>
          </div>

          <h2
            data-cursor="text"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
          >
            {t("title1")}{" "}
            <span className="hl-mint">
              {t("title2")} {t("title3")}
            </span>
          </h2>

          <p className="mt-1 max-w-2xl text-xs leading-relaxed font-normal text-muted-foreground sm:mt-1.5 sm:text-sm md:mt-2 md:text-base">
            {t("description")}
          </p>
        </div>

        {/* Experience Cards: Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {experiences.map((exp, idx) => (
            <div key={exp.role} className="h-full">
              <ExperienceCard experience={exp} index={idx} />
            </div>
          ))}
        </div>

        {/* Experience Cards: Mobile Framer Motion Swipe Slider */}
        <div className="md:hidden">
          <div className="relative overflow-hidden py-1">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIdx}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    x: dir > 0 ? 45 : -45,
                    opacity: 0,
                    scale: 0.97,
                  }),
                  center: {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.28, ease: "easeOut" },
                  },
                  exit: (dir: number) => ({
                    x: dir > 0 ? -45 : 45,
                    opacity: 0,
                    scale: 0.97,
                    transition: { duration: 0.2, ease: "easeIn" },
                  }),
                }}
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
                <ExperienceCard
                  experience={experiences[currentIdx]}
                  index={currentIdx}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="mt-2 flex items-center justify-center gap-1.5">
            {experiences.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setDirection(idx > currentIdx ? 1 : -1)
                  setCurrentIdx(idx)
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIdx
                    ? "w-6 bg-[var(--color-mint)]"
                    : "w-1.5 bg-muted-foreground/30"
                }`}
                aria-label={`Go to experience ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Timeline Stat Bar */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] sm:mt-4 sm:gap-3 sm:text-xs md:mt-6">
          <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-2.5 py-1 sm:px-3 sm:py-1">
            <span className="hum-dot hum-dot--mint" />
            <span className="font-mono text-muted-foreground">
              Open to work
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-2.5 py-1 sm:px-3 sm:py-1">
            <span className="hum-dot hum-dot--cyan" />
            <span className="font-mono text-muted-foreground">
              Collaborative team player
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-2.5 py-1 sm:px-3 sm:py-1">
            <span className="hum-dot hum-dot--pear" />
            <span className="font-mono text-muted-foreground">
              Remote-friendly
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
