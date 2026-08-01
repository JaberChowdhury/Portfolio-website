"use client"

import type { CombinedRepo } from "@/lib/github"
import CommitTimeline from "./CommitTimeline"
import LanguageDistribution from "./LanguageDistribution"
import WeeklyActivityChart from "./WeeklyActivityChart"

interface ProjectVisualizationsProps {
  repoInfo: CombinedRepo
  activeBranchName: string
}

export default function ProjectVisualizations({
  repoInfo,
  activeBranchName,
}: ProjectVisualizationsProps) {
  const activeBranch = repoInfo.branches?.find(
    (b) => b.name.toLowerCase() === activeBranchName.toLowerCase()
  )

  const branchLanguages = activeBranch?.languages
  const hasBranchLanguages =
    branchLanguages && Object.keys(branchLanguages).length > 0

  const languagesData = hasBranchLanguages
    ? branchLanguages
    : repoInfo.languages
  const mode = hasBranchLanguages ? "files" : "bytes"

  const hasLanguages = languagesData && Object.keys(languagesData).length > 0
  const hasWeeklyActivity =
    repoInfo.weeklyActivity && repoInfo.weeklyActivity.length > 0

  const branchCommits = activeBranch?.recentCommits || []

  return (
    <div className="flex w-full flex-col gap-(--s5)">
      {hasLanguages && (
        <LanguageDistribution languages={languagesData} mode={mode} />
      )}

      <div className="grid grid-cols-1 items-stretch gap-(--s5) md:grid-cols-2">
        {hasWeeklyActivity && (
          <WeeklyActivityChart weeklyActivity={repoInfo.weeklyActivity} />
        )}
        <CommitTimeline commits={branchCommits} />
      </div>
    </div>
  )
}
