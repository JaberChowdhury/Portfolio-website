import type { Metadata } from "next";
import "./globals.css";
import CssBaseline from "@mui/material/CssBaseline"; // Crucial import for MUI themes
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import GridBackground from "@/components/GridBackground";
import theme from "../theme";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

// Updated metadata to match your portfolio context
export const metadata: Metadata = {
  title: "MD Jaber Hossain Chowdhury / Portfolio",
  description: "Personal portfolio of MD Jaber Hossain Chowdhury.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable} suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kicks in the theme.palette.background.default globally */}
            <CssBaseline />

            <GridBackground>{children}</GridBackground>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
