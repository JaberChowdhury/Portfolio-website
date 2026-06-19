/** @jsxImportSource react */
import { ElementType } from "react"

export interface Stat {
  label: string
  value: string
  icon: ElementType
}

interface StatCardProps {
  stat: Stat
}

export function StatCard({ stat }: StatCardProps) {
  const Icon = stat.icon

  return (
    <div
      data-cursor="cover"
      className="group rounded-2xl border border-border/60 bg-card/40 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_10px_40px_-15px_hsl(var(--primary)/0.3)]"
    >
      <Icon className="mb-4 h-5 w-5 text-primary" />

      <h3 data-cursor="text" className="text-3xl font-bold tracking-tight">
        {stat.value}
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
    </div>
  )
}
