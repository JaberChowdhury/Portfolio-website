import { Blob } from "@/components/pouf/media"
import { Card } from "@/components/pouf/surface"
import { Heading, Text } from "@/components/pouf/text"
import type { IconLike } from "@/components/pouf/Icon"
import type { Tone } from "@/components/pouf/tone"

export interface Highlight {
  title: string
  description: string
}

interface HighlightCardProps {
  highlight: Highlight
  icon: IconLike
  tone: Tone
}

export function HighlightCard({ highlight, icon, tone }: HighlightCardProps) {
  return (
    <Card motion="lift">
      <div className="flex flex-col gap-(--s4)">
        <Blob icon={icon} tone={tone} size="md" />
        <Heading level={3}>{highlight.title}</Heading>
        <Text muted>{highlight.description}</Text>
      </div>
    </Card>
  )
}
