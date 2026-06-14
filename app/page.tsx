import ProjectsSection from "../components/Home/ProjectsSection"
import CompetitiveProgrammingSection from "@/components/Home/CompetitiveProgrammingSection"
import ExperienceSection from "@/components/Home/ExperienceSection"
import ContactSection from "@/components/Home/ContactSection"
import HeroSection from "@/components/Home/HeroSection"
import EducationSection from "@/components/Home/EducationSection"
import DynamicWaveDivider from "@/components/Wavedivider"

export default function Page() {
  return (
    <div className="w-full snap-y snap-mandatory scroll-smooth bg-background antialiased flex flex-col">
      <div className="bg-background">
        <HeroSection />
      </div>
      <DynamicWaveDivider className="bg-background" waveClass="text-muted/30" />

      <div className="bg-muted/30">
        <ProjectsSection />
      </div>
      <DynamicWaveDivider className="bg-muted/30" waveClass="text-background" />

      <div className="bg-background">
        <CompetitiveProgrammingSection />
      </div>
      <DynamicWaveDivider className="bg-background" waveClass="text-muted/30" />

      <div className="bg-muted/30">
        <EducationSection />
      </div>
      <DynamicWaveDivider className="bg-muted/30" waveClass="text-background" />

      <div className="bg-background">
        <ExperienceSection />
      </div>
      <DynamicWaveDivider className="bg-background" waveClass="text-muted/30" />

      <div className="bg-muted/30 pb-10">
        <ContactSection />
      </div>

      {/* Return to bg-background so it connects cleanly with the Footer */}
      <DynamicWaveDivider className="bg-muted/30" waveClass="text-background" />
    </div>
  )
}
