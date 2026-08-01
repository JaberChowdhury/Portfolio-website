"use client"

import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { buttonClasses } from "@/components/pouf/Button"
import type { IconName } from "@/components/pouf/Icon"
import { Dot } from "@/components/pouf/media"
import { Row } from "@/components/pouf/layout"
import { Stat } from "@/components/pouf/readout"
import { Eyebrow, Heading, Highlight, Text } from "@/components/pouf/text"
import type { Tone } from "@/components/pouf/tone"

const stats: { label: string; value: string; icon: IconName; tone: Tone }[] = [
  { label: "Problems Solved", value: "1500+", icon: "trophy", tone: "mint" },
  { label: "Tech Stack", value: "24", icon: "settings", tone: "blue" },
  { label: "Open Source", value: "8+", icon: "star", tone: "pink" },
]

export default function HeroSection() {
  const t = useTranslations("Hero")

  return (
    <section id="home" className="relative flex min-h-screen items-center">
      <div className="mx-auto w-full max-w-6xl px-6 py-28 md:px-10">
        <div className="flex flex-col gap-(--s6)">
          <Row gap={2}>
            <Dot tone="mint" />
            <Eyebrow>{t("available")}</Eyebrow>
          </Row>

          <div className="max-w-3xl">
            <Heading level={1}>
              Jaber <Highlight>Chowdhury</Highlight>
            </Heading>
          </div>

          <div className="max-w-xl">
            <Text muted>{t("description")}</Text>
          </div>

          <div className="grid w-full max-w-3xl grid-cols-1 gap-(--s3) sm:grid-cols-3">
            {stats.map((stat) => (
              <Stat key={stat.label} {...stat} />
            ))}
          </div>

          <Row gap={3} wrap>
            <Link
              href="/#projects"
              className={buttonClasses({ tone: "purple", size: "lg" })}
            >
              View projects
            </Link>
            <Link
              href="/#contact"
              className={buttonClasses({
                tone: "blue",
                size: "lg",
                variant: "quiet",
              })}
            >
              Contact
            </Link>
          </Row>

          <Row gap={3} wrap>
            <Text size="sm" muted>
              {t("tag1")}
            </Text>
            <Dot tone="yellow" />
            <Text size="sm" muted>
              {t("tag2")}
            </Text>
            <Dot tone="pink" />
            <Text size="sm" muted>
              {t("tag3")}
            </Text>
          </Row>
        </div>
      </div>
    </section>
  )
}
