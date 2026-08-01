"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import { Card } from "@/components/pouf/surface"
import { Text } from "@/components/pouf/text"

interface LanguageDistributionProps {
  languages: Record<string, number>
  mode: "bytes" | "files"
}

const PALETTE = [
  "#c9a8ff",
  "#9ec8ff",
  "#a8f0d0",
  "#ffe58a",
  "#ffb3d1",
  "#ffb38a",
  "#3a2e5c",
  "#71609b",
]

const NAMED_COLORS: Record<string, string> = {
  TypeScript: "#c9a8ff",
  JavaScript: "#ffe58a",
  CSS: "#9ec8ff",
  HTML: "#ffb38a",
  Astro: "#ffb3d1",
  "C++": "#9ec8ff",
  C: "#c9a8ff",
  Python: "#a8f0d0",
  Rust: "#ffb3d1",
  GLSL: "#3a2e5c",
  Shell: "#ffb38a",
  Markdown: "#71609b",
}

function formatValue(mode: "bytes" | "files", value: number): string {
  if (mode === "bytes") {
    return value > 1024 ? `${(value / 1024).toFixed(1)} KB` : `${value} B`
  }
  return `${value} ${value === 1 ? "file" : "files"}`
}

function LangTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name?: string; value?: number; fill?: string }> }) {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="pouf-chart__tooltip">
      <div className="pouf-chart__tooltip__label">Languages</div>
      {payload
        .filter((entry) => entry.value)
        .map((entry) => (
          <div key={entry.name} className="pouf-chart__tooltip__item">
            <span className="pouf-chart__tooltip__swatch" style={{ background: entry.fill }} />
            <span>
              {entry.name} — {Number(entry.value).toFixed(1)}%
            </span>
          </div>
        ))}
    </div>
  )
}

export default function LanguageDistribution({
  languages,
  mode,
}: LanguageDistributionProps) {
  if (!languages || Object.keys(languages).length === 0) {
    return null
  }

  const total = Object.values(languages).reduce((a, b) => a + b, 0)
  if (total === 0) return null

  const langSorted = Object.entries(languages)
    .map(([name, value]) => ({
      name,
      value,
      percentage: (value / total) * 100,
    }))
    .sort((a, b) => b.value - a.value)

  const getLangColor = (name: string, index: number) =>
    NAMED_COLORS[name] || PALETTE[index % PALETTE.length]

  const chartData = [
    {
      name: "distribution",
      ...Object.fromEntries(
        langSorted.map((lang) => [lang.name, lang.percentage])
      ),
    },
  ]

  return (
    <Card>
      <div className="mb-(--s4) flex items-center justify-between gap-(--s3)">
        <Text size="sm" muted>
          Languages
        </Text>
        <Text size="sm" muted num>
          {langSorted.length} total
        </Text>
      </div>

      <div className="pouf-chart h-[120px] w-full">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <BarChart
            data={chartData}
            barCategoryGap={0}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="name" hide />
            <Tooltip cursor={false} content={<LangTooltip />} />
            {langSorted.map((lang, idx) => (
              <Bar
                key={lang.name}
                dataKey={lang.name}
                stackId="langs"
                fill={getLangColor(lang.name, idx)}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-(--s4) flex flex-wrap gap-x-(--s5) gap-y-(--s2)">
        {langSorted.map((lang, idx) => (
          <span key={lang.name} className="inline-flex items-center gap-2">
            <span
              className="h-[9px] w-[9px] flex-none rounded-[50%]"
              style={{ backgroundColor: getLangColor(lang.name, idx) }}
            />
            <Text size="sm">{lang.name}</Text>
            <Text size="sm" muted num>
              {lang.percentage.toFixed(1)}% ({formatValue(mode, lang.value)})
            </Text>
          </span>
        ))}
      </div>
    </Card>
  )
}
