"use client"

import ParticleText from "@/components/ParticleText"
import type { CombinedRepo } from "@/lib/github"
import { ArrowLeft, ExternalLink, GitFork, Code, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface ProjectHeaderProps {
  repoInfo: CombinedRepo
}

export default function ProjectHeader({ repoInfo }: ProjectHeaderProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ""
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getParticleFont = (name: string, mobile: boolean) => {
    const baseDesktopSize = 480
    const baseMobileSize = 420
    const factor = name.length > 10 ? Math.min(1, 10 / name.length) : 1
    const desktopSize = Math.max(80, Math.floor(baseDesktopSize * factor))
    const mobileSize = Math.max(45, Math.floor(baseMobileSize * factor))
    return mobile ? mobileSize : desktopSize
  }

  return (
    <div className="w-full">
      <Link
        href="/projects"
        className="mb-6 inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary active:scale-95 sm:mb-10"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="mb-8 border-b border-border pb-6 sm:mb-12 sm:pb-8">
        <div className="relative mb-4 h-[90px] w-full overflow-hidden sm:mb-6 sm:h-[150px] md:h-[280px]">
          <ParticleText
            text={repoInfo.name}
            canvasWidth={3000}
            canvasHeight={3000}
            colorStart="hsl(var(--primary))"
            colorEnd="hsl(var(--primary))"
            fontSize={getParticleFont(repoInfo.name, isMobile)}
            fontWeight={900}
            particleSize={0.45}
          />
        </div>

        {repoInfo.description && (
          <p className="mb-6 max-w-4xl text-sm leading-relaxed text-muted-foreground sm:mb-8 sm:text-base md:text-lg">
            {repoInfo.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="font-mono text-[11px] font-bold tracking-wider sm:text-xs">
              Stars: {repoInfo.stargazers_count}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-muted-foreground">
            <GitFork className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="font-mono text-[11px] font-bold tracking-wider sm:text-xs">
              Forks: {repoInfo.forks_count}
            </span>
          </div>

          {repoInfo.size > 0 && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span className="font-mono text-[11px] font-bold tracking-wider sm:text-xs">
                Size:{" "}
                {repoInfo.size > 1024
                  ? `${(repoInfo.size / 1024).toFixed(1)} MB`
                  : `${repoInfo.size} KB`}
              </span>
            </div>
          )}

          {repoInfo.open_issues_count > 0 && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span className="font-mono text-[11px] font-bold tracking-wider sm:text-xs">
                Issues: {repoInfo.open_issues_count}
              </span>
            </div>
          )}

          <div className="text-muted-foreground">
            <span className="font-mono text-[11px] font-bold tracking-wider sm:text-xs">
              Updated: {formatDate(repoInfo.pushed_at || repoInfo.updated_at)}
            </span>
          </div>

          <a
            href={repoInfo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-primary underline transition-colors hover:text-primary/80 sm:text-xs"
          >
            <Code className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            GitHub
          </a>

          {repoInfo.homepage && (
            <a
              href={repoInfo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-primary underline transition-colors hover:text-primary/80 sm:text-xs"
            >
              <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
