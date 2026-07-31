"use client"

import { Button } from "@/components/ui/button"
import type { CombinedRepo } from "@/lib/github"
import { ArrowLeft, ExternalLink, GitFork, Star } from "lucide-react"
import Link from "next/link"

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

  return (
    <div className="w-full">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="mb-12">
        <p className="mono-label mb-5 text-muted-foreground">REPO</p>

        <h1 className="text-4xl leading-[1.05] font-bold tracking-tight text-foreground md:text-6xl">
          <span className="hl hl--pear">{repoInfo.name}</span>
        </h1>

        {repoInfo.description && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {repoInfo.description}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs font-bold tracking-wider text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-4 w-4" />
            Stars: {repoInfo.stargazers_count}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <GitFork className="h-4 w-4" />
            Forks: {repoInfo.forks_count}
          </span>

          {repoInfo.size > 0 && (
            <span>
              Size:{" "}
              {repoInfo.size > 1024
                ? `${(repoInfo.size / 1024).toFixed(1)} MB`
                : `${repoInfo.size} KB`}
            </span>
          )}

          {repoInfo.open_issues_count > 0 && (
            <span>Issues: {repoInfo.open_issues_count}</span>
          )}

          <span>Updated: {formatDate(repoInfo.pushed_at || repoInfo.updated_at)}</span>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            nativeButton={false}
            render={
              <a
                href={repoInfo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            GitHub
            <ExternalLink className="ml-1 h-4 w-4" />
          </Button>

          {repoInfo.homepage && (
            <Button
              variant="outline"
              nativeButton={false}
              render={
                <a
                  href={repoInfo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              Live Demo
              <ExternalLink className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
