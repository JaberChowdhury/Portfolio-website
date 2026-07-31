import { GraduationCap, type LucideIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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
  icon?: LucideIcon
}

export function EducationCard({
  title,
  subtitle,
  description,
  subjects,
  progress,
  icon: Icon = GraduationCap,
}: EducationCardProps) {
  return (
    <div className="hum-card hum-card--plain rounded-2xl p-8 md:p-10">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-paper-3">
              <Icon className="h-7 w-7 text-ink-2" />
            </div>

            <div>
              <h3
                data-cursor="text"
                className="text-2xl font-bold tracking-[-0.025em]"
              >
                {title}
              </h3>
              <p className="text-ink-2">{subtitle}</p>
            </div>
          </div>

          <p className="max-w-2xl leading-relaxed text-ink-2">{description}</p>

          {subjects.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {subjects.map((subject) => (
                <Badge
                  key={subject}
                  variant="secondary"
                  className="h-auto rounded-full border-0 bg-paper-3 px-4 py-1.5 font-medium text-ink-2"
                >
                  {subject}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {progress.map((item) => (
            <div
              key={item.label}
              className="flex flex-col justify-center rounded-xl bg-paper-3 p-5"
            >
              <div className="text-2xl font-bold tracking-[-0.025em] tabular-nums">
                {item.value}
              </div>
              <p className="mt-2 text-sm text-ink-2">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
