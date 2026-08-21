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
    <div className="container mx-auto min-h-screen max-w-7xl px-4 pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32">
      <div className="mb-8 sm:mb-12">
        <h1
          data-cursor="text"
          className="mb-2 flex items-center gap-2.5 text-2xl font-bold tracking-tight sm:mb-4 sm:gap-3 sm:text-4xl"
        >
          <Layers className="size-7 shrink-0 text-primary sm:size-10" />
          {t("title")}
        </h1>
        <p className="text-xs text-muted-foreground sm:text-sm md:text-lg">
          {t("description")}
        </p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
        {/* Navigation Sidebar */}
        <aside className="shrink-0 md:sticky md:top-24 md:w-56 lg:w-64">
          <nav className="scrollbar-hide flex flex-row gap-1.5 overflow-x-auto pb-2 sm:gap-2 md:flex-col md:gap-2 md:pb-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex shrink-0 cursor-pointer items-center rounded-lg px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-colors sm:px-4 sm:py-2.5 sm:text-sm ${
                  activeTab === tab.id
                    ? "font-semibold text-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute inset-0 z-0 rounded-lg bg-primary/10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {t(`tabs.${tab.id}` as `tabs.${(typeof TABS)[number]["id"]}`)}
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
