"use client"

import React, { useState, useMemo, useEffect } from "react"
import { useTranslations } from "next-intl"
import { AnimatePresence, motion, type Variants } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { TECH_STACK_DATA, type TechItem } from "./techdata"

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
    scale: 0.98,
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
    x: direction > 0 ? -40 : 40,
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  }),
}

export function TechnologySection() {
  const t = useTranslations("Technology")
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const itemsPerPage = isMobile ? 6 : 12
  const totalPages = Math.ceil(TECH_STACK_DATA.length / itemsPerPage)
  const safeCurrentPage =
    totalPages > 0 && currentPage >= totalPages ? 0 : currentPage

  const handlePrev = () => {
    setDirection(-1)
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const displayedTechnologies = useMemo(() => {
    const start = safeCurrentPage * itemsPerPage
    return TECH_STACK_DATA.slice(start, start + itemsPerPage)
  }, [safeCurrentPage, itemsPerPage])

  return (
    <section
      id="technology"
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-3 sm:px-6 md:px-10 lg:px-12 2xl:max-w-[1440px]">
        {/* Top Header & Eyebrow */}
        <div className="mb-2.5 sm:mb-5">
          {/* Hum Eyebrow with Pear Dot */}
          <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/80 px-2.5 py-0.5 text-[10px] shadow-2xs transition-all duration-300 hover:border-[var(--color-pear)]/40 min-[380px]:px-3 min-[380px]:py-1 min-[380px]:text-xs sm:mb-2.5 sm:gap-2 sm:px-3.5 sm:py-1.5">
            <span className="hum-dot hum-dot--pear" />
            <span className="hum-eyebrow">02 ⁄ {t("eyebrow")}</span>
          </div>

          <div className="flex flex-col justify-between gap-1.5 min-[380px]:gap-2 md:flex-row md:items-end">
            <div>
              <h2
                data-cursor="text"
                className="text-2xl font-extrabold tracking-tight text-foreground min-[380px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              >
                {t("title1")}{" "}
                <span className="text-[var(--color-pear)]">{t("title2")}</span>
              </h2>
              <p className="mt-1 max-w-2xl text-[11px] leading-relaxed font-normal text-muted-foreground min-[380px]:text-xs sm:mt-1.5 sm:text-sm md:text-base">
                {t("description")}
              </p>
            </div>

            {/* Slider Counter Badge — hum-eyebrow style */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-muted-foreground min-[380px]:gap-2 sm:text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/80 px-2.5 py-0.5 text-card-foreground shadow-2xs min-[380px]:px-3 min-[380px]:py-1">
                <span className="hum-dot hum-dot--pear !h-1.5 !w-1.5" />
                <span className="font-bold text-foreground">
                  {safeCurrentPage + 1}
                </span>{" "}
                / <span>{totalPages}</span>
              </span>
              <span className="hum-eyebrow text-[10px] sm:text-xs">
                ({TECH_STACK_DATA.length} Tools Total)
              </span>
            </div>
          </div>
        </div>

        {/* Grid Slider Container */}
        <div className="relative px-6 min-[400px]:px-7 sm:px-12 md:px-14 lg:px-16">
          {/* Left Slider Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous technologies"
            className="group absolute top-1/2 left-0 z-30 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border/60 bg-secondary text-foreground shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1/2 hover:scale-105 hover:border-[var(--color-pear)]/50 hover:bg-secondary hover:text-[var(--color-pear)] hover:shadow-md active:scale-95 min-[400px]:h-9 min-[400px]:w-9 sm:left-1 sm:h-11 sm:w-11 md:left-2 md:h-12 md:w-12"
          >
            <ChevronLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5 min-[400px]:h-4 min-[400px]:w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>

          {/* Right Slider Arrow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next technologies"
            className="group absolute top-1/2 right-0 z-30 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border/60 bg-secondary text-foreground shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1/2 hover:scale-105 hover:border-[var(--color-pear)]/50 hover:bg-secondary hover:text-[var(--color-pear)] hover:shadow-md active:scale-95 min-[400px]:h-9 min-[400px]:w-9 sm:right-1 sm:h-11 sm:w-11 md:right-2 md:h-12 md:w-12"
          >
            <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 min-[400px]:h-4 min-[400px]:w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>

          {/* Animated Grid with touch swipe */}
          <div className="-mx-1 -my-2.5 min-h-[340px] px-1 py-2.5 min-[380px]:min-h-[370px] sm:min-h-[380px] md:min-h-[420px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${safeCurrentPage}-${isMobile}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_e, info) => {
                  if (info.offset.x < -40 || info.velocity.x < -300) {
                    handleNext()
                  } else if (info.offset.x > 40 || info.velocity.x > 300) {
                    handlePrev()
                  }
                }}
                className="grid cursor-grab touch-pan-y grid-cols-2 gap-2 rounded-2xl active:cursor-grabbing min-[380px]:gap-2.5 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-4.5 lg:grid-cols-6"
              >
                {displayedTechnologies.map((tech: TechItem) => {
                  const cardBrandStyle = {
                    "--bg-color": tech.brandColor,
                    "--bg-color-light": tech.brandLight,
                    "--text-color-hover": tech.textHover,
                    "--box-shadow-color": tech.shadowColor,
                  } as React.CSSProperties

                  return (
                    <div
                      key={tech.id}
                      data-cursor="cover"
                      className="uiverse-card h-26 p-2 min-[380px]:h-28 min-[380px]:p-2.5 min-[420px]:h-32 sm:h-44 sm:p-3.5 md:h-48"
                      style={cardBrandStyle}
                    >
                      <div className="uiverse-circle-wrap">
                        <div className="uiverse-overlay" />
                        <div
                          className={`uiverse-circle [&_svg]:h-4.5 [&_svg]:w-4.5 min-[380px]:[&_svg]:h-5 min-[380px]:[&_svg]:w-5 sm:[&_svg]:h-8 sm:[&_svg]:w-8 ${
                            tech.isDarkIcon
                              ? "[&_svg]:text-amber-950 dark:[&_svg]:text-foreground"
                              : "[&_svg]:text-white"
                          }`}
                        >
                          {tech.icon}
                        </div>
                      </div>

                      <p className="uiverse-label max-w-full truncate text-[11px] font-bold min-[380px]:text-xs sm:text-sm md:text-base">
                        {tech.label}
                      </p>
                      <span className="uiverse-sublabel max-w-full truncate text-[8.5px] font-medium min-[380px]:text-[9px] sm:text-xs">
                        {tech.categoryLabel}
                      </span>
                    </div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination Indicator Dots — pear active */}
        <div className="mt-2.5 flex items-center justify-center gap-1.5 min-[380px]:gap-2 sm:mt-4">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setDirection(idx > safeCurrentPage ? 1 : -1)
                setCurrentPage(idx)
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 min-[380px]:h-2 ${
                safeCurrentPage === idx
                  ? "w-6 bg-[var(--color-pear)] shadow-xs min-[380px]:w-8"
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60 min-[380px]:w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechnologySection
