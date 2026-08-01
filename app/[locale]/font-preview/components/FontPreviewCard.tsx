import React from "react"
import {
  alphabetUppercase,
  alphabetLowercase,
  numbers,
  symbols,
  paragraph,
} from "../data"
import { Card } from "@/components/pouf/surface"
import { Text } from "@/components/pouf/text"

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
    <Card>
      <div className="flex h-full flex-col gap-(--s4)">
        <Text size="sm" muted>
          {title}
        </Text>
        <div
          className={className}
          style={{
            fontSize,
            fontWeight,
            ...style,
          }}
        >
          <div className="mb-(--s4) leading-tight text-ink">{sampleText}</div>

          <div className="flex flex-col gap-(--s3) text-[15px] text-muted">
            <div>
              <p>{alphabetUppercase}</p>
              <p>{alphabetLowercase}</p>
            </div>
            <div>{numbers}</div>
            <div>{symbols}</div>
            <div>
              <p>{paragraph}</p>
            </div>
            <div className="flex flex-col gap-(--s2) pt-(--s2)">
              <h1 className="text-5xl font-bold text-ink">Heading H1</h1>
              <h2 className="text-4xl font-semibold text-ink">Heading H2</h2>
              <h3 className="text-3xl font-medium text-ink">Heading H3</h3>
            </div>
            <div className="rounded-card bg-bg p-(--s3) font-mono text-[13px] font-bold text-purple">
              const hello = "world"
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
