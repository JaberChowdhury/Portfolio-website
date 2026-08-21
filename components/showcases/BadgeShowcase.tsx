"use client"

import { Badge } from "@/components/ui/badge"
import { Tag, Check, AlertCircle } from "lucide-react"

const badgeConfig = {
  variant: [
    "default",
    "secondary",
    "destructive",
    "outline",
    "ghost",
    "link",
  ] as const,
}

export default function BadgeShowcase() {
  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="flex flex-col gap-2">
        <h1
          data-cursor="text"
          className="text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
        >
          Badge Showcase
        </h1>
        <p className="text-xs text-muted-foreground sm:text-sm md:text-lg">
          Explore all{" "}
          <span className="font-semibold text-foreground">
            {badgeConfig.variant.length}
          </span>{" "}
          generated combinations of badge variants.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {badgeConfig.variant.map((variant) => (
          <div
            key={variant}
            className="group relative overflow-hidden rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:p-6 dark:bg-card/50 dark:backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative">
              <h2
                data-cursor="text"
                className="mb-4 flex items-center gap-2 border-b pb-3 text-lg font-semibold tracking-tight capitalize sm:mb-6 sm:pb-4 sm:text-xl"
              >
                <Tag className="size-5 text-primary" />
                {variant}
              </h2>

              <div className="flex flex-col gap-6">
                <div className="group/item flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    {/* Standard render */}
                    <Badge variant={variant}>{variant}</Badge>

                    {/* With Icon */}
                    <Badge variant={variant} data-icon="inline-start">
                      {variant === "destructive" ? (
                        <AlertCircle className="mr-1 size-3" />
                      ) : (
                        <Check className="mr-1 size-3" />
                      )}
                      With Icon
                    </Badge>
                  </div>

                  <div className="mt-2 rounded-md bg-muted/50 p-3 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <code className="text-muted-foreground">
                        {`<Badge variant="${variant}">...</Badge>`}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
