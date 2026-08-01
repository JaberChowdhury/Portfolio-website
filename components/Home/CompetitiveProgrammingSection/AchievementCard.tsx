import { Blob } from "@/components/pouf/media"
import { RowCard } from "@/components/pouf/surface"
import { Heading, Text } from "@/components/pouf/text"
import type { IconName } from "@/components/pouf/Icon"
import type { Tone } from "@/components/pouf/tone"

export interface Achievement {
  title: string
  description: string
}

interface AchievementCardProps {
  achievement: Achievement
  icon: IconName
  tone: Tone
}

export function AchievementCard({ achievement, icon, tone }: AchievementCardProps) {
  return (
    <RowCard>
      <div className="flex items-start gap-(--s4)">
        <Blob icon={icon} tone={tone} size="md" />
        <div className="flex flex-col gap-(--s1)">
          <Heading level={3}>{achievement.title}</Heading>
          <Text muted>{achievement.description}</Text>
        </div>
      </div>
    </RowCard>
  )
}
