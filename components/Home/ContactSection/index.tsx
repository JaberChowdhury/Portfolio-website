"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  AArrowDown as Github,
  AArrowUp as Linkedin,
  Mail,
  ArrowUpRight,
  Trophy,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const item = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const socialTints = [
  { card: "hum-card--pear", icon: "text-pear-deep", tile: "bg-pear/15" },
  { card: "hum-card--cyan", icon: "text-cyan-deep", tile: "bg-cyan/15" },
  { card: "hum-card--mint", icon: "text-mint-deep", tile: "bg-mint/15" },
  { card: "hum-card--lav", icon: "text-lav-deep", tile: "bg-lavender/15" },
]

export default function ContactSection() {
  const t = useTranslations("Contact")

  const rawSocials = t.raw("socials") as {
    title: string
    description: string
  }[]
  const socialIcons = [Github, Trophy, Linkedin, Mail]
  const socialLinks = [
    "https://github.com/YOUR_USERNAME",
    "https://codeforces.com/profile/YOUR_HANDLE",
    "https://linkedin.com/in/YOUR_USERNAME",
    "mailto:your@email.com",
  ]
  const socials = rawSocials.map((social, i) => ({
    ...social,
    icon: socialIcons[i],
    href: socialLinks[i],
  }))

  return (
    <section id="contact" className="relative w-full overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-28 md:px-10">
        <div className="mb-16">
          <p className="mono-label mb-4 text-ink-2">{t("eyebrow")}</p>

          <h2
            data-cursor="text"
            className="text-4xl leading-[1.05] font-bold tracking-[-0.025em] md:text-6xl"
          >
            {t("title1")}
            <br />
            <span className="hl hl--pear">{t("title2")}</span>
            {t("title3")}
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
            {t("description")}
          </p>
        </div>
      </div>

      <div className="band-coral">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-coral/25 bg-paper/70 px-4 py-1.5">
                <span className="h-2 w-2 rounded-full bg-coral" />
                <span className="mono-label text-ink-2">{t("available")}</span>
              </span>

              <h3
                data-cursor="text"
                className="mt-5 max-w-2xl text-3xl leading-snug font-bold tracking-[-0.025em] md:text-4xl"
              >
                <span className="hl hl--coral">{t("openTo")}</span>
              </h3>

              <p className="mt-4 max-w-2xl text-ink-2">{t("ifYouHave")}</p>
            </div>

            <Button
              variant="coral"
              size="lg"
              className="w-full justify-center rounded-full px-8 md:w-auto"
              nativeButton={false}
              render={<Link href="mailto:your@email.com" />}
            >
              {t("sayHello")}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-28 md:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {socials.map((social, i) => {
            const Icon = social.icon
            const tint = socialTints[i]

            return (
              <motion.div key={social.title} variants={item} className="h-full">
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hum-card group flex h-full flex-col rounded-2xl p-6 ${tint.card}`}
                >
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${tint.tile}`}
                  >
                    <Icon className={`h-5 w-5 ${tint.icon}`} />
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold tracking-[-0.025em] text-ink">
                      {social.title}
                    </h3>

                    <ArrowUpRight
                      className={`h-4 w-4 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100 ${tint.icon}`}
                    />
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-ink-2">
                    {social.description}
                  </p>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
