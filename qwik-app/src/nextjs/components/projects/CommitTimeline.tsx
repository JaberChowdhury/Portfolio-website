/** @jsxImportSource react */
"use client"

import type { CommitData } from "@/lib/github"
import { motion } from "framer-motion"
import { GitCommit, ExternalLink } from "lucide-react"

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
    <div className="flex h-full flex-col border border-border bg-muted/20 p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
        <div className="font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase">
          RECENT COMMITS
        </div>
        <div className="rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-primary">
          {commits.length} COMMITS
        </div>
      </div>

      <div className="relative flex-grow">
        {commits.length === 0 ? (
          <p className="font-mono text-xs text-muted-foreground italic">
            No recent commits on this branch.
          </p>
        ) : (
          <div className="custom-scrollbar relative max-h-[260px] overflow-y-auto pr-2 pl-8">
            {/* Vertical dashed timeline line */}
            <div className="absolute top-2 bottom-2 left-[9px] w-px border-l-2 border-dashed border-border" />

            {commits.slice(0, 5).map((commit, idx) => (
              <motion.div
                key={commit.sha}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className={`group relative ${idx === Math.min(commits.length, 5) - 1 ? "mb-0" : "mb-6"}`}
              >
                {/* Timeline bullet node */}
                <div className="absolute top-3 -left-[35px] h-3 w-3 rounded-full border-[2.5px] border-primary bg-background ring-4 ring-background transition-all duration-300 group-hover:scale-125 group-hover:bg-primary group-hover:shadow-[0_0_10px_hsl(var(--primary))]" />

                <div className="flex flex-col gap-2 rounded-lg border border-transparent p-3 transition-colors hover:border-border hover:bg-card">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 font-mono text-[10px] font-black text-primary uppercase shadow-sm">
                      {commit.author.charAt(0)}
                    </div>

                    <span className="text-sm font-semibold text-foreground">
                      {commit.author}
                    </span>

                    <span className="text-xs text-muted-foreground ml-2">
                      {formatDate(commit.date)}
                    </span>

                    <a
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto flex items-center gap-1.5 rounded-md bg-muted/50 px-2 py-1 font-mono text-xs font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      <GitCommit className="h-3 w-3" />
                      {commit.sha.substring(0, 7)}
                    </a>
                  </div>

                  <p className="mt-1 pl-8 text-sm leading-relaxed text-foreground/90 line-clamp-3">
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
