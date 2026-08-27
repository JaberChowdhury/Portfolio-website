"use client"

import React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

export const buttonVariants = cva(
  "pushable-btn outline-none select-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        primary: "",
        rose: "",
        amber: "",
        sky: "",
        emerald: "",
        purple: "",
        secondary: "",
        outline: "",
        ghost:
          "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        destructive: "",
        link: "inline-flex items-center justify-center text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "text-sm",
        xs: "pushable-sm text-xs",
        sm: "pushable-sm text-xs",
        lg: "pushable-lg text-base",
        icon: "text-sm",
        "icon-xs": "pushable-sm text-xs",
        "icon-sm": "pushable-sm text-xs",
        "icon-lg": "pushable-lg text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type ButtonVariant =
  | "default"
  | "primary"
  | "rose"
  | "amber"
  | "sky"
  | "emerald"
  | "purple"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link"

export type ButtonSize =
  "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  target?: string
  rel?: string
  edgeClassName?: string
  shadowClassName?: string
  frontClassName?: string
}

const VARIANT_LAYERS: Record<
  string,
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
      "bg-gradient-to-r from-[hsl(340deg_100%_18%)] via-[hsl(340deg_100%_30%)] to-[hsl(340deg_100%_18%)]",
    frontBg: "bg-rose-600 dark:bg-rose-500",
    frontText: "text-white font-semibold",
    frontBorder: "border border-rose-400/40",
  },
  rose: {
    edgeBg:
      "bg-gradient-to-r from-[hsl(340deg_100%_18%)] via-[hsl(340deg_100%_30%)] to-[hsl(340deg_100%_18%)]",
    frontBg: "bg-rose-600 dark:bg-rose-500",
    frontText: "text-white font-semibold",
    frontBorder: "border border-rose-400/40",
  },
  amber: {
    edgeBg:
      "bg-gradient-to-r from-[hsl(35deg_100%_20%)] via-[hsl(38deg_100%_34%)] to-[hsl(35deg_100%_20%)]",
    frontBg: "bg-amber-500",
    frontText: "text-zinc-950 font-bold",
    frontBorder: "border border-amber-300/60",
  },
  sky: {
    edgeBg:
      "bg-gradient-to-r from-[hsl(200deg_100%_18%)] via-[hsl(200deg_100%_30%)] to-[hsl(200deg_100%_18%)]",
    frontBg: "bg-sky-600 dark:bg-sky-500",
    frontText: "text-white font-semibold",
    frontBorder: "border border-sky-400/40",
  },
  emerald: {
    edgeBg:
      "bg-gradient-to-r from-[hsl(155deg_100%_15%)] via-[hsl(155deg_100%_26%)] to-[hsl(155deg_100%_15%)]",
    frontBg: "bg-emerald-600 dark:bg-emerald-500",
    frontText: "text-white font-semibold",
    frontBorder: "border border-emerald-400/40",
  },
  purple: {
    edgeBg:
      "bg-gradient-to-r from-[hsl(270deg_100%_20%)] via-[hsl(270deg_100%_34%)] to-[hsl(270deg_100%_20%)]",
    frontBg: "bg-purple-600 dark:bg-purple-500",
    frontText: "text-white font-semibold",
    frontBorder: "border border-purple-400/40",
  },
  secondary: {
    edgeBg:
      "bg-gradient-to-r from-zinc-300 via-zinc-200 to-zinc-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800",
    frontBg: "bg-secondary",
    frontText: "text-foreground font-semibold",
    frontBorder: "border border-border/90",
  },
  outline: {
    edgeBg:
      "bg-gradient-to-r from-zinc-300 via-zinc-200 to-zinc-300 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800",
    frontBg: "bg-card",
    frontText: "text-foreground font-medium",
    frontBorder: "border border-border",
  },
  destructive: {
    edgeBg:
      "bg-gradient-to-r from-[hsl(0deg_100%_18%)] via-[hsl(0deg_100%_30%)] to-[hsl(0deg_100%_18%)]",
    frontBg: "bg-red-600 dark:bg-red-500",
    frontText: "text-white font-semibold",
    frontBorder: "border border-red-400/40",
  },
}

const SIZE_LAYERS: Record<
  string,
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
  "icon-xs": {
    wrapperClass: "pushable-sm text-xs rounded-lg",
    frontClass: "h-7 w-7 p-0 rounded-lg",
  },
  "icon-sm": {
    wrapperClass: "pushable-sm text-xs rounded-lg",
    frontClass: "h-8.5 w-8.5 p-0 rounded-lg",
  },
  "icon-lg": {
    wrapperClass: "pushable-lg text-base rounded-xl",
    frontClass: "h-12 w-12 p-0 rounded-xl",
  },
}

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      className,
      variant = "default",
      size = "default",
      href,
      target,
      rel,
      edgeClassName,
      shadowClassName,
      frontClassName,
      children,
      ...props
    },
    ref
  ) => {
    // Non-3D flat variants
    if (variant === "ghost" || variant === "link") {
      if (href) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target={target}
            rel={rel}
            className={cn(buttonVariants({ variant, size, className }))}
          >
            {children}
          </a>
        )
      }
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type={props.type || "button"}
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        >
          {children}
        </button>
      )
    }

    const vLayer = VARIANT_LAYERS[variant] || VARIANT_LAYERS.default
    const sLayer = SIZE_LAYERS[size] || SIZE_LAYERS.default

    const innerContent = (
      <>
        {/* Layer 1: Ambient Drop Shadow */}
        <span className={cn("pushable-shadow", shadowClassName)} />

        {/* Layer 2: 3D Extruded Edge */}
        <span className={cn("pushable-edge", vLayer.edgeBg, edgeClassName)} />

        {/* Layer 3: Interactive Front Face */}
        <span
          className={cn(
            "pushable-front",
            sLayer.frontClass,
            vLayer.frontBg,
            vLayer.frontText,
            vLayer.frontBorder,
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
          className={cn("pushable-btn group", sLayer.wrapperClass, className)}
        >
          {innerContent}
        </a>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={props.type || "button"}
        className={cn("pushable-btn group", sLayer.wrapperClass, className)}
        {...props}
      >
        {innerContent}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button
