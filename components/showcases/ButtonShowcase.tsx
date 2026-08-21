"use client"

import { Button } from "@/components/ui/button"
import { Copy, Sparkles, Zap, Loader2 } from "lucide-react"

const buttonConfig = {
  variant: [
    "default",
    "secondary",
    "destructive",
    "outline",
    "ghost",
    "link",
  ] as const,

  size: [
    "default",
    "xs",
    "sm",
    "lg",
    "icon",
    "icon-xs",
    "icon-sm",
    "icon-lg",
  ] as const,
}

const combinations = buttonConfig.variant.flatMap((variant) =>
  buttonConfig.size.map((size) => ({
    variant,
    size,
  }))
)

export default function ButtonShowcase() {
  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          Button Showcase
        </h1>
        <p className="text-xs text-muted-foreground sm:text-sm md:text-lg">
          Explore all{" "}
          <span className="font-semibold text-foreground">
            {combinations.length}
          </span>{" "}
          generated combinations of button variants and sizes.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {buttonConfig.variant.map((variant) => (
          <div
            key={variant}
            className="group relative overflow-hidden rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:p-6 dark:bg-card/50 dark:backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative">
              <h2 className="mb-4 flex items-center gap-2 border-b pb-3 text-lg font-semibold tracking-tight capitalize sm:mb-6 sm:pb-4 sm:text-xl">
                <Sparkles className="size-5 text-primary" />
                {variant}
              </h2>

              <div className="flex flex-col gap-4 sm:gap-6">
                {buttonConfig.size.map((size) => (
                  <div
                    key={`${variant}-${size}`}
                    className="group/item flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex flex-col">
                      <span className="font-mono text-xs font-medium text-foreground sm:text-sm">
                        {size}
                      </span>
                      <span className="text-[10px] text-muted-foreground opacity-0 transition-opacity group-hover/item:opacity-100 sm:text-xs">
                        {`variant="${variant}"`}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
                      {/* Standard render */}
                      <Button
                        variant={variant}
                        size={size}
                        className={
                          size.includes("icon")
                            ? ""
                            : "min-w-[100px] sm:min-w-[120px]"
                        }
                      >
                        {size.includes("icon") ? (
                          <Zap className="size-4" />
                        ) : (
                          "Button"
                        )}
                      </Button>

                      {/* Optional: Show loading state or with icon for specific sizes to show off capabilities */}
                      {!size.includes("icon") &&
                        (size === "default" || size === "lg") && (
                          <Button variant={variant} size={size} disabled>
                            <Loader2 className="mr-2 size-3.5 animate-spin sm:size-4" />
                            Wait
                          </Button>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Code Snippets Section */}
      <div className="relative overflow-hidden rounded-2xl border bg-card p-4 shadow-sm sm:p-8">
        <div className="absolute -top-20 -right-20 size-60 rounded-full bg-primary/5 blur-3xl" />
        <h2 className="mb-4 text-lg font-bold tracking-tight sm:mb-6 sm:text-2xl">
          All Generated JSX ({combinations.length})
        </h2>

        <div className="grid max-h-[400px] gap-2.5 overflow-y-auto pr-2 font-mono text-[11px] sm:gap-3 sm:pr-4 sm:text-xs md:grid-cols-2 xl:grid-cols-3">
          {combinations.map(({ variant, size }) => (
            <div
              key={`${variant}-${size}`}
              className="group flex cursor-pointer items-center justify-between rounded-lg border bg-muted/50 px-3 py-2.5 transition-colors hover:bg-primary/10 hover:text-primary sm:px-4 sm:py-3"
            >
              <code className="truncate">
                {`<Button variant="${variant}" size="${size}" />`}
              </code>
              <Copy className="size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
