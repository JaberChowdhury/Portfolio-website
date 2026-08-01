"use client"

import { motion } from "framer-motion"
import { useEffect } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { Icon } from "@/components/pouf/Icon"
import { Blob } from "@/components/pouf/media"
import { Row } from "@/components/pouf/layout"
import { Card } from "@/components/pouf/surface"
import { Eyebrow, Heading, Text } from "@/components/pouf/text"

const linkHrefs = ["/ui", "/font-preview", "/illustration"]
const linkIcons = ["menu", "wand", "photo"] as const

export default function DungeonPage() {
  const t = useTranslations("Dungeon")
  useEffect(() => {
    document.title = "Dungeon | Navigation Hub"
  }, [])

  const rawLinks = t.raw("links") as { title: string; description: string }[]

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-(--s5) pb-24 pt-28 md:px-(--s8)">
      <div className="flex flex-col gap-(--s4) mb-(--s6)">
        <Eyebrow>Navigation</Eyebrow>
        <Heading level={1}>{t("title")}</Heading>
        <Text muted>{t("description")}</Text>
      </div>

      <div className="grid grid-cols-1 gap-(--s4) md:grid-cols-2 lg:grid-cols-3">
        {rawLinks.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.08,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full [&_.pouf-card]:h-full"
          >
            <Link href={linkHrefs[index]} className="block h-full no-underline">
              <Card motion="lift">
                <div className="flex h-full flex-col gap-(--s4)">
                  <Row gap={3} justify="between">
                    <Blob size="md" tone="purple" icon={linkIcons[index]} />
                    <Text size="sm" muted num>
                      {String(index + 1).padStart(2, "0")}
                    </Text>
                  </Row>
                  <Heading level={3}>{item.title}</Heading>
                  <Text muted>{item.description}</Text>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
