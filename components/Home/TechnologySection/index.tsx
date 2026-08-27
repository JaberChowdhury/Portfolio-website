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

  // 6 items per slide on mobile (2x3 grid), 12 items on desktop (6x2 grid)
  const itemsPerPage = isMobile ? 6 : 12
  const totalPages = Math.ceil(TECH_STACK_DATA.length / itemsPerPage)

  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(0)
    }
  }, [itemsPerPage, totalPages, currentPage])

  const handlePrev = () => {
    setDirection(-1)
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const displayedTechnologies = useMemo(() => {
    const start = currentPage * itemsPerPage
    return TECH_STACK_DATA.slice(start, start + itemsPerPage)
  }, [currentPage, itemsPerPage])

  return (
    <section
      id="technology"
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12 2xl:max-w-[1440px]">
        {/* Top Header & Eyebrow */}
        <div className="mb-3 sm:mb-5">
          {/* Hallmark Eyebrow with Pear Amber Dot */}
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-3 py-1 text-xs shadow-2xs transition-all duration-300 hover:border-amber-500/40 sm:mb-2.5 sm:px-3.5 sm:py-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase sm:text-sm sm:tracking-[0.25em]">
              02 ⁄ {t("eyebrow")}
            </span>
          </div>

          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
            <div>
              <h2
                data-cursor="text"
                className="marlin-font text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
              >
                {t("title1")}{" "}
                <span className="text-amber-600 dark:text-amber-400">
                  {t("title2")}
                </span>
              </h2>
              <p className="mt-1.5 max-w-2xl text-xs leading-relaxed font-normal text-muted-foreground sm:text-sm md:text-base">
                {t("description")}
              </p>
            </div>

            {/* Slider Counter Badge */}
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/80 px-3 py-1 text-card-foreground shadow-2xs">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                <span className="font-bold text-foreground">
                  {currentPage + 1}
                </span>{" "}
                / <span>{totalPages}</span>
              </span>
              <span className="hidden sm:inline">
                ({TECH_STACK_DATA.length} Tools Total)
              </span>
            </div>
          </div>
        </div>

        {/* 6x2 (Desktop) / 2x4 (Mobile) Grid Slider Container with Non-Overlapping Flanking Buttons */}
        <div className="relative px-7 sm:px-12 md:px-14 lg:px-16">
          {/* Left Slider Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous technologies"
            className="group absolute top-1/2 left-0 z-30 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border/90 bg-card/95 text-foreground shadow-md backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-amber-500/60 hover:bg-card hover:text-amber-500 hover:shadow-lg active:scale-95 sm:left-1 sm:h-11 sm:w-11 md:left-2 md:h-12 md:w-12"
          >
            <ChevronLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>

          {/* Right Slider Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next technologies"
            className="group absolute top-1/2 right-0 z-30 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border/90 bg-card/95 text-foreground shadow-md backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-amber-500/60 hover:bg-card hover:text-amber-500 hover:shadow-lg active:scale-95 sm:right-1 sm:h-11 sm:w-11 md:right-2 md:h-12 md:w-12"
          >
            <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>

          {/* Animated 2x3 (Mobile) / 6x2 (Desktop) Grid */}
          <div className="min-h-[310px] overflow-hidden sm:min-h-[380px] md:min-h-[420px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${currentPage}-${isMobile}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-4.5 lg:grid-cols-6"
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
                      className="uiverse-card h-32 p-2.5 sm:h-44 sm:p-3.5 md:h-48"
                      style={cardBrandStyle}
                    >
                      {/* Concentric Circle Container: Overlay & Icon Circle Perfectly Coincident */}
                      <div className="uiverse-circle-wrap">
                        {/* Expanding Circular Background Overlay */}
                        <div className="uiverse-overlay" />

                        {/* Animated Outer & Inner Circle with Icon */}
                        <div
                          className={`uiverse-circle [&_svg]:h-5 [&_svg]:w-5 sm:[&_svg]:h-8 sm:[&_svg]:w-8 ${
                            tech.id === "javascript"
                              ? "[&_svg]:text-amber-950"
                              : "[&_svg]:text-white"
                          }`}
                        >
                          {tech.icon}
                        </div>
                      </div>

                      {/* Technology Label & Category */}
                      <p className="uiverse-label text-xs font-bold sm:text-sm md:text-base">
                        {tech.label}
                      </p>
                      <span className="uiverse-sublabel text-[9px] font-medium sm:text-xs">
                        {tech.categoryLabel}
                      </span>
                    </div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination Indicator Dots */}
        <div className="mt-3 flex items-center justify-center gap-2 sm:mt-4">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setDirection(idx > currentPage ? 1 : -1)
                setCurrentPage(idx)
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                currentPage === idx
                  ? "w-8 bg-amber-500 shadow-xs"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechnologySection
