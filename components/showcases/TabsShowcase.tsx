"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Layout } from "lucide-react"

export default function TabsShowcase() {
  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h1
          data-cursor="text"
          className="text-4xl font-extrabold tracking-tight lg:text-5xl"
        >
          Tabs Showcase
        </h1>
        <p className="text-lg text-muted-foreground">
          Explore horizontal and vertical tabs with different styles.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Default Horizontal Tabs */}
        <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md dark:bg-card/50 dark:backdrop-blur-sm">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <h2 className="mb-6 flex items-center gap-2 border-b pb-4 text-xl font-semibold tracking-tight">
              <Layout className="size-5 text-primary" />
              Default Horizontal
            </h2>
            <div className="flex flex-col gap-6">
              <Tabs defaultValue="tab1">
                <TabsList>
                  <TabsTrigger value="tab1">Account</TabsTrigger>
                  <TabsTrigger value="tab2">Password</TabsTrigger>
                  <TabsTrigger value="tab3" disabled>
                    Settings (Disabled)
                  </TabsTrigger>
                </TabsList>
                <div className="mt-4 rounded-md border p-4 text-sm text-muted-foreground">
                  <TabsContent value="tab1">
                    Make changes to your account here.
                  </TabsContent>
                  <TabsContent value="tab2">
                    Change your password here.
                  </TabsContent>
                  <TabsContent value="tab3">
                    Adjust your settings here.
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Line Variant Tabs */}
        <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md dark:bg-card/50 dark:backdrop-blur-sm">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <h2 className="mb-6 flex items-center gap-2 border-b pb-4 text-xl font-semibold tracking-tight">
              <Layout className="size-5 text-primary" />
              Line Variant
            </h2>
            <div className="flex flex-col gap-6">
              <Tabs defaultValue="tab1">
                <TabsList variant="line">
                  <TabsTrigger value="tab1">Overview</TabsTrigger>
                  <TabsTrigger value="tab2">Analytics</TabsTrigger>
                  <TabsTrigger value="tab3">Reports</TabsTrigger>
                </TabsList>
                <div className="mt-4 rounded-md border p-4 text-sm text-muted-foreground">
                  <TabsContent value="tab1">
                    Overview of your data.
                  </TabsContent>
                  <TabsContent value="tab2">
                    Detailed analytics.
                  </TabsContent>
                  <TabsContent value="tab3">
                    Downloadable reports.
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Vertical Tabs */}
        <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md dark:bg-card/50 dark:backdrop-blur-sm md:col-span-2">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative">
            <h2 className="mb-6 flex items-center gap-2 border-b pb-4 text-xl font-semibold tracking-tight">
              <Layout className="size-5 text-primary" />
              Vertical Tabs
            </h2>
            <div className="flex flex-col gap-6">
              <Tabs orientation="vertical" defaultValue="tab1" className="flex gap-6">
                <TabsList className="w-48">
                  <TabsTrigger value="tab1">Profile</TabsTrigger>
                  <TabsTrigger value="tab2">Billing</TabsTrigger>
                  <TabsTrigger value="tab3">Notifications</TabsTrigger>
                </TabsList>
                <div className="flex-1 rounded-md border p-4 text-sm text-muted-foreground">
                  <TabsContent value="tab1">
                    Update your profile information.
                  </TabsContent>
                  <TabsContent value="tab2">
                    Manage your billing details.
                  </TabsContent>
                  <TabsContent value="tab3">
                    Configure your notifications.
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
