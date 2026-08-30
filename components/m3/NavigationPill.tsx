"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Home,
  Cpu,
  FolderGit2,
  Trophy,
  Briefcase,
  GraduationCap,
  Mail,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface NavItem {
  id: string
  label: string
  href?: string
  icon?: React.ReactNode
}

export interface NavigationPillProps {
  items?: NavItem[]
  activeId?: string
  onItemClick?: (id: string) => void
  className?: string
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", href: "#home", icon: <Home className="h-4 w-4" /> },
  { id: "technology", label: "Skills", href: "#technology", icon: <Cpu className="h-4 w-4" /> },
  { id: "projects", label: "Projects", href: "#projects", icon: <FolderGit2 className="h-4 w-4" /> },
  { id: "programming", label: "CP", href: "#programming", icon: <Trophy className="h-4 w-4" /> },
  { id: "experience", label: "Experience", href: "#experience", icon: <Briefcase className="h-4 w-4" /> },
  { id: "education", label: "Education", href: "#education", icon: <GraduationCap className="h-4 w-4" /> },
  { id: "contact", label: "Contact", href: "#contact", icon: <Mail className="h-4 w-4" /> },
]

export function NavigationPill({
  items = DEFAULT_NAV_ITEMS,
  activeId: controlledActiveId,
  onItemClick,
  className,
}: NavigationPillProps) {
  const [internalActiveSection, setInternalActiveSection] = React.useState<string>(
    items[0]?.id || "home"
  )
  const activeSection = controlledActiveId ?? internalActiveSection

  // Track active section via IntersectionObserver & scroll fallback
  React.useEffect(() => {
    if (controlledActiveId) return

    const sectionIds = items.map((item) => item.id)
    const elements = sectionIds
      .map((id) => document.getElementById(id) || (id === "technology" ? document.getElementById("skills") : null))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio or proximity to viewport center
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          const targetId = visibleEntries[0].target.id
          // Normalize technology/skills id
          const resolvedId = targetId === "skills" ? "technology" : targetId
          setInternalActiveSection(resolvedId)
        }
      },
      {
        rootMargin: "-25% 0px -40% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    )

    elements.forEach((el) => observer.observe(el))

    const handleScroll = () => {
      if (window.scrollY < 80) {
        setInternalActiveSection(items[0]?.id || "home")
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [items, controlledActiveId])

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault()
    setInternalActiveSection(item.id)
    onItemClick?.(item.id)

    const targetId = (item.href ? item.href.replace("#", "") : item.id)
    let target = document.getElementById(targetId)

    // Handle alias (skills <-> technology)
    if (!target && targetId === "technology") {
      target = document.getElementById("skills")
    } else if (!target && targetId === "skills") {
      target = document.getElementById("technology")
    }

    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      role="navigation"
      aria-label="Section Navigation"
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "flex items-center gap-1 p-1.5 sm:p-2",
        "rounded-full max-w-[95vw]",
        "bg-[var(--md-sys-color-surface-container-high)]/92 backdrop-blur-lg",
        "border border-[var(--md-sys-color-outline-variant)]/30",
        "shadow-lg shadow-black/10 dark:shadow-black/30",
        className
      )}
    >
      {items.map((item) => {
        const isActive =
          activeSection === item.id ||
          (item.id === "technology" && activeSection === "skills") ||
          (item.id === "skills" && activeSection === "technology")

        return (
          <button
            key={item.id}
            type="button"
            onClick={(e) => handleNavClick(e, item)}
            aria-current={isActive ? "page" : undefined}
            aria-label={item.label}
            title={item.label}
            className={cn(
              "relative flex items-center justify-center gap-1.5 rounded-full px-3 py-2 sm:px-3.5 sm:py-2 text-xs font-medium cursor-pointer select-none",
              "transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
              "focus-visible:outline-2 focus-visible:outline-[var(--md-sys-color-primary)] focus-visible:outline-offset-1",
              isActive
                ? "text-[var(--md-sys-color-on-primary-container)] font-semibold"
                : "text-[var(--md-sys-color-on-surface-variant)] hover:text-[var(--md-sys-color-on-surface)]"
            )}
          >
            {/* Sliding Active Pill Indicator */}
            {isActive && (
              <motion.span
                layoutId="m3-active-nav"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 28,
                }}
                className="absolute inset-0 rounded-full bg-[var(--md-sys-color-primary-container)] shadow-xs"
              />
            )}

            {/* Material 3 Hover State Layer */}
            <span
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none rounded-[inherit] bg-current opacity-0 transition-opacity duration-200 hover:opacity-[0.08]"
            />

            {/* Icon */}
            {item.icon && (
              <span className="relative z-10 flex shrink-0 items-center justify-center">
                {item.icon}
              </span>
            )}

            {/* Label (Responsive: hidden on very narrow screens if item is not active, or visible on md+) */}
            <span
              className={cn(
                "relative z-10 whitespace-nowrap font-mono tracking-tight text-[11px] sm:text-xs",
                isActive ? "inline-block" : "hidden md:inline-block"
              )}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

NavigationPill.displayName = "M3NavigationPill"
export default NavigationPill
