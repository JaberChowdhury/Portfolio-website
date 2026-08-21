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
    <Card className="overflow-hidden rounded-2xl">
      <CardHeader className="border-b bg-muted/20 p-4 pb-3 sm:p-6 sm:pb-4">
        <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-hidden p-4 pt-4 sm:p-6 sm:pt-6">
        <div
          className={`overflow-hidden break-words ${className || ""}`}
          style={{
            fontSize,
            fontWeight,
            ...style,
          }}
        >
          <p className="mb-4 leading-tight break-words sm:mb-6">{sampleText}</p>

          <div className="space-y-3 text-xs opacity-90 sm:space-y-4 sm:text-base">
            <div className="space-y-1">
              <p className="font-medium break-all">{alphabetUppercase}</p>
              <p className="break-all">{alphabetLowercase}</p>
            </div>
            <div className="font-mono break-all">{numbers}</div>
            <div className="font-mono break-all">{symbols}</div>
            <div className="pt-2 sm:pt-3">
              <p className="leading-relaxed">{paragraph}</p>
            </div>
            <div className="space-y-1 pt-2 sm:space-y-2 sm:pt-3">
              <h1 className="text-2xl font-bold break-words sm:text-4xl md:text-5xl">
                Heading H1
              </h1>
              <h2 className="text-xl font-semibold break-words sm:text-3xl md:text-4xl">
                Heading H2
              </h2>
              <h3 className="text-lg font-medium break-words sm:text-2xl md:text-3xl">
                Heading H3
              </h3>
            </div>
            <div className="rounded-lg bg-muted p-2.5 font-mono text-xs break-all opacity-100 sm:p-3 sm:text-sm">
              {'const hello = "world"'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
