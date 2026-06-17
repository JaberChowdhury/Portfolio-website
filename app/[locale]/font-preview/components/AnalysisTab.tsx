import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { customFonts, systemFonts } from "../data"
import { TabProps } from "./types"
import { cn } from "@/lib/utils"

export default function AnalysisTab({ fontWeight }: TabProps) {
  return (
    <div className="space-y-8">
      {[...customFonts, ...systemFonts].map((font) => (
        <Card key={font.name} className="overflow-hidden">
          <CardHeader className="border-b bg-muted/20">
            <CardTitle className="text-2xl">
              {font.name} - Detailed Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-hidden pt-8">
            <div
              className={cn(
                "flex flex-col gap-12",
                (font as any).className || ""
              )}
              style={
                (font as any).stack
                  ? { fontFamily: (font as any).stack }
                  : undefined
              }
            >
              <div className="flex flex-wrap items-end gap-8 border-b border-border/50 pb-8">
                <span
                  style={{ fontWeight: fontWeight }}
                  className="text-[150px] leading-none tracking-tight"
                >
                  Aa
                </span>
                <span
                  style={{ fontWeight: fontWeight }}
                  className="text-[150px] leading-none tracking-tight"
                >
                  Gg
                </span>
                <span
                  style={{ fontWeight: fontWeight }}
                  className="text-[150px] leading-none tracking-tight"
                >
                  Qq
                </span>
                <span
                  style={{ fontWeight: fontWeight }}
                  className="text-[150px] leading-none tracking-tight"
                >
                  &
                </span>
              </div>

              <div className="space-y-4">
                <div className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                  Numerals
                </div>
                <div
                  style={{ fontWeight: fontWeight }}
                  className="text-[100px] leading-none tracking-tighter break-all"
                >
                  0123456789
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                  Ligatures & Symbols
                </div>
                <div
                  style={{ fontWeight: fontWeight }}
                  className="text-[80px] leading-none tracking-tighter break-all"
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
