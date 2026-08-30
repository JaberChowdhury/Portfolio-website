"use client"

import React, { useState } from "react"
import { Mail, ArrowUpRight, Trophy, Send, CheckCircle2, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Button } from "@/components/m3/Button"

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" r="2" />
    </svg>
  )
}

const SOCIAL_ITEMS = [
  {
    icon: GithubIcon,
    title: "GitHub",
    desc: "Explore repositories & code",
    badge: "CODE",
    href: "https://github.com/JaberChowdhury",
  },
  {
    icon: Trophy,
    title: "Codeforces",
    desc: "229 solved problems",
    badge: "RANKED",
    href: "https://codeforces.com/profile/jaber02",
  },
  {
    icon: LinkedinIcon,
    title: "LinkedIn",
    desc: "Connect professionally",
    badge: "NETWORK",
    href: "https://www.linkedin.com/in/md-jaber-hossain-chowdhury-543335252/",
  },
  {
    icon: Mail,
    title: "Email",
    desc: "jaberhc2002@gmail.com",
    badge: "DIRECT",
    href: "mailto:jaberhc2002@gmail.com",
  },
]

export function ContactSection() {
  const t = useTranslations("Contact")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoUrl = `mailto:jaberhc2002@gmail.com?subject=${encodeURIComponent(
      formData.subject || `Portfolio Message from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`
    window.location.href = mailtoUrl
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section
      id="contact"
      data-section="contact"
      className="relative w-full py-16 sm:py-20 md:py-28 text-[var(--md-sys-color-on-surface,var(--foreground))] transition-colors duration-500 overflow-hidden"
    >
      {/* Dynamic Amber / Saffron Section Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-20 h-96 w-96 rounded-full
          bg-[var(--md-sys-color-primary,#d4a017)]/10 blur-[100px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-20 h-96 w-96 rounded-full
          bg-[var(--md-sys-color-tertiary,#2e8bc0)]/10 blur-[100px] -z-10"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-12 2xl:max-w-[1440px]">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="mb-2.5 sm:mb-3 flex items-center gap-2">
            <div
              className="inline-flex items-center gap-2 rounded-full
                border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/50
                bg-[var(--md-sys-color-surface-container-high,var(--secondary))]/70
                px-3 py-1 font-mono text-xs font-semibold tracking-wider
                text-[var(--md-sys-color-primary,#d4a017)] shadow-2xs"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--md-sys-color-primary,#d4a017)] animate-pulse" />
              <span className="uppercase">07 ⁄ {t("eyebrow")}</span>
            </div>
          </div>

          <h2
            data-cursor="text"
            className="text-2xl font-black tracking-tight text-[var(--md-sys-color-on-surface,var(--foreground))] min-[380px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {t("title1")}{" "}
            <span className="text-[var(--md-sys-color-primary,#d4a017)]">
              {t("title2")}
            </span>
            {t("title3")}
          </h2>

          <p className="mt-2 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed font-normal text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))]">
            {t("description")}
          </p>
        </div>

        {/* 2-Column Responsive Layout: Contact Info Cards + M3 Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Column (lg:col-span-5): Availability Banner + Info Cards in surface-container-high */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Availability Banner */}
            <div
              className="rounded-3xl border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/40
                bg-[var(--md-sys-color-surface-container-low,var(--card))] p-6 sm:p-7 shadow-xs"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t("available")}</span>
              </div>
              <h3 className="mt-3 text-lg sm:text-xl font-bold text-[var(--md-sys-color-on-surface,var(--foreground))]">
                {t("openTo")}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))] leading-relaxed">
                {t("ifYouHave")}
              </p>
            </div>

            {/* Contact Info Cards in surface-container-high */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold tracking-wider text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))] uppercase">
                Direct Channels
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {SOCIAL_ITEMS.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 rounded-2xl
                        border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.12))]/50
                        bg-[var(--md-sys-color-surface-container-high,var(--secondary))]/90
                        text-[var(--md-sys-color-on-surface,var(--foreground))]
                        shadow-2xs transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]
                        hover:-translate-y-1 hover:border-[var(--md-sys-color-primary,#d4a017)]/50
                        hover:bg-[var(--md-sys-color-surface-container-highest,var(--secondary))]"
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px]
                            bg-[var(--md-sys-color-surface-container-lowest,var(--background))]
                            border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/40
                            text-[var(--md-sys-color-primary,#d4a017)]
                            transition-transform duration-300 group-hover:scale-110"
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[var(--md-sys-color-on-surface,var(--foreground))]">
                              {item.title}
                            </span>
                            <span className="rounded-full bg-[var(--md-sys-color-secondary-container,#f0eadc)] dark:bg-[var(--md-sys-color-secondary-container,#2e2a22)] px-2 py-0.5 font-mono text-[9px] font-bold text-[var(--md-sys-color-on-secondary-container,#3a2e16)] dark:text-[var(--md-sys-color-on-secondary-container,#f5e6a3)]">
                              {item.badge}
                            </span>
                          </div>
                          <p className="font-mono text-xs text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))]">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--md-sys-color-primary,#d4a017)]" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column (lg:col-span-7): M3 Expressive Form */}
          <div className="lg:col-span-7">
            <div
              className="rounded-3xl border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/40
                bg-[var(--md-sys-color-surface-container-low,var(--card))] p-6 sm:p-8 md:p-10 shadow-sm"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--md-sys-color-on-surface,var(--foreground))]">
                    Send a Message
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[var(--md-sys-color-on-surface-variant,var(--muted-foreground))]">
                    Fill out the form below or write directly to my inbox.
                  </p>
                </div>
                <Sparkles className="h-6 w-6 text-[var(--md-sys-color-primary,#d4a017)]" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input — M3 Outlined / Filled Style */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="block font-mono text-xs font-semibold text-[var(--md-sys-color-on-surface-variant,var(--foreground))]"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full h-11 px-4 text-sm rounded-[14px]
                        border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/60
                        bg-[var(--md-sys-color-surface-container-lowest,var(--background))]
                        text-[var(--md-sys-color-on-surface,var(--foreground))]
                        placeholder:text-muted-foreground/60
                        transition-all duration-200
                        focus:border-[var(--md-sys-color-primary,#d4a017)]
                        focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary,#d4a017)]/20"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block font-mono text-xs font-semibold text-[var(--md-sys-color-on-surface-variant,var(--foreground))]"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full h-11 px-4 text-sm rounded-[14px]
                        border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/60
                        bg-[var(--md-sys-color-surface-container-lowest,var(--background))]
                        text-[var(--md-sys-color-on-surface,var(--foreground))]
                        placeholder:text-muted-foreground/60
                        transition-all duration-200
                        focus:border-[var(--md-sys-color-primary,#d4a017)]
                        focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary,#d4a017)]/20"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="subject"
                    className="block font-mono text-xs font-semibold text-[var(--md-sys-color-on-surface-variant,var(--foreground))]"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full h-11 px-4 text-sm rounded-[14px]
                      border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/60
                      bg-[var(--md-sys-color-surface-container-lowest,var(--background))]
                      text-[var(--md-sys-color-on-surface,var(--foreground))]
                      placeholder:text-muted-foreground/60
                      transition-all duration-200
                      focus:border-[var(--md-sys-color-primary,#d4a017)]
                      focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary,#d4a017)]/20"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="block font-mono text-xs font-semibold text-[var(--md-sys-color-on-surface-variant,var(--foreground))]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, idea, or challenge..."
                    className="w-full p-4 text-sm rounded-[16px]
                      border border-[var(--md-sys-color-outline-variant,rgba(28,29,25,0.15))]/60
                      bg-[var(--md-sys-color-surface-container-lowest,var(--background))]
                      text-[var(--md-sys-color-on-surface,var(--foreground))]
                      placeholder:text-muted-foreground/60
                      transition-all duration-200
                      focus:border-[var(--md-sys-color-primary,#d4a017)]
                      focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary,#d4a017)]/20 resize-y"
                  />
                </div>

                {/* Prominent M3 Filled Button for "Send Message" with spring press feedback */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      type="submit"
                      variant="filled"
                      size="lg"
                      shape="full"
                      trailingIcon={<Send className="h-4 w-4" />}
                      className="w-full sm:w-auto px-8 !bg-[var(--md-sys-color-primary,#d4a017)] !text-[var(--md-sys-color-on-primary,#ffffff)] font-bold shadow-md hover:shadow-lg transition-all"
                    >
                      Send Message
                    </Button>
                  </motion.div>

                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="inline-flex items-center gap-2 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Ready in your email client!</span>
                    </motion.div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
