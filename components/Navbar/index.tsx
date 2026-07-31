"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
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
    <div className="fixed top-4 left-1/2 z-20 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2">
      <nav className="relative flex items-center justify-between gap-2 rounded-full border border-white/10 bg-paper-2/75 px-3 py-2 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] backdrop-blur-[14px] backdrop-saturate-[1.2] md:gap-3 md:px-4">
        <Link
          href="/"
          className="px-3 py-1 font-sans text-base font-semibold tracking-tight text-ink"
        >
          Jaber<span className="text-cyan">.</span>dev
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="font-sans text-sm text-ink-2 transition-colors hover:text-cyan"
            >
              {t(`Navigation.${link.id}`)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="link"
            size="sm"
            className="hidden font-sans text-sm font-medium text-cyan md:inline-flex"
          >
            {t("Navbar.letsTalk")}
          </Button>

          <LanguageToggle />

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Mobile Menu"
            aria-expanded={isOpen}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full text-ink transition-colors hover:text-cyan focus:outline-none md:hidden"
          >
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-0.5 w-6 rounded-full bg-current"
            />
            <motion.div
              animate={{ opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="h-0.5 w-6 rounded-full bg-current"
            />
            <motion.div
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-0.5 w-6 rounded-full bg-current"
            />
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full right-0 left-0 mt-3 flex flex-col gap-1 rounded-2xl border border-white/10 bg-paper-2/95 p-2 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] backdrop-blur-[14px]"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-xl px-4 py-2.5 font-sans text-lg text-ink transition-colors hover:text-cyan"
                  >
                    {t(`Navigation.${link.id}`)}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  )
}

export default Navbar
