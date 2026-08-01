"use client"

import { useMemo, useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts"
import { Segmented } from "@/components/pouf/Segmented"
import { Card } from "@/components/pouf/surface"
import { Text } from "@/components/pouf/text"
import type { SegmentedOption } from "@/components/pouf/Segmented"

interface WeeklyActivityChartProps {
  weeklyActivity: number[]
}

const PURPLE = "#c9a8ff"
const MINT = "#a8f0d0"

type ChartType = "area" | "bar"

function getWeekDateRange(weekIndex: number) {
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

  const formatWeekDate = (d: Date) =>
    d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })

  return `${formatWeekDate(monday)} – ${formatWeekDate(sunday)}`
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ name?: string; value?: number; color?: string }>
}) {
  if (!active || !payload || payload.length === 0) return null
  const entry = payload[0]
  return (
    <div className="pouf-chart__tooltip">
      <div className="pouf-chart__tooltip__label">Weekly Activity</div>
      <div className="pouf-chart__tooltip__item">
        <span
          className="pouf-chart__tooltip__swatch"
          style={{ background: entry.color }}
        />
        <span>
          {entry.name}: {entry.value} {entry.value === 1 ? "commit" : "commits"}
        </span>
      </div>
    </div>
  )
}

export default function WeeklyActivityChart({
  weeklyActivity,
}: WeeklyActivityChartProps) {
  const [chartType, setChartType] = useState<ChartType>("area")

  const activity = weeklyActivity || []
  if (activity.length === 0) return null

  const totalCommits = activity.reduce((a, b) => a + b, 0)

  const chartData = useMemo(
    () => activity.map((commits, i) => ({ week: i, commits })),
    [activity]
  )

  const options: SegmentedOption<ChartType>[] = [
    { value: "area", label: "Area" },
    { value: "bar", label: "Bar" },
  ]

  return (
    <Card>
      <div className="mb-(--s4) flex flex-wrap items-center justify-between gap-(--s3)">
        <Text size="sm" muted>
          Weekly Activity
        </Text>
        <div className="flex flex-wrap items-center gap-(--s3)">
          <span className="inline-flex items-center gap-2">
            <Text size="sm" muted num>
              {totalCommits} commits
            </Text>
          </span>
          <Segmented<ChartType>
            label="Chart type"
            options={options}
            value={chartType}
            onChange={setChartType}
          />
        </div>
      </div>

      <div className="pouf-chart h-[160px] w-full">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          {chartType === "area" ? (
            <AreaChart
              data={chartData}
              margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="week" hide />
              <Tooltip cursor={false} content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="commits"
                stroke={PURPLE}
                strokeWidth={2}
                fill={PURPLE}
                fillOpacity={0.4}
                activeDot={{ r: 4, fill: PURPLE, stroke: MINT, strokeWidth: 2 }}
              />
            </AreaChart>
          ) : (
            <BarChart
              data={chartData}
              margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="week" hide />
              <Tooltip cursor={false} content={<ChartTooltip />} />
              <Bar dataKey="commits" fill={MINT} radius={[6, 6, 6, 6]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
