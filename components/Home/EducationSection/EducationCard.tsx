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
    <Card className="overflow-hidden border border-border/60 bg-card/60 backdrop-blur-xl transition-all duration-500 hover:border-primary/30 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.25)]">
      <CardContent className="p-8 md:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left Side */}
          <div>
            <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-muted/40">
                <Icon className="h-7 w-7 text-primary" />
              </div>

              <div>
                <h3 data-cursor="text" className="text-2xl font-semibold">
                  {title}
                </h3>
                <p className="text-muted-foreground">{subtitle}</p>
              </div>
            </div>

            <p className="max-w-2xl leading-relaxed text-muted-foreground">
              {description}
            </p>

            {subjects.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {subjects.map((subject) => (
                  <Badge
                    key={subject}
                    variant="secondary"
                    className="rounded-full border border-border/50 bg-muted/40 px-3 py-1"
                  >
                    {subject}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Right Side Stats */}
          <div className="grid grid-cols-2 gap-4">
            {progress.map((item) => (
              <div
                key={item.label}
                className="flex flex-col justify-center rounded-2xl border border-border/60 bg-card/40 p-5"
              >
                <div className="text-2xl font-bold tracking-tight">
                  {item.value}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
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
