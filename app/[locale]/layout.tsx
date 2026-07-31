import "../globals.css"
import { Geist, Geist_Mono } from "next/font/google"
import localFont from "next/font/local"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { CustomCursor } from "@/components/customCursor/custom-cursor"
import { NextIntlClientProvider } from "next-intl"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"
import { routing } from "@/i18n/routing"
import { notFound } from "next/navigation"
import NextTopLoader from "nextjs-toploader"

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
})

const sentient = localFont({
  src: [
    { path: "../../public/font/Sentient-400.woff2", weight: "400" },
    { path: "../../public/font/Sentient-500.woff2", weight: "500" },
    { path: "../../public/font/Sentient-700.woff2", weight: "700" },
  ],
  display: "swap",
  variable: "--font-sentient",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
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
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        geistSans.variable,
        sentient.variable,
        geistMono.variable,
        "antialiased",
        locale === "bn" ? "sohid-font" : ""
      )}
    >
      <body>
        <div className="aurora-canvas" aria-hidden="true" />
        <NextTopLoader color="var(--primary)" showSpinner={false} />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            {/* <CustomCursor /> */}
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
