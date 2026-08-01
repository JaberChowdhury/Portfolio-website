"use client"

import { useState } from "react"
import { Button, IconButton } from "@/components/pouf/Button"
import { Dialog, Tooltip, TooltipProvider } from "@/components/pouf/controls"
import { Empty, ErrorNote, Skeleton } from "@/components/pouf/feedback"
import { Icon } from "@/components/pouf/Icon"
import { Grid, Row, Stack } from "@/components/pouf/layout"
import { Blob } from "@/components/pouf/media"
import { Progress } from "@/components/pouf/progress"
import { Metric, Stat } from "@/components/pouf/readout"
import { Card } from "@/components/pouf/surface"
import { Heading, Text } from "@/components/pouf/text"

export default function EffectsShowcase() {
  const [progress, setProgress] = useState(40)
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Stack gap={5}>
      <Card>
        <Stack gap={4}>
          <Heading level={3}>Blobs</Heading>
          <Row gap={3} wrap>
            <Blob icon="sparkle" tone="purple" />
            <Blob icon="sword" tone="pink" />
            <Blob icon="shield" tone="blue" />
            <Blob icon="live" tone="yellow" />
            <Blob icon="flame" tone="orange" />
            <Blob icon="smile" tone="mint" size="md" />
          </Row>
        </Stack>
      </Card>

      <Card>
        <Stack gap={4}>
          <Heading level={3}>Stat & Metric</Heading>
          <Grid cols={3}>
            <Stat label="Repositories" value="24" icon="database" tone="purple" />
            <Stat label="Contributions" value="1.4k" icon="performance" tone="blue" />
            <Stat label="Streak" value="12 days" icon="flame" tone="orange" />
          </Grid>
          <Row gap={3} wrap>
            <Metric label="Issues" value={3} />
            <Metric label="Pull requests" value={null} />
            <Metric label="Stars" value={128} />
          </Row>
        </Stack>
      </Card>

      <Card>
        <Stack gap={4}>
          <Heading level={3}>Progress</Heading>
          <div className="flex flex-col gap-(--s3)">
            <Progress value={progress} tone="purple" label="Build progress" />
            <Progress value={progress} tone="mint" label="Test progress" />
            <Progress value={progress} tone="orange" label="Deploy progress" />
          </div>
          <Row gap={3} wrap>
            <IconButton
              icon={<Icon name="flat" />}
              label="Step down"
              variant="solid"
              tone="purple"
              onClick={() => setProgress((p) => Math.max(0, p - 10))}
            />
            <IconButton
              icon={<Icon name="add" />}
              label="Step up"
              variant="solid"
              tone="purple"
              onClick={() => setProgress((p) => Math.min(100, p + 10))}
            />
          </Row>
        </Stack>
      </Card>

      <Card>
        <Stack gap={4}>
          <Heading level={3}>Skeleton</Heading>
          <Skeleton variant="text" count={2} />
          <Skeleton variant="row" count={2} />
          <Skeleton variant="card" count={1} />
        </Stack>
      </Card>

      <Card>
        <Stack gap={4}>
          <Heading level={3}>Feedback</Heading>
          <Empty icon="search" title="Nothing here yet">
            Adjust your filters and try again.
          </Empty>
          <ErrorNote>Could not reach the API — showing cached data.</ErrorNote>
        </Stack>
      </Card>

      <Card>
        <Stack gap={4}>
          <Heading level={3}>Dialog & Tooltip</Heading>
          <TooltipProvider>
            <Row gap={3} wrap>
              <Tooltip tip="Opens a pouf dialog">
                <Button>Open dialog</Button>
              </Tooltip>
              <Tooltip tip="Disabled controls still explain themselves">
                <Button disabled>Disabled</Button>
              </Tooltip>
            </Row>
          </TooltipProvider>
        </Stack>
      </Card>

      <Dialog
        trigger={
          <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>
        }
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Dialog"
        description="A pouf modal in the claymorphism voice."
      >
        <Text>Dialog body content lives here, above the page in its own cushion.</Text>
      </Dialog>
    </Stack>
  )
}
