"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Detect homepage across locales
  const isHomePage =
    pathname === "/" ||
    pathname === "/en" ||
    pathname === "/bn" ||
    pathname === "/en/" ||
    pathname === "/bn/"

  return (
    <div className={isHomePage ? "h-screen w-screen overflow-hidden" : "flex min-h-screen flex-col"}>
      {/* Hide navbar on homepage for clean card stack view */}
      {!isHomePage && <Navbar />}
      <main className={isHomePage ? "h-screen w-screen overflow-hidden" : "mt-8 flex-1"}>
        {children}
      </main>
      {!isHomePage && <Footer />}
    </div>
  )
}

export default LayoutWrapper
