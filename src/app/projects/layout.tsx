import type { Metadata } from "next";
import "@/app/globals.css";
import CssBaseline from "@mui/material/CssBaseline"; // Crucial import for MUI themes
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import GridBackground from "@/components/GridBackground";
import theme from "../../theme";

// Updated metadata to match your portfolio context
export const metadata: Metadata = {
  title: "MD Jaber Hossain Chowdhury / Projectso",
  description: "Personal portfolio of MD Jaber Hossain Chowdhury.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppRouterCacheProvider options={{ key: "css" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GridBackground>{children}</GridBackground>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
