import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/20 pb-4">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div
          className={className}
          style={{
            fontSize,
            fontWeight,
            ...style,
          }}
        >
          <p className="mb-6 leading-tight">{sampleText}</p>

          <div className="space-y-4 text-base opacity-90">
            <div>
              <p>{alphabetUppercase}</p>
              <p>{alphabetLowercase}</p>
            </div>
            <div>{numbers}</div>
            <div>{symbols}</div>
            <div className="pt-3">
              <p>{paragraph}</p>
            </div>
            <div className="pt-3">
              <h1 className="text-5xl font-bold">Heading H1</h1>
              <h2 className="text-4xl font-semibold">Heading H2</h2>
              <h3 className="text-3xl font-medium">Heading H3</h3>
            </div>
            <div className="rounded bg-muted p-3 font-mono text-sm opacity-100">
              const hello = "world"
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
