"use client"

import React from "react"
import Navbar from "@/components/Navbar"
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen w-full">
        <Navbar />
        <main className="relative min-h-screen w-full">{children}</main>
      </div>
    </SmoothScrollProvider>
  )
}

export default LayoutWrapper
