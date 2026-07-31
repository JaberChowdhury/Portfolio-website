"use client"

import { Link } from "@/i18n/routing"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  AArrowDown as Github,
  Asterisk as Linkedin,
  Mail,
  ArrowUpRight,
  Trophy,
} from "lucide-react"
import { navLinks } from "../Navbar"
import { useTranslations } from "next-intl"
import { LanguageToggle } from "../LanguageToggle"

const marqueeItems = Array.from({ length: 8 })

export default function Footer() {
  const t = useTranslations()

  return (
    <footer className="relative overflow-hidden bg-paper text-ink">
      <div className="overflow-hidden border-b border-border bg-paper-2 py-4">
        <div className="marquee-track">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0 items-center gap-10">
              {marqueeItems.map((_, i) => (
                <span key={i} className="mono-label flex items-center gap-10 text-ink-2">
                  {t("Footer.marqueeLabel")}
                  <span className="h-1.5 w-1.5 rounded-full bg-pear" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="band-pear">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center md:px-10 md:py-28">
          <p className="mono-label mb-5 text-ink-2">{t("Footer.finalDestination")}</p>

          <h2 className="mx-auto max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl">
            {t("Footer.title1")} {t("Footer.title2")}
            <span className="hl hl--pear">{t("Footer.title3")}</span>
            {t("Footer.title4")}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
            {t("Footer.description")}
          </p>

          <Link
            href="mailto:your@email.com"
            className={cn(
              buttonVariants({ variant: "coral", size: "lg" }),
              "mt-10"
            )}
          >
            {t("Footer.startConversation")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-paper-2 p-6">
            <h3 className="text-lg font-bold tracking-tight text-ink">
              {t("Footer.yourName")}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">
              {t("Footer.bio")}
            </p>
          </div>

          <div className="rounded-2xl bg-paper-2 p-6">
            <h4 className="mono-label mb-4 text-ink-2">{t("Footer.navigation")}</h4>
            <div className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="w-fit text-sm font-medium text-ink-2 transition-colors hover:text-cyan"
                >
                  {t(`Navigation.${item.id}`)}
                </Link>
              ))}
              <Link
                href="/dungeon"
                className="w-fit text-sm font-medium text-ink-2 transition-colors hover:text-cyan"
              >
                {t("Footer.dungeon")}
              </Link>
            </div>
          </div>

          <div className="rounded-2xl bg-paper-2 p-6">
            <h4 className="mono-label mb-4 text-ink-2">{t("Footer.connect")}</h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/projects"
                className="group flex items-center justify-between rounded-full bg-pear/10 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-pear/25"
              >
                <span className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub
                </span>
                <ArrowUpRight className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="https://linkedin.com/in/YOUR_USERNAME"
                target="_blank"
                className="group flex items-center justify-between rounded-full bg-cyan/10 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-cyan/20"
              >
                <span className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </span>
                <ArrowUpRight className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="https://codeforces.com/profile/YOUR_HANDLE"
                target="_blank"
                className="group flex items-center justify-between rounded-full bg-mint/10 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-mint/20"
              >
                <span className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  Codeforces
                </span>
                <ArrowUpRight className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="mailto:your@email.com"
                className="group flex items-center justify-between rounded-full bg-lavender/10 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-lavender/20"
              >
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </span>
                <ArrowUpRight className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-paper-2">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center md:flex-row md:px-10 md:text-left">
          <p className="mono-label text-ink-2">
            © {new Date().getFullYear()} {t("Footer.yourName")} · {t("Footer.rights")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <p className="mono-label hidden text-ink-2 md:block">
              {t("Footer.builtWith")}
            </p>
            <div className="flex items-center gap-2">
              <span className="mono-label text-ink-2">{t("Footer.language")}</span>
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
