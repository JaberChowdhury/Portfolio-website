import type { Metadata } from "next";
import "./globals.css";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import ThemeRegistry from "./ThemeRegistry";
import LanguageHtmlSync from "@/components/LanguageHtmlSync";

const creteRound = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-english",
});

const banglaFont = localFont({
  src: "./fonts/SohidOsmanHadi.ttf",
  display: "swap",
  variable: "--font-bangla",
  weight: "100 900",
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
    <html
      lang="en"
      className={`${creteRound.variable} ${banglaFont.variable}`}
      suppressHydrationWarning
    >
      <body>
        <LanguageHtmlSync />
        <InitColorSchemeScript attribute="class" defaultMode="light" />
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
