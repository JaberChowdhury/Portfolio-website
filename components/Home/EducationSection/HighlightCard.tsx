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
    <Card className="group h-full rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md">
      <CardHeader className="p-0">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-[#b85d38] dark:text-[#e07a5f]">
          <Icon className="h-5 w-5" />
        </div>

        <CardTitle className="text-sm font-bold text-card-foreground transition-colors group-hover:text-primary">
          {highlight.title}
        </CardTitle>

        <CardDescription className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {highlight.description}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
