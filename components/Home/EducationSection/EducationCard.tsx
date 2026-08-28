import { GraduationCap, type LucideIcon } from "lucide-react"

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
    <div className="hum-card group overflow-hidden rounded-2xl border border-border/80 p-4 sm:p-5 md:p-6">
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Left Side: Program Overview & Coursework */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="mb-3 flex items-start gap-3 sm:mb-3.5 sm:gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--color-lavender)]/20 bg-[var(--color-lavender)]/10 text-[var(--color-lavender-deep)] transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11 dark:text-[var(--color-lavender)]">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <div className="min-w-0 flex-1">
                <h3
                  data-cursor="text"
                  className="text-base font-bold break-words text-card-foreground sm:text-lg md:text-xl"
                >
                  {title}
                </h3>
                <p className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-muted-foreground md:text-sm">
                  <span className="hum-dot hum-dot--lavender shrink-0" />
                  <span className="break-words">{subtitle}</span>
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
              {description}
            </p>
          </div>

          {subjects.length > 0 && (
            <div className="mt-3.5 border-t border-border/70 pt-3 sm:mt-4">
              <div className="mono-label mb-2 text-[10px] sm:text-xs">
                Core Coursework
              </div>
              <div className="flex flex-wrap gap-1.5">
                {subjects.map((subject) => (
                  <span
                    key={subject}
                    className="inline-flex items-center rounded-full border border-[var(--color-lavender)]/20 bg-[var(--color-lavender)]/8 px-2.5 py-0.5 font-mono text-[11px] font-medium text-[var(--color-lavender-deep)] transition-all duration-200 hover:scale-105 hover:bg-[var(--color-lavender)]/15 sm:text-xs dark:text-[var(--color-lavender)]"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Progress Metric Chips */}
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
          {progress.map((item, i) => {
            const bandClass =
              i % 4 === 0
                ? "hum-band-pear"
                : i % 4 === 1
                  ? "hum-band-cyan"
                  : i % 4 === 2
                    ? "hum-band-coral"
                    : "hum-band-mint"
            return (
              <div
                key={item.label}
                className={`flex flex-col justify-center rounded-xl border border-border/40 p-2.5 transition-colors sm:rounded-2xl sm:p-3 ${bandClass}`}
              >
                <div className="font-mono text-xs font-bold tracking-tight break-words text-card-foreground sm:text-base md:text-lg">
                  {item.value}
                </div>
                <p className="mt-0.5 font-mono text-[10px] break-words text-muted-foreground sm:text-[11px]">
                  {item.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
