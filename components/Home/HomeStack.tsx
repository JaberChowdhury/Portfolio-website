"use client"

import React, { useMemo } from "react"
import { useTranslations } from "next-intl"
import { CardStack, SectionConfig } from "@/components/CardStack"
import HeroSection from "@/components/Home/HeroSection"
import TechnologySection from "@/components/Home/TechnologySection"
import ProjectsSection from "@/components/Home/ProjectsSection"
import CompetitiveProgrammingSection from "@/components/Home/CompetitiveProgrammingSection"
import ExperienceSection from "@/components/Home/ExperienceSection"
import EducationSection from "@/components/Home/EducationSection"
import ContactSection from "@/components/Home/ContactSection"
import LearningSection from "@/components/Home/LearningSection"
import FooterSection from "@/components/Home/FooterSection"

export function HomeStack() {
  const tNav = useTranslations("Navigation")

  const sections: SectionConfig[] = useMemo(
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
    <CardStack
      sections={sections}
      transitionDuration={380}
      wheelLockDuration={280}
      showProgress={false}
      showCounter={false}
    />
  )
}

export default HomeStack
