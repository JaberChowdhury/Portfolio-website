import { Badge, Dot } from "@/components/pouf/media"
import { RowCard } from "@/components/pouf/surface"
import { Heading, Text } from "@/components/pouf/text"
import type { Tone } from "@/components/pouf/tone"

export interface Experience {
  role: string
  company: string
  period: string
  description: string
  tech: string[]
}

interface ExperienceCardProps {
  experience: Experience
  tone: Tone
}

export function ExperienceCard({ experience, tone }: ExperienceCardProps) {
  return (
    <RowCard>
      <div className="flex flex-col gap-(--s3)">
        <div className="flex flex-wrap items-center justify-between gap-(--s2)">
          <Heading level={3}>{experience.role}</Heading>
          <Text size="sm" muted num>
            {experience.period}
          </Text>
        </div>

        <div className="flex items-center gap-(--s2)">
          <Dot tone={tone} />
          <Text muted>{experience.company}</Text>
        </div>

        <Text muted>{experience.description}</Text>

        <div className="flex flex-wrap gap-(--s2)">
          {experience.tech.map((tech) => (
            <Badge key={tech} tone={tone}>
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </RowCard>
  )
}
