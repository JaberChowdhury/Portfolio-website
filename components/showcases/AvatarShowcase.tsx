"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
} from "@/components/ui/avatar"
import { Users, Check } from "lucide-react"

export default function AvatarShowcase() {
  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="flex flex-col gap-2">
        <h1
          data-cursor="text"
          className="text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
        >
          Avatar Showcase
        </h1>
        <p className="text-xs text-muted-foreground sm:text-sm md:text-lg">
          Explore all configurations of avatars and avatar groups.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Standard Avatars */}
        <div className="group relative overflow-hidden rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:p-6 dark:bg-card/50 dark:backdrop-blur-sm">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <h2 className="mb-4 flex items-center gap-2 border-b pb-3 text-lg font-semibold tracking-tight sm:mb-6 sm:pb-4 sm:text-xl">
              <Users className="size-5 text-primary" />
              Standard Sizes
            </h2>
            <div className="flex flex-col gap-6">
              <div className="flex items-end gap-4">
                <Avatar size="sm">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar size="default">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>

        {/* Fallbacks */}
        <div className="group relative overflow-hidden rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:p-6 dark:bg-card/50 dark:backdrop-blur-sm">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <h2 className="mb-4 flex items-center gap-2 border-b pb-3 text-lg font-semibold tracking-tight sm:mb-6 sm:pb-4 sm:text-xl">
              <Users className="size-5 text-primary" />
              Fallbacks
            </h2>
            <div className="flex flex-col gap-6">
              <div className="flex items-end gap-4">
                <Avatar size="sm">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <Avatar size="default">
                  <AvatarFallback>MD</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarFallback>LG</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>

        {/* With Badges */}
        <div className="group relative overflow-hidden rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:p-6 dark:bg-card/50 dark:backdrop-blur-sm">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <h2 className="mb-4 flex items-center gap-2 border-b pb-3 text-lg font-semibold tracking-tight sm:mb-6 sm:pb-4 sm:text-xl">
              <Users className="size-5 text-primary" />
              With Badges
            </h2>
            <div className="flex flex-col gap-6">
              <div className="flex items-end gap-4">
                <Avatar size="sm">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                  <AvatarBadge />
                </Avatar>
                <Avatar size="default">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                  <AvatarBadge className="bg-green-500" />
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                  <AvatarBadge>
                    <Check className="text-white" />
                  </AvatarBadge>
                </Avatar>
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Groups */}
        <div className="group relative overflow-hidden rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md sm:p-6 xl:col-span-3 dark:bg-card/50 dark:backdrop-blur-sm">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <h2 className="mb-4 flex items-center gap-2 border-b pb-3 text-lg font-semibold tracking-tight sm:mb-6 sm:pb-4 sm:text-xl">
              <Users className="size-5 text-primary" />
              Avatar Groups
            </h2>
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                <AvatarGroup>
                  <Avatar size="sm">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar size="sm">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar size="sm">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <AvatarGroupCount>+3</AvatarGroupCount>
                </AvatarGroup>

                <AvatarGroup>
                  <Avatar size="default">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar size="default">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar size="default">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <AvatarGroupCount>+3</AvatarGroupCount>
                </AvatarGroup>

                <AvatarGroup>
                  <Avatar size="lg">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar size="lg">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar size="lg">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <AvatarGroupCount>+3</AvatarGroupCount>
                </AvatarGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
