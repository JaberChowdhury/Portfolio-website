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
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    CSS: "#563d7c",
    HTML: "#e34c26",
    Astro: "#ff5a03",
    "C++": "#f34b7d",
    C: "#555555",
    Python: "#3572A5",
    Rust: "#dea584",
    GLSL: "#5686a5",
    Shell: "#89e051",
    Markdown: "#083fa1",
  }

  const getLangColor = (name: string, index: number) => {
    if (langColors[name]) return langColors[name]
    const fallbackColors = [
      "#00E5E5",
      "#FF3366",
      "#FFCC00",
      "#00FF66",
      "#CC33FF",
      "#FF6600",
    ]
    return fallbackColors[index % fallbackColors.length]
  }

  return (
    <div className="w-full rounded-xl border border-border bg-muted/20 p-4 shadow-sm sm:p-6">
      <div className="mb-4 font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase sm:mb-6">
        LANGUAGES
      </div>

      {/* Stacked bar chart */}
      <div className="mb-4 flex h-2.5 w-full overflow-hidden rounded-sm border border-border bg-muted sm:mb-6 sm:h-3">
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
      <div className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-6 sm:gap-y-3">
        {langSorted.map((lang, idx) => {
          const formattedValue =
            mode === "bytes"
              ? lang.value > 1024
                ? `${(lang.value / 1024).toFixed(1)} KB`
                : `${lang.value} B`
              : `${lang.value} ${lang.value === 1 ? "file" : "files"}`

          return (
            <div key={lang.name} className="flex items-center gap-1.5 sm:gap-2">
              <div
                className="h-2 w-2 shrink-0 rounded-full sm:h-2.5 sm:w-2.5"
                style={{ backgroundColor: getLangColor(lang.name, idx) }}
              />
              <span className="font-mono text-[11px] font-bold text-foreground sm:text-xs">
                {lang.name}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground sm:text-xs">
                {lang.percentage.toFixed(1)}% ({formattedValue})
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
