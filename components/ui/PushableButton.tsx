"use client"

import React from "react"
import { cn } from "@/lib/utils"

export type PushableVariant =
  | "default"
  | "primary"
  | "rose"
  | "amber"
  | "sky"
  | "emerald"
  | "purple"
  | "coral"
  | "pear"
  | "cyan"
  | "mint"
  | "lavender"
  | "secondary"
  | "outline"
  | "destructive"

export type PushableSize =
  "xs" | "sm" | "default" | "lg" | "icon" | "icon-sm" | "icon-lg"

export interface PushableButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PushableVariant
  size?: PushableSize
  href?: string
  target?: string
  rel?: string
  edgeClassName?: string
  shadowClassName?: string
  frontClassName?: string
  children: React.ReactNode
}

const VARIANT_CONFIGS: Record<
  PushableVariant,
  {
    edgeBg: string
    frontBg: string
    frontText: string
    frontBorder: string
  }
> = {
  default: {
    edgeBg:
      "bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-950 dark:from-zinc-400 dark:via-zinc-300 dark:to-zinc-400",
    frontBg: "bg-zinc-900 dark:bg-zinc-100",
    frontText: "text-zinc-50 dark:text-zinc-950 font-semibold",
    frontBorder: "border border-zinc-700/60 dark:border-zinc-300",
  },
  primary: {
    edgeBg:
      "bg-gradient-to-r from-[var(--color-coral-deep)] via-[var(--color-coral)] to-[var(--color-coral-deep)]",
    frontBg: "bg-[var(--color-coral)]",
    frontText: "text-white font-semibold",
    frontBorder: "border border-[var(--color-coral-light)]/40",
  },
  rose: {
    edgeBg:
      "bg-gradient-to-r from-[var(--color-coral-deep)] via-[var(--color-coral)] to-[var(--color-coral-deep)]",
    frontBg: "bg-[var(--color-coral)]",
    frontText: "text-white font-semibold",
    frontBorder: "border border-[var(--color-coral-light)]/40",
  },
  coral: {
    edgeBg:
      "bg-gradient-to-r from-[var(--color-coral-deep)] via-[var(--color-coral)] to-[var(--color-coral-deep)]",
    frontBg: "bg-[var(--color-coral)]",
    frontText: "text-white font-semibold",
    frontBorder: "border border-[var(--color-coral-light)]/40",
  },
  amber: {
    edgeBg:
      "bg-gradient-to-r from-[var(--color-pear-deep)] via-[var(--color-pear)] to-[var(--color-pear-deep)]",
    frontBg: "bg-[var(--color-pear)]",
    frontText: "text-zinc-950 font-bold",
    frontBorder: "border border-[var(--color-pear-light)]/60",
  },
  pear: {
    edgeBg:
      "bg-gradient-to-r from-[var(--color-pear-deep)] via-[var(--color-pear)] to-[var(--color-pear-deep)]",
    frontBg: "bg-[var(--color-pear)]",
    frontText: "text-zinc-950 font-bold",
    frontBorder: "border border-[var(--color-pear-light)]/60",
  },
  sky: {
    edgeBg:
      "bg-gradient-to-r from-[var(--color-cyan-deep)] via-[var(--color-cyan)] to-[var(--color-cyan-deep)]",
    frontBg: "bg-[var(--color-cyan)]",
    frontText: "text-white font-semibold",
    frontBorder: "border border-[var(--color-cyan-light)]/40",
  },
  cyan: {
    edgeBg:
      "bg-gradient-to-r from-[var(--color-cyan-deep)] via-[var(--color-cyan)] to-[var(--color-cyan-deep)]",
    frontBg: "bg-[var(--color-cyan)]",
    frontText: "text-white font-semibold",
    frontBorder: "border border-[var(--color-cyan-light)]/40",
  },
  emerald: {
    edgeBg:
      "bg-gradient-to-r from-[var(--color-mint-deep)] via-[var(--color-mint)] to-[var(--color-mint-deep)]",
    frontBg: "bg-[var(--color-mint)]",
    frontText: "text-white font-semibold",
    frontBorder: "border border-[var(--color-mint-light)]/40",
  },
  mint: {
    edgeBg:
      "bg-gradient-to-r from-[var(--color-mint-deep)] via-[var(--color-mint)] to-[var(--color-mint-deep)]",
    frontBg: "bg-[var(--color-mint)]",
    frontText: "text-white font-semibold",
    frontBorder: "border border-[var(--color-mint-light)]/40",
  },
  purple: {
    edgeBg:
      "bg-gradient-to-r from-[var(--color-lavender-deep)] via-[var(--color-lavender)] to-[var(--color-lavender-deep)]",
    frontBg: "bg-[var(--color-lavender)]",
    frontText: "text-white font-semibold",
    frontBorder: "border border-[var(--color-lavender-light)]/40",
  },
  lavender: {
    edgeBg:
      "bg-gradient-to-r from-[var(--color-lavender-deep)] via-[var(--color-lavender)] to-[var(--color-lavender-deep)]",
    frontBg: "bg-[var(--color-lavender)]",
    frontText: "text-white font-semibold",
    frontBorder: "border border-[var(--color-lavender-light)]/40",
  },
  secondary: {
    edgeBg:
      "bg-gradient-to-r from-zinc-300 via-zinc-200 to-zinc-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800",
    frontBg: "bg-secondary text-secondary-foreground",
    frontText: "text-foreground font-semibold",
    frontBorder: "border border-border/90",
  },
  outline: {
    edgeBg:
      "bg-gradient-to-r from-zinc-300 via-zinc-200 to-zinc-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800",
    frontBg: "bg-card text-foreground",
    frontText: "text-foreground font-medium",
    frontBorder: "border border-border",
  },
  destructive: {
    edgeBg:
      "bg-gradient-to-r from-red-900 via-red-800 to-red-900 dark:from-red-950 dark:via-red-900 dark:to-red-950",
    frontBg: "bg-[var(--destructive)]",
    frontText: "text-white font-semibold",
    frontBorder: "border border-red-400/40",
  },
}

const SIZE_CONFIGS: Record<
  PushableSize,
  {
    wrapperClass: string
    frontClass: string
  }
> = {
  xs: {
    wrapperClass: "pushable-sm text-xs rounded-lg",
    frontClass: "h-7 px-2.5 text-[11px] rounded-lg",
  },
  sm: {
    wrapperClass: "pushable-sm text-xs rounded-xl",
    frontClass: "h-8.5 px-3.5 text-xs rounded-xl",
  },
  default: {
    wrapperClass: "text-sm rounded-xl sm:rounded-2xl",
    frontClass: "h-10 px-5 text-xs sm:text-sm rounded-xl sm:rounded-2xl",
  },
  lg: {
    wrapperClass: "pushable-lg text-base rounded-2xl",
    frontClass: "h-11 sm:h-12 px-6 sm:px-7 text-sm sm:text-base rounded-2xl",
  },
  icon: {
    wrapperClass: "text-sm rounded-xl",
    frontClass: "h-10 w-10 p-0 rounded-xl",
  },
  "icon-sm": {
    wrapperClass: "pushable-sm text-xs rounded-lg",
    frontClass: "h-8 w-8 p-0 rounded-lg",
  },
  "icon-lg": {
    wrapperClass: "pushable-lg text-base rounded-xl",
    frontClass: "h-12 w-12 p-0 rounded-xl",
  },
}

export const PushableButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  PushableButtonProps
>(
  (
    {
      variant = "default",
      size = "default",
      href,
      target,
      rel,
      className,
      edgeClassName,
      shadowClassName,
      frontClassName,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyle = VARIANT_CONFIGS[variant] || VARIANT_CONFIGS.default
    const sizeStyle = SIZE_CONFIGS[size] || SIZE_CONFIGS.default

    const innerContent = (
      <>
        {/* Layer 1: Bottom Realistic Drop Shadow */}
        <span className={cn("pushable-shadow", shadowClassName)} />

        {/* Layer 2: 3D Side Edge */}
        <span
          className={cn("pushable-edge", variantStyle.edgeBg, edgeClassName)}
        />

        {/* Layer 3: Interactive Front Face */}
        <span
          className={cn(
            "pushable-front",
            sizeStyle.frontClass,
            variantStyle.frontBg,
            variantStyle.frontText,
            variantStyle.frontBorder,
            frontClassName
          )}
        >
          {children}
        </span>
      </>
    )

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          className={cn(
            "pushable-btn group",
            sizeStyle.wrapperClass,
            className
          )}
        >
          {innerContent}
        </a>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={props.type || "button"}
        className={cn("pushable-btn group", sizeStyle.wrapperClass, className)}
        {...props}
      >
        {innerContent}
      </button>
    )
  }
)

PushableButton.displayName = "PushableButton"

export default PushableButton
