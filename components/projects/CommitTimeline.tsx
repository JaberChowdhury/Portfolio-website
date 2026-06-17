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
    <div className="flex h-full flex-col border border-border bg-muted/20 p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
        <div className="font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase">
          RECENT COMMITS
        </div>
        <div className="font-mono text-xs font-bold text-muted-foreground">
          {commits.length} commits
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
                className={`relative ${idx === commits.slice(0, 5).length - 1 ? "mb-0" : "mb-6"}`}
              >
                {/* Timeline bullet node */}
                <div className="absolute top-1.5 -left-[35px] h-3 w-3 rounded-full border-[2.5px] border-primary bg-background transition-all duration-200 hover:scale-125 hover:bg-primary" />

                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-primary font-mono text-[10px] font-black text-primary-foreground uppercase">
                      {commit.author.charAt(0)}
                    </div>

                    <span className="font-mono text-xs font-bold text-primary">
                      @{commit.author}
                    </span>

                    <span className="font-mono text-[10px] text-muted-foreground">
                      {formatDate(commit.date)}
                    </span>

                    <a
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto flex items-center gap-1 rounded-sm border border-border bg-muted px-2 py-0.5 font-mono text-[10px] font-bold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {commit.sha.substring(0, 7)}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>

                  <p className="mt-1 pl-1 text-sm leading-relaxed font-medium text-foreground md:pl-8">
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
