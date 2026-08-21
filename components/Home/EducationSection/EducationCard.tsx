import { GraduationCap, type LucideIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export interface ProgressItem {
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
    <Card className="group overflow-hidden rounded-2xl border border-border/80 bg-card p-5 text-card-foreground shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-rose-500/40 hover:shadow-md md:p-6">
      <CardContent className="p-0">
        <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Left Side: Program Overview & Coursework */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="mb-3.5 flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-600 transition-transform duration-300 group-hover:scale-105 dark:text-rose-400">
                  <Icon className="h-6 w-6" />
                </div>

                <div>
                  <h3
                    data-cursor="text"
                    className="text-lg font-bold text-card-foreground md:text-xl"
                  >
                    {title}
                  </h3>
                  <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground md:text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                    {subtitle}
                  </p>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
                {description}
              </p>
            </div>

            {subjects.length > 0 && (
              <div className="mt-4 border-t border-border/70 pt-3">
                <div className="mb-2 font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                  Core Coursework
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {subjects.map((subject) => (
                    <Badge
                      key={subject}
                      variant="secondary"
                      className="rounded-full border border-border/60 bg-secondary/50 px-2.5 py-0.5 font-mono text-[11px] font-medium text-muted-foreground transition-all duration-200 hover:scale-105 hover:bg-secondary hover:text-foreground"
                    >
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Side: Progress Metric Chips */}
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2">
            {progress.map((item) => (
              <div
                key={item.label}
                className="flex flex-col justify-center rounded-xl border border-border/70 bg-secondary/40 p-3 transition-colors hover:bg-secondary/60"
              >
                <div className="font-mono text-base font-bold tracking-tight text-card-foreground md:text-lg">
                  {item.value}
                </div>
                <p className="mt-0.5 font-mono text-[10px] text-muted-foreground sm:text-[11px]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
