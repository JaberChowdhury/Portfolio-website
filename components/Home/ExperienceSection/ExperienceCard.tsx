import { Briefcase, Calendar, ArrowUpRight } from "lucide-react"

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
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card className="group overflow-hidden border border-border/60 bg-card/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.25)]">
      {/* Hover Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <CardHeader className="relative z-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <CardTitle className="flex items-center gap-3 text-xl transition-colors group-hover:text-primary">
              <Briefcase className="h-5 w-5" />
              {experience.role}
            </CardTitle>

            <CardDescription className="mt-2 text-base">
              {experience.company}
            </CardDescription>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {experience.period}
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10">
        <p className="leading-relaxed text-muted-foreground">
          {experience.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {experience.tech.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="rounded-full border border-border/50 bg-muted/40 px-3 py-1 text-[11px] tracking-wide"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          View Details
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  )
}
