import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { customFonts, systemFonts } from "../data"

function Metric({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center rounded-xl border bg-background/50 p-3.5 shadow-sm sm:p-5">
      <div className="text-xs font-medium text-muted-foreground sm:text-sm">
        {label}
      </div>
      <div className="mt-1 text-xl font-bold tracking-tight sm:mt-2 sm:text-3xl">
        {value}
      </div>
    </div>
  )
}

export default function TypographyMetrics({
  fontSize,
  fontWeight,
}: {
  fontSize: number
  fontWeight: number
}) {
  return (
    <Card className="mt-10 overflow-hidden rounded-2xl sm:mt-16">
      <CardHeader className="border-b bg-muted/20 p-4 pb-3 sm:p-6 sm:pb-4">
        <CardTitle className="text-lg sm:text-xl">Typography Metrics</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-4 sm:p-6 sm:pt-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-4">
          <Metric label="Font Size" value={`${fontSize}px`} />
          <Metric label="Weight" value={fontWeight} />
          <Metric label="Custom Fonts" value={customFonts.length} />
          <Metric label="System Fonts" value={systemFonts.length} />
        </div>
      </CardContent>
    </Card>
  )
}
