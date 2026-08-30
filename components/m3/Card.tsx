"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type M3CardVariant = "elevated" | "filled" | "outlined"
export type M3CardRadius = "sm" | "md" | "lg" | "xl" | "xxl"
export type M3ContainerLevel = "lowest" | "low" | "default" | "high" | "highest"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: M3CardVariant
  radius?: M3CardRadius
  containerLevel?: M3ContainerLevel
  interactive?: boolean
  href?: string
}

const radiusClasses: Record<M3CardRadius, string> = {
  sm: "rounded-[var(--md-sys-shape-corner-sm,8px)]",
  md: "rounded-[var(--md-sys-shape-corner-md,12px)]",
  lg: "rounded-[var(--md-sys-shape-corner-lg,16px)]",
  xl: "rounded-[var(--md-sys-shape-corner-xl,28px)]",
  xxl: "rounded-[48px]",
}

const containerLevelBg: Record<M3ContainerLevel, string> = {
  lowest: "bg-[var(--md-sys-color-surface-container-lowest)]",
  low: "bg-[var(--md-sys-color-surface-container-low)]",
  default: "bg-[var(--md-sys-color-surface-container)]",
  high: "bg-[var(--md-sys-color-surface-container-high)]",
  highest: "bg-[var(--md-sys-color-surface-container-highest)]",
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      variant = "elevated",
      radius = "xl",
      containerLevel,
      interactive = false,
      href,
      ...props
    },
    ref
  ) => {
    // Resolve background based on variant and explicit containerLevel
    const bgClass = containerLevel
      ? containerLevelBg[containerLevel]
      : variant === "elevated"
      ? "bg-[var(--md-sys-color-surface-container-low)]"
      : variant === "filled"
      ? "bg-[var(--md-sys-color-surface-container)]"
      : "bg-[var(--md-sys-color-surface)]"

    const variantClasses = {
      elevated: cn(
        "shadow-sm",
        interactive &&
          "hover:shadow-md hover:-translate-y-0.5 active:shadow-xs active:translate-y-0 transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)]"
      ),
      filled: cn(
        interactive &&
          "hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)]"
      ),
      outlined: cn(
        "border border-[var(--md-sys-color-outline-variant)]",
        interactive &&
          "hover:border-[var(--md-sys-color-outline)] hover:shadow-2xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)]"
      ),
    }[variant]

    const baseClasses = cn(
      "relative overflow-hidden text-[var(--md-sys-color-on-surface)]",
      bgClass,
      radiusClasses[radius],
      variantClasses,
      interactive && "cursor-pointer select-none",
      className
    )

    const content = (
      <>
        {interactive && (
          <span
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none rounded-[inherit] bg-current opacity-0 transition-opacity duration-200 hover:opacity-[0.05] active:opacity-[0.1]"
          />
        )}
        {children}
      </>
    )

    if (href) {
      return (
        <a href={href} className={baseClasses} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {content}
        </a>
      )
    }

    return (
      <div ref={ref} className={baseClasses} {...props}>
        {content}
      </div>
    )
  }
)

Card.displayName = "M3Card"

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "M3CardHeader"

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-bold tracking-tight text-[var(--md-sys-color-on-surface)]",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "M3CardTitle"

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-[var(--md-sys-color-on-surface-variant)]",
      className
    )}
    {...props}
  />
))
CardDescription.displayName = "M3CardDescription"

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "M3CardContent"

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "M3CardFooter"

export default Card
