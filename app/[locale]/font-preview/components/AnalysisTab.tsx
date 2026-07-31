import React from "react"
import { customFonts, systemFonts } from "../data"
import { TabProps } from "./types"
import { cn } from "@/lib/utils"

export default function AnalysisTab({ fontWeight }: TabProps) {
  return (
    <div className="space-y-8">
      {[...customFonts, ...systemFonts].map((font) => (
        <div key={font.name} className="aurora-card">
          <div className="mono-label mb-8">{font.name} — Glyph Analysis</div>
          <div
            className={cn(
              "flex flex-col gap-12",
              (font as any).className || ""
            )}
            style={
              (font as any).stack
                ? { fontFamily: (font as any).stack }
                : undefined
            }
          >
            <div className="flex flex-wrap items-end gap-8 pb-8">
              <span
                style={{ fontWeight: fontWeight }}
                className="text-[150px] leading-none tracking-tight text-ink"
              >
                Aa
              </span>
              <span
                style={{ fontWeight: fontWeight }}
                className="text-[150px] leading-none tracking-tight text-ink"
              >
                Gg
              </span>
              <span
                style={{ fontWeight: fontWeight }}
                className="text-[150px] leading-none tracking-tight text-ink"
              >
                Qq
              </span>
              <span
                style={{ fontWeight: fontWeight }}
                className="text-[150px] leading-none tracking-tight text-ink"
              >
                &
              </span>
            </div>

            <div className="space-y-4">
              <div className="mono-label">Numerals</div>
              <div
                style={{ fontWeight: fontWeight }}
                className="text-[100px] leading-none tracking-tighter break-all text-ink-2"
              >
                0123456789
              </div>
            </div>

            <div className="space-y-4">
              <div className="mono-label">Ligatures & Symbols</div>
              <div
                style={{ fontWeight: fontWeight }}
                className="text-[80px] leading-none tracking-tighter break-all text-ink-2"
              >
                @#$%*()_+-=!?
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
