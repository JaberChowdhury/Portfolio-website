"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Playwrite_AR_Guides } from "next/font/google"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { LanguageToggle } from "../LanguageToggle"

const playwrite_AR_Guides = Playwrite_AR_Guides({
  weight: "400",
  adjustFontFallback: false,
  fallback: ["cursive", "sans-serif"],
})

export const navLinks = [
  { id: "skills", href: "#skills" },
  { id: "projects", href: "#projects" },
  { id: "programming", href: "#programming" },
  { id: "experience", href: "#experience" },
  { id: "education", href: "#education" },
  { id: "contact", href: "#contact" },
]

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations()

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-transparent">
      {/* Main Navbar Container */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3 md:px-10 md:py-3.5">
        {/* Left Side: Logo/Brand — Consistent across mobile and desktop */}
        <a href="#home" className="flex items-center gap-2">
          <span
            className={`preserve-design font-sans text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl ${playwrite_AR_Guides.className}`}
          >
            Jaber.dev
          </span>
        </a>

        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden items-center gap-1 md:flex lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase transition-all hover:bg-secondary/60 hover:text-foreground"
              )}
            >
              {t(`Navigation.${link.id}`)}
            </a>
          ))}
        </div>

        {/* Right Side: CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <div className="hidden md:flex">
            <LanguageToggle />
          </div>
          <Button
            variant="rose"
            size="sm"
            href="#contact"
            className="hidden rounded-full md:inline-flex"
            frontClassName="rounded-full"
          >
            <span className="flex items-center gap-1.5 py-2 font-mono text-xs font-bold">
              <span>{t("Navbar.letsTalk")}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center gap-1.5 rounded-lg border border-border/40 bg-card/60 focus:outline-none md:hidden"
            aria-label="Toggle Mobile Menu"
          >
            <div className="flex flex-col items-center justify-center gap-1">
              <motion.div
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 5 : 0,
                }}
                className="h-0.5 w-4.5 rounded-full bg-foreground"
              />
              <motion.div
                animate={{
                  opacity: isOpen ? 0 : 1,
                }}
                className="h-0.5 w-4.5 rounded-full bg-foreground"
              />
              <motion.div
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -5 : 0,
                }}
                className="h-0.5 w-4.5 rounded-full bg-foreground"
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="border-b border-border/60 bg-background/95 shadow-xl backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col items-center gap-3.5 px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-base font-bold tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground active:scale-95"
                >
                  {t(`Navigation.${link.id}`)}
                </a>
              ))}
              <div className="mt-2 flex w-full max-w-xs justify-center pt-2">
                <LanguageToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
