import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline"; // Crucial import for MUI themes
import theme from "../theme";
import { InitColorSchemeScript } from "@mui/material";
import Navbar from "@/components/Navbar";
import GridBackground from "@/components/GridBackground";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

// Updated metadata to match your portfolio context
export const metadata: Metadata = {
  title: "Jane Doe / Portfolio",
  description: "Personal portfolio of Jane Doe, Designer & Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" defaultMode="light" />
        <AppRouterCacheProvider options={{ key: "css" }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kicks in the theme.palette.background.default globally */}
            <CssBaseline />
            {/* <ThemeToggle /> */}
            {/*<Navbar />*/}
            <GridBackground>{children}</GridBackground>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
