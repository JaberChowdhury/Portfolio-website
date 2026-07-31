import React from "react"
import { customFonts } from "../data"
import { TabProps } from "./types"

export default function PlaygroundTab({ fontSize, sampleText }: TabProps) {
  return (
    <div className="space-y-8">
      {customFonts.map((font) => (
        <div key={font.name} className="aurora-card">
          <div className="mono-label mb-6">{font.name}</div>
          <div className={`${font.className} grid gap-5`}>
            {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((weight) => (
              <div
                key={weight}
                className="rounded-xl bg-paper/60 p-4 transition-colors hover:bg-paper"
              >
                <div className="mb-2">
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
