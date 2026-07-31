"use client"

import { ProjectCard } from "@/components/projects/project-card"
import { SkeletonCard } from "@/components/projects/skeleton-card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FALLBACK_REPOS } from "@/data/fallbackRepos"
import type { RepoSummary } from "@/lib/github"
import { AnimatePresence, motion } from "framer-motion"
import { LayoutGrid, List, Search } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

const CACHE_KEY = "github_repos_cache"
const CACHE_TIME_KEY = "github_repos_cache_time"
const CACHE_DURATION = 15 * 60 * 1000

export default function ProjectsPage() {
  const t = useTranslations("Projects")
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

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-6 pt-24 pb-20 md:px-10 md:pt-32">
      {/* Header Section */}
      <div className="mb-12 md:mb-16">
        <p className="mono-label mb-5 text-muted-foreground">{t("eyebrow")}</p>
        <h1 className="text-4xl leading-[1.05] font-bold tracking-tight text-foreground md:text-6xl">
          Open-source{" "}
          <span className="hl hl--pear">projects</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          Explore my open-source repositories and development work.
        </p>
      </div>

      {isFallback && !loading && (
        <div className="mb-10 rounded-2xl border border-coral/30 bg-coral-tint p-4 font-mono text-sm text-ink-2">
          // Displaying cached catalog (GitHub API rate limit hit).
        </div>
      )}

      {/* Controls Section */}
      <div className="mb-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-full bg-paper-2 pl-10"
          />
        </div>

        <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto lg:items-center">
          <div className="flex items-center gap-2">
            <span className="mono-label text-muted-foreground">Sort by</span>
            <Select
              value={sortBy}
              onValueChange={(v) => {
                if (v) setSortBy(v as "updated" | "stars" | "name")
              }}
            >
              <SelectTrigger className="w-[160px] rounded-full bg-paper-2 font-medium">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-border bg-popover p-1">
                <SelectItem className="rounded-full" value="updated">
                  Latest Update
                </SelectItem>
                <SelectItem className="rounded-full" value="stars">
                  Most Stars
                </SelectItem>
                <SelectItem className="rounded-full" value="name">
                  Alphabetical
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs
            value={viewMode}
            onValueChange={(v) => setViewMode(v as "grid" | "list")}
            className="w-[160px]"
          >
            <TabsList className="grid w-full grid-cols-2 rounded-full bg-paper-2 p-1">
              <TabsTrigger
                value="grid"
                className="flex items-center gap-2 rounded-full font-mono text-[11px] font-bold tracking-widest uppercase data-active:bg-primary data-active:text-primary-foreground"
              >
                <LayoutGrid className="h-3.5 w-3.5" /> Grid
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="flex items-center gap-2 rounded-full font-mono text-[11px] font-bold tracking-widest uppercase data-active:bg-primary data-active:text-primary-foreground"
              >
                <List className="h-3.5 w-3.5" /> List
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Language Filter Tags */}
      {!loading && repos.length > 0 && (
        <div className="scrollbar-hide mb-10 flex flex-wrap gap-2 overflow-x-auto pb-2">
          {languageList.map((lang) => {
            const isSelected = selectedLanguage === lang
            return (
              <Badge
                key={lang}
                className={`cursor-pointer rounded-full border-none px-3 py-1 font-mono text-xs transition-all hover:-translate-y-[1px] ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-paper-2 text-ink-2 hover:bg-paper-3"
                }`}
                onClick={() => setSelectedLanguage(lang)}
              >
                {lang === "All" ? "All Languages" : lang}
              </Badge>
            )
          })}
        </div>
      )}

      {/* Projects Grid/List */}
      {loading ? (
        <div
          className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} viewMode={viewMode} />
          ))}
        </div>
      ) : processedRepos.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
          >
            {processedRepos.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} viewMode={viewMode} />
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="rounded-2xl border border-border bg-paper-2 p-16 text-center">
          <p className="text-lg text-muted-foreground">
            No projects found matching your criteria.
          </p>
        </div>
      )}
    </div>
  )
}
