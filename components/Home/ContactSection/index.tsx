"use client"

import React, { useState, type FormEvent } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useTranslations } from "next-intl"

import { Card, RowCard } from "@/components/pouf/surface"
import { Eyebrow, Heading, Highlight, Text } from "@/components/pouf/text"
import { Blob, Dot } from "@/components/pouf/media"
import { Button } from "@/components/pouf/Button"
import { Field, Input, Textarea } from "@/components/pouf/Input"
import type { IconName } from "@/components/pouf/Icon"
import type { Tone } from "@/components/pouf/tone"

const EMAIL = "mailto:your@email.com"

const socialRoles: IconName[] = ["sparkle", "trophy", "users", "mail"]
const socialTones: Tone[] = ["purple", "orange", "blue", "mint"]
const socialLinks = [
  "https://github.com/YOUR_USERNAME",
  "https://codeforces.com/profile/YOUR_HANDLE",
  "https://linkedin.com/in/YOUR_USERNAME",
  EMAIL,
]

function Reveal({
  delay = 0,
  className = "",
  children,
}: {
  delay?: number
  className?: string
  children: React.ReactNode
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export default function ContactSection() {
  const t = useTranslations("Contact")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const rawSocials = t.raw("socials") as {
    title: string
    description: string
  }[]

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Hello from ${name || "a visitor"}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`)
    window.location.href = `${EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="relative w-full pb-[clamp(4rem,10vw,7.5rem)]">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col gap-(--s3)">
            <Eyebrow>( 06 ) · {t("eyebrow")}</Eyebrow>
            <Heading level={2}>
              {t("title1")}
              <br />
              <Highlight>{t("title2")}</Highlight>
              {t("title3")}
            </Heading>
            <Text muted>{t("description")}</Text>
          </div>
        </Reveal>

        <div className="mt-(--s8) flex flex-col gap-(--s4)">
          <Reveal delay={0.05}>
            <div className="flex flex-col gap-(--s2)">
              <div className="flex items-center gap-(--s2)">
                <Dot tone="mint" />
                <Text>{t("available")}</Text>
              </div>
              <Heading level={3}>{t("openTo")}</Heading>
              <Text muted>{t("ifYouHave")}</Text>
            </div>
          </Reveal>

          <div className="grid gap-(--s4) lg:grid-cols-[1fr_minmax(0,0.9fr)]">
            <Reveal delay={0.1}>
              <Card>
                <div className="flex flex-col gap-(--s4)">
                  <Heading level={3}>{t("sayHello")}</Heading>

                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-(--s4)"
                  >
                    <div className="grid gap-(--s3) sm:grid-cols-2">
                      <Field label="Your Name">
                        {(id, describedBy) => (
                          <Input
                            id={id}
                            describedBy={describedBy}
                            value={name}
                            onChange={setName}
                            placeholder="Jane Doe"
                            autoComplete="name"
                            required
                          />
                        )}
                      </Field>

                      <Field label="Your Email">
                        {(id, describedBy) => (
                          <Input
                            id={id}
                            describedBy={describedBy}
                            value={email}
                            onChange={setEmail}
                            placeholder="jane@example.com"
                            type="email"
                            autoComplete="email"
                            required
                          />
                        )}
                      </Field>
                    </div>

                    <Field label="Your Message">
                      {(id, describedBy) => (
                        <Textarea
                          id={id}
                          describedBy={describedBy}
                          value={message}
                          onChange={setMessage}
                          placeholder="Tell me about your project…"
                          rows={5}
                          required
                        />
                      )}
                    </Field>

                    <Button type="submit" size="lg" tone="purple" block>
                      Send Message
                    </Button>
                  </form>
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-col gap-(--s3)">
                {rawSocials.map((social, i) => (
                  <a
                    key={social.title}
                    href={socialLinks[i]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <RowCard>
                      <div className="flex items-start gap-(--s4)">
                        <Blob
                          icon={socialRoles[i % socialRoles.length]}
                          tone={socialTones[i % socialTones.length]}
                          size="md"
                        />
                        <div className="flex flex-col gap-[2px]">
                          <Heading level={3}>{social.title}</Heading>
                          <Text size="sm" muted>
                            {social.description}
                          </Text>
                        </div>
                      </div>
                    </RowCard>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
