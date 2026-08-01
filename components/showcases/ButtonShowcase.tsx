"use client"

import { Button, IconButton } from "@/components/pouf/Button"
import { Icon } from "@/components/pouf/Icon"
import { Row, Stack } from "@/components/pouf/layout"
import { Card } from "@/components/pouf/surface"
import { Heading, Text } from "@/components/pouf/text"
import type { Tone } from "@/components/pouf/tone"

const tones: Tone[] = ["pink", "purple", "blue", "mint", "yellow", "orange"]

export default function ButtonShowcase() {
  return (
    <Stack gap={5}>
      <Card>
        <Stack gap={4}>
          <div className="flex flex-col gap-(--s1)">
            <Heading level={3}>Tones</Heading>
            <Text muted>Solid buttons across every pastel accent — ink on pastel keeps them readable.</Text>
          </div>
          <Row gap={3} wrap>
            {tones.map((tone) => (
              <Button key={tone} tone={tone} size="sm">
                {tone}
              </Button>
            ))}
          </Row>
        </Stack>
      </Card>

      <Card>
        <Stack gap={4}>
          <Heading level={3}>Sizes</Heading>
          <Row gap={3} wrap>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Row>
        </Stack>
      </Card>

      <Card>
        <Stack gap={4}>
          <Heading level={3}>Variants</Heading>
          <Row gap={3} wrap>
            <Button variant="solid">Solid</Button>
            <Button variant="quiet">Quiet</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
          </Row>
          <Button block>Block</Button>
        </Stack>
      </Card>

      <Card>
        <Stack gap={4}>
          <Heading level={3}>Icon buttons</Heading>
          <Row gap={3} wrap>
            <IconButton icon={<Icon name="search" />} label="Search" />
            <IconButton icon={<Icon name="heart" />} label="Like" tone="pink" />
            <IconButton icon={<Icon name="send" />} label="Send" tone="blue" />
            <IconButton icon={<Icon name="star" />} label="Star" tone="yellow" />
            <IconButton icon={<Icon name="remove" />} label="Delete" tone="orange" />
            <IconButton icon={<Icon name="live" />} label="Deploy" tone="mint" loading />
          </Row>
        </Stack>
      </Card>
    </Stack>
  )
}
