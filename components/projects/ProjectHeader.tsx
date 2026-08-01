"use client"

import { Icon } from "@/components/pouf/Icon"
import { Button } from "@/components/pouf/Button"
import { Blob } from "@/components/pouf/media"
import { Row } from "@/components/pouf/layout"
import { Metric } from "@/components/pouf/readout"
import { Card } from "@/components/pouf/surface"
import { Eyebrow, Heading, Text } from "@/components/pouf/text"
import { Link } from "@/i18n/routing"
import type { CombinedRepo } from "@/lib/github"

interface ProjectHeaderProps {
  repoInfo: CombinedRepo
}

export default function ProjectHeader({ repoInfo }: ProjectHeaderProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ""
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const stats: Array<{ label: string; value: string }> = [
    { label: "Stars", value: String(repoInfo.stargazers_count) },
    { label: "Forks", value: String(repoInfo.forks_count) },
    ...(repoInfo.size > 0
      ? [
          {
            label: "Size",
            value:
              repoInfo.size > 1024
                ? `${(repoInfo.size / 1024).toFixed(1)} MB`
                : `${repoInfo.size} KB`,
          },
        ]
      : []),
    ...(repoInfo.open_issues_count > 0
      ? [{ label: "Issues", value: String(repoInfo.open_issues_count) }]
      : []),
    {
      label: "Updated",
      value: formatDate(repoInfo.pushed_at || repoInfo.updated_at),
    },
  ]

  return (
    <div className="w-full">
      <Link
        href="/projects"
        className="mb-(--s5) inline-flex items-center gap-2 no-underline transition-opacity hover:opacity-80"
      >
        <Icon name="prev" size="sm" />
        <Text size="sm">Back</Text>
      </Link>

      <div className="flex flex-col gap-(--s5)">
        <Row gap={3} wrap={false}>
          <Blob size="md" tone="purple" icon="tag" />
          <div className="flex min-w-0 flex-col gap-(--s2)">
            <Eyebrow>{repoInfo.default_branch}</Eyebrow>
            <Heading level={1}>{repoInfo.name}</Heading>
            {repoInfo.description && (
              <Text muted>{repoInfo.description}</Text>
            )}
          </div>
        </Row>

        <div className="grid grid-cols-2 gap-(--s3) sm:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} variant="tight">
              <Metric label={stat.label} value={stat.value} />
            </Card>
          ))}
        </div>

        <Row gap={3}>
          <a
            href={repoInfo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            <Button size="sm" tone="blue">
              <Icon name="tag" size="sm" />
              GitHub
            </Button>
          </a>

          {repoInfo.homepage && (
            <a
              href={repoInfo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <Button size="sm" tone="mint">
                <Icon name="send" size="sm" />
                Live Demo
              </Button>
            </a>
          )}
        </Row>
      </div>
    </div>
  )
}
