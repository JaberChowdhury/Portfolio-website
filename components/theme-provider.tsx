"use client"

import * as React from "react"
import { ThemeProvider as CustomThemeProvider, useTheme } from "@/lib/theme-context"

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode
  [key: string]: any
}) {
  return <CustomThemeProvider>{children}</CustomThemeProvider>
}

export { useTheme }
export default ThemeProvider
