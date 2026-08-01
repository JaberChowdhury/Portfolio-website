"use client"

import { useState } from "react"
import { Accordion, Tabs } from "@/components/pouf/disclosure"
import { Segmented } from "@/components/pouf/Segmented"
import { Stack } from "@/components/pouf/layout"
import { Card } from "@/components/pouf/surface"
import { Heading, Text } from "@/components/pouf/text"

export default function TabsShowcase() {
  const [tab, setTab] = useState("overview")
  const [view, setView] = useState<"grid" | "list">("grid")

  return (
    <Stack gap={5}>
      <Card>
        <Stack gap={4}>
          <Heading level={3}>Tabs</Heading>
          <Tabs
            value={tab}
            onChange={setTab}
            tabs={[
              {
                value: "overview",
                label: "Overview",
                content: <Text>Overview panel — a summary of everything.</Text>,
              },
              {
                value: "analytics",
                label: "Analytics",
                content: <Text>Analytics panel — charts and numbers.</Text>,
              },
              {
                value: "reports",
                label: "Reports",
                content: <Text>Reports panel — downloadable exports.</Text>,
              },
            ]}
          />
        </Stack>
      </Card>

      <Card>
        <Stack gap={4}>
          <Heading level={3}>Segmented</Heading>
          <Segmented
            label="View"
            value={view}
            onChange={setView}
            options={[
              { value: "grid", label: "Grid" },
              { value: "list", label: "List" },
            ]}
          />
        </Stack>
      </Card>

      <Card>
        <Stack gap={4}>
          <Heading level={3}>Accordion</Heading>
          <Accordion
            items={[
              { value: "one", title: "First panel", children: <Text>Content for the first panel.</Text> },
              { value: "two", title: "Second panel", children: <Text>Content for the second panel.</Text> },
              { value: "three", title: "Third panel", children: <Text>Content for the third panel.</Text> },
            ]}
          />
        </Stack>
      </Card>
    </Stack>
  )
}
