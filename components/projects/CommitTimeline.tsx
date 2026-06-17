"use client";

import type { CommitData } from "@/lib/github";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface CommitTimelineProps {
  commits: CommitData[];
}

export default function CommitTimeline({ commits }: CommitTimelineProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col h-full bg-muted/20 border border-border p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <div className="font-mono text-xs font-bold tracking-widest uppercase text-muted-foreground">
          RECENT COMMITS
        </div>
        <div className="font-mono text-xs font-bold text-muted-foreground">
          {commits.length} commits
        </div>
      </div>

      <div className="flex-grow relative">
        {commits.length === 0 ? (
          <p className="text-muted-foreground italic font-mono text-xs">
            No recent commits on this branch.
          </p>
        ) : (
          <div className="relative pl-8 max-h-[260px] overflow-y-auto pr-2 custom-scrollbar">
            {/* Vertical dashed timeline line */}
            <div className="absolute left-[9px] top-2 bottom-2 w-px border-l-2 border-dashed border-border" />

            {commits.slice(0, 5).map((commit, idx) => (
              <motion.div
                key={commit.sha}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className={`relative ${idx === commits.slice(0, 5).length - 1 ? "mb-0" : "mb-6"}`}
              >
                {/* Timeline bullet node */}
                <div className="absolute -left-[35px] top-1.5 w-3 h-3 bg-background border-[2.5px] border-primary rounded-full hover:bg-primary hover:scale-125 transition-all duration-200" />

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center flex-wrap gap-2">
                    <div className="flex items-center justify-center w-5 h-5 bg-primary text-primary-foreground font-mono text-[10px] font-black uppercase rounded-sm">
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
                      className="ml-auto flex items-center gap-1 font-mono text-[10px] font-bold bg-muted border border-border text-muted-foreground px-2 py-0.5 rounded-sm hover:border-primary hover:text-primary transition-colors"
                    >
                      {commit.sha.substring(0, 7)}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <p className="text-sm font-medium text-foreground leading-relaxed pl-1 md:pl-8 mt-1">
                    {commit.message}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
