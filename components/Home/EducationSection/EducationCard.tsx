import { Badge, Blob } from "@/components/pouf/media"
import { Metric } from "@/components/pouf/readout"
import { Card } from "@/components/pouf/surface"
import { Heading, Text } from "@/components/pouf/text"
import type { IconLike } from "@/components/pouf/Icon"
import type { Tone } from "@/components/pouf/tone"

interface ProgressItem {
  label: string
  value: string
}

export interface EducationCardProps {
  title: string
  subtitle: string
  description: string
  subjects: string[]
  progress: ProgressItem[]
}

interface EducationCardComponentProps extends EducationCardProps {
  icon: IconLike
  tone: Tone
}

export function EducationCard({
  title,
  subtitle,
  description,
  subjects,
  progress,
  icon,
  tone,
}: EducationCardComponentProps) {
  return (
    <Card>
      <div className="flex flex-col gap-(--s4)">
        <div className="flex items-center gap-(--s4)">
          <Blob icon={icon} tone={tone} size="md" />
          <div className="flex flex-col gap-[2px]">
            <Heading level={3}>{title}</Heading>
            <Text size="sm" muted>
              {subtitle}
            </Text>
          </div>
        </div>

        <Text muted>{description}</Text>

        {subjects.length > 0 && (
          <div className="flex flex-wrap gap-(--s2)">
            {subjects.map((subject) => (
              <Badge key={subject} tone={tone}>
                {subject}
              </Badge>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-(--s3)">
          {progress.map((item) => (
            <Metric key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      </div>
    </Card>
  )
}
