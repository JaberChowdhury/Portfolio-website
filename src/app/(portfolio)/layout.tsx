import Footer from "@/components/footer/Footer";
import GridBackground from "@/components/GridBackground";
import Preloader from "@/components/Preloader";

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Preloader>
      <GridBackground>
        {children}
        <Footer />
      </GridBackground>
    </Preloader>
  );
}
