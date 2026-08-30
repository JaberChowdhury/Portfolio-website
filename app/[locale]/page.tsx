import HeroSection from "@/components/Home/HeroSection"
import TechnologySection from "@/components/Home/TechnologySection"
import ProjectsSection from "@/components/Home/ProjectsSection"
import CompetitiveProgrammingSection from "@/components/Home/CompetitiveProgrammingSection"
import ExperienceSection from "@/components/Home/ExperienceSection"
import EducationSection from "@/components/Home/EducationSection"
import LearningSection from "@/components/Home/LearningSection"
import ContactSection from "@/components/Home/ContactSection"
import FooterSection from "@/components/Home/FooterSection"

export default function Page() {
  return (
    <div className="flex w-full flex-col">
      <HeroSection />
      <TechnologySection />
      <ProjectsSection />
      <CompetitiveProgrammingSection />
      <ExperienceSection />
      <EducationSection />
      <LearningSection />
      <ContactSection />
      <FooterSection />
    </div>
  )
}
