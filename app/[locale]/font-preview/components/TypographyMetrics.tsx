import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { customFonts, systemFonts } from "../data"

function Metric({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center rounded-xl border bg-background/50 p-5 shadow-sm">
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      <div className="mt-2 text-3xl font-bold tracking-tight">{value}</div>
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
    <Card className="mt-16 overflow-hidden">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle>Typography Metrics</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Metric label="Font Size" value={`${fontSize}px`} />
          <Metric label="Weight" value={fontWeight} />
          <Metric label="Custom Fonts" value={customFonts.length} />
          <Metric label="System Fonts" value={systemFonts.length} />
        </div>
      </CardContent>
    </Card>
  )
}
