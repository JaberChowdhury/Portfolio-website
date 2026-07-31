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
        className="mb-10 inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-widest text-ink-2 uppercase transition-colors hover:text-cyan focus-visible:text-cyan"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <header className="head-hang relative">
        {/* Cyan particle bloom behind the hanging head */}
        <div className="pointer-events-none absolute inset-x-0 -top-2 h-[300px] w-full opacity-[0.16] md:h-[420px]">
          <ParticleText
            text={repoInfo.name}
            canvasWidth={3000}
            canvasHeight={3000}
            colorStart="var(--cyan)"
            colorEnd="var(--cyan-2)"
            fontSize={getParticleFont(repoInfo.name, isMobile)}
            fontWeight={900}
            particleSize={0.45}
          />
        </div>

        <div className="head-hang__eyebrow relative">
          <span className="mono-label">Project</span>
          <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-2 uppercase">
            {repoInfo.default_branch}
          </span>
        </div>

        <h1 className="head-hang__title relative">{repoInfo.name}</h1>

        {repoInfo.description && (
          <p className="head-hang__body relative">{repoInfo.description}</p>
        )}

        <dl className="relative mt-12 grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <dt className="mono-label text-[10px]!">Stars</dt>
            <dd className="text-xl font-semibold tracking-tight text-ink">
              {repoInfo.stargazers_count}
            </dd>
          </div>

          <div className="flex flex-col gap-1.5">
            <dt className="mono-label text-[10px]!">Forks</dt>
            <dd className="text-xl font-semibold tracking-tight text-ink">
              {repoInfo.forks_count}
            </dd>
          </div>

          {repoInfo.size > 0 && (
            <div className="flex flex-col gap-1.5">
              <dt className="mono-label text-[10px]!">Size</dt>
              <dd className="text-xl font-semibold tracking-tight text-ink">
                {repoInfo.size > 1024
                  ? `${(repoInfo.size / 1024).toFixed(1)} MB`
                  : `${repoInfo.size} KB`}
              </dd>
            </div>
          )}

          {repoInfo.open_issues_count > 0 && (
            <div className="flex flex-col gap-1.5">
              <dt className="mono-label text-[10px]!">Issues</dt>
              <dd className="text-xl font-semibold tracking-tight text-ink">
                {repoInfo.open_issues_count}
              </dd>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <dt className="mono-label text-[10px]!">Updated</dt>
            <dd className="text-xl font-semibold tracking-tight text-ink">
              {formatDate(repoInfo.pushed_at || repoInfo.updated_at)}
            </dd>
          </div>
        </dl>

        <div className="relative mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={repoInfo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-ink-2 uppercase transition-colors hover:text-cyan focus-visible:text-cyan"
          >
            <Code className="h-4 w-4" />
            GitHub
          </a>

          {repoInfo.homepage && (
            <a
              href={repoInfo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-ink-2 uppercase transition-colors hover:text-cyan focus-visible:text-cyan"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
        </div>
      </header>
    </div>
  )
}
