"use client"

import * as React from "react"
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion"
import { Mail } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ExtendedFABProps extends Omit<HTMLMotionProps<"button">, "children"> {
  label?: string
  icon?: React.ReactNode
  targetSectionId?: string
  onTrigger?: () => void
}

export function ExtendedFAB({
  label = "Get in Touch",
  icon,
  targetSectionId = "contact",
  onTrigger,
  className,
  onClick,
  ...props
}: ExtendedFABProps) {
  const [isExtended, setIsExtended] = React.useState(true)
  const lastScrollY = React.useRef(0)
  const scrollTimeout = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const deltaY = currentScrollY - lastScrollY.current

      // Fast scroll down collapses FAB to icon-only
      if (deltaY > 8 && currentScrollY > 80) {
        setIsExtended(false)
      } else if (deltaY < -6) {
        // Scroll up re-expands
        setIsExtended(true)
      }

      lastScrollY.current = currentScrollY

      // Reset timer on scroll: when scrolling stops for 350ms, expand back
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      scrollTimeout.current = setTimeout(() => {
        setIsExtended(true)
      }, 350)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (targetSectionId) {
      const targetElement = document.getElementById(targetSectionId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" })
      } else {
        // Fallback to window scroll if hash matching
        const fallback = document.querySelector(`[data-section="${targetSectionId}"]`)
        if (fallback) {
          fallback.scrollIntoView({ behavior: "smooth" })
        }
      }
    }

    onTrigger?.()
    onClick?.(e)
  }

  return (
    <motion.button
      type="button"
      layout
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 28,
      }}
      onClick={handleClick}
      aria-label={label}
      title={label}
      className={cn(
        "fixed bottom-6 right-6 z-40 inline-flex h-14 items-center justify-center overflow-hidden cursor-pointer",
        "rounded-[20px] bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)]",
        "shadow-lg hover:shadow-xl active:shadow-md",
        "transition-shadow duration-200",
        "focus-visible:outline-2 focus-visible:outline-[var(--md-sys-color-primary)] focus-visible:outline-offset-3",
        isExtended ? "px-5" : "w-14 px-0",
        className
      )}
      {...props}
    >
      {/* Material 3 State Layer */}
      <span
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-[inherit] bg-current opacity-0 transition-opacity duration-200 hover:opacity-[0.08] active:opacity-[0.14]"
      />

      {/* FAB Icon */}
      <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center">
        {icon || <Mail className="h-5 w-5" strokeWidth={2.2} />}
      </span>

      {/* Spring Animated Label */}
      <AnimatePresence initial={false}>
        {isExtended && (
          <motion.span
            key="fab-label"
            initial={{ opacity: 0, width: 0, marginLeft: 0 }}
            animate={{ opacity: 1, width: "auto", marginLeft: 12 }}
            exit={{ opacity: 0, width: 0, marginLeft: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 28,
            }}
            className="relative z-10 whitespace-nowrap font-mono text-sm font-semibold tracking-wide"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

ExtendedFAB.displayName = "M3ExtendedFAB"
export default ExtendedFAB
