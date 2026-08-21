"use client"

import { useState } from "react"

interface WeeklyActivityChartProps {
  weeklyActivity: number[]
}

export default function WeeklyActivityChart({
  weeklyActivity,
}: WeeklyActivityChartProps) {
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null)

  const activity = weeklyActivity || []
  if (activity.length === 0) return null

  const maxCommits = Math.max(...activity, 1)
  const totalCommits = activity.reduce((a, b) => a + b, 0)

  const getWeekDateRange = (weekIndex: number) => {
    const today = new Date()
    const daysAgoStart = (51 - weekIndex) * 7
    const startOfWeek = new Date(
      today.getTime() - daysAgoStart * 24 * 60 * 60 * 1000
    )
    const dayOfWeek = startOfWeek.getDay()
    const monday = new Date(
      startOfWeek.getTime() -
        (dayOfWeek === 0 ? 6 : dayOfWeek - 1) * 24 * 60 * 60 * 1000
    )
    const sunday = new Date(monday.getTime() + 6 * 24 * 60 * 60 * 1000)

    const formatWeekDate = (d: Date) => {
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    }

    return `${formatWeekDate(monday)} – ${formatWeekDate(sunday)}`
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-muted/20 p-4 shadow-sm sm:p-6">
      <div className="mb-3 flex items-start justify-between sm:mb-4">
        <div className="font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase">
          WEEKLY ACTIVITY
        </div>
        <div className="rounded-sm bg-primary px-2 py-0.5 font-mono text-[11px] font-bold text-primary-foreground sm:py-1 sm:text-xs">
          {totalCommits} commits
        </div>
      </div>

      <div
        className={`mb-4 h-5 truncate font-mono text-[11px] sm:mb-6 sm:text-xs ${hoveredWeek !== null ? "font-bold text-primary" : "text-muted-foreground"}`}
      >
        {hoveredWeek !== null
          ? `${getWeekDateRange(hoveredWeek)}: ${activity[hoveredWeek]} ${activity[hoveredWeek] === 1 ? "commit" : "commits"}`
          : "Hover/tap bars for details"}
      </div>

      <div className="relative w-full overflow-hidden">
        <svg
          viewBox="0 0 520 100"
          width="100%"
          height="100"
          style={{ overflow: "visible", display: "block" }}
          role="img"
        >
          <title>Weekly Commit Activity Chart</title>

          <line
            x1="0"
            y1="0"
            x2="520"
            y2="0"
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeDasharray="3,3"
          />
          <line
            x1="0"
            y1="50"
            x2="520"
            y2="50"
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeDasharray="3,3"
          />
          <line
            x1="0"
            y1="100"
            x2="520"
            y2="100"
            stroke="currentColor"
            strokeOpacity="0.2"
          />

          {activity.map((commits, idx) => {
            const barWidth = 7
            const spacing = 3
            const x = idx * (barWidth + spacing)
            const barHeight = maxCommits > 0 ? (commits / maxCommits) * 90 : 0
            const y = 100 - barHeight

            const isHovered = hoveredWeek === idx
            let fill = "currentColor"
            let opacity = 0.15

            if (commits > 0) {
              fill = "hsl(var(--primary))"
              opacity = isHovered ? 1 : 0.65
            } else if (isHovered) {
              opacity = 0.4
            }

            return (
              <rect
                key={idx}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight || 3}
                fill={fill}
                style={{
                  opacity,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={() => setHoveredWeek(idx)}
                onMouseLeave={() => setHoveredWeek(null)}
              />
            )
          })}
        </svg>

        <div className="mt-3 flex justify-between font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
          <span>1 year ago</span>
          <span>Today</span>
        </div>
      </div>
    </div>
  )
}
