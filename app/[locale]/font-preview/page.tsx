"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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

type TabType = "compare" | "custom" | "system" | "playground" | "analysis"

function TabButton({
  value,
  label,
  activeTab,
  onSelect,
}: {
  value: TabType
  label: string
  activeTab: TabType
  onSelect: (value: TabType) => void
}) {
  return (
    <Button
      variant={activeTab === value ? "default" : "secondary"}
      onClick={() => onSelect(value)}
      className="h-9 px-3 py-1.5 text-xs font-medium sm:text-sm"
    >
      {label}
    </Button>
  )
}

export default function FontPreviewPage() {
  const t = useTranslations("FontPreview")
  const [activeTab, setActiveTab] = useState<TabType>("compare")

  const [fontSize, setFontSize] = useState(32)
  const [fontWeight, setFontWeight] = useState(400)
  const [sampleText, setSampleText] = useState(
    "The quick brown fox jumps over the lazy dog."
  )

  return (
    <div className="container mx-auto min-h-screen max-w-7xl px-4 pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32">
      {/* Header */}
      <div className="mb-8 sm:mb-10">
        <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {t("title")}
        </h1>
        <p className="text-xs text-muted-foreground sm:text-sm md:text-lg">
          {t("description")}
        </p>
      </div>

      {/* Controls */}
      <Card className="mb-8 rounded-2xl p-4 shadow-sm sm:mb-10 sm:p-6">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          <div className="space-y-2">
            <label className="text-xs leading-none font-semibold tracking-tight sm:text-sm">
              {t("controls.sampleText")}
            </label>
            <textarea
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              rows={3}
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none sm:text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="flex justify-between text-xs leading-none font-semibold tracking-tight sm:text-sm">
              <span>{t("controls.fontSize")}</span>
              <span className="text-muted-foreground">{fontSize}px</span>
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
            <label className="text-xs leading-none font-semibold tracking-tight sm:text-sm">
              {t("controls.fontWeight")}
            </label>
            <select
              value={fontWeight}
              onChange={(e) => setFontWeight(Number(e.target.value))}
              className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-xs shadow-sm ring-offset-background focus:ring-1 focus:ring-ring focus:outline-none sm:text-sm"
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
        <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-6 sm:gap-2">
          {pangrams.map((pangram) => (
            <Button
              key={pangram}
              variant="outline"
              size="sm"
              onClick={() => setSampleText(pangram)}
              className="h-8 text-xs"
            >
              {t("controls.usePangram")}
            </Button>
          ))}
        </div>
      </Card>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-1.5 sm:mb-8 sm:gap-2">
        <TabButton
          value="compare"
          label={t("tabs.compare")}
          activeTab={activeTab}
          onSelect={setActiveTab}
        />
        <TabButton
          value="custom"
          label={t("tabs.custom")}
          activeTab={activeTab}
          onSelect={setActiveTab}
        />
        <TabButton
          value="system"
          label={t("tabs.system")}
          activeTab={activeTab}
          onSelect={setActiveTab}
        />
        <TabButton
          value="playground"
          label={t("tabs.playground")}
          activeTab={activeTab}
          onSelect={setActiveTab}
        />
        <TabButton
          value="analysis"
          label={t("tabs.analysis")}
          activeTab={activeTab}
          onSelect={setActiveTab}
        />
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
