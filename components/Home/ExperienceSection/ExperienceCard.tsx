import React from "react"
import {
  Briefcase,
  Calendar,
  GitPullRequest,
  Award,
  LucideIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

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
      "bg-[var(--color-mint)]/10 text-[var(--color-mint-deep)] dark:text-[var(--color-mint)] border-[var(--color-mint)]/20",
    hoverBorder: "hover:border-[var(--color-mint)]/40",
    pillHover:
      "hover:border-[var(--color-mint)]/30 hover:text-[var(--color-mint-deep)] dark:hover:text-[var(--color-mint)]",
    dot: "hum-dot hum-dot--mint",
    icon: Briefcase,
    ribbon:
      "from-[var(--color-mint)]/80 via-[var(--color-mint)] to-[var(--color-mint)]/80",
  },
  {
    iconBg:
      "bg-[var(--color-cyan)]/10 text-[var(--color-cyan-deep)] dark:text-[var(--color-cyan)] border-[var(--color-cyan)]/20",
    hoverBorder: "hover:border-[var(--color-cyan)]/40",
    pillHover:
      "hover:border-[var(--color-cyan)]/30 hover:text-[var(--color-cyan-deep)] dark:hover:text-[var(--color-cyan)]",
    dot: "hum-dot hum-dot--cyan",
    icon: GitPullRequest,
    ribbon:
      "from-[var(--color-cyan)]/80 via-[var(--color-cyan)] to-[var(--color-cyan)]/80",
  },
  {
    iconBg:
      "bg-[var(--color-pear)]/10 text-[var(--color-pear-deep)] dark:text-[var(--color-pear)] border-[var(--color-pear)]/20",
    hoverBorder: "hover:border-[var(--color-pear)]/40",
    pillHover:
      "hover:border-[var(--color-pear)]/30 hover:text-[var(--color-pear-deep)] dark:hover:text-[var(--color-pear)]",
    dot: "hum-dot hum-dot--pear",
    icon: Award,
    ribbon:
      "from-[var(--color-pear)]/80 via-[var(--color-pear)] to-[var(--color-pear)]/80",
  },
]

export function ExperienceCard({ experience, index = 0 }: ExperienceCardProps) {
  const accent = ACCENT_STYLES[index % ACCENT_STYLES.length]
  const IconComponent: LucideIcon = accent.icon

  return (
    <div
      className={`group hum-card relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-3.5 text-card-foreground transition-all duration-300 sm:p-4 md:p-5 ${accent.hoverBorder}`}
    >
      {/* Top accent ribbon */}
      <div
        className={`absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r ${accent.ribbon} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
        aria-hidden="true"
      />

      <div>
        {/* Header */}
        <div>
          <div className="flex flex-wrap items-start justify-between gap-2.5 sm:gap-3">
            {/* Icon + role/company */}
            <div className="flex items-center gap-2.5 sm:gap-3 md:gap-3.5">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-105 sm:h-10 sm:w-10 md:h-11 md:w-11 ${accent.iconBg}`}
              >
                <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-card-foreground sm:text-base md:text-lg">
                  {experience.role}
                </h3>
                <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground sm:text-sm">
                  <span className={accent.dot} />
                  {experience.company}
                </p>
              </div>
            </div>

            {/* Period pill */}
            <div className="mono-label inline-flex shrink-0 items-center gap-1 rounded-full border border-border/70 bg-secondary/60 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:px-3 sm:py-1 sm:text-xs">
              <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>{experience.period}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-3 sm:mt-3.5 md:mt-4">
          <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {experience.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1 sm:mt-4 sm:gap-1.5">
            {experience.tech.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className={`rounded-full border border-border/60 bg-secondary/50 px-2 py-0.5 font-mono text-[9px] font-medium text-muted-foreground transition-all duration-200 hover:scale-105 hover:bg-secondary sm:px-2.5 sm:py-1 sm:text-xs ${accent.pillHover}`}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
