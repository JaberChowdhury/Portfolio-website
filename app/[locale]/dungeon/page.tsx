"use client"

import ParticleText from "@/components/ParticleText"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { motion } from "framer-motion"
import { Component, Image as ImageIcon, Type, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useTranslations } from "next-intl"

export default function DungeonPage() {
  const t = useTranslations("Dungeon")
  useEffect(() => {
    document.title = "Dungeon | Navigation Hub"
  }, [])

  const rawLinks = t.raw("links") as { title: string; description: string }[]
  const linkIcons = [Component, Type, ImageIcon]
  const linkColors = ["text-blue-500", "text-rose-500", "text-emerald-500"]
  const linkHrefs = ["/ui", "/font-preview", "/illustration"]

  const links = rawLinks.map((link, i) => ({
    ...link,
    icon: linkIcons[i],
    color: linkColors[i],
    href: linkHrefs[i],
  }))

  return (
    <div className="container mx-auto min-h-screen max-w-6xl px-4 pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32">
      {/* Header Section */}
      <div className="mb-8 sm:mb-12 md:mb-16">
        <div className="relative mb-4 h-[80px] w-full overflow-hidden sm:mb-6 sm:h-[120px] md:h-[180px]">
          <ParticleText
            text={t("title")}
            colorStart="hsl(var(--destructive))"
            colorEnd="hsl(var(--primary))"
            canvasWidth={3400}
            canvasHeight={3400}
            fontSize={400}
            fontWeight={900}
            particleSize={0.4}
          />
        </div>
        <p className="max-w-2xl font-mono text-sm tracking-tight text-muted-foreground sm:text-base md:text-lg">
          {t("description")}
        </p>
      </div>

      {/* Grid Navigation */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {links.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Link
                href={item.href}
                className="group block h-full outline-none"
              >
                <Card className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 group-hover:border-primary group-hover:shadow-[6px_6px_0px_0px_hsl(var(--primary))] active:scale-[0.99] sm:p-6">
                  {/* Subtle noise pattern overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    }}
                  />

                  <div className="relative z-10">
                    <CardHeader className="p-0">
                      <div className="mb-3.5 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted/50 transition-transform duration-300 group-hover:scale-110 sm:mb-4 sm:h-12 sm:w-12">
                        <Icon
                          className={`h-5 w-5 sm:h-6 sm:w-6 ${item.color}`}
                        />
                      </div>
                      <CardTitle className="flex items-center justify-between text-lg font-bold tracking-tight transition-colors group-hover:text-primary sm:text-xl">
                        {item.title}
                        <ArrowRight className="h-4 w-4 -translate-x-3 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:h-5 sm:w-5" />
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="mt-2 p-0">
                      <CardDescription className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
