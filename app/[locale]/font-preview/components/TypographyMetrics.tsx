import React from "react"
import { customFonts, systemFonts } from "../data"

function Metric({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-paper p-6">
      <div className="mono-label">{label}</div>
      <div className="mt-3 text-3xl font-bold tracking-tight text-ink">
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
    <div className="mt-16">
      <div className="mono-label mb-6">Typography Metrics</div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <Metric label="Font Size" value={`${fontSize}px`} />
        <Metric label="Weight" value={fontWeight} />
        <Metric label="Custom Fonts" value={customFonts.length} />
        <Metric label="System Fonts" value={systemFonts.length} />
      </div>
    </div>
  )
}
