import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { customFonts } from "../data"
import { TabProps } from "./types"

export default function PlaygroundTab({ fontSize, sampleText }: TabProps) {
  return (
    <div className="space-y-8">
      {customFonts.map((font) => (
        <Card key={font.name}>
          <CardHeader className="border-b bg-muted/20">
            <CardTitle className="text-2xl">{font.name}</CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <div className={`${font.className} grid gap-5`}>
              {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((weight) => (
                <div
                  key={weight}
                  className="rounded-lg border p-4 transition-colors hover:bg-muted/30"
                >
                  <div className="mb-2 text-xs font-semibold text-muted-foreground">
                    Weight {weight}
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
