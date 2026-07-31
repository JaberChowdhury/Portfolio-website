"use client"

import {
  Component,
  Image as ImageIcon,
  Type,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

const dungeonLinks = [
  {
    title: "UI Elements",
    description: "Explore the custom Shadcn and Tailwind component library.",
    href: "/ui",
    icon: Component,
    color: "text-blue-500",
  },
  {
    title: "Typography",
    description: "Preview custom fonts Marlin and ABC Favorit Mono.",
    href: "/font-preview",
    icon: Type,
    color: "text-rose-500",
  },
  {
    title: "Illustrations",
    description: "Character gallery and SVG assets dictionary.",
    href: "/illustration",
    icon: ImageIcon,
    color: "text-emerald-500",
  },
]

export default function DungeonPage() {
  const t = useTranslations("Dungeon")
  useEffect(() => {
    document.title = "Dungeon | Navigation Hub"
  }, [])

  const rawLinks = t.raw("links") as { title: string; description: string }[]
  const linkIcons = [Component, Type, ImageIcon]
  const linkColors = ["text-pear-deep", "text-cyan-deep", "text-mint-deep"]
  const linkTiles = ["hum-card--pear", "hum-card--cyan", "hum-card--mint"]
  const linkHrefs = ["/ui", "/font-preview", "/illustration"]

  const links = rawLinks.map((link, i) => ({
    ...link,
    icon: linkIcons[i],
    color: linkColors[i],
    tile: linkTiles[i],
    href: linkHrefs[i],
  }))

  return (
    <div className="container mx-auto min-h-screen px-4 pt-24 pb-20 md:pt-32">
      {/* Header Section */}
      <div className="mb-12 max-w-3xl md:mb-20">
        <p className="mono-label mb-4 text-ink-2">Navigation Hub</p>
        <h1 className="text-5xl font-bold tracking-tight text-ink md:text-7xl">
          <span className="hl hl--pear">{t("title")}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-xl">
          {t("description")}
        </p>
      </div>

      {/* Grid Navigation */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {links.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="h-full"
            >
              <Link
                href={item.href}
                className="group block h-full outline-none"
              >
                <div
                  className={`hum-card ${item.tile} relative flex h-full w-full flex-col gap-6 p-6 md:p-8`}
                >
                  {/* Subtle noise pattern overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    }}
                  />

                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-paper-2/80 transition-transform duration-300 group-hover:scale-110">
                    <Icon className={`h-6 w-6 ${item.color}`} />
                  </div>

                  <div className="relative z-10 flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <ArrowRight className="h-5 w-5 shrink-0 -translate-x-4 text-cyan opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>

                  <p className="relative z-10 text-base leading-relaxed text-ink-2">
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
