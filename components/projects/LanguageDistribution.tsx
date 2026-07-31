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
    TypeScript: "var(--cyan)",
    JavaScript: "var(--pear)",
    CSS: "var(--lavender)",
    HTML: "var(--mint)",
    Astro: "var(--coral)",
    "C++": "var(--coral)",
    C: "var(--cyan)",
    Python: "var(--pear)",
    Rust: "var(--coral)",
    GLSL: "var(--cyan)",
    Shell: "var(--mint)",
    Markdown: "var(--lavender)",
  }

  const getLangColor = (name: string, index: number) => {
    if (langColors[name]) return langColors[name]
    const fallbackColors = [
      "var(--pear)",
      "var(--cyan)",
      "var(--coral)",
      "var(--mint)",
      "var(--lavender)",
    ]
    return fallbackColors[index % fallbackColors.length]
  }

  return (
    <div className="hum-card--plain w-full rounded-2xl p-6 md:p-8">
      <div className="mono-label mb-6 text-muted-foreground">LANGUAGES</div>

      {/* Stacked bar chart */}
      <div className="mb-6 flex h-3 w-full overflow-hidden rounded-full bg-paper-3">
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
            <div key={lang.name} className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: getLangColor(lang.name, idx) }}
              />
              <span className="font-mono text-xs font-bold text-foreground">
                {lang.name}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {lang.percentage.toFixed(1)}% ({formattedValue})
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
