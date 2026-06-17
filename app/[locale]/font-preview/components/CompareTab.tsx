import React from "react"
import FontPreviewCard from "./FontPreviewCard"
import { customFonts, systemFonts } from "../data"
import { TabProps } from "./types"

export default function CompareTab({
  fontSize,
  fontWeight,
  sampleText,
}: TabProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {customFonts.map((font) => (
        <FontPreviewCard
          key={font.name}
          title={font.name}
          className={font.className}
          fontSize={fontSize}
          fontWeight={fontWeight}
          sampleText={sampleText}
        />
      ))}

      {systemFonts.map((font) => (
        <FontPreviewCard
          key={font.name}
          title={font.name}
          style={{ fontFamily: font.stack }}
          fontSize={fontSize}
          fontWeight={fontWeight}
          sampleText={sampleText}
        />
      ))}
    </div>
  )
}
