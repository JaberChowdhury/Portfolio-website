"use client"

import React from "react"
import Navbar from "@/components/Navbar"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Navbar />
      <main className="h-screen w-screen overflow-hidden">
        {children}
      </main>
    </div>
  )
}

export default LayoutWrapper
