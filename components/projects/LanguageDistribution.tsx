"use client";

import { motion } from "framer-motion";

interface LanguageDistributionProps {
  languages: Record<string, number>;
  mode: "bytes" | "files";
}

export default function LanguageDistribution({
  languages,
  mode,
}: LanguageDistributionProps) {
  if (!languages || Object.keys(languages).length === 0) {
    return null;
  }

  const total = Object.values(languages).reduce((a, b) => a + b, 0);
  if (total === 0) return null;

  const langSorted = Object.entries(languages)
    .map(([name, val]) => ({
      name,
      value: val,
      percentage: (val / total) * 100,
    }))
    .sort((a, b) => b.value - a.value);

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
  };

  const getLangColor = (name: string, index: number) => {
    if (langColors[name]) return langColors[name];
    const fallbackColors = [
      "#00E5E5", "#FF3366", "#FFCC00", "#00FF66", "#CC33FF", "#FF6600",
    ];
    return fallbackColors[index % fallbackColors.length];
  };

  return (
    <div className="w-full bg-muted/20 border border-border p-6 shadow-sm">
      <div className="font-mono text-xs font-bold tracking-widest uppercase text-muted-foreground mb-6">
        LANGUAGES
      </div>

      {/* Stacked bar chart */}
      <div className="h-3 flex w-full bg-muted border border-border mb-6 overflow-hidden rounded-sm">
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
              : `${lang.value} ${lang.value === 1 ? "file" : "files"}`;

          return (
            <div key={lang.name} className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: getLangColor(lang.name, idx) }}
              />
              <span className="font-mono text-xs font-bold text-foreground">
                {lang.name}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {lang.percentage.toFixed(1)}% ({formattedValue})
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
