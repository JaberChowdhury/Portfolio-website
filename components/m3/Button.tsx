"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export type M3ButtonVariant = "elevated" | "filled" | "tonal" | "outlined" | "text"
export type M3ButtonSize = "sm" | "md" | "lg"
export type M3ButtonShape = "full" | "lg" | "md"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: M3ButtonVariant
  size?: M3ButtonSize
  shape?: M3ButtonShape
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  href?: string
  target?: string
  rel?: string
  loading?: boolean
}

interface Ripple {
  id: number
  x: number
  y: number
  size: number
}

const variantStyles: Record<M3ButtonVariant, string> = {
  filled:
    "bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] shadow-none hover:shadow-md active:shadow-none",
  elevated:
    "bg-[var(--md-sys-color-surface-container-low)] text-[var(--md-sys-color-primary)] shadow-sm hover:shadow-md active:shadow-xs",
  tonal:
    "bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)] shadow-none hover:shadow-xs",
  outlined:
    "border border-[var(--md-sys-color-outline-variant)] text-[var(--md-sys-color-primary)] bg-transparent hover:border-[var(--md-sys-color-outline)]",
  text: "bg-transparent text-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-primary)]/8",
}

const sizeStyles: Record<M3ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
}

const shapeStyles: Record<M3ButtonShape, string> = {
  full: "rounded-full",
  lg: "rounded-[var(--md-sys-shape-corner-lg,16px)]",
  md: "rounded-[var(--md-sys-shape-corner-md,12px)]",
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "filled",
      size = "md",
      shape = "full",
      leadingIcon,
      trailingIcon,
      href,
      target,
      rel,
      loading = false,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = React.useState<Ripple[]>([])
    const internalRef = React.useRef<HTMLButtonElement | null>(null)

    // Handle ripple creation on pointer down
    const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
      const button = internalRef.current || (e.currentTarget as HTMLButtonElement)
      if (!button || disabled || loading) return

      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 2.2
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x,
        y,
        size,
      }

      setRipples((prev) => [...prev.slice(-3), newRipple])
    }

    const removeRipple = (id: number) => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }

    const combinedClassName = cn(
      "relative inline-flex items-center justify-center font-medium select-none overflow-hidden",
      "transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "focus-visible:outline-2 focus-visible:outline-[var(--md-sys-color-primary)] focus-visible:outline-offset-2",
      "disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none",
      variantStyles[variant],
      sizeStyles[size],
      shapeStyles[shape],
      className
    )

    const content = (
      <>
        {/* Material 3 State Layer */}
        <span
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-[inherit] bg-current opacity-0 transition-opacity duration-200 hover:opacity-[0.08] active:opacity-[0.12]"
        />

        {/* Dynamic Ripple Layer */}
        <span aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
          <AnimatePresence>
            {ripples.map((ripple) => (
              <motion.span
                key={ripple.id}
                initial={{ scale: 0, opacity: 0.35 }}
                animate={{ scale: 1, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.2, 0, 0, 1] }}
                onAnimationComplete={() => removeRipple(ripple.id)}
                style={{
                  position: "absolute",
                  left: ripple.x,
                  top: ripple.y,
                  width: ripple.size,
                  height: ripple.size,
                  borderRadius: "50%",
                  backgroundColor: "currentColor",
                }}
              />
            ))}
          </AnimatePresence>
        </span>

        {/* Leading Icon / Spinner */}
        {loading ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : leadingIcon ? (
          <span className="inline-flex shrink-0 items-center justify-center">{leadingIcon}</span>
        ) : null}

        {/* Label */}
        {children && <span className="relative z-10 truncate">{children}</span>}

        {/* Trailing Icon */}
        {!loading && trailingIcon && (
          <span className="inline-flex shrink-0 items-center justify-center">{trailingIcon}</span>
        )}
      </>
    )

    if (href) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          onPointerDown={handlePointerDown}
          className={combinedClassName}
          aria-disabled={disabled}
        >
          {content}
        </a>
      )
    }

    return (
      <button
        ref={(el) => {
          internalRef.current = el
          if (typeof ref === "function") {
            ref(el)
          } else if (ref) {
            ;(ref as React.MutableRefObject<HTMLButtonElement | null>).current = el
          }
        }}
        type={props.type || "button"}
        disabled={disabled || loading}
        onPointerDown={handlePointerDown}
        onClick={onClick}
        className={combinedClassName}
        {...props}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = "M3Button"
export default Button
