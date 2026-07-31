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
    <div className="mx-auto min-h-screen max-w-6xl px-6 pb-24 md:px-10">
      <header className="head-hang">
        <div className="head-hang__eyebrow">
          <span className="mono-label">Components</span>
        </div>
        <h1 data-cursor="text" className="head-hang__title">
          {t("title")}
        </h1>
        <p className="head-hang__body">{t("description")}</p>
      </header>

      <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-12">
        {/* Navigation Sidebar */}
        <aside className="shrink-0 md:sticky md:top-24 md:w-56">
          <nav className="flex flex-row overflow-x-auto pb-4 md:flex-col md:pb-0">
            {TABS.map((tab, i) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex shrink-0 items-baseline gap-3 px-4 py-3 text-sm transition-colors ${
                    isActive
                      ? "text-cyan"
                      : "text-ink-2 hover:text-ink"
                  }`}
                >
                  <span
                    className={`mono-label ${isActive ? "opacity-100" : "opacity-40"}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={isActive ? "font-semibold" : "font-medium"}>
                    {t(`tabs.${tab.id}` as any)}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="active-tab-indicator"
                      className="absolute inset-0 -z-10 rounded-full bg-paper-3"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="min-w-0 flex-1">
          <AnimatePresence mode="wait">
            {TABS.map(
              (tab) =>
                activeTab === tab.id && (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
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
