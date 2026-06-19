/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
import React, { useEffect } from "react";
import { MantineProvider, useMantineColorScheme } from "@mantine/core";
import "@mantine/core/styles.css";

import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/mocks/next-intl";
import { useTheme } from "next-themes";
import Navbar from "@/components/Navbar";

import ProjectsSection from "@/components/Home/ProjectsSection";
import CompetitiveProgrammingSection from "@/components/Home/CompetitiveProgrammingSection";
import ExperienceSection from "@/components/Home/ExperienceSection";
import ContactSection from "@/components/Home/ContactSection";
import HeroSection from "@/components/Home/HeroSection";
import EducationSection from "@/components/Home/EducationSection";
import TechnologySection from "@/components/Home/TechnologySection";
import Footer from "@/components/Footer";

function ThemeSync() {
  const { resolvedTheme } = useTheme();
  const { setColorScheme } = useMantineColorScheme();
  useEffect(() => {
    setColorScheme(resolvedTheme === "dark" ? "dark" : "light");
    if (resolvedTheme === "dark") {
      document.documentElement.setAttribute("data-mantine-color-scheme", "dark");
    } else {
      document.documentElement.setAttribute("data-mantine-color-scheme", "light");
    }
  }, [resolvedTheme, setColorScheme]);
  return null;
}

function FullHomePage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <MantineProvider defaultColorScheme="dark">
        <ThemeSync />
        <I18nProvider>
          <div className="flex w-full snap-y snap-mandatory flex-col scroll-smooth bg-background text-foreground antialiased relative">
            <Navbar />
            <div className="pt-24">
              <HeroSection />
              <TechnologySection />
              <ProjectsSection />
              <CompetitiveProgrammingSection />
              <ExperienceSection />
              <ContactSection />
              <EducationSection />
              <Footer />
            </div>
          </div>
        </I18nProvider>
      </MantineProvider>
    </ThemeProvider>
  );
}

export const QHomePage = qwikify$(FullHomePage, { eagerness: 'visible' });
