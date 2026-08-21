"use client"

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import { WordRotate } from "@/components/ui/word-rotate"
import { Meteors } from "@/components/ui/meteors"
import { Globe } from "@/components/ui/globe"
import { MagicCard } from "@/components/ui/magic-card"
import { Sparkles } from "lucide-react"

export default function EffectsShowcase() {
  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="flex flex-col gap-2">
        <h1
          data-cursor="text"
          className="text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
        >
          Effects & Animations
        </h1>
        <p className="text-xs text-muted-foreground sm:text-sm md:text-lg">
          Explore dynamic and animated UI components.
        </p>
      </div>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
        {/* Animated Gradient Text */}
        <div className="group relative overflow-hidden rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:p-6 md:col-span-2 dark:bg-card/50 dark:backdrop-blur-sm">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <h2 className="mb-4 flex items-center gap-2 border-b pb-3 text-lg font-semibold tracking-tight sm:mb-6 sm:pb-4 sm:text-xl">
              <Sparkles className="size-5 text-primary" />
              Text Animations
            </h2>
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-around">
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <p className="text-xs text-muted-foreground sm:text-sm">
                  Animated Gradient Text
                </p>
                <div className="text-center text-2xl font-bold sm:text-3xl">
                  <AnimatedGradientText>
                    Beautiful Gradients
                  </AnimatedGradientText>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <p className="text-xs text-muted-foreground sm:text-sm">
                  Word Rotate
                </p>
                <div className="text-center text-2xl font-bold sm:text-3xl">
                  <WordRotate
                    words={["Interactive", "Dynamic", "Engaging", "Beautiful"]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Magic Card */}
        <div className="group relative overflow-hidden rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:p-6 dark:bg-card/50 dark:backdrop-blur-sm">
          <div className="relative">
            <h2 className="mb-4 flex items-center gap-2 border-b pb-3 text-lg font-semibold tracking-tight sm:mb-6 sm:pb-4 sm:text-xl">
              <Sparkles className="size-5 text-primary" />
              Magic Card
            </h2>
            <div className="flex h-[240px] flex-col gap-6 sm:h-[300px]">
              <MagicCard className="flex size-full cursor-pointer flex-col items-center justify-center shadow-2xl">
                <p className="z-10 text-2xl font-medium text-foreground sm:text-4xl">
                  Magic Card
                </p>
                <p className="z-10 mt-2 text-xs text-muted-foreground sm:text-sm">
                  Hover over me
                </p>
              </MagicCard>
            </div>
          </div>
        </div>

        {/* Meteors */}
        <div className="group relative overflow-hidden rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:p-6 dark:bg-card/50 dark:backdrop-blur-sm">
          <div className="relative">
            <h2 className="mb-4 flex items-center gap-2 border-b pb-3 text-lg font-semibold tracking-tight sm:mb-6 sm:pb-4 sm:text-xl">
              <Sparkles className="size-5 text-primary" />
              Meteors Effect
            </h2>
            <div className="relative flex h-[240px] flex-col items-center justify-center overflow-hidden rounded-xl border bg-background sm:h-[300px]">
              <Meteors number={20} />
              <p className="z-10 text-2xl font-medium text-foreground sm:text-3xl">
                Meteors
              </p>
            </div>
          </div>
        </div>

        {/* Globe */}
        <div className="group relative overflow-hidden rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:p-6 md:col-span-2 dark:bg-card/50 dark:backdrop-blur-sm">
          <div className="relative">
            <h2 className="mb-4 flex items-center gap-2 border-b pb-3 text-lg font-semibold tracking-tight sm:mb-6 sm:pb-4 sm:text-xl">
              <Sparkles className="size-5 text-primary" />
              Interactive Globe
            </h2>
            <div className="relative flex h-[340px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border bg-background pb-32 sm:h-[500px] sm:pb-40">
              <span className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-3xl leading-none font-semibold text-transparent sm:text-5xl dark:from-white dark:to-slate-900/10">
                Global Reach
              </span>
              <Globe className="top-24 sm:top-28" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
