"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useMounted } from "@/hooks/use-mounted"

interface ThemeToggleProps {
  showKeyIndicator?: boolean
  className?: string
}

export function ThemeToggle({
  showKeyIndicator = true,
  className = "",
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()

  const isDark = mounted && resolvedTheme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to Light theme" : "Switch to Dark theme"}
        title="Toggle theme (Press D)"
        className="group relative flex h-8 items-center gap-2 rounded-full border border-border/80 bg-card/80 px-2.5 text-card-foreground shadow-2xs backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-pear)]/50 hover:bg-secondary/60 active:scale-95 sm:h-8.5 sm:px-3"
      >
        {/* Dynamic Theme Icon with smooth transition */}
        <div className="relative flex h-4 w-4 items-center justify-center sm:h-4.5 sm:w-4.5">
          {mounted ? (
            isDark ? (
              <Moon className="h-3.5 w-3.5 text-[var(--color-cyan)] transition-transform duration-300 group-hover:-rotate-12 sm:h-4 sm:w-4" />
            ) : (
              <Sun className="h-3.5 w-3.5 text-[var(--color-pear)] transition-transform duration-300 group-hover:rotate-45 sm:h-4 sm:w-4" />
            )
          ) : (
            <span className="h-3.5 w-3.5 animate-pulse rounded-full bg-muted-foreground/30" />
          )}
        </div>

        {/* Theme label */}
        <span className="font-mono text-[11px] font-semibold text-muted-foreground transition-colors group-hover:text-foreground sm:text-xs">
          {mounted ? (isDark ? "Dark" : "Light") : "Theme"}
        </span>

        {/* 'D' Hotkey Indicator Tag */}
        {showKeyIndicator && (
          <kbd
            aria-hidden="true"
            className="ml-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded border border-border/70 bg-secondary/80 px-1 font-mono text-[9px] font-bold text-muted-foreground shadow-2xs group-hover:border-[var(--color-pear)]/40 group-hover:text-foreground sm:h-4.5 sm:min-w-4.5 sm:text-[10px]"
            title="Press D key on your keyboard"
          >
            D
          </kbd>
        )}
      </button>
    </div>
  )
}

export default ThemeToggle
