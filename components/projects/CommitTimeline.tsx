"use client"

import { Empty } from "@/components/pouf/feedback"
import { Dot } from "@/components/pouf/media"
import { Card, RowCard } from "@/components/pouf/surface"
import { Text } from "@/components/pouf/text"
import type { CommitData } from "@/lib/github"
import { ExternalLink } from "lucide-react"

interface CommitTimelineProps {
  commits: CommitData[]
}

export default function CommitTimeline({ commits }: CommitTimelineProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return ""
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card>
      <div className="flex items-center justify-between gap-(--s3) mb-(--s4)">
        <Text size="sm" muted>
          Recent Commits
        </Text>
        <span className="inline-flex items-center gap-2">
          <Dot tone="purple" />
          <Text size="sm" num>
            {commits.length} commits
          </Text>
        </span>
      </div>

      {commits.length === 0 ? (
        <Empty icon="history" title="No recent commits">
          No recent commits on this branch.
        </Empty>
      ) : (
        <div className="flex flex-col gap-(--s2)">
          {commits.slice(0, 5).map((commit) => (
            <RowCard key={commit.sha}>
              <div className="flex items-start justify-between gap-(--s3)">
                <div className="flex min-w-0 flex-col gap-[2px]">
                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-[6px] text-[13px] font-black text-ink no-underline transition-colors hover:text-purple"
                  >
                    {commit.sha.substring(0, 7)}
                    <ExternalLink size={14} />
                  </a>
                  <Text size="sm" muted truncate>
                    {commit.message}
                  </Text>
                </div>
                <div className="flex flex-none flex-col items-end gap-[2px]">
                  <Text size="sm" muted num>
                    @{commit.author}
                  </Text>
                  <Text size="sm" muted num>
                    {formatDate(commit.date)}
                  </Text>
                </div>
              </div>
            </RowCard>
          ))}
        </div>
      )}
    </Card>
  )
}
