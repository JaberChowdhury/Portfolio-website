"use client"

import { useLocale, useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { Footer as PoufFooter } from "@/components/pouf/footer"
import { navLinks } from "../Navbar"

export default function Footer() {
  const locale = useLocale()
  const t = useTranslations()

  const brand = (
    <Link href="/" className="no-underline text-ink">
      Jaber<span className="text-purple">.</span>dev
    </Link>
  )

  return (
    <PoufFooter
      brand={brand}
      tagline={t("Footer.bio")}
      columns={[
        {
          title: t("Footer.navigation"),
          links: navLinks.map((link) => ({
            label: t(`Navigation.${link.id}`),
            href: `/${locale}${link.href}`,
          })),
        },
        {
          title: t("Footer.connect"),
          links: [
            { label: "GitHub", href: "https://github.com/jaberchowdhury" },
            { label: "LinkedIn", href: "https://linkedin.com/in/jaberchowdhury" },
            { label: "Email", href: "mailto:hello@jaber.dev" },
          ],
        },
      ]}
      note={`© ${new Date().getFullYear()} ${t("Footer.yourName")}`}
    />
  )
}
