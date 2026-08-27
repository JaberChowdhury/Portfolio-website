import { ElementType } from "react"

export interface Highlight {
  title: string
  description: string
  icon: ElementType
}

interface HighlightCardProps {
  highlight: Highlight
  index?: number
}

const ACCENT_STYLES = [
  {
    iconBg: "bg-pear/10 text-pear border-pear/20",
    hoverBorder: "hover:border-pear/40",
  },
  {
    iconBg: "bg-cyan-accent/10 text-cyan-accent border-cyan-accent/20",
    hoverBorder: "hover:border-cyan-accent/40",
  },
  {
    iconBg: "bg-coral-accent/10 text-coral-accent border-coral-accent/20",
    hoverBorder: "hover:border-coral-accent/40",
  },
]

export function HighlightCard({ highlight, index = 0 }: HighlightCardProps) {
  const Icon = highlight.icon
  const accent = ACCENT_STYLES[index % ACCENT_STYLES.length]

  return (
    <div
      className={`hum-card group h-full rounded-2xl border border-border/80 p-3.5 sm:p-5 md:p-5.5 ${accent.hoverBorder}`}
    >
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11 md:h-12 md:w-12 ${accent.iconBg}`}
          >
            <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </div>
          <h3 className="text-xs font-bold break-words text-card-foreground sm:text-base md:text-lg">
            {highlight.title}
          </h3>
        </div>

        <p className="line-clamp-2 text-[11px] leading-relaxed text-muted-foreground sm:text-xs md:text-sm">
          {highlight.description}
        </p>
      </div>
    </div>
  )
}
