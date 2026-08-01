"use client"

import { Avatar } from "@/components/pouf/avatar"
import { Row, Stack } from "@/components/pouf/layout"
import { Card } from "@/components/pouf/surface"
import { Heading, Text } from "@/components/pouf/text"

export default function AvatarShowcase() {
  return (
    <Stack gap={5}>
      <Card>
        <Stack gap={4}>
          <Heading level={3}>Sizes</Heading>
          <Row gap={4} wrap>
            <Avatar size="sm" fallback="JD" />
            <Avatar size="md" fallback="JD" />
            <Avatar size="lg" fallback="JD" />
          </Row>
        </Stack>
      </Card>

      <Card>
        <Stack gap={4}>
          <Heading level={3}>Tones</Heading>
          <Row gap={3} wrap>
            <Avatar tone="purple" icon="sparkle" />
            <Avatar tone="pink" icon="heart" />
            <Avatar tone="blue" icon="wind" />
            <Avatar tone="mint" icon="drop" />
            <Avatar tone="yellow" icon="sun" />
            <Avatar tone="orange" icon="flame" />
          </Row>
        </Stack>
      </Card>

      <Card>
        <Stack gap={4}>
          <Heading level={3}>Fallbacks</Heading>
          <Row gap={3} wrap>
            <Avatar size="sm" fallback="JC" />
            <Avatar size="md" fallback="JC" />
            <Avatar size="lg" fallback="JC" />
          </Row>
        </Stack>
      </Card>
    </Stack>
  )
}
