import { ElementType } from "react"

export interface Highlight {
  title: string
  description: string
  icon: ElementType
}

type HighlightTint = "pear" | "cyan" | "mint"

interface HighlightCardProps {
  highlight: Highlight
  tint?: HighlightTint
}

const tintStyles: Record<
  HighlightTint,
  { card: string; icon: string; tile: string }
> = {
  pear: { card: "hum-card--pear", icon: "text-pear-deep", tile: "bg-pear/15" },
  cyan: { card: "hum-card--cyan", icon: "text-cyan-deep", tile: "bg-cyan/15" },
  mint: { card: "hum-card--mint", icon: "text-mint-deep", tile: "bg-mint/15" },
}

export function HighlightCard({
  highlight,
  tint = "pear",
}: HighlightCardProps) {
  const Icon = highlight.icon
  const style = tintStyles[tint]

  return (
    <div className={`hum-card h-full rounded-2xl p-6 ${style.card}`}>
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${style.tile}`}
      >
        <Icon className={`h-5 w-5 ${style.icon}`} />
      </div>

      <h3 className="text-xl font-bold tracking-[-0.025em] text-ink">
        {highlight.title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-ink-2">
        {highlight.description}
      </p>
    </div>
  )
}
