"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ButtonShowcase from "@/components/showcases/ButtonShowcase"
import BadgeShowcase from "@/components/showcases/BadgeShowcase"
import CardShowcase from "@/components/showcases/CardShowcase"
import { Layers } from "lucide-react"

const TABS = [
  { id: "button", label: "Button", component: ButtonShowcase },
  { id: "badge", label: "Badge", component: BadgeShowcase },
  { id: "card", label: "Card", component: CardShowcase },
] as const

export default function UIPage() {
  const [activeTab, setActiveTab] = useState<string>(TABS[0].id)

  return (
    <div className="container mx-auto min-h-screen px-4 py-20">
      <div className="mb-12">
        <h1 className="mb-4 flex items-center gap-3 text-4xl font-bold tracking-tight">
          <Layers className="size-10 text-primary" />
          Design System
        </h1>
        <p className="text-xl text-muted-foreground">
          A comprehensive showcase of all UI components, variants, and configurations used in the project.
        </p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
        {/* Navigation Sidebar */}
        <aside className="md:sticky md:top-24 md:w-64 shrink-0">
          <nav className="flex flex-row space-x-2 overflow-x-auto pb-4 md:flex-col md:space-x-0 md:space-y-2 md:pb-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex px-4 py-3 text-sm font-medium transition-colors md:rounded-lg ${
                  activeTab === tab.id
                    ? "text-primary"
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
                <span className="relative z-10">{tab.label}</span>
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
