"use client"

import { Link } from "@/i18n/routing"
import { navLinks } from "../Navbar"
import { useTranslations } from "next-intl"

export default function Footer() {
  const t = useTranslations()

  return (
    <footer className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <p className="font-sans text-2xl leading-[1.1] font-semibold tracking-[-0.03em] text-ink md:text-4xl">
          The instrument is dark.
          <br />
          The output is yours.
        </p>

        <div className="mt-16 flex flex-col items-center gap-6">
          <Link
            href="/"
            className="font-sans text-sm font-semibold tracking-tight text-ink transition-colors hover:text-cyan"
          >
            Jaber<span className="text-cyan">.</span>dev
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-ink-2">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="transition-colors hover:text-cyan"
              >
                {t(`Navigation.${link.id}`)}
              </Link>
            ))}
            <span aria-hidden className="text-ink-2/40">
              ·
            </span>
            <Link
              href="https://github.com/YOUR_USERNAME"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-cyan"
            >
              GitHub
            </Link>
            <span aria-hidden className="text-ink-2/40">
              ·
            </span>
            <Link
              href="https://linkedin.com/in/YOUR_USERNAME"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-cyan"
            >
              LinkedIn
            </Link>
            <span aria-hidden className="text-ink-2/40">
              ·
            </span>
            <Link
              href="mailto:your@email.com"
              className="transition-colors hover:text-cyan"
            >
              Email
            </Link>
          </div>

          <p className="text-xs text-ink-2">
            © {new Date().getFullYear()} {t("Footer.yourName")}
          </p>
        </div>
      </div>
    </footer>
  )
}
