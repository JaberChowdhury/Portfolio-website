import type { Metadata } from "next";
import "./globals.css";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { Roboto } from "next/font/google";
import ThemeRegistry from "./ThemeRegistry";
import LanguageHtmlSync from "@/components/LanguageHtmlSync";

const creteRound = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-english",
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
      className={`${creteRound.variable}`}
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
