"use client"

import { useEffect, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Link, usePathname } from "@/i18n/routing"
import { Navbar as PoufNavbar } from "@/components/pouf/navbar"
import { Button } from "@/components/pouf/Button"
import { LanguageToggle } from "../LanguageToggle"

export const navLinks = [
  { id: "projects", href: "/#projects" },
  { id: "programming", href: "/#programming" },
  { id: "education", href: "/#education" },
  { id: "experience", href: "/#experience" },
  { id: "contact", href: "/#contact" },
]

const Navbar = () => {
  const locale = useLocale()
  const pathname = usePathname()
  const t = useTranslations()
  const [hash, setHash] = useState("")

  useEffect(() => {
    const update = () => setHash(window.location.hash)
    update()
    window.addEventListener("hashchange", update)
    return () => window.removeEventListener("hashchange", update)
  }, [])

  const onHome = pathname === "/"
  const links = navLinks.map((link) => ({
    label: t(`Navigation.${link.id}`),
    href: `/${locale}${link.href}`,
    active: onHome && hash === link.href,
  }))

  const brand = (
    <Link href="/" className="no-underline text-ink">
      Jaber<span className="text-purple">.</span>dev
    </Link>
  )

  return (
    <div className="fixed top-4 left-1/2 z-20 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2">
      <PoufNavbar
        brand={brand}
        links={links}
        actions={
          <>
            <LanguageToggle />
            <Link href="/#contact" className="no-underline">
              <Button tone="purple" size="sm">
                {t("Navbar.letsTalk")}
              </Button>
            </Link>
          </>
        }
      />
    </div>
  )
}

export default Navbar
