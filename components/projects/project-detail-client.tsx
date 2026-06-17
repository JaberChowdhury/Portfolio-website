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
      } catch (err) {
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
      <div className="container mx-auto flex min-h-screen max-w-5xl flex-col space-y-8 px-4 pt-32 pb-20">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-[280px] w-full" />
        <Skeleton className="h-6 w-1/2" />
        <div className="flex gap-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (errorRepo) {
    return (
      <div className="container mx-auto flex min-h-screen max-w-5xl items-center justify-center px-4 pt-32 pb-20 text-center">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-destructive">Error</h2>
          <p className="text-muted-foreground">{errorRepo}</p>
        </div>
      </div>
    )
  }

  const allBranches = repoInfo.branches || [
    { name: repoInfo.default_branch || "main" },
  ]

  return (
    <div className="container mx-auto min-h-screen max-w-5xl px-4 pt-24 pb-20">
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

      <div className="w-full">
        <div className="mb-4 flex items-center font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase">
          <span className="mr-2 text-primary">~/</span> README.md
        </div>
        <div className="rounded-md border border-border bg-card p-6 text-card-foreground shadow-sm md:p-10">
          <AnimatePresence mode="wait">
            {loadingReadme ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center py-20"
              >
                <Skeleton className="h-64 w-full" />
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
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
