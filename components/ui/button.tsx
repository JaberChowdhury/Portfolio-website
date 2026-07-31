import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex items-center gap-1.5 rounded-md text-base font-semibold whitespace-nowrap outline-none select-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default:
          "bg-transparent p-0 text-ink underline-offset-4 hover:text-cyan aria-expanded:text-cyan",
        outline:
          "rounded-full border border-border/40 bg-paper-2 px-6 py-2.5 text-ink hover:border-cyan/50 hover:bg-paper-3 hover:text-cyan",
        secondary:
          "bg-transparent p-0 text-ink-2 hover:text-cyan aria-expanded:text-cyan",
        ghost: "text-ink-2 hover:text-cyan",
        destructive:
          "bg-transparent p-0 text-destructive hover:text-destructive",
        link: "text-cyan underline-offset-4 hover:underline",
      },
      size: {
        default: "h-auto px-0 py-0.5",
        xs: "h-auto px-0 py-0.5 text-xs",
        sm: "h-auto px-0 py-0.5 text-sm",
        lg: "h-auto px-0 py-0.5 text-lg",
        icon: "size-9",
        "icon-xs": "size-6 text-xs",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
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
