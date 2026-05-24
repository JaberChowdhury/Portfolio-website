// import ParticleText from "@/components/extras/ParticleText";

import FaqSection from "@/components/faq/FaqSection";
import Footer from "@/components/footer/Footer";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import PricingSection from "@/components/pricing/PricingSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WorksSection from "@/components/WorksSection";

const App = () => {
  return (
    <>
      <HeroSection />
      <WorksSection />
      <ServicesSection />
      <ProcessSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      {/*<Footer />*/}
    </>
  );
};
export default App;
