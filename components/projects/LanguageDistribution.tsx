"use client"

import { motion } from "framer-motion"

interface LanguageDistributionProps {
  languages: Record<string, number>
  mode: "bytes" | "files"
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
    .map(([name, val]) => ({
      name,
      value: val,
      percentage: (val / total) * 100,
    }))
    .sort((a, b) => b.value - a.value)

  const langColors: Record<string, string> = {
    TypeScript: "oklch(72% 0.12 225)",
    JavaScript: "oklch(78% 0.11 200)",
    CSS: "oklch(64% 0.12 205)",
    HTML: "oklch(80% 0.09 180)",
    Astro: "oklch(58% 0.13 235)",
    "C++": "oklch(70% 0.12 190)",
    C: "oklch(82% 0.08 210)",
    Python: "oklch(66% 0.12 215)",
    Rust: "oklch(76% 0.11 195)",
    GLSL: "oklch(60% 0.13 245)",
    Shell: "oklch(85% 0.07 200)",
    Markdown: "oklch(55% 0.14 240)",
  }

  const getLangColor = (name: string, index: number) => {
    if (langColors[name]) return langColors[name]
    const fallbackColors = [
      "oklch(80% 0.11 200)",
      "oklch(70% 0.13 225)",
      "oklch(85% 0.08 190)",
      "oklch(75% 0.12 180)",
      "oklch(60% 0.14 240)",
      "oklch(68% 0.12 210)",
    ]
    return fallbackColors[index % fallbackColors.length]
  }

  return (
    <div className="w-full rounded-2xl bg-paper-2 p-6">
      <div className="mono-label mb-6">Languages</div>

      {/* Stacked bar chart */}
      <div className="mb-6 flex h-3 w-full overflow-hidden rounded-full bg-paper">
        {langSorted.map((lang, idx) => (
          <motion.div
            key={lang.name}
            initial={{ width: 0 }}
            animate={{ width: `${lang.percentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.1 }}
            style={{
              height: "100%",
              backgroundColor: getLangColor(lang.name, idx),
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {langSorted.map((lang, idx) => {
          const formattedValue =
            mode === "bytes"
              ? lang.value > 1024
                ? `${(lang.value / 1024).toFixed(1)} KB`
                : `${lang.value} B`
              : `${lang.value} ${lang.value === 1 ? "file" : "files"}`

          return (
            <div key={lang.name} className="flex items-baseline gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: getLangColor(lang.name, idx) }}
              />
              <span className="font-mono text-xs font-bold text-ink">
                {lang.name}
              </span>
              <span className="font-mono text-xs text-ink-2">
                {lang.percentage.toFixed(1)}% ({formattedValue})
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
