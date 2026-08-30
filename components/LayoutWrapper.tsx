"use client"

import React from "react"
import { TopAppBar } from "@/components/m3/TopAppBar"
import { NavigationPill } from "@/components/m3/NavigationPill"
import { ExtendedFAB } from "@/components/m3/ExtendedFAB"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full relative bg-background text-foreground">
      <TopAppBar />
      <main className="w-full relative">{children}</main>
      <NavigationPill />
      <ExtendedFAB />
    </div>
  )
}

export default LayoutWrapper
