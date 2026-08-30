"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"
import { ThemeToggle } from "@/components/ThemeToggle"
import { LanguageToggle } from "@/components/LanguageToggle"
import { Button } from "./Button"
import { cn } from "@/lib/utils"

export interface TopAppBarProps {
  title?: string
  monogram?: string
  showNavLinks?: boolean
  className?: string
}

export const navLinks = [
  { id: "home", label: "Home", href: "#home" },
  { id: "technology", label: "Skills", href: "#technology" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "programming", label: "CP", href: "#programming" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "education", label: "Education", href: "#education" },
  { id: "contact", label: "Contact", href: "#contact" },
]

export function TopAppBar({
  title = "Jaber.dev",
  monogram = "JC",
  showNavLinks = true,
  className,
}: TopAppBarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  // Safe translation hook
  let t: (key: string) => string
  try {
    const rawT = useTranslations()
    t = (key: string) => {
      try {
        return rawT(key)
      } catch {
        return key
      }
    }
  } catch {
    t = (key: string) => key
  }

  // Scroll listener for elevation transition past 20px
  React.useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20
      setIsScrolled(scrolled)
    }

    // Check initial state
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu on escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isMenuOpen])

  // Prevent background scrolling when menu drawer is open
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    setIsMenuOpen(false)
    const targetId = href.replace("#", "")
    let target = document.getElementById(targetId)
    if (!target && targetId === "technology") {
      target = document.getElementById("skills")
    }
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      role="banner"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full",
        "transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
        isScrolled
          ? "bg-[var(--md-sys-color-surface-container)]/90 backdrop-blur-md shadow-xs border-b border-[var(--md-sys-color-outline-variant)]/30 py-2.5"
          : "bg-transparent border-b border-transparent py-4",
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 md:px-10">
        {/* Left Side: Logo/Monogram with M3 Expressive Squircle Badge */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, "#home")}
          className="group flex items-center gap-3 select-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--md-sys-color-primary)] rounded-full pr-2"
          aria-label={`${title} - Home`}
        >
          {/* M3 Expressive Squircle Badge */}
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105 active:scale-95">
            {/* Expressive Superellipse Squircle SVG */}
            <svg
              viewBox="0 0 44 44"
              className="absolute inset-0 h-full w-full fill-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-primary-container)] transition-colors duration-300 drop-shadow-xs"
            >
              <path d="M 22,0 C 36,0 44,8 44,22 C 44,36 36,44 22,44 C 8,44 0,36 0,22 C 0,8 8,0 22,0 Z" />
            </svg>
            <span className="relative z-10 font-mono text-sm font-black tracking-tight text-[var(--md-sys-color-on-primary-container)]">
              {monogram}
            </span>
          </div>

          {/* Title & Badge */}
          <div className="flex flex-col">
            <span className="font-sans text-base font-bold tracking-tight text-[var(--md-sys-color-on-surface)] transition-colors duration-200 group-hover:text-[var(--md-sys-color-primary)] sm:text-lg">
              {title}
            </span>
            <span className="hidden font-mono text-[10px] font-medium tracking-wider text-[var(--md-sys-color-on-surface-variant)] uppercase sm:inline-block">
              Portfolio
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation Links (Optional / Triggerable) */}
        {showNavLinks && (
          <nav
            role="navigation"
            aria-label="Desktop Navigation Links"
            className="hidden items-center gap-1 lg:flex"
          >
            {navLinks.map((link) => {
              const label = t(`Navigation.${link.id}`) || link.label
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold tracking-wider text-[var(--md-sys-color-on-surface-variant)] uppercase",
                    "transition-all duration-200 hover:text-[var(--md-sys-color-on-surface)] hover:bg-[var(--md-sys-color-surface-container-high)]/60",
                    "focus-visible:outline-2 focus-visible:outline-[var(--md-sys-color-primary)] focus-visible:outline-offset-2"
                  )}
                >
                  {label}
                </a>
              )
            })}
          </nav>
        )}

        {/* Right Side: Theme Switch, Language Toggle, and Mobile Navigation Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle showKeyIndicator={false} />
            <LanguageToggle />
          </div>

          {/* Desktop Contact Action */}
          <Button
            variant="filled"
            size="sm"
            href="#contact"
            onClick={(e) => scrollToSection(e, "#contact")}
            trailingIcon={<ArrowUpRight className="h-3.5 w-3.5" />}
            className="hidden sm:inline-flex"
          >
            {t("Navbar.letsTalk") || "Let's Talk"}
          </Button>

          {/* Mobile Menu Trigger Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close Menu" : "Open Navigation Menu"}
            aria-expanded={isMenuOpen}
            aria-controls="m3-mobile-navigation-menu"
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-[var(--md-sys-shape-corner-md,12px)]",
              "bg-[var(--md-sys-color-surface-container-low)] text-[var(--md-sys-color-on-surface)]",
              "border border-[var(--md-sys-color-outline-variant)]/40 shadow-xs",
              "transition-colors duration-200 hover:bg-[var(--md-sys-color-surface-container-high)]",
              "focus-visible:outline-2 focus-visible:outline-[var(--md-sys-color-primary)] lg:hidden"
            )}
          >
            {/* State Layer */}
            <span
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none rounded-[inherit] bg-current opacity-0 transition-opacity hover:opacity-[0.08]"
            />
            {isMenuOpen ? (
              <X className="h-5 w-5" strokeWidth={2.2} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={2.2} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Overlay Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="m3-mobile-navigation-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed inset-x-0 top-[64px] z-40 border-b border-[var(--md-sys-color-outline-variant)]/30 bg-[var(--md-sys-color-surface-container)]/98 px-6 py-6 shadow-xl backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-2">
              <div className="mb-2 flex items-center gap-2 px-2 text-xs font-mono font-bold tracking-wider text-[var(--md-sys-color-primary)] uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Navigation</span>
              </div>
              {navLinks.map((link, idx) => {
                const label = t(`Navigation.${link.id}`) || link.label
                return (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * idx, duration: 0.2 }}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 font-mono text-sm font-semibold tracking-wide text-[var(--md-sys-color-on-surface)]",
                      "transition-colors hover:bg-[var(--md-sys-color-surface-container-high)] active:bg-[var(--md-sys-color-primary-container)] active:text-[var(--md-sys-color-on-primary-container)]"
                    )}
                  >
                    <span>{label}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-50" />
                  </motion.a>
                )
              })}

              <div className="mt-4 border-t border-[var(--md-sys-color-outline-variant)]/30 pt-4">
                <Button
                  variant="filled"
                  size="md"
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "#contact")}
                  className="w-full"
                >
                  {t("Navbar.letsTalk") || "Let's Talk"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

TopAppBar.displayName = "M3TopAppBar"
export default TopAppBar
