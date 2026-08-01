import React from "react"
import { customFonts } from "../data"
import { TabProps } from "./types"
import { Card } from "@/components/pouf/surface"
import { Text } from "@/components/pouf/text"

export default function CustomFontsTab({ fontSize, sampleText }: TabProps) {
  return (
    <div className="grid gap-(--s5) md:grid-cols-2">
      {customFonts.map((font) => (
        <Card key={font.name}>
          <div className="mb-(--s4)">
            <Text size="sm" muted>
              {font.name}
            </Text>
          </div>
          <div className={`${font.className} flex flex-col gap-(--s4)`}>
            {font.weights.map((weight) => (
              <div key={weight} className="rounded-card bg-bg p-(--s3)">
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
