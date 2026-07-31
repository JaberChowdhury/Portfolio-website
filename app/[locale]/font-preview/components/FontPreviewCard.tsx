import React from "react"
import {
  alphabetUppercase,
  alphabetLowercase,
  numbers,
  symbols,
  paragraph,
} from "../data"

export default function FontPreviewCard({
  title,
  className,
  style,
  fontSize,
  fontWeight,
  sampleText,
}: {
  title: string
  className?: string
  style?: React.CSSProperties
  fontSize: number
  fontWeight: number
  sampleText: string
}) {
  return (
    <div className="aurora-card flex flex-col">
      <div className="mono-label mb-6">{title}</div>
      <div
        className={className}
        style={{
          fontSize,
          fontWeight,
          ...style,
        }}
      >
        <p className="mb-6 leading-tight text-ink">{sampleText}</p>

        <div className="space-y-4 text-base text-ink-2">
          <div>
            <p>{alphabetUppercase}</p>
            <p>{alphabetLowercase}</p>
          </div>
          <div>{numbers}</div>
          <div>{symbols}</div>
          <div className="pt-3">
            <p>{paragraph}</p>
          </div>
          <div className="space-y-2 pt-3">
            <h1 className="text-5xl font-bold text-ink">Heading H1</h1>
            <h2 className="text-4xl font-semibold text-ink">Heading H2</h2>
            <h3 className="text-3xl font-medium text-ink">Heading H3</h3>
          </div>
          <div className="rounded-lg bg-paper p-3 font-mono text-sm text-cyan">
            const hello = "world"
          </div>
        </div>
      </div>
    </div>
  )
}
