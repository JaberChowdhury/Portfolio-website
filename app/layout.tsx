import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import LayoutWrapper from "@/components/LayoutWrapper"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import NextTopLoader from "nextjs-toploader"
import {
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Playfair_Display,
  Syne,
} from "next/font/google"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
})

export async function generateMetadata() {
  const t = await getTranslations({ locale: "en", namespace: "Metadata" })

  return {
    title: {
      default: t("title"),
      template: "%s | Jaber Chowdhury",
    },
    description: t("description"),
    metadataBase: new URL("https://jaber.dev"),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://jaber.dev",
      siteName: "Jaber Chowdhury",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      creator: "@jaberchowdhury",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const messages = await getMessages()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        plusJakartaSans.variable,
        jetbrainsMono.variable,
        playfairDisplay.variable,
        syne.variable,
        "marlin-font"
      )}
    >
      <body>
        <NextTopLoader color="var(--primary)" showSpinner={false} />
        <NextIntlClientProvider locale="en" messages={messages}>
          <ThemeProvider>
            {/* <CustomCursor /> */}
            <LayoutWrapper>{children}</LayoutWrapper>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
