"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ButtonShowcase from "@/components/showcases/ButtonShowcase"
import BadgeShowcase from "@/components/showcases/BadgeShowcase"
import CardShowcase from "@/components/showcases/CardShowcase"
import AvatarShowcase from "@/components/showcases/AvatarShowcase"
import InputShowcase from "@/components/showcases/InputShowcase"
import TabsShowcase from "@/components/showcases/TabsShowcase"
import SelectShowcase from "@/components/showcases/SelectShowcase"
import EffectsShowcase from "@/components/showcases/EffectsShowcase"
import { Layers } from "lucide-react"
import { useTranslations } from "next-intl"
import FontPreviewPage from "../font-preview/page"

const TABS = [
  { id: "button", label: "Button", component: ButtonShowcase },
  { id: "badge", label: "Badge", component: BadgeShowcase },
  { id: "card", label: "Card", component: CardShowcase },
  { id: "avatar", label: "Avatar", component: AvatarShowcase },
  { id: "input", label: "Input", component: InputShowcase },
  { id: "tabs", label: "Tabs", component: TabsShowcase },
  { id: "select", label: "Select", component: SelectShowcase },
  { id: "effects", label: "Effects", component: EffectsShowcase },
  { id: "font", label: "Font Preview", component: FontPreviewPage },
] as const

export default function UIPage() {
  const t = useTranslations("UI")
  const [activeTab, setActiveTab] = useState<string>(TABS[0].id)

  return (
    <div className="container mx-auto min-h-screen px-4 py-20">
      <div className="mb-12">
        <p className="mono-label mb-4 text-ink-2">Component Workbench</p>
        <h1
          data-cursor="text"
          className="flex flex-wrap items-center gap-4 text-4xl font-bold tracking-tight text-ink md:text-5xl"
        >
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Layers className="size-6" />
          </span>
          <span className="hl hl--pear">{t("title")}</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-2 md:text-xl">
          {t("description")}
        </p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
        {/* Navigation Sidebar */}
        <aside className="shrink-0 md:sticky md:top-24 md:w-64">
          <nav className="flex flex-row gap-2 overflow-x-auto pb-4 md:flex-col md:gap-2 md:pb-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex shrink-0 items-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "text-primary-foreground"
                    : "text-ink-2 hover:bg-paper-3 hover:text-ink"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute inset-0 z-0 rounded-full bg-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {t(`tabs.${tab.id}` as any)}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {TABS.map(
              (tab) =>
                activeTab === tab.id && (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-2xl bg-paper-2 p-6 md:p-8"
                  >
                    <tab.component />
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
