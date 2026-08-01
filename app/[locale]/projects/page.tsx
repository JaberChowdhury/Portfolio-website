"use client"

import { Select } from "@/components/pouf/controls"
import { ErrorNote, Empty } from "@/components/pouf/feedback"
import { Field, Input } from "@/components/pouf/Input"
import { Dot } from "@/components/pouf/media"
import { Segmented } from "@/components/pouf/Segmented"
import { Card, RowCard } from "@/components/pouf/surface"
import { Eyebrow, Heading, Text } from "@/components/pouf/text"
import { ProjectCard } from "@/components/projects/project-card"
import { SkeletonCard } from "@/components/projects/skeleton-card"
import { FALLBACK_REPOS } from "@/data/fallbackRepos"
import type { RepoSummary } from "@/lib/github"
import { useEffect, useState } from "react"

const CACHE_KEY = "github_repos_cache"
const CACHE_TIME_KEY = "github_repos_cache_time"
const CACHE_DURATION = 15 * 60 * 1000

const SORT_OPTIONS = [
  { value: "updated", label: "Latest Update" },
  { value: "stars", label: "Most Stars" },
  { value: "name", label: "Alphabetical" },
]

export default function ProjectsPage() {
  const [repos, setRepos] = useState<RepoSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("All")
  const [sortBy, setSortBy] = useState<"updated" | "stars" | "name">("updated")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isFallback, setIsFallback] = useState(false)

  useEffect(() => {
    document.title = "Projects | Portfolio"
  }, [])

  useEffect(() => {
    const fetchGithubRepos = async () => {
      try {
        setLoading(true)

        const cachedData = sessionStorage.getItem(CACHE_KEY)
        const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY)

        if (
          cachedData &&
          cachedTime &&
          Date.now() - Number(cachedTime) < CACHE_DURATION
        ) {
          setRepos(JSON.parse(cachedData))
          setIsFallback(false)
          setLoading(false)
          return
        }

        const response = await fetch("/api/projects")
        if (!response.ok)
          throw new Error(`Failed to fetch repos: ${response.status}`)

        const data: RepoSummary[] = await response.json()

        sessionStorage.setItem(CACHE_KEY, JSON.stringify(data))
        sessionStorage.setItem(CACHE_TIME_KEY, String(Date.now()))

        setRepos(data)
        setIsFallback(false)
      } catch (error) {
        console.error(
          "GitHub API fetch failed, loading cached/fallback data:",
          error
        )

        const cachedData = sessionStorage.getItem(CACHE_KEY)
        if (cachedData) {
          setRepos(JSON.parse(cachedData))
        } else {
          setRepos(FALLBACK_REPOS)
        }
        setIsFallback(true)
      } finally {
        setLoading(false)
      }
    }

    fetchGithubRepos()
  }, [])

  const languageList = [
    "All",
    ...(Array.from(
      new Set(repos.map((r) => r.language).filter(Boolean))
    ) as string[]),
  ]

  const processedRepos = repos
    .filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description?.toLowerCase().includes(searchQuery.toLowerCase()) ??
          false)
      const matchesLanguage =
        selectedLanguage === "All" || repo.language === selectedLanguage
      return matchesSearch && matchesLanguage
    })
    .sort((a, b) => {
      if (sortBy === "stars") return b.stargazers_count - a.stargazers_count
      if (sortBy === "name") return a.name.localeCompare(b.name)
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    })

  const gridClass =
    viewMode === "grid"
      ? "grid grid-cols-1 gap-(--s4) sm:grid-cols-2 lg:grid-cols-3"
      : "grid grid-cols-1 gap-(--s4)"

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-(--s5) pt-28 pb-20 md:px-(--s8)">
      <header className="mb-(--s7)">
        <Eyebrow>Projects</Eyebrow>
        <Heading level={1}>Projects</Heading>
        <Text muted>
          Explore my open-source repositories and development work.
        </Text>
      </header>

      {isFallback && !loading && (
        <div className="mb-(--s5)">
          <ErrorNote>
            GitHub API rate limit hit — displaying cached catalog.
          </ErrorNote>
        </div>
      )}

      <Card variant="tight" motion="none">
        <div className="flex flex-col gap-(--s4) lg:flex-row lg:items-end lg:justify-between">
          <div className="w-full max-w-md">
            <Field label="Search">
              {(id, describedBy) => (
                <Input
                  id={id}
                  describedBy={describedBy}
                  type="text"
                  placeholder="Search repositories..."
                  value={searchQuery}
                  onChange={setSearchQuery}
                />
              )}
            </Field>
          </div>

          <div className="flex flex-col gap-(--s4) sm:flex-row sm:items-end">
            <div className="w-full sm:w-[220px]">
              <Field label="Sort by">
                {(id, describedBy) => (
                  <Select
                    id={id}
                    describedBy={describedBy}
                    value={sortBy}
                    onChange={(v) => setSortBy(v as "updated" | "stars" | "name")}
                    options={SORT_OPTIONS}
                  />
                )}
              </Field>
            </div>

            <div className="flex flex-col gap-(--s2)">
              <Text size="sm" muted>
                View
              </Text>
              <Segmented
                label="View"
                value={viewMode}
                onChange={setViewMode}
                options={[
                  { value: "grid", label: "Grid" },
                  { value: "list", label: "List" },
                ]}
              />
            </div>
          </div>
        </div>
      </Card>

      {!loading && repos.length > 0 && (
        <div className="mt-(--s5) flex flex-wrap gap-(--s2)">
          {languageList.map((lang) => {
            const isSelected = selectedLanguage === lang
            return (
              <span key={lang} className="inline-flex">
                <RowCard
                  selected={isSelected}
                  onClick={() => setSelectedLanguage(lang)}
                >
                  <span className="inline-flex items-center gap-2">
                    <Dot tone={isSelected ? "pink" : "idle"} />
                    <Text size="sm">{lang === "All" ? "All Languages" : lang}</Text>
                  </span>
                </RowCard>
              </span>
            )
          })}
        </div>
      )}

      <div className="mt-(--s6)">
        {loading ? (
          <div className={gridClass}>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} viewMode={viewMode} />
            ))}
          </div>
        ) : processedRepos.length > 0 ? (
          <div className={gridClass}>
            {processedRepos.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <Empty icon="search" title="No projects found">
            No projects match your criteria — try a different search or language.
          </Empty>
        )}
      </div>
    </div>
  )
}
