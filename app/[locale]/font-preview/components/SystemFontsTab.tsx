import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { systemFonts } from "../data"
import { TabProps } from "./types"

export default function SystemFontsTab({
  fontSize,
  fontWeight,
  sampleText,
}: TabProps) {
  return (
    <div className="space-y-6">
      {systemFonts.map((font) => (
        <Card key={font.name}>
          <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 pt-4 pb-4">
            <CardTitle className="text-xl">{font.name}</CardTitle>
            <code className="rounded border bg-background px-2.5 py-1 font-mono text-xs text-muted-foreground">
              {font.stack}
            </code>
          </CardHeader>
          <CardContent className="pt-6">
            <p
              style={{ fontFamily: font.stack, fontSize, fontWeight }}
              className="leading-tight"
            >
              {sampleText}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
