import React from "react"
import {
  Briefcase,
  Calendar,
  GitPullRequest,
  Award,
  LucideIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export interface Experience {
  role: string
  company: string
  period: string
  description: string
  tech: string[]
}

interface ExperienceCardProps {
  experience: Experience
  index?: number
}

const ACCENT_STYLES = [
  {
    iconBg:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    hoverBorder: "hover:border-emerald-500/40",
    pillHover:
      "hover:border-emerald-500/30 hover:text-emerald-600 dark:hover:text-emerald-400",
    dot: "bg-emerald-500",
    icon: Briefcase,
  },
  {
    iconBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    hoverBorder: "hover:border-sky-500/40",
    pillHover:
      "hover:border-sky-500/30 hover:text-sky-600 dark:hover:text-sky-400",
    dot: "bg-sky-500",
    icon: GitPullRequest,
  },
  {
    iconBg:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    hoverBorder: "hover:border-amber-500/40",
    pillHover:
      "hover:border-amber-500/30 hover:text-amber-600 dark:hover:text-amber-400",
    dot: "bg-amber-500",
    icon: Award,
  },
]

export function ExperienceCard({ experience, index = 0 }: ExperienceCardProps) {
  const accent = ACCENT_STYLES[index % ACCENT_STYLES.length]
  const IconComponent: LucideIcon = accent.icon

  return (
    <Card
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-6 text-card-foreground shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-[0.99] md:p-7 ${accent.hoverBorder}`}
    >
      <div>
        <CardHeader className="space-y-3.5 p-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12 ${accent.iconBg}`}
              >
                <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-card-foreground sm:text-lg md:text-xl">
                  {experience.role}
                </CardTitle>
                <CardDescription className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground sm:text-sm md:text-base">
                  <span className={`h-2 w-2 rounded-full ${accent.dot}`} />
                  {experience.company}
                </CardDescription>
              </div>
            </div>

            <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border/70 bg-secondary/60 px-3.5 py-1 font-mono text-[11px] font-medium text-muted-foreground sm:text-xs">
              <Calendar className="h-3.5 w-3.5" />
              <span>{experience.period}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="mt-4.5 p-0">
          <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-base">
            {experience.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {experience.tech.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className={`rounded-full border border-border/60 bg-secondary/50 px-3 py-1 font-mono text-xs font-medium text-muted-foreground transition-all duration-200 hover:scale-105 hover:bg-secondary ${accent.pillHover}`}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
