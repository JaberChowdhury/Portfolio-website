"use client"

import type { CommitData } from "@/lib/github"
import { motion } from "framer-motion"
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
    <div className="flex h-full flex-col rounded-2xl bg-paper-2 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="mono-label">Recent Commits</div>
        <div className="font-mono text-xs font-bold text-ink-2">
          {commits.length} commits
        </div>
      </div>

      <div className="relative flex-grow">
        {commits.length === 0 ? (
          <p className="font-mono text-xs text-ink-2">
            No recent commits on this branch.
          </p>
        ) : (
          <div className="custom-scrollbar relative max-h-[260px] overflow-y-auto pr-2">
            {commits.slice(0, 5).map((commit, idx) => (
              <motion.div
                key={commit.sha}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`relative ${
                  idx === commits.slice(0, 5).length - 1 ? "mb-0" : "mb-8"
                }`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <a
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono-label text-[10px]! transition-colors hover:text-cyan-2 focus-visible:text-cyan-2"
                    >
                      {commit.sha.substring(0, 7)}
                      <ExternalLink className="ml-1 inline h-3 w-3" />
                    </a>

                    <span className="font-mono text-xs font-bold text-ink-2">
                      @{commit.author}
                    </span>

                    <span className="font-mono text-[11px] text-ink-2">
                      {formatDate(commit.date)}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-ink-2">
                    {commit.message}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
