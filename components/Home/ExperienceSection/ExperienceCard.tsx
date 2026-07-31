import { Briefcase, Calendar, ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

export interface Experience {
  role: string
  company: string
  period: string
  description: string
  tech: string[]
}

export const experienceAccents = ["pear", "cyan", "mint"] as const
export type ExperienceAccent = (typeof experienceAccents)[number]

export const accentDotClasses = {
  pear: "bg-pear",
  cyan: "bg-cyan",
  mint: "bg-mint",
} as const

const CARD_ACCENTS = {
  pear: "hum-card--pear",
  cyan: "hum-card--cyan",
  mint: "hum-card--mint",
} as const

interface ExperienceCardProps {
  experience: Experience
  accent?: ExperienceAccent
}

export function ExperienceCard({
  experience,
  accent = "pear",
}: ExperienceCardProps) {
  return (
    <div
      data-cursor="cover"
      className={cn(
        "hum-card group rounded-2xl p-7 md:p-9",
        CARD_ACCENTS[accent]
      )}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-ink-2" />
            <h3
              data-cursor="text"
              className="text-xl font-bold tracking-tight text-ink"
            >
              {experience.role}
            </h3>
          </div>

          <p className="mt-2 font-medium text-ink-2">{experience.company}</p>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-sm font-medium text-ink-2">
          <Calendar className="h-4 w-4" />
          {experience.period}
        </div>
      </div>

      <p className="mt-5 leading-relaxed text-ink-2">
        {experience.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {experience.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-paper/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-ink-2 ring-1 ring-ink/10"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-7 flex items-center gap-2 text-sm font-bold text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        View Details
        <ArrowUpRight className="h-4 w-4" />
      </div>
    </div>
  )
}
