import ContactSection from "@/components/contact/ContactSection";
import FaqSection from "@/components/faq/FaqSection";
import HeroSection from "@/components/HeroSection";
import HomepageSidebar from "@/components/HomepageSidebar";
import ProcessSection from "@/components/ProcessSection";
import PricingSection from "@/components/pricing/PricingSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WorksSection from "@/components/WorksSection";
import GridBackground from "@/components/GridBackground";

const App = () => {
	return (
		<GridBackground>
			<HomepageSidebar />
			<HeroSection />
			<WorksSection />
			<ServicesSection />
			<ProcessSection />
			<PricingSection />
			<TestimonialsSection />
			<FaqSection />
			<ContactSection />
		</GridBackground>
	);
};
export default App;
