import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { customFonts, systemFonts } from "../data"
import { TabProps } from "./types"
import { cn } from "@/lib/utils"

type FontItem = {
  name: string
  className?: string
  stack?: string
  weights?: number[]
}

export default function AnalysisTab({ fontWeight }: TabProps) {
  const allFonts: FontItem[] = [...customFonts, ...systemFonts]

  return (
    <div className="space-y-6 sm:space-y-8">
      {allFonts.map((font) => (
        <Card key={font.name} className="overflow-hidden rounded-2xl">
          <CardHeader className="border-b bg-muted/20 p-4 pb-3 sm:p-6 sm:pb-4">
            <CardTitle className="text-lg sm:text-2xl">
              {font.name} - Detailed Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-hidden p-4 pt-4 sm:p-6 sm:pt-8">
            <div
              className={cn(
                "flex flex-col gap-6 sm:gap-12",
                font.className || ""
              )}
              style={font.stack ? { fontFamily: font.stack } : undefined}
            >
              <div className="flex flex-wrap items-end gap-3 border-b border-border/50 pb-6 sm:gap-8 sm:pb-8">
                <span
                  style={{ fontWeight: fontWeight }}
                  className="text-5xl leading-none tracking-tight sm:text-8xl md:text-[140px]"
                >
                  Aa
                </span>
                <span
                  style={{ fontWeight: fontWeight }}
                  className="text-5xl leading-none tracking-tight sm:text-8xl md:text-[140px]"
                >
                  Gg
                </span>
                <span
                  style={{ fontWeight: fontWeight }}
                  className="text-5xl leading-none tracking-tight sm:text-8xl md:text-[140px]"
                >
                  Qq
                </span>
                <span
                  style={{ fontWeight: fontWeight }}
                  className="text-5xl leading-none tracking-tight sm:text-8xl md:text-[140px]"
                >
                  &
                </span>
              </div>

              <div className="space-y-2 sm:space-y-4">
                <div className="text-xs font-semibold tracking-wider text-muted-foreground uppercase sm:text-sm">
                  Numerals
                </div>
                <div
                  style={{ fontWeight: fontWeight }}
                  className="text-3xl leading-none tracking-tighter break-all sm:text-6xl md:text-[90px]"
                >
                  0123456789
                </div>
              </div>

              <div className="space-y-2 sm:space-y-4">
                <div className="text-xs font-semibold tracking-wider text-muted-foreground uppercase sm:text-sm">
                  Ligatures & Symbols
                </div>
                <div
                  style={{ fontWeight: fontWeight }}
                  className="text-2xl leading-none tracking-tighter break-all sm:text-4xl md:text-[70px]"
                >
                  @#$%*()_+-=!?
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
