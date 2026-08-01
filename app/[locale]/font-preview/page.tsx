"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { Button } from "@/components/pouf/Button"
import { Select } from "@/components/pouf/controls"
import { Field, Input, Textarea } from "@/components/pouf/Input"
import { Row, Stack } from "@/components/pouf/layout"
import { Card } from "@/components/pouf/surface"
import { Tabs } from "@/components/pouf/disclosure"
import { Eyebrow, Heading, Text } from "@/components/pouf/text"
import { pangrams } from "./data"
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

type FontPreviewTab = "compare" | "custom" | "system" | "playground" | "analysis"

const WEIGHTS = [100, 200, 300, 400, 500, 600, 700, 800, 900]

export default function FontPreviewPage() {
  const t = useTranslations("FontPreview")
  const [activeTab, setActiveTab] = useState<FontPreviewTab>("compare")

  const [fontSize, setFontSize] = useState(32)
  const [fontWeight, setFontWeight] = useState(400)
  const [sampleText, setSampleText] = useState(
    "The quick brown fox jumps over the lazy dog."
  )

  const tabs: Array<{
    value: FontPreviewTab
    label: string
    content: React.ReactNode
  }> = [
    {
      value: "compare",
      label: t("tabs.compare"),
      content: (
        <CompareTab
          fontSize={fontSize}
          fontWeight={fontWeight}
          sampleText={sampleText}
        />
      ),
    },
    {
      value: "custom",
      label: t("tabs.custom"),
      content: (
        <CustomFontsTab
          fontSize={fontSize}
          fontWeight={fontWeight}
          sampleText={sampleText}
        />
      ),
    },
    {
      value: "system",
      label: t("tabs.system"),
      content: (
        <SystemFontsTab
          fontSize={fontSize}
          fontWeight={fontWeight}
          sampleText={sampleText}
        />
      ),
    },
    {
      value: "playground",
      label: t("tabs.playground"),
      content: (
        <PlaygroundTab
          fontSize={fontSize}
          fontWeight={fontWeight}
          sampleText={sampleText}
        />
      ),
    },
    {
      value: "analysis",
      label: t("tabs.analysis"),
      content: (
        <AnalysisTab
          fontSize={fontSize}
          fontWeight={fontWeight}
          sampleText={sampleText}
        />
      ),
    },
  ]

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-(--s5) pb-24 pt-28 md:px-(--s8)">
      <div className="flex flex-col gap-(--s4) mb-(--s6)">
        <Eyebrow>Typography</Eyebrow>
        <div data-cursor="text">
          <Heading level={1}>{t("title")}</Heading>
        </div>
        <Text muted>{t("description")}</Text>
      </div>

      <Card>
        <div className="grid gap-(--s5) lg:grid-cols-3">
          <Field label={t("controls.sampleText")}>
            {(id) => (
              <Textarea
                id={id}
                value={sampleText}
                onChange={setSampleText}
                rows={3}
              />
            )}
          </Field>

          <div className="flex flex-col gap-(--s3)">
            <Row gap={3} justify="between">
              <Text size="sm" muted>
                {t("controls.fontSize")}
              </Text>
              <Text size="sm" muted num>
                {fontSize}px
              </Text>
            </Row>
            <input
              type="range"
              min={12}
              max={96}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="mt-auto w-full accent-purple"
            />
          </div>

          <Select
            label={t("controls.fontWeight")}
            value={String(fontWeight)}
            onChange={(value) => setFontWeight(Number(value))}
            options={WEIGHTS.map((w) => ({
              value: String(w),
              label: t(`weights.${w}`),
            }))}
          />
        </div>

        <div className="mt-(--s5) flex flex-wrap gap-(--s2)">
          {pangrams.map((pangram) => (
            <Button
              key={pangram}
              size="sm"
              variant="quiet"
              onClick={() => setSampleText(pangram)}
            >
              {t("controls.usePangram")}
            </Button>
          ))}
        </div>
      </Card>

      <div className="mt-(--s6)">
        <Tabs
          tabs={tabs}
          value={activeTab}
          onChange={(value) => setActiveTab(value as FontPreviewTab)}
        />
      </div>

      <div className="mt-(--s8)">
        <TypographyMetrics fontSize={fontSize} fontWeight={fontWeight} />
      </div>
    </div>
  )
}
