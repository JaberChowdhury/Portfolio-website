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
    <div className="space-y-4 sm:space-y-6">
      {systemFonts.map((font) => (
        <Card key={font.name} className="overflow-hidden rounded-2xl">
          <CardHeader className="flex flex-col items-start justify-between gap-2 border-b bg-muted/20 p-4 pb-3 sm:flex-row sm:items-center sm:p-6 sm:pb-4">
            <CardTitle className="text-lg sm:text-xl">{font.name}</CardTitle>
            <code className="max-w-full rounded-md border bg-background px-2.5 py-1 font-mono text-[10px] break-all text-muted-foreground sm:text-xs">
              {font.stack}
            </code>
          </CardHeader>
          <CardContent className="p-4 pt-4 sm:p-6 sm:pt-6">
            <p
              style={{ fontFamily: font.stack, fontSize, fontWeight }}
              className="leading-tight break-words"
            >
              {sampleText}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
