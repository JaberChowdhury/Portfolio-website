import React from "react"
import { systemFonts } from "../data"
import { TabProps } from "./types"
import { Card } from "@/components/pouf/surface"
import { Text } from "@/components/pouf/text"

export default function SystemFontsTab({
  fontSize,
  fontWeight,
  sampleText,
}: TabProps) {
  return (
    <div className="flex flex-col gap-(--s4)">
      {systemFonts.map((font) => (
        <Card key={font.name}>
          <div className="mb-(--s4) flex flex-wrap items-baseline justify-between gap-(--s2)">
            <Text size="sm" muted>
              {font.name}
            </Text>
            <code className="font-mono text-[12px] text-muted">{font.stack}</code>
          </div>
          <p
            style={{ fontFamily: font.stack, fontSize, fontWeight }}
            className="leading-tight text-ink"
          >
            {sampleText}
          </p>
        </Card>
      ))}
    </div>
  )
}
