import React from "react"
import { customFonts } from "../data"
import { TabProps } from "./types"

export default function CustomFontsTab({ fontSize, sampleText }: TabProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {customFonts.map((font) => (
        <div key={font.name} className="aurora-card">
          <div className="mono-label mb-6">{font.name}</div>
          <div className={`${font.className} space-y-6`}>
            {font.weights.map((weight) => (
              <div key={weight} className="rounded-xl bg-paper/60 p-4">
                <div className="mb-3">
                  <span className="mono-label">Weight {weight}</span>
                </div>
                <p
                  style={{ fontWeight: weight, fontSize }}
                  className="leading-tight text-ink"
                >
                  {sampleText}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
