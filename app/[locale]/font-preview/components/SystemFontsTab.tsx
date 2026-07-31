import React from "react"
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
        <div key={font.name} className="aurora-card">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
            <div className="mono-label">{font.name}</div>
            <code className="font-mono text-xs text-ink-2">{font.stack}</code>
          </div>
          <p
            style={{ fontFamily: font.stack, fontSize, fontWeight }}
            className="leading-tight text-ink"
          >
            {sampleText}
          </p>
        </div>
      ))}
    </div>
  )
}
