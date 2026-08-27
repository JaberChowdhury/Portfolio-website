import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import LayoutWrapper from "@/components/LayoutWrapper"
import { NextIntlClientProvider } from "next-intl"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"
import { routing } from "@/i18n/routing"
import { notFound } from "next/navigation"
import NextTopLoader from "nextjs-toploader"
import {
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Playfair_Display,
  Syne,
} from "next/font/google"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
})

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })

  return {
    title: {
      default: t("title"),
      template: "%s | Jaber Chowdhury",
    },
    description: t("description"),
    metadataBase: new URL("https://jaber.dev"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        bn: "/bn",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://jaber.dev/${locale}`,
      siteName: "Jaber Chowdhury",
      locale: locale,
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
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        "antialiased",
        plusJakartaSans.variable,
        jetbrainsMono.variable,
        playfairDisplay.variable,
        syne.variable,
        locale === "bn" ? "sohid-font" : "marlin-font"
      )}
    >
      <body>
        <NextTopLoader color="var(--primary)" showSpinner={false} />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            {/* <CustomCursor /> */}
            <LayoutWrapper>{children}</LayoutWrapper>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
