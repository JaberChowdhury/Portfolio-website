import ParticleText from "@/components/extras/ParticleText";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WorksSection from "@/components/WorksSection";
import { Box } from "@mui/material";

const App = () => {
  return (
    <>
      <HeroSection />
      <WorksSection />
      <ServicesSection />
      {/*<Box
        sx={{
          width: "100vw",
          minHeight: "100vh",
          backgroundSize: "40px 40px",
          position: "relative",
          // CRITICAL: Prevents horizontal scrollbars
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ParticleText text="JABER" />
      </Box>*/}
    </>
  );
};
export default App;
