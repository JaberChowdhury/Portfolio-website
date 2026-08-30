"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export type M3ChipType = "filter" | "assist" | "suggestion"
export type M3ChipShape = "sm" | "md" | "full"

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  chipType?: M3ChipType
  selected?: boolean
  shape?: M3ChipShape
  elevated?: boolean
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  onSelectedChange?: (selected: boolean) => void
}

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      children,
      className,
      chipType = "filter",
      selected = false,
      shape = "sm",
      elevated = false,
      leadingIcon,
      trailingIcon,
      onSelectedChange,
      onClick,
      disabled,
      ...props
    },
    ref
  ) => {
    const isFilter = chipType === "filter"

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return
      if (isFilter && onSelectedChange) {
        onSelectedChange(!selected)
      }
      onClick?.(e)
    }

    // Shape classes
    const shapeClasses: Record<M3ChipShape, string> = {
      sm: "rounded-[var(--md-sys-shape-corner-sm,8px)]",
      md: "rounded-[var(--md-sys-shape-corner-md,12px)]",
      full: "rounded-full",
    }

    // Variant styling depending on chipType and selected state
    let variantClasses = ""
    if (chipType === "filter") {
      if (selected) {
        variantClasses = cn(
          "bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)] font-semibold",
          elevated
            ? "shadow-xs hover:shadow-sm"
            : "border border-transparent"
        )
      } else {
        variantClasses = cn(
          "bg-transparent text-[var(--md-sys-color-on-surface-variant)] border border-[var(--md-sys-color-outline-variant)]",
          elevated && "bg-[var(--md-sys-color-surface-container-low)] shadow-2xs"
        )
      }
    } else if (chipType === "assist") {
      variantClasses = cn(
        "text-[var(--md-sys-color-on-surface)] border border-[var(--md-sys-color-outline-variant)] bg-transparent",
        elevated && "bg-[var(--md-sys-color-surface-container-low)] shadow-2xs hover:shadow-xs"
      )
    } else if (chipType === "suggestion") {
      variantClasses = cn(
        "bg-[var(--md-sys-color-surface-container-low)] text-[var(--md-sys-color-on-surface-variant)] border border-transparent hover:border-[var(--md-sys-color-outline-variant)]",
        elevated && "shadow-2xs hover:shadow-xs"
      )
    }

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-pressed={isFilter ? selected : undefined}
        onClick={handleClick}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 h-8 px-3 text-xs font-medium tracking-wide select-none cursor-pointer",
          "transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
          "focus-visible:outline-2 focus-visible:outline-[var(--md-sys-color-primary)] focus-visible:outline-offset-2",
          "disabled:opacity-38 disabled:pointer-events-none disabled:shadow-none",
          shapeClasses[shape],
          variantClasses,
          className
        )}
        {...props}
      >
        {/* Material 3 State Layer */}
        <span
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-[inherit] bg-current opacity-0 transition-opacity duration-200 hover:opacity-[0.08] active:opacity-[0.12]"
        />

        {/* Leading Checkmark for selected filter chip or custom leading icon */}
        <AnimatePresence initial={false} mode="wait">
          {isFilter && selected ? (
            <motion.span
              key="chip-check"
              initial={{ scale: 0, opacity: 0, width: 0 }}
              animate={{ scale: 1, opacity: 1, width: "auto" }}
              exit={{ scale: 0, opacity: 0, width: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="inline-flex shrink-0 items-center justify-center overflow-hidden"
            >
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            </motion.span>
          ) : leadingIcon ? (
            <motion.span
              key="chip-leading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="inline-flex shrink-0 items-center justify-center"
            >
              {leadingIcon}
            </motion.span>
          ) : null}
        </AnimatePresence>

        {/* Label */}
        {children && <span className="relative z-10 truncate">{children}</span>}

        {/* Trailing Icon */}
        {trailingIcon && (
          <span className="inline-flex shrink-0 items-center justify-center">{trailingIcon}</span>
        )}
      </button>
    )
  }
)

Chip.displayName = "M3Chip"
export default Chip
