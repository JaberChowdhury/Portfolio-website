import { Briefcase, Calendar } from "lucide-react"
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
    <Card className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md md:p-6">
      <div>
        <CardHeader className="p-0 space-y-1.5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2.5 text-base font-bold text-card-foreground md:text-lg">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-[#2d6a4f] dark:text-[#52b788]">
                  <Briefcase className="h-4 w-4" />
                </span>
                <span>{experience.role}</span>
              </CardTitle>
              <CardDescription className="mt-1 text-xs font-medium text-muted-foreground md:text-sm">
                {experience.company}
              </CardDescription>
            </div>

            <div className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1 text-[11px] font-medium text-muted-foreground shrink-0">
              <Calendar className="h-3.5 w-3.5" />
              <span>{experience.period}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 mt-4">
          <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground md:text-sm">
            {experience.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {experience.tech.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="rounded-md border border-border/50 bg-secondary text-secondary-foreground px-2.5 py-0.5 text-[11px] font-medium transition-colors hover:bg-secondary/80"
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
