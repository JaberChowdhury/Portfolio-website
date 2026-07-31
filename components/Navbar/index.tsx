"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { LanguageToggle } from "../LanguageToggle"

export const navLinks = [
  { id: "projects", href: "/#projects" },
  { id: "programming", href: "/#programming" },
  { id: "education", href: "/#education" },
  { id: "experience", href: "/#experience" },
  { id: "contact", href: "/#contact" },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations()

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 md:px-6">
      <nav className="mt-4 flex w-full max-w-7xl items-center justify-between gap-3 rounded-full border border-border bg-paper/90 py-2 pr-2 pl-5 shadow-[0_12px_32px_-16px_var(--btn-cast)] backdrop-blur-md">
        <Link href="/" aria-label="Home" className="flex items-center gap-0.5">
          <span className="flex items-baseline text-lg font-bold tracking-tight text-ink">
            jaber
            <span className="mx-0.5 inline-block size-1.5 translate-y-[-1px] rounded-full bg-pear" />
            dev
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-2 underline-offset-4 transition-colors duration-200 hover:bg-paper-3 hover:text-ink hover:underline hover:decoration-cyan"
            >
              {t(`Navigation.${link.id}`)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <Button className="hidden md:inline-flex" size="sm">
            {t("Navbar.letsTalk")} <ArrowRight />
          </Button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full transition-colors hover:bg-paper-3 focus:outline-none md:hidden"
            aria-label="Toggle Mobile Menu"
            aria-expanded={isOpen}
          >
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
              className="h-0.5 w-6 rounded-full bg-ink"
            />
            <motion.div
              animate={{ opacity: isOpen ? 0 : 1 }}
              className="h-0.5 w-6 rounded-full bg-ink"
            />
            <motion.div
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
              className="h-0.5 w-6 rounded-full bg-ink"
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-4 top-full mt-3 overflow-hidden rounded-3xl border border-border bg-paper shadow-[0_24px_60px_-24px_var(--btn-cast)] md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-base font-semibold tracking-tight text-ink transition-colors hover:bg-paper-3"
                  >
                    {t(`Navigation.${link.id}`)}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.25 }}
                className="mt-3"
              >
                <Button className="w-full" size="lg">
                  {t("Navbar.letsTalk")} <ArrowRight />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navbar
