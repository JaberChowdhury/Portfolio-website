import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export interface Achievement {
  title: string
  description: string
}

interface AchievementCardProps {
  achievement: Achievement
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <Card
      data-cursor="cover"
      className="group rounded-xl border border-border bg-card p-3 text-card-foreground shadow-xs transition-all duration-200 hover:border-primary/40 hover:shadow-sm"
    >
      <CardHeader className="p-0 space-y-1">
        <CardTitle className="text-xs font-semibold text-foreground transition-colors group-hover:text-[#c85a32]">
          {achievement.title}
        </CardTitle>

        <CardDescription className="line-clamp-1 text-[11px] text-muted-foreground font-normal">
          {achievement.description}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

