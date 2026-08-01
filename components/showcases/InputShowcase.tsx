"use client"

import { useState } from "react"
import { Select, Switch } from "@/components/pouf/controls"
import { Field, Input, Textarea } from "@/components/pouf/Input"
import { Row, Stack } from "@/components/pouf/layout"
import { Card } from "@/components/pouf/surface"
import { Heading, Text } from "@/components/pouf/text"

export default function InputShowcase() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [note, setNote] = useState("")
  const [accent, setAccent] = useState("mint")
  const [optIn, setOptIn] = useState(true)

  const emailInvalid = email.length > 0 && !email.includes("@")

  return (
    <Stack gap={5}>
      <Card>
        <Stack gap={4}>
          <Heading level={3}>Field + Input</Heading>
          <Field label="Name" hint="How people should address you.">
            {(id, describedBy) => (
              <Input
                id={id}
                describedBy={describedBy}
                value={name}
                onChange={setName}
                placeholder="Ada Lovelace"
              />
            )}
          </Field>
          <Field
            label="Email"
            error={emailInvalid ? "That doesn't look like an email address." : undefined}
          >
            {(id, describedBy) => (
              <Input
                id={id}
                describedBy={describedBy}
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="ada@example.dev"
                invalid={emailInvalid}
              />
            )}
          </Field>
        </Stack>
      </Card>

      <Card>
        <Stack gap={4}>
          <Heading level={3}>Textarea</Heading>
          <Field label="Notes">
            {(id, describedBy) => (
              <Textarea
                id={id}
                describedBy={describedBy}
                value={note}
                onChange={setNote}
                placeholder="Anything else to add?"
              />
            )}
          </Field>
        </Stack>
      </Card>

      <Card>
        <Stack gap={4}>
          <Heading level={3}>Select</Heading>
          <Field label="Accent">
            {(id, describedBy) => (
              <Select
                id={id}
                describedBy={describedBy}
                value={accent}
                onChange={setAccent}
                options={[
                  { value: "mint", label: "Mint" },
                  { value: "purple", label: "Purple" },
                  { value: "pink", label: "Pink" },
                  { value: "yellow", label: "Yellow" },
                  { value: "blue", label: "Blue" },
                ]}
              />
            )}
          </Field>
        </Stack>
      </Card>

      <Card>
        <Stack gap={4}>
          <Heading level={3}>Switch</Heading>
          <Row gap={3} wrap={false}>
            <Switch checked={optIn} onChange={setOptIn} label="Newsletter opt-in" />
            <Text>Opt in to updates</Text>
          </Row>
        </Stack>
      </Card>
    </Stack>
  )
}
