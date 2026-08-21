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
    <div className="flex h-full flex-col rounded-xl border border-border bg-muted/20 p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between border-b border-border pb-3 sm:mb-6 sm:pb-4">
        <div className="font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase">
          RECENT COMMITS
        </div>
        <div className="font-mono text-[11px] font-bold text-muted-foreground sm:text-xs">
          {commits.length} commits
        </div>
      </div>

      <div className="relative flex-grow">
        {commits.length === 0 ? (
          <p className="font-mono text-xs text-muted-foreground italic">
            No recent commits on this branch.
          </p>
        ) : (
          <div className="custom-scrollbar relative max-h-[260px] overflow-y-auto pr-1 pl-6 sm:pr-2 sm:pl-8">
            {/* Vertical dashed timeline line */}
            <div className="absolute top-2 bottom-2 left-[7px] w-px border-l-2 border-dashed border-border sm:left-[9px]" />

            {commits.slice(0, 5).map((commit, idx) => (
              <motion.div
                key={commit.sha}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className={`relative ${idx === commits.slice(0, 5).length - 1 ? "mb-0" : "mb-5 sm:mb-6"}`}
              >
                {/* Timeline bullet node */}
                <div className="absolute top-1.5 -left-[28px] h-2.5 w-2.5 rounded-full border-[2px] border-primary bg-background transition-all duration-200 hover:scale-125 hover:bg-primary sm:-left-[35px] sm:h-3 sm:w-3 sm:border-[2.5px]" />

                <div className="flex flex-col gap-1 sm:gap-1.5">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <div className="flex h-4.5 w-4.5 items-center justify-center rounded-sm bg-primary font-mono text-[9px] font-black text-primary-foreground uppercase sm:h-5 sm:w-5 sm:text-[10px]">
                      {commit.author.charAt(0)}
                    </div>

                    <span className="font-mono text-[11px] font-bold text-primary sm:text-xs">
                      @{commit.author}
                    </span>

                    <span className="font-mono text-[9px] text-muted-foreground sm:text-[10px]">
                      {formatDate(commit.date)}
                    </span>

                    <a
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto flex items-center gap-1 rounded-sm border border-border bg-muted px-1.5 py-0.5 font-mono text-[9px] font-bold text-muted-foreground transition-colors hover:border-primary hover:text-primary sm:px-2 sm:py-0.5 sm:text-[10px]"
                    >
                      {commit.sha.substring(0, 7)}
                      <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    </a>
                  </div>

                  <p className="mt-0.5 pl-0 text-xs leading-relaxed font-medium break-words text-foreground sm:pl-7 sm:text-sm">
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
