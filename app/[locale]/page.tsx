import dynamic from "next/dynamic"
import HeroSection from "@/components/Home/HeroSection"

// Lazy load components that are below the fold
const TechnologySection = dynamic(
  () => import("@/components/Home/TechnologySection")
)
const ProjectsSection = dynamic(
  () => import("@/components/Home/ProjectsSection")
)
const CompetitiveProgrammingSection = dynamic(
  () => import("@/components/Home/CompetitiveProgrammingSection")
)
const ExperienceSection = dynamic(
  () => import("@/components/Home/ExperienceSection")
)
const ContactSection = dynamic(() => import("@/components/Home/ContactSection"))
const EducationSection = dynamic(
  () => import("@/components/Home/EducationSection")
)

export default function Page() {
  return (
    <div className="flex w-full snap-y snap-mandatory flex-col scroll-smooth bg-background antialiased">
      {/* Kept as a standard import for LCP optimization */}
      <HeroSection />

      {/* Lazy loaded components */}
      <TechnologySection />
      <ProjectsSection />
      <CompetitiveProgrammingSection />
      <ExperienceSection />
      <ContactSection />
      <EducationSection />
    </div>
  )
}
