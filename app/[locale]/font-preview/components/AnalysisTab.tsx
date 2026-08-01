import React from "react"
import { customFonts, systemFonts } from "../data"
import { TabProps } from "./types"
import { cn } from "@/lib/utils"
import { Card } from "@/components/pouf/surface"
import { Text } from "@/components/pouf/text"

export default function AnalysisTab({ fontWeight }: TabProps) {
  return (
    <div className="flex flex-col gap-(--s5)">
      {[...customFonts, ...systemFonts].map((font) => (
        <Card key={font.name}>
          <div className="mb-(--s5)">
            <Text size="sm" muted>
              {font.name} — Glyph Analysis
            </Text>
          </div>
          <div
            className={cn(
              "flex flex-col gap-(--s6)",
              (font as any).className || ""
            )}
            style={
              (font as any).stack
                ? { fontFamily: (font as any).stack }
                : undefined
            }
          >
            <div className="flex flex-wrap items-end gap-(--s5) pb-(--s5)">
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

            <div className="flex flex-col gap-(--s3)">
              <Text size="sm" muted>
                Numerals
              </Text>
              <div
                style={{ fontWeight: fontWeight }}
                className="text-[100px] leading-none tracking-tighter break-all text-muted"
              >
                0123456789
              </div>
            </div>

            <div className="flex flex-col gap-(--s3)">
              <Text size="sm" muted>
                Ligatures & Symbols
              </Text>
              <div
                style={{ fontWeight: fontWeight }}
                className="text-[80px] leading-none tracking-tighter break-all text-muted"
              >
                @#$%*()_+-=!?
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
