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
      className="group rounded-xl border border-border bg-card p-3 text-card-foreground shadow-xs transition-all duration-200 hover:border-primary/40 hover:shadow-sm"
    >
      <Icon className="mb-1.5 h-4 w-4 text-[#c85a32]" />

      <div data-cursor="text" className="text-xl font-bold tracking-tight text-foreground">
        {stat.value}
      </div>

      <div className="text-[11px] font-medium text-muted-foreground">{stat.label}</div>
    </div>
  )
}

