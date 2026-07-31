"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"
import { pangrams } from "./data"
import { useTranslations } from "next-intl"
import Loader from "./components/Loader"

const CompareTab = dynamic(() => import("./components/CompareTab"), {
  loading: () => <Loader />,
})
const CustomFontsTab = dynamic(() => import("./components/CustomFontsTab"), {
  loading: () => <Loader />,
})
const SystemFontsTab = dynamic(() => import("./components/SystemFontsTab"), {
  loading: () => <Loader />,
})
const PlaygroundTab = dynamic(() => import("./components/PlaygroundTab"), {
  loading: () => <Loader />,
})
const AnalysisTab = dynamic(() => import("./components/AnalysisTab"), {
  loading: () => <Loader />,
})
const TypographyMetrics = dynamic(
  () => import("./components/TypographyMetrics"),
  { loading: () => <Loader /> }
)

export default function FontPreviewPage() {
  const t = useTranslations("FontPreview")
  const [activeTab, setActiveTab] = useState<
    "compare" | "custom" | "system" | "playground" | "analysis"
  >("compare")

  const [fontSize, setFontSize] = useState(32)
  const [fontWeight, setFontWeight] = useState(400)
  const [sampleText, setSampleText] = useState(
    "The quick brown fox jumps over the lazy dog."
  )

  const TabButton = ({
    value,
    label,
  }: {
    value: typeof activeTab
    label: string
  }) => (
    <button
      onClick={() => setActiveTab(value)}
      className={`rounded-full px-5 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
        activeTab === value
          ? "bg-paper-3 text-cyan"
          : "text-ink-2 hover:bg-paper-2 hover:text-ink"
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-6 pb-24 md:px-10">
      <header className="head-hang">
        <div className="head-hang__eyebrow">
          <span className="mono-label">Typography</span>
        </div>
        <h1 data-cursor="text" className="head-hang__title">
          {t("title")}
        </h1>
        <p className="head-hang__body">{t("description")}</p>
      </header>

      {/* Controls */}
      <div className="aurora-card mb-12">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-3">
            <label className="mono-label block">{t("controls.sampleText")}</label>
            <textarea
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-xl border border-white/10 bg-paper px-4 py-3 font-serif text-ink placeholder:text-ink-2/50 focus:border-cyan/60 focus:outline-none"
            />
          </div>

          <div className="space-y-3">
            <label className="mono-label flex justify-between">
              <span>{t("controls.fontSize")}</span>
              <span className="text-ink-2">{fontSize}px</span>
            </label>
            <input
              type="range"
              min={12}
              max={96}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="mt-2 w-full accent-cyan"
            />
          </div>

          <div className="space-y-3">
            <label className="mono-label block">{t("controls.fontWeight")}</label>
            <select
              value={fontWeight}
              onChange={(e) => setFontWeight(Number(e.target.value))}
              className="h-10 w-full rounded-xl border border-white/10 bg-paper px-4 text-ink focus:border-cyan/60 focus:outline-none"
            >
              <option value={100}>{t("weights.100")}</option>
              <option value={200}>{t("weights.200")}</option>
              <option value={300}>{t("weights.300")}</option>
              <option value={400}>{t("weights.400")}</option>
              <option value={500}>{t("weights.500")}</option>
              <option value={600}>{t("weights.600")}</option>
              <option value={700}>{t("weights.700")}</option>
              <option value={800}>{t("weights.800")}</option>
              <option value={900}>{t("weights.900")}</option>
            </select>
          </div>
        </div>

        {/* Pangrams */}
        <div className="mt-6 flex flex-wrap gap-2">
          {pangrams.map((pangram) => (
            <button
              key={pangram}
              onClick={() => setSampleText(pangram)}
              className="rounded-full border border-white/10 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-ink-2 transition-colors hover:border-cyan/50 hover:text-cyan"
            >
              {t("controls.usePangram")}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        <TabButton value="compare" label={t("tabs.compare")} />
        <TabButton value="custom" label={t("tabs.custom")} />
        <TabButton value="system" label={t("tabs.system")} />
        <TabButton value="playground" label={t("tabs.playground")} />
        <TabButton value="analysis" label={t("tabs.analysis")} />
      </div>

      {/* Dynamic Tabs Rendering */}
      {activeTab === "compare" && (
        <CompareTab
          fontSize={fontSize}
          fontWeight={fontWeight}
          sampleText={sampleText}
        />
      )}
      {activeTab === "custom" && (
        <CustomFontsTab
          fontSize={fontSize}
          fontWeight={fontWeight}
          sampleText={sampleText}
        />
      )}
      {activeTab === "system" && (
        <SystemFontsTab
          fontSize={fontSize}
          fontWeight={fontWeight}
          sampleText={sampleText}
        />
      )}
      {activeTab === "playground" && (
        <PlaygroundTab
          fontSize={fontSize}
          fontWeight={fontWeight}
          sampleText={sampleText}
        />
      )}
      {activeTab === "analysis" && (
        <AnalysisTab
          fontSize={fontSize}
          fontWeight={fontWeight}
          sampleText={sampleText}
        />
      )}

      {/* Typography Metrics */}
      <TypographyMetrics fontSize={fontSize} fontWeight={fontWeight} />
    </div>
  )
}
