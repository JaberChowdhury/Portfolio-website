"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
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
        <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 sm:py-6 md:px-12 md:py-8">
          {/* Left Side: Logo/Brand */}
          <Link href="/" className="flex items-center gap-2">
            {/* Custom geometric logo icon to mimic Arc's style */}
            <div
              className={`flex items-center justify-center rounded-lg bg-primary px-3 py-1.5 text-2xl font-black text-background ${black_ops_one.className} block md:hidden`}
            >
              JABER
            </div>
            <span
              className={`preserve-design font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl ${playwrite_AR_Guides.className} hidden md:block`}
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
          <div className="flex items-center gap-3 sm:gap-4">
            <LanguageToggle />
            <Link
              href="/#contact"
              className={cn(
                buttonVariants({ variant: "default" }),
                "hidden rounded-full bg-primary px-5 py-2 font-sans text-xs font-semibold tracking-wide text-primary-foreground shadow-sm hover:opacity-90 md:flex"
              )}
            >
              {t("Navbar.letsTalk")}{" "}
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 min-h-[40px] w-10 min-w-[40px] flex-col items-center justify-center gap-1.5 rounded-lg border border-border/40 bg-card/50 focus:outline-none md:hidden"
              aria-label="Toggle Mobile Menu"
            >
              <motion.div
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 8 : 0,
                }}
                className="h-0.5 w-5 rounded-full bg-foreground"
              />
              <motion.div
                animate={{
                  opacity: isOpen ? 0 : 1,
                }}
                className="h-0.5 w-5 rounded-full bg-foreground"
              />
              <motion.div
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -8 : 0,
                }}
                className="h-0.5 w-5 rounded-full bg-foreground"
              />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "calc(100dvh - 100%)" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-full left-0 z-40 max-h-[calc(100dvh-4rem)] w-full overflow-y-auto border-b border-border bg-background/98 shadow-xl backdrop-blur-md md:hidden"
            >
              <div className="flex flex-col items-center gap-6 px-6 pt-8 pb-16">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary active:scale-95"
                    >
                      {t(`Navigation.${link.id}`)}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: navLinks.length * 0.08, duration: 0.3 }}
                  className="mt-4 w-full max-w-xs"
                >
                  <Link
                    href="/#contact"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "flex w-full justify-center rounded-full bg-primary py-5 text-center font-sans text-base font-semibold tracking-wide text-primary-foreground shadow-sm hover:opacity-90 active:scale-95"
                    )}
                  >
                    {t("Navbar.letsTalk")} →
                  </Link>
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
