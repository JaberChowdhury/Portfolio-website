"use client"

import { Blob } from "@/components/pouf/media"
import { Grid, Row, Stack } from "@/components/pouf/layout"
import { Card, RowCard } from "@/components/pouf/surface"
import { Heading, Text } from "@/components/pouf/text"

export default function CardShowcase() {
  return (
    <Stack gap={5}>
      <div className="flex flex-col gap-(--s1)">
        <Heading level={3}>Variants</Heading>
      </div>
      <Grid cols={3}>
        <Card>
          <Stack gap={2}>
            <Heading level={3}>Default</Heading>
            <Text muted>The reference 32px padding.</Text>
          </Stack>
        </Card>
        <Card variant="tight">
          <Stack gap={2}>
            <Heading level={3}>Tight</Heading>
            <Text muted>16px padding for dense panels.</Text>
          </Stack>
        </Card>
        <Card variant="flush">
          <Stack gap={2}>
            <Heading level={3}>Flush</Heading>
            <Text muted>No padding — wrap your own region.</Text>
          </Stack>
        </Card>
      </Grid>

      <Heading level={3}>Motion</Heading>
      <Grid cols={3}>
        <Card motion="lift">
          <Heading level={3}>Lift</Heading>
        </Card>
        <Card motion="tilt-left">
          <Heading level={3}>Tilt left</Heading>
        </Card>
        <Card motion="tilt-right">
          <Heading level={3}>Tilt right</Heading>
        </Card>
      </Grid>

      <Heading level={3}>RowCard</Heading>
      <Stack gap={2}>
        <RowCard>
          <Row gap={3} wrap={false}>
            <Blob size="sm" icon="flame" tone="orange" />
            <Text>Every row a cushion.</Text>
          </Row>
        </RowCard>
        <RowCard onClick={() => {}}>
          <Row gap={3} wrap={false}>
            <Blob size="sm" icon="sword" tone="purple" />
            <Text>Interactive rows lift on hover.</Text>
          </Row>
        </RowCard>
        <RowCard selected>
          <Row gap={3} wrap={false}>
            <Blob size="sm" icon="shield" tone="pink" />
            <Text>Selected rows press in.</Text>
          </Row>
        </RowCard>
      </Stack>
    </Stack>
  )
}
