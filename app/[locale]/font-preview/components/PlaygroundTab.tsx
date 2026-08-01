import React from "react"
import { customFonts } from "../data"
import { TabProps } from "./types"
import { Card } from "@/components/pouf/surface"
import { Text } from "@/components/pouf/text"

export default function PlaygroundTab({ fontSize, sampleText }: TabProps) {
  return (
    <div className="flex flex-col gap-(--s5)">
      {customFonts.map((font) => (
        <Card key={font.name}>
          <div className="mb-(--s4)">
            <Text size="sm" muted>
              {font.name}
            </Text>
          </div>
          <div className={`${font.className} grid gap-(--s4)`}>
            {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((weight) => (
              <div
                key={weight}
                className="rounded-card bg-bg p-(--s3) transition-colors hover:bg-[color-mix(in_srgb,var(--color-purple)_14%,var(--color-surface))]"
              >
                <div className="mb-(--s2)">
                  <Text size="sm" muted>
                    Weight {weight}
                  </Text>
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
        </Card>
      ))}
    </div>
  )
}
