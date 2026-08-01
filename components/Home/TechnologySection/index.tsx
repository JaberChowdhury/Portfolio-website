"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Blob } from "@/components/pouf/media"
import { Progress } from "@/components/pouf/progress"
import { Card } from "@/components/pouf/surface"
import { Eyebrow, Heading, Highlight, Text } from "@/components/pouf/text"
import { TECH_STACK_DATA } from "./techdata"

export default function TechnologySection() {
  const t = useTranslations("Technology")
  const reduceMotion = useReducedMotion()

  return (
    <section id="technology" className="relative w-full pb-[clamp(4rem,10vw,7.5rem)]">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="max-w-2xl">
          <Eyebrow>01 · {t("eyebrow")}</Eyebrow>
          <Heading level={2}>
            {t("title1")}
            <Highlight>{t("title2")}</Highlight>
          </Heading>
          <div className="mt-(--s3)">
            <Text muted>{t("description")}</Text>
          </div>
        </div>

        <motion.div
          className="mt-(--s7) grid grid-cols-2 gap-(--s3) sm:grid-cols-3 lg:grid-cols-4"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {TECH_STACK_DATA.map((tech) => (
            <Card key={tech.id} variant="tight" motion="lift">
              <div className="flex flex-col items-start gap-(--s3)">
                <Blob icon={tech.icon} tone={tech.tone} size="sm" />
                <Heading level={3}>{tech.label}</Heading>
                <Progress value={tech.value} tone={tech.tone} />
              </div>
            </Card>
          ))}
        </motion.div>

        <div className="mt-(--s8) text-center">
          <Text muted size="sm" mono>
            {t("backgroundText")}
          </Text>
        </div>
      </div>
    </section>
  )
}
