import ProjectsSection from "../components/Home/ProjectsSection"
import CompetitiveProgrammingSection from "@/components/Home/CompetitiveProgrammingSection"
import ExperienceSection from "@/components/Home/ExperienceSection"
import ContactSection from "@/components/Home/ContactSection"
import HeroSection from "@/components/Home/HeroSection"
import EducationSection from "@/components/Home/EducationSection"

export default function Page() {
  return (
    <div className="h-screen w-full snap-y snap-mandatory overflow-y-auto scroll-smooth bg-[var(--background)] antialiased">
      <HeroSection />
      <ProjectsSection />
      <CompetitiveProgrammingSection />
      <EducationSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  )
}
