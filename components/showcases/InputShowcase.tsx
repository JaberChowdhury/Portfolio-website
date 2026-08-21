"use client"

import { Input } from "@/components/ui/input"
import { Keyboard } from "lucide-react"

export default function InputShowcase() {
  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="flex flex-col gap-2">
        <h1
          data-cursor="text"
          className="text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
        >
          Input Showcase
        </h1>
        <p className="text-xs text-muted-foreground sm:text-sm md:text-lg">
          Explore different input types and states.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Default Input */}
        <div className="group relative overflow-hidden rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:p-6 dark:bg-card/50 dark:backdrop-blur-sm">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <h2 className="mb-4 flex items-center gap-2 border-b pb-3 text-lg font-semibold tracking-tight sm:mb-6 sm:pb-4 sm:text-xl">
              <Keyboard className="size-5 text-primary" />
              Default Input
            </h2>
            <div className="flex flex-col gap-6">
              <Input type="text" placeholder="Enter your name" />
            </div>
          </div>
        </div>

        {/* Email Input */}
        <div className="group relative overflow-hidden rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:p-6 dark:bg-card/50 dark:backdrop-blur-sm">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <h2 className="mb-4 flex items-center gap-2 border-b pb-3 text-lg font-semibold tracking-tight sm:mb-6 sm:pb-4 sm:text-xl">
              <Keyboard className="size-5 text-primary" />
              Email
            </h2>
            <div className="flex flex-col gap-6">
              <Input type="email" placeholder="Email address" />
            </div>
          </div>
        </div>

        {/* Password Input */}
        <div className="group relative overflow-hidden rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:p-6 dark:bg-card/50 dark:backdrop-blur-sm">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <h2 className="mb-4 flex items-center gap-2 border-b pb-3 text-lg font-semibold tracking-tight sm:mb-6 sm:pb-4 sm:text-xl">
              <Keyboard className="size-5 text-primary" />
              Password
            </h2>
            <div className="flex flex-col gap-6">
              <Input type="password" placeholder="Password" />
            </div>
          </div>
        </div>

        {/* File Input */}
        <div className="group relative overflow-hidden rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:p-6 dark:bg-card/50 dark:backdrop-blur-sm">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <h2 className="mb-4 flex items-center gap-2 border-b pb-3 text-lg font-semibold tracking-tight sm:mb-6 sm:pb-4 sm:text-xl">
              <Keyboard className="size-5 text-primary" />
              File Input
            </h2>
            <div className="flex flex-col gap-6">
              <Input type="file" />
            </div>
          </div>
        </div>

        {/* Disabled Input */}
        <div className="group relative overflow-hidden rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:p-6 dark:bg-card/50 dark:backdrop-blur-sm">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <h2 className="mb-4 flex items-center gap-2 border-b pb-3 text-lg font-semibold tracking-tight sm:mb-6 sm:pb-4 sm:text-xl">
              <Keyboard className="size-5 text-primary" />
              Disabled
            </h2>
            <div className="flex flex-col gap-6">
              <Input type="text" placeholder="Disabled input" disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
