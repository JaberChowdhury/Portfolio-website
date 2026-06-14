"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Black_Ops_One, Playwrite_AR_Guides } from "next/font/google"

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
  { name: "Projects", href: "/#projects" },
  { name: "Programming", href: "/#programming" },
  { name: "Education", href: "/#education" },
  { name: "Experience", href: "/#experience" },
  { name: "Contact", href: "/#contact" },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative z-50 w-full bg-background py-4">
      {/* Main Navbar Container */}
      <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between bg-background px-6 py-4 md:px-12">
        {/* Left Side: Logo/Brand */}
        <Link href="/" className="flex items-center gap-2">
          {/* Custom geometric logo icon to mimic Arc's style */}
          <div
            className={`flex items-center justify-center rounded-lg bg-primary p-3 text-3xl font-black text-background ${black_ops_one.className} block md:hidden`}
          >
            JABER
          </div>
          <span
            className={`font-sans text-4xl font-bold tracking-tight text-foreground ${playwrite_AR_Guides.className} hidden md:block`}
          >
            Jaber.dev
          </span>
        </Link>

        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "font-sans text-sm font-medium text-foreground opacity-80 transition-opacity hover:opacity-100"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side: CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Button className="hidden rounded-full bg-primary px-5 py-2 font-sans text-xs font-semibold tracking-wide text-primary-foreground shadow-sm hover:opacity-90 md:flex">
            Let's Talk →
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
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-bold tracking-tight text-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </a>
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
                  Let's Talk →
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
