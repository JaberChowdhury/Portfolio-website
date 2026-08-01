import {
  ArrowUpRight,
  Code2,
  Globe,
  Layers,
  MessageSquare,
  ShoppingBag,
  Zap,
} from "lucide-react"
import { Link } from "@/i18n/routing"
import { Badge, Blob } from "@/components/pouf/media"
import { Card } from "@/components/pouf/surface"
import { Heading, Text } from "@/components/pouf/text"
import type { Tone } from "@/components/pouf/tone"

export interface Project {
  title: string
  description: string
  tech: string[]
}

interface ProjectCardProps {
  project: Project
  index?: number
}

const TONES: Tone[] = ["purple", "blue", "pink", "mint", "yellow", "orange"]
const ICONS = [ShoppingBag, MessageSquare, Code2, Layers, Zap, Globe]

export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const tone = TONES[index % TONES.length]
  const Icon = ICONS[index % ICONS.length]
  const href = `/projects/${slugify(project.title)}`

  return (
    <Link href={href} className="flex h-full">
      <Card variant="tight" motion="lift">
        <div className="flex h-full flex-col items-start gap-(--s3)">
          <div className="flex w-full items-start justify-between gap-(--s2)">
            <Blob icon={<Icon size={20} />} tone={tone} size="sm" />
            <ArrowUpRight
              aria-hidden="true"
              className="mt-1 size-5 shrink-0 text-muted"
            />
          </div>

          <Heading level={3}>{project.title}</Heading>

          <div className="flex-1">
            <Text muted size="sm">
              {project.description}
            </Text>
          </div>

          <div className="flex flex-wrap gap-(--s2)">
            {project.tech.map((tech) => (
              <Badge key={tech} tone={tone}>
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  )
}
