"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
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
    <Button
      variant={activeTab === value ? "default" : "secondary"}
      onClick={() => setActiveTab(value)}
      className="font-medium"
    >
      {label}
    </Button>
  )

  return (
    <div className="container mx-auto min-h-screen px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="mono-label mb-4 text-ink-2">Type Lab</p>
        <h1 className="text-4xl font-bold tracking-tight text-ink md:text-6xl">
          <span className="hl hl--cyan">{t("title")}</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-2">
          {t("description")}
        </p>
      </div>

      {/* Controls */}
      <div className="hum-card--plain mb-10 rounded-2xl p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm leading-none font-semibold tracking-tight text-ink">
              {t("controls.sampleText")}
            </label>
            <textarea
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              rows={3}
              className="flex w-full rounded-xl border border-border bg-paper px-3 py-2 text-sm text-ink shadow-sm placeholder:text-ink-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="flex justify-between text-sm leading-none font-semibold tracking-tight text-ink">
              <span>{t("controls.fontSize")}</span>
              <span className="text-ink-2">{fontSize}px</span>
            </label>
            <input
              type="range"
              min={12}
              max={96}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="mt-2 w-full accent-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm leading-none font-semibold tracking-tight text-ink">
              {t("controls.fontWeight")}
            </label>
            <select
              value={fontWeight}
              onChange={(e) => setFontWeight(Number(e.target.value))}
              className="flex h-9 w-full items-center justify-between rounded-xl border border-border bg-paper px-3 py-2 text-sm text-ink shadow-sm focus:ring-2 focus:ring-ring focus:outline-none"
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
            <Button
              key={pangram}
              variant="outline"
              size="sm"
              onClick={() => setSampleText(pangram)}
            >
              {t("controls.usePangram")}
            </Button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        <TabButton value="compare" label={t("tabs.compare")} />
        <TabButton value="custom" label={t("tabs.custom")} />
        <TabButton value="system" label={t("tabs.system")} />
        <TabButton value="playground" label={t("tabs.playground")} />
        <TabButton value="analysis" label={t("tabs.analysis")} />
      </div>

      {/* Dynamic Tabs Rendering */}
      <div className="hum-card--plain rounded-2xl p-6 md:p-8">
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
      </div>

      {/* Typography Metrics */}
      <TypographyMetrics fontSize={fontSize} fontWeight={fontWeight} />
    </div>
  )
}
