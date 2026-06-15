import ProjectsSection from "../components/Home/ProjectsSection"
import CompetitiveProgrammingSection from "@/components/Home/CompetitiveProgrammingSection"
import ExperienceSection from "@/components/Home/ExperienceSection"
import ContactSection from "@/components/Home/ContactSection"
import HeroSection from "@/components/Home/HeroSection"
import EducationSection from "@/components/Home/EducationSection"
import TechnologySection from "@/components/Home/TechnologySection"

export default function Page() {
  return (
    <div className="flex w-full snap-y snap-mandatory flex-col scroll-smooth bg-background antialiased">
      <HeroSection />
      <TechnologySection />
      <ProjectsSection />
      <CompetitiveProgrammingSection />
      <ExperienceSection />
      <ContactSection />
      <EducationSection />
    </div>
  )
}
