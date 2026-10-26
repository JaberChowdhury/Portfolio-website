"use client"

import React, { useMemo } from "react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { SectionWaveDivider } from "@/components/ui/SectionWaveDivider"
import HeroSection from "@/components/Home/HeroSection"
import TechnologySection from "@/components/Home/TechnologySection"
import ProjectsSection from "@/components/Home/ProjectsSection"
import CompetitiveProgrammingSection from "@/components/Home/CompetitiveProgrammingSection"
import ExperienceSection from "@/components/Home/ExperienceSection"
import EducationSection from "@/components/Home/EducationSection"
import ContactSection from "@/components/Home/ContactSection"
import LearningSection from "@/components/Home/LearningSection"
import FooterSection from "@/components/Home/FooterSection"

/**
 * Global wave frequency across section transitions.
 * - 1.0–2.0: Broad oceanic swells
 * - 3.0–5.0: Medium wave ripples
 * - 8.0–12.0: Ultra-dense fine wave ripples (default: 9.5)
 */
export const DEFAULT_WAVE_FREQUENCY = 30.5

export interface SectionItem {
  id: string
  navLabel: string
  backgroundColor: string
  className?: string
  showGrid?: boolean
  waveFrequency?: number
  Component: React.ComponentType
}

export function HomeStack() {
  const tNav = useTranslations("Navigation")

  const sections: SectionItem[] = useMemo(
    () => [
      {
        id: "home",
        navLabel: "Home",
        backgroundColor: "var(--card-bg-home)",
        className: "text-foreground",
        showGrid: true,
        Component: HeroSection,
      },
      {
        id: "skills",
        navLabel: "Skills",
        backgroundColor: "var(--card-bg-skills)",
        className: "text-foreground",
        showGrid: true,
        Component: TechnologySection,
      },
      {
        id: "projects",
        navLabel: tNav("projects") || "Projects",
        backgroundColor: "var(--card-bg-projects)",
        className: "text-foreground",
        showGrid: true,
        Component: ProjectsSection,
      },
      {
        id: "programming",
        navLabel: tNav("programming") || "Competitions",
        backgroundColor: "var(--card-bg-competitions)",
        className: "text-foreground",
        showGrid: true,
        Component: CompetitiveProgrammingSection,
      },
      {
        id: "experience",
        navLabel: tNav("experience") || "Experience",
        backgroundColor: "var(--card-bg-experience)",
        className: "text-foreground",
        showGrid: true,
        Component: ExperienceSection,
      },
      {
        id: "education",
        navLabel: tNav("education") || "Education",
        backgroundColor: "var(--card-bg-education)",
        className: "text-foreground",
        showGrid: true,
        Component: EducationSection,
      },
      {
        id: "contact",
        navLabel: tNav("contact") || "Contact",
        backgroundColor: "var(--card-bg-contact)",
        className: "text-foreground",
        showGrid: true,
        Component: ContactSection,
      },
      {
        id: "learning",
        navLabel: tNav("learning") || "Learning",
        backgroundColor: "var(--card-bg-learning)",
        className: "text-foreground",
        showGrid: true,
        Component: LearningSection,
      },
      {
        id: "footer",
        navLabel: "Footer",
        backgroundColor: "var(--card-bg-footer)",
        className: "text-foreground",
        showGrid: true,
        Component: FooterSection,
      },
    ],
    [tNav]
  )

  return (
    <div className="relative flex w-full flex-col">
      {sections.map((section, index) => {
        const ContentComponent = section.Component
        const isHome = section.id === "home"
        const isFooter = section.id === "footer"
        const nextSection = sections[index + 1]

        return (
          <section
            key={section.id}
            id={section.id}
            className={cn(
              "relative w-full overflow-hidden transition-colors duration-300",
              "scroll-mt-16 sm:scroll-mt-20",
              isHome
                ? "flex min-h-[calc(100vh-4rem)] flex-col justify-center pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-28 md:pb-24"
                : isFooter
                ? "py-8 sm:py-12 md:py-16"
                : "flex min-h-[85vh] flex-col justify-center pt-16 pb-20 sm:pt-20 sm:pb-24 md:pt-24 md:pb-28 lg:min-h-screen lg:pt-28 lg:pb-32",
              section.className
            )}
            style={{
              backgroundColor: section.backgroundColor ?? "var(--background)",
            }}
            data-title={section.navLabel}
          >
            {/* Subtle decorative grid pattern */}
            {section.showGrid !== false && (
              <div className="card-stack-grid" aria-hidden="true" />
            )}

            <div className="relative z-10 w-full">
              <ContentComponent />
            </div>

            {/* Organic 2-side Wave Divider seamlessly blending into the next section */}
            {nextSection && (
              <SectionWaveDivider
                nextColor={nextSection.backgroundColor}
                prevColor={section.backgroundColor}
                frequency={section.waveFrequency ?? DEFAULT_WAVE_FREQUENCY}
                variant={index % 2 === 0 ? "left" : "right"}
              />
            )}
          </section>
        )
      })}
    </div>
  )
}

export default HomeStack
