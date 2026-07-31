"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect } from "react"
import { useTranslations } from "next-intl"

const linkHrefs = ["/ui", "/font-preview", "/illustration"]

export default function DungeonPage() {
  const t = useTranslations("Dungeon")
  useEffect(() => {
    document.title = "Dungeon | Navigation Hub"
  }, [])

  const rawLinks = t.raw("links") as { title: string; description: string }[]

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-6 pb-24 md:px-10">
      <header className="head-hang">
        <div className="head-hang__eyebrow">
          <span className="mono-label">Navigation</span>
        </div>
        <h1 className="head-hang__title">{t("title")}</h1>
        <p className="head-hang__body">{t("description")}</p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rawLinks.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <Link
              href={linkHrefs[index]}
              className="aurora-card group block h-full"
            >
              <span className="mono-label block mb-8">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="text-2xl font-semibold text-ink transition-colors duration-300 group-hover:text-cyan">
                {item.title}
              </h2>
              <p className="mt-3 font-serif text-ink-2">{item.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
