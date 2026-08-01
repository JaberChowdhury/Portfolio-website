"use client"

import { useState } from "react"
import { Combobox, Select } from "@/components/pouf/controls"
import { Field } from "@/components/pouf/Input"
import { Grid, Stack } from "@/components/pouf/layout"
import { Card } from "@/components/pouf/surface"
import { Heading, Text } from "@/components/pouf/text"

export default function SelectShowcase() {
  const [fruit, setFruit] = useState("")
  const [timezone, setTimezone] = useState("")
  const [model, setModel] = useState("")

  return (
    <Stack gap={5}>
      <Card>
        <Stack gap={4}>
          <Heading level={3}>Select</Heading>
          <Grid cols={2}>
            <Field label="Fruit">
              {(id, describedBy) => (
                <Select
                  id={id}
                  describedBy={describedBy}
                  value={fruit}
                  onChange={setFruit}
                  placeholder="Pick a fruit"
                  options={[
                    { value: "apple", label: "Apple" },
                    { value: "banana", label: "Banana" },
                    { value: "blueberry", label: "Blueberry" },
                    { value: "grapes", label: "Grapes" },
                    { value: "pineapple", label: "Pineapple" },
                  ]}
                />
              )}
            </Field>
            <Field label="Timezone">
              {(id, describedBy) => (
                <Select
                  id={id}
                  describedBy={describedBy}
                  value={timezone}
                  onChange={setTimezone}
                  placeholder="Pick a timezone"
                  options={[
                    { value: "est", label: "Eastern Standard Time (EST)" },
                    { value: "cst", label: "Central Standard Time (CST)" },
                    { value: "mst", label: "Mountain Standard Time (MST)" },
                    { value: "pst", label: "Pacific Standard Time (PST)" },
                    { value: "gmt", label: "Greenwich Mean Time (GMT)" },
                    { value: "cet", label: "Central European Time (CET)" },
                  ]}
                />
              )}
            </Field>
          </Grid>
        </Stack>
      </Card>

      <Card>
        <Stack gap={4}>
          <Heading level={3}>Combobox</Heading>
          <Text muted>Type to filter, or enter a value the list doesn&apos;t offer.</Text>
          <Field label="Model">
            {(id, describedBy) => (
              <Combobox
                id={id}
                describedBy={describedBy}
                value={model}
                onChange={setModel}
                placeholder="Pick or type a model"
                options={["gpt-4o", "claude-3.5", "llama-3", "mistral", "gemini-1.5"]}
              />
            )}
          </Field>
        </Stack>
      </Card>
    </Stack>
  )
}
