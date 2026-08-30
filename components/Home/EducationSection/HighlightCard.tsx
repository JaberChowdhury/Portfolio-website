"use client"

import React, { ElementType } from "react"
import { LucideIcon } from "lucide-react"
import { M3FacetedBadge } from "@/components/m3/M3Shapes"

export interface Highlight {
  title: string
  description: string
  icon: ElementType
}

interface HighlightCardProps {
  highlight: Highlight
  index?: number
}

const HIGHLIGHT_SHAPES = ["gem", "cookie8", "diamond"] as const

export function HighlightCard({ highlight, index = 0 }: HighlightCardProps) {
  const Icon = highlight.icon as LucideIcon
  const shape = HIGHLIGHT_SHAPES[index % HIGHLIGHT_SHAPES.length]

  return (
    <div
      data-cursor="cover"
      className="group relative h-full rounded-[28px_10px_28px_10px] border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container)] p-4 sm:p-5 text-[var(--md-sys-color-on-surface)] transition-all duration-300 hover:bg-[var(--md-sys-color-surface-container-high)] hover:border-[var(--md-sys-color-primary)] active:scale-[0.99]"
    >
      <div className="space-y-2.5">
        <div className="flex items-center gap-3">
          <M3FacetedBadge
            shape={shape}
            icon={Icon}
            size={44}
            iconClassName="h-5 w-5"
          />
          <h3 className="text-sm sm:text-base font-bold break-words text-[var(--md-sys-color-on-surface)]">
            {highlight.title}
          </h3>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed text-[var(--md-sys-color-on-surface-variant)] line-clamp-3">
          {highlight.description}
        </p>
      </div>
    </div>
  )
}

export default HighlightCard
