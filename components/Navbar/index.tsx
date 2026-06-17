"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button, buttonVariants } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { Black_Ops_One, Playwrite_AR_Guides } from "next/font/google"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { LanguageToggle } from "../LanguageToggle"

const black_ops_one = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
})

const playwrite_AR_Guides = Playwrite_AR_Guides({
  weight: "400",
  adjustFontFallback: false,
  fallback: ["cursive", "sans-serif"],
})

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
    <>
      <div className="_relative fixed top-0 z-50 w-full bg-background/90 backdrop-blur-xs">
        {/* Main Navbar Container */}
        <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-8 md:px-12">
          {/* Left Side: Logo/Brand */}
          <Link href="/" className="flex items-center gap-2">
            {/* Custom geometric logo icon to mimic Arc's style */}
            <div
              className={`flex items-center justify-center rounded-lg bg-primary p-3 text-3xl font-black text-background ${black_ops_one.className} block md:hidden`}
            >
              JABER
            </div>
            <span
              className={`preserve-design font-sans text-4xl font-bold tracking-tight text-foreground ${playwrite_AR_Guides.className} hidden md:block`}
            >
              Jaber.dev
            </span>
          </Link>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "font-sans text-sm font-medium text-foreground opacity-80 transition-opacity hover:opacity-100"
                )}
              >
                {t(`Navigation.${link.id}`)}
              </Link>
            ))}
          </div>

          {/* Right Side: CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <Button className="hidden rounded-full bg-primary px-5 py-2 font-sans text-xs font-semibold tracking-wide text-primary-foreground shadow-sm hover:opacity-90 md:flex">
              {t("Navbar.letsTalk")} <ArrowRight />
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 focus:outline-none md:hidden"
              aria-label="Toggle Mobile Menu"
            >
              <motion.div
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 8 : 0,
                }}
                className="h-0.5 w-6 rounded-full bg-foreground"
              />
              <motion.div
                animate={{
                  opacity: isOpen ? 0 : 1,
                }}
                className="h-0.5 w-6 rounded-full bg-foreground"
              />
              <motion.div
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -8 : 0,
                }}
                className="h-0.5 w-6 rounded-full bg-foreground"
              />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-full left-0 z-40 w-full overflow-hidden bg-background md:hidden"
            >
              <div className="flex flex-col items-center gap-8 px-6 pt-12 pb-20">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-2xl font-bold tracking-tight text-foreground transition-colors hover:text-primary"
                    >
                      {t(`Navigation.${link.id}`)}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: navLinks.length * 0.1, duration: 0.3 }}
                  className="mt-6"
                >
                  <Button className="rounded-full bg-primary px-10 py-6 font-sans text-lg font-semibold tracking-wide text-primary-foreground shadow-sm hover:opacity-90">
                    {t("Navbar.letsTalk")} →
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default Navbar
