"use client"

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import { WordRotate } from "@/components/ui/word-rotate"
import { Meteors } from "@/components/ui/meteors"
import { Globe } from "@/components/ui/globe"
import { MagicCard } from "@/components/ui/magic-card"
import { Sparkles } from "lucide-react"

export default function EffectsShowcase() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h1
          data-cursor="text"
          className="text-4xl font-extrabold tracking-tight lg:text-5xl"
        >
          Effects & Animations
        </h1>
        <p className="text-lg text-muted-foreground">
          Explore dynamic and animated UI components.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Animated Gradient Text */}
        <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md md:col-span-2 dark:bg-card/50 dark:backdrop-blur-sm">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <h2 className="mb-6 flex items-center gap-2 border-b pb-4 text-xl font-semibold tracking-tight">
              <Sparkles className="size-5 text-primary" />
              Text Animations
            </h2>
            <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-around">
              <div className="flex flex-col items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  Animated Gradient Text
                </p>
                <div className="text-3xl font-bold">
                  <AnimatedGradientText>
                    Beautiful Gradients
                  </AnimatedGradientText>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <p className="text-sm text-muted-foreground">Word Rotate</p>
                <div className="text-3xl font-bold">
                  <WordRotate
                    words={["Interactive", "Dynamic", "Engaging", "Beautiful"]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Magic Card */}
        <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md dark:bg-card/50 dark:backdrop-blur-sm">
          <div className="relative">
            <h2 className="mb-6 flex items-center gap-2 border-b pb-4 text-xl font-semibold tracking-tight">
              <Sparkles className="size-5 text-primary" />
              Magic Card
            </h2>
            <div className="flex h-[300px] flex-col gap-6">
              <MagicCard className="flex size-full cursor-pointer flex-col items-center justify-center shadow-2xl">
                <p className="z-10 text-4xl font-medium whitespace-nowrap text-foreground">
                  Magic Card
                </p>
                <p className="z-10 mt-2 text-sm text-muted-foreground">
                  Hover over me
                </p>
              </MagicCard>
            </div>
          </div>
        </div>

        {/* Meteors */}
        <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md dark:bg-card/50 dark:backdrop-blur-sm">
          <div className="relative">
            <h2 className="mb-6 flex items-center gap-2 border-b pb-4 text-xl font-semibold tracking-tight">
              <Sparkles className="size-5 text-primary" />
              Meteors Effect
            </h2>
            <div className="relative flex h-[300px] flex-col items-center justify-center overflow-hidden rounded-xl border bg-background">
              <Meteors number={20} />
              <p className="z-10 text-3xl font-medium whitespace-nowrap text-foreground">
                Meteors
              </p>
            </div>
          </div>
        </div>

        {/* Globe */}
        <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md md:col-span-2 dark:bg-card/50 dark:backdrop-blur-sm">
          <div className="relative">
            <h2 className="mb-6 flex items-center gap-2 border-b pb-4 text-xl font-semibold tracking-tight">
              <Sparkles className="size-5 text-primary" />
              Interactive Globe
            </h2>
            <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border bg-background pb-40">
              <span className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-5xl leading-none font-semibold whitespace-nowrap text-transparent dark:from-white dark:to-slate-900/10">
                Global Reach
              </span>
              <Globe className="top-28" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
