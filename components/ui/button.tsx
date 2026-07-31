import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border-0 font-semibold whitespace-nowrap outline-none select-none transition-all duration-150 ease-[cubic-bezier(0.2,0.7,0.3,1)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[color-mix(in_oklch,var(--ring)_80%,var(--primary))] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:translate-y-0 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_4px_0_0_var(--primary-edge),0_6px_12px_-3px_var(--btn-cast)] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--primary-edge),0_12px_22px_-4px_var(--btn-cast)] active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--primary-edge)]",
        coral: "bg-coral text-paper shadow-[0_4px_0_0_var(--coral-edge),0_6px_12px_-3px_var(--btn-cast)] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--coral-edge),0_12px_22px_-4px_var(--btn-cast)] active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--coral-edge)]",
        cyan: "bg-cyan text-paper shadow-[0_4px_0_0_var(--cyan-edge),0_6px_12px_-3px_var(--btn-cast)] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--cyan-edge),0_12px_22px_-4px_var(--btn-cast)] active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--cyan-edge)]",
        outline:
          "border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-paper active:translate-y-px",
        secondary:
          "bg-secondary text-foreground shadow-[0_2px_8px_-2px_var(--btn-cast)] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_-4px_var(--btn-cast)] active:translate-y-px",
        ghost:
          "text-foreground hover:bg-paper-3 hover:text-foreground aria-expanded:bg-paper-3 aria-expanded:text-foreground active:translate-y-px",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_4px_0_0_var(--coral-edge),0_6px_12px_-3px_var(--btn-cast)] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_var(--coral-edge),0_12px_22px_-4px_var(--btn-cast)] active:translate-y-[3px] active:shadow-[0_1px_0_0_var(--coral-edge)]",
        link: "text-cyan underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 gap-1.5 px-5 text-sm",
        xs: "h-7 gap-1 px-3 text-xs",
        sm: "h-8 gap-1 px-4 text-sm",
        lg: "h-11 gap-2 px-6 text-base",
        icon: "size-10",
        "icon-xs": "size-7",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
