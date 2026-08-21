"use client"

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LayoutTemplate } from "lucide-react"

const cardSizes = ["default", "sm"] as const

export default function CardShowcase() {
  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="flex flex-col gap-2">
        <h1
          data-cursor="text"
          className="text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
        >
          Card Showcase
        </h1>
        <p className="text-xs text-muted-foreground sm:text-sm md:text-lg">
          Explore all generated combinations of card layouts and sizes.
        </p>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
        {cardSizes.map((size) => (
          <div
            key={size}
            className="group relative overflow-hidden rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:p-6 dark:bg-card/50 dark:backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative">
              <h2
                data-cursor="text"
                className="mb-4 flex items-center gap-2 border-b pb-3 text-lg font-semibold tracking-tight capitalize sm:mb-6 sm:pb-4 sm:text-xl"
              >
                <LayoutTemplate className="size-5 text-primary" />
                Size: {size}
              </h2>

              <div className="flex flex-col gap-6 sm:gap-8">
                {/* Standard Card */}
                <div>
                  <h3
                    data-cursor="text"
                    className="mb-4 text-sm font-medium text-muted-foreground"
                  >
                    Standard Layout
                  </h3>
                  <Card size={size}>
                    <CardHeader>
                      <CardTitle>Card Title</CardTitle>
                      <CardDescription>
                        This is a description for the card.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Here is some content inside the card. You can place
                        anything here.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button size={size === "sm" ? "sm" : "default"}>
                        Action
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                {/* Card with Action in Header */}
                <div>
                  <h3
                    data-cursor="text"
                    className="mb-4 text-sm font-medium text-muted-foreground"
                  >
                    With Action in Header
                  </h3>
                  <Card size={size}>
                    <CardHeader>
                      <CardTitle>Interactive Card</CardTitle>
                      <CardDescription>
                        Card with a top-right action button.
                      </CardDescription>
                      <CardAction>
                        <Button
                          variant="outline"
                          size={size === "sm" ? "sm" : "default"}
                        >
                          Edit
                        </Button>
                      </CardAction>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Notice how the CardAction component perfectly aligns the
                        button to the right of the header.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
