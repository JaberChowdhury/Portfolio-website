"use client"

import { Dot } from "@/components/pouf/media"
import { Stack } from "@/components/pouf/layout"
import { Card } from "@/components/pouf/surface"
import { Heading, Highlight, Text } from "@/components/pouf/text"
import { Status } from "@/components/pouf/status"
import type { Tone } from "@/components/pouf/tone"

const tones: Tone[] = ["pink", "purple", "blue", "mint", "yellow", "orange"]

export default function BadgeShowcase() {
  return (
    <Stack gap={5}>
      <Card>
        <Stack gap={4}>
          <div className="flex flex-col gap-(--s1)">
            <Heading level={3}>Highlights</Heading>
            <Text muted>The reference&apos;s marker behind a word.</Text>
          </div>
          <div className="flex flex-wrap gap-(--s3)">
            {tones.map((tone) => (
              <Highlight key={tone} tone={tone}>
                Highlight
              </Highlight>
            ))}
          </div>
        </Stack>
      </Card>

      <Card>
        <Stack gap={4}>
          <Heading level={3}>Status</Heading>
          <div className="flex flex-col gap-(--s3)">
            <Status label="Deployed" tone="up" />
            <Status label="Building" tone="info" />
            <Status label="Rolling back" tone="down" />
            <Status label="Awaiting review" tone="warn" />
            <Status label="Idle" tone="idle" />
          </div>
        </Stack>
      </Card>

      <Card>
        <Stack gap={4}>
          <Heading level={3}>Dots</Heading>
          <div className="flex flex-wrap items-center gap-(--s4)">
            {tones.map((tone) => (
              <span key={tone} className="inline-flex items-center gap-2">
                <Dot tone={tone} />
                <Text size="sm">{tone}</Text>
              </span>
            ))}
          </div>
        </Stack>
      </Card>
    </Stack>
  )
}
