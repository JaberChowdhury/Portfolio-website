import { ElementType } from "react"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    hoverBorder: "hover:border-emerald-500/40",
  },
  {
    iconBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    hoverBorder: "hover:border-sky-500/40",
  },
  {
    iconBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    hoverBorder: "hover:border-rose-500/40",
  },
]

export function HighlightCard({ highlight, index = 0 }: HighlightCardProps) {
  const Icon = highlight.icon
  const accent = ACCENT_STYLES[index % ACCENT_STYLES.length]

  return (
    <Card
      className={`group h-full rounded-2xl border border-border/80 bg-card p-4.5 text-card-foreground shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99] ${accent.hoverBorder}`}
    >
      <CardHeader className="p-0 space-y-2.5">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105 ${accent.iconBg}`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <CardTitle className="text-sm font-bold text-card-foreground">
            {highlight.title}
          </CardTitle>
        </div>

        <CardDescription className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {highlight.description}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
