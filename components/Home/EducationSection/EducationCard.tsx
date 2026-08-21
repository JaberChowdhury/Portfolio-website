import { GraduationCap, type LucideIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

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
    <Card className="overflow-hidden rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md">
      <CardContent className="p-0">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left Side */}
          <div>
            <div className="mb-4 flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-[#b85d38] dark:text-[#e07a5f]">
                <Icon className="h-6 w-6" />
              </div>

              <div>
                <h3 data-cursor="text" className="text-xl font-bold text-card-foreground">
                  {title}
                </h3>
                <p className="text-xs font-medium text-muted-foreground">{subtitle}</p>
              </div>
            </div>

            <p className="leading-relaxed text-xs text-muted-foreground md:text-sm">
              {description}
            </p>

            {subjects.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {subjects.map((subject) => (
                  <Badge
                    key={subject}
                    variant="secondary"
                    className="rounded-md border border-border/50 bg-secondary text-secondary-foreground px-2.5 py-0.5 text-[11px] font-medium"
                  >
                    {subject}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Right Side Stats */}
          <div className="grid grid-cols-2 gap-3">
            {progress.map((item) => (
              <div
                key={item.label}
                className="flex flex-col justify-center rounded-xl border border-border bg-secondary/40 p-3.5"
              >
                <div className="text-lg font-bold tracking-tight text-card-foreground">
                  {item.value}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
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
