/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
import React, { useEffect } from "react";
import { MantineProvider, useMantineColorScheme } from "@mantine/core";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/mocks/next-intl";
import { useTheme } from "next-themes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectDetailClient from "@/components/projects/project-detail-client";

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

function FullProjectDetailPage({ repoName, activeBranchName }: { repoName: string, activeBranchName: string }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <MantineProvider defaultColorScheme="dark">
        <ThemeSync />
        <I18nProvider>
          <div className="flex w-full snap-y snap-mandatory flex-col scroll-smooth bg-background text-foreground antialiased relative">
            <Navbar />
            <div className="pt-24">
              <ProjectDetailClient repoName={repoName} activeBranchName={activeBranchName} />
              <Footer />
            </div>
          </div>
        </I18nProvider>
      </MantineProvider>
    </ThemeProvider>
  );
}

export const QProjectDetailPage = qwikify$(FullProjectDetailPage, { eagerness: "load" });
