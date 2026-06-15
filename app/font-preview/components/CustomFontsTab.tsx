import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { customFonts } from "../data"
import { TabProps } from "./types"

export default function CustomFontsTab({ fontSize, sampleText }: TabProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {customFonts.map((font) => (
        <Card key={font.name} className="overflow-hidden">
          <CardHeader className="border-b bg-muted/20 pb-4">
            <CardTitle>{font.name}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className={`${font.className} space-y-6`}>
              {font.weights.map((weight) => (
                <div
                  key={weight}
                  className="rounded-lg border bg-background/50 p-4"
                >
                  <div className="mb-3 flex items-center gap-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    <span className="flex h-6 items-center rounded-full bg-primary/10 px-2.5 text-primary">
                      Weight {weight}
                    </span>
                  </div>
                  <p
                    style={{ fontWeight: weight, fontSize }}
                    className="leading-tight"
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
