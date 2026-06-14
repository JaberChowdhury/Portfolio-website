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
}

export function HighlightCard({ highlight }: HighlightCardProps) {
  const Icon = highlight.icon

  return (
    <Card className="group h-full border border-border/60 bg-card/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.25)]">
      <CardHeader>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-muted/40">
          <Icon className="h-5 w-5 text-primary" />
        </div>

        <CardTitle className="transition-colors group-hover:text-primary">
          {highlight.title}
        </CardTitle>

        <CardDescription className="leading-relaxed">
          {highlight.description}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
