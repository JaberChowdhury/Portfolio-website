import React from "react"
import { customFonts, systemFonts } from "../data"
import { Metric } from "@/components/pouf/readout"
import { Card } from "@/components/pouf/surface"
import { Text } from "@/components/pouf/text"

export default function TypographyMetrics({
  fontSize,
  fontWeight,
}: {
  fontSize: number
  fontWeight: number
}) {
  const metrics = [
    { label: "Font Size", value: `${fontSize}px` },
    { label: "Weight", value: String(fontWeight) },
    { label: "Custom Fonts", value: String(customFonts.length) },
    { label: "System Fonts", value: String(systemFonts.length) },
  ]

  return (
    <div className="flex flex-col gap-(--s4)">
      <Text size="sm" muted>
        Typography Metrics
      </Text>
      <div className="grid gap-(--s3) sm:grid-cols-2 md:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label} variant="tight">
            <Metric label={metric.label} value={metric.value} />
          </Card>
        ))}
      </div>
    </div>
  )
}
