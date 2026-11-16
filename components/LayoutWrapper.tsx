"use client"

import React from "react"
import Navbar from "@/components/Navbar"
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider"
import { ThemeProvider } from "@/lib/theme-context"
import { I18nProvider } from "@/lib/i18n"
import ScrollRuler from "@/components/ruler"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <SmoothScrollProvider>
          <div className="relative min-h-screen w-full">
            <Navbar />
            <ScrollRuler />
            <main className="relative min-h-screen w-full">{children}</main>
          </div>
        </SmoothScrollProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}

export default LayoutWrapper
