"use client"

import React, { useMemo } from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { CardStack, SectionConfig } from "@/components/CardStack"
import HeroSection from "@/components/Home/HeroSection"

// Below-the-fold sections
const TechnologySection = dynamic(
  () => import("@/components/Home/TechnologySection"),
  { ssr: false }
)
const ProjectsSection = dynamic(
  () => import("@/components/Home/ProjectsSection"),
  { ssr: false }
)
const CompetitiveProgrammingSection = dynamic(
  () => import("@/components/Home/CompetitiveProgrammingSection"),
  { ssr: false }
)
const ExperienceSection = dynamic(
  () => import("@/components/Home/ExperienceSection"),
  { ssr: false }
)
const EducationSection = dynamic(
  () => import("@/components/Home/EducationSection"),
  { ssr: false }
)
const ContactSection = dynamic(
  () => import("@/components/Home/ContactSection"),
  { ssr: false }
)
const FooterSection = dynamic(
  () => import("@/components/Home/FooterSection"),
  { ssr: false }
)

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
        Component: () => <HeroSection />,
      },
      {
        id: "skills",
        navLabel: "Skills",
        backgroundColor: "var(--card-bg-skills)",
        className: "text-foreground",
        showGrid: true,
        Component: () => <TechnologySection />,
      },
      {
        id: "projects",
        navLabel: tNav("projects") || "Projects",
        backgroundColor: "var(--card-bg-projects)",
        className: "text-foreground",
        showGrid: true,
        Component: () => <ProjectsSection />,
      },
      {
        id: "programming",
        navLabel: tNav("programming") || "Competitions",
        backgroundColor: "var(--card-bg-competitions)",
        className: "text-foreground",
        showGrid: true,
        Component: () => <CompetitiveProgrammingSection />,
      },
      {
        id: "experience",
        navLabel: tNav("experience") || "Experience",
        backgroundColor: "var(--card-bg-experience)",
        className: "text-foreground",
        showGrid: true,
        Component: () => <ExperienceSection />,
      },
      {
        id: "education",
        navLabel: tNav("education") || "Education",
        backgroundColor: "var(--card-bg-education)",
        className: "text-foreground",
        showGrid: true,
        Component: () => <EducationSection />,
      },
      {
        id: "contact",
        navLabel: tNav("contact") || "Contact",
        backgroundColor: "var(--card-bg-contact)",
        className: "text-foreground",
        showGrid: true,
        Component: () => <ContactSection />,
      },
      {
        id: "footer",
        navLabel: "Footer",
        backgroundColor: "var(--card-bg-footer)",
        className: "text-foreground",
        showGrid: true,
        Component: () => <FooterSection />,
      },
    ],
    [tNav]
  )

  return (
    <CardStack
      sections={sections}
      transitionDuration={480}
      wheelLockDuration={420}
      showProgress={false}
      showCounter={false}
    />
  )
}

export default HomeStack
