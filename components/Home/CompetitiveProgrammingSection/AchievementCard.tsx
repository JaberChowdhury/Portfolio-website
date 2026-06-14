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
    <Card className="group border border-border/60 bg-card/60 backdrop-blur-xl transition-all duration-500 hover:border-primary/30 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.25)]">
      <CardHeader>
        <CardTitle className="transition-colors group-hover:text-primary">
          {achievement.title}
        </CardTitle>

        <CardDescription className="leading-relaxed">
          {achievement.description}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
