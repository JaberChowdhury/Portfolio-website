"use client"

import { Skeleton } from "@/components/ui/skeleton"
import type { CombinedRepo } from "@/lib/github"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import BranchSelector from "./BranchSelector"
import BrowserPreview from "./BrowserPreview"
import ProjectHeader from "./ProjectHeader"
import ProjectVisualizations from "./ProjectVisualizations"
import ReadmeRenderer from "./ReadmeRenderer"

interface ProjectDetailClientProps {
  repoName: string
  activeBranchName: string
}

export default function ProjectDetailClient({
  repoName,
  activeBranchName,
}: ProjectDetailClientProps) {
  const [repoInfo, setRepoInfo] = useState<CombinedRepo | null>(null)
  const [loadingRepo, setLoadingRepo] = useState(true)
  const [errorRepo, setErrorRepo] = useState<string | null>(null)

  const [readmesMap, setReadmesMap] = useState<Record<string, string>>({})
  const [loadingReadme, setLoadingReadme] = useState(false)

  useEffect(() => {
    let isMounted = true
    const fetchRepoDetails = async () => {
      setLoadingRepo(true)
      setErrorRepo(null)
      try {
        const res = await fetch(`/api/projects/${repoName}`)
        if (!res.ok)
          throw new Error(`Failed to fetch project details: ${res.status}`)

        const data: CombinedRepo = await res.json()
        if (isMounted) {
          setRepoInfo(data)
          const initialMap: Record<string, string> = {}
          if (data.readmes) {
            for (const item of data.readmes) {
              initialMap[item.name] = item.readmeHtml
            }
          }
          setReadmesMap(initialMap)
        }
      } catch (err) {
        if (isMounted) {
          setErrorRepo(
            err instanceof Error
              ? err.message
              : "Failed to load project details"
          )
        }
      } finally {
        if (isMounted) setLoadingRepo(false)
      }
    }
    fetchRepoDetails()
    return () => {
      isMounted = false
    }
  }, [repoName])

  const hasReadme = !!readmesMap[activeBranchName]

  useEffect(() => {
    if (!repoInfo || hasReadme) return
    let isMounted = true
    const fetchReadme = async () => {
      setLoadingReadme(true)
      try {
        const res = await fetch(
          `/api/projects/readme?repo=${repoName}&branch=${activeBranchName}`
        )
        if (!res.ok) throw new Error("Failed to fetch branch readme")
        const data = await res.json()
        if (isMounted)
          setReadmesMap((prev) => ({
            ...prev,
            [activeBranchName]: data.readmeHtml,
          }))
      } catch {
        if (isMounted) {
          setReadmesMap((prev) => ({
            ...prev,
            [activeBranchName]: `<h3>Error</h3><p>Could not retrieve README.md for branch <strong>${activeBranchName}</strong>.</p>`,
          }))
        }
      } finally {
        if (isMounted) setLoadingReadme(false)
      }
    }
    fetchReadme()
    return () => {
      isMounted = false
    }
  }, [activeBranchName, repoName, hasReadme, repoInfo])

  if (loadingRepo || !repoInfo) {
    return (
      <div className="container mx-auto flex min-h-screen max-w-5xl flex-col space-y-6 px-4 pt-20 pb-16 sm:space-y-8 sm:pt-24 sm:pb-20 md:pt-32">
        <Skeleton className="h-10 w-1/2 sm:h-12 sm:w-1/3" />
        <Skeleton className="h-[180px] w-full sm:h-[280px]" />
        <Skeleton className="h-5 w-3/4 sm:h-6 sm:w-1/2" />
        <div className="flex gap-3 sm:gap-4">
          <Skeleton className="h-9 w-24 sm:h-10 sm:w-32" />
          <Skeleton className="h-9 w-24 sm:h-10 sm:w-32" />
        </div>
        <Skeleton className="h-48 w-full sm:h-64" />
      </div>
    )
  }

  if (errorRepo) {
    return (
      <div className="container mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 pt-20 pb-16 text-center sm:pt-24 sm:pb-20 md:pt-32">
        <div>
          <h2 className="mb-4 text-xl font-bold text-destructive sm:text-2xl">
            Error
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            {errorRepo}
          </p>
        </div>
      </div>
    )
  }

  const allBranches = repoInfo.branches || [
    { name: repoInfo.default_branch || "main" },
  ]

  return (
    <div className="container mx-auto min-h-screen max-w-5xl px-4 pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32">
      <ProjectHeader repoInfo={repoInfo} />

      <BranchSelector
        repoName={repoName}
        allBranches={allBranches}
        activeBranchName={activeBranchName}
      />

      <ProjectVisualizations
        repoInfo={repoInfo}
        activeBranchName={activeBranchName}
      />

      {repoInfo.homepage && (
        <BrowserPreview homepage={repoInfo.homepage} repoName={repoInfo.name} />
      )}

      <div className="w-full overflow-hidden">
        <div className="mb-3 flex items-center font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase sm:mb-4">
          <span className="mr-2 text-primary">~/</span> README.md
        </div>
        <div className="max-w-full overflow-x-auto rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm sm:p-6 md:p-10">
          <AnimatePresence mode="wait">
            {loadingReadme ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center py-12 sm:py-20"
              >
                <Skeleton className="h-48 w-full sm:h-64" />
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="max-w-full overflow-x-auto"
              >
                <ReadmeRenderer html={readmesMap[activeBranchName] || ""} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
