import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { customFonts } from "../data"
import { TabProps } from "./types"

export default function CustomFontsTab({ fontSize, sampleText }: TabProps) {
  return (
    <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
      {customFonts.map((font) => (
        <Card key={font.name} className="overflow-hidden rounded-2xl">
          <CardHeader className="border-b bg-muted/20 p-4 pb-3 sm:p-6 sm:pb-4">
            <CardTitle className="text-lg sm:text-xl">{font.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-4 sm:p-6 sm:pt-6">
            <div className={`${font.className} space-y-4 sm:space-y-6`}>
              {font.weights.map((weight) => (
                <div
                  key={weight}
                  className="rounded-xl border bg-background/50 p-3 sm:p-4"
                >
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium tracking-wider text-muted-foreground uppercase sm:mb-3">
                    <span className="flex h-5 items-center rounded-full bg-primary/10 px-2 text-[10px] font-semibold text-primary sm:h-6 sm:px-2.5 sm:text-xs">
                      Weight {weight}
                    </span>
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
