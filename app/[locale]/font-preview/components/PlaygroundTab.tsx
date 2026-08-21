import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { customFonts } from "../data"
import { TabProps } from "./types"

export default function PlaygroundTab({ fontSize, sampleText }: TabProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {customFonts.map((font) => (
        <Card key={font.name} className="overflow-hidden rounded-2xl">
          <CardHeader className="border-b bg-muted/20 p-4 pb-3 sm:p-6 sm:pb-4">
            <CardTitle className="text-lg sm:text-2xl">{font.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-4 sm:p-6 sm:pt-6">
            <div className={`${font.className} grid gap-3 sm:gap-5`}>
              {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((weight) => (
                <div
                  key={weight}
                  className="rounded-xl border p-3 transition-colors hover:bg-muted/30 sm:p-4"
                >
                  <div className="mb-1.5 text-[10px] font-semibold text-muted-foreground uppercase sm:mb-2 sm:text-xs">
                    Weight {weight}
                  </div>
                  <p
                    style={{ fontWeight: weight, fontSize }}
                    className="leading-tight break-words"
                  >
                    {sampleText}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
