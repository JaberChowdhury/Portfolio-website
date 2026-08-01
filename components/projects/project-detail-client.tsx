"use client"

import { ErrorNote, Skeleton } from "@/components/pouf/feedback"
import { Stack } from "@/components/pouf/layout"
import { Card } from "@/components/pouf/surface"
import { Text } from "@/components/pouf/text"
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
      <div className="mx-auto min-h-screen max-w-6xl px-(--s5) pt-28 pb-20 md:px-(--s8)">
        <Stack gap={6}>
          <Skeleton variant="text" count={1} />
          <Skeleton variant="card" count={1} />
          <Skeleton variant="text" count={1} />
          <Skeleton variant="row" count={1} />
          <Skeleton variant="card" count={1} />
        </Stack>
      </div>
    )
  }

  if (errorRepo) {
    return (
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-(--s5) pt-28 pb-20 md:px-(--s8)">
        <ErrorNote>{errorRepo}</ErrorNote>
      </div>
    )
  }

  const allBranches = repoInfo.branches || [
    { name: repoInfo.default_branch || "main" },
  ]

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-(--s5) pt-28 pb-20 md:px-(--s8)">
      <Stack gap={6}>
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
          <div className="mb-(--s3)">
            <Text size="sm" muted>
              README.md
            </Text>
          </div>
          <Card>
            <AnimatePresence mode="wait">
              {loadingReadme ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Skeleton variant="card" count={1} />
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
          </Card>
        </div>
      </Stack>
    </div>
  )
}
