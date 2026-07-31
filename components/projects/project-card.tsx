import { Badge } from "@/components/ui/badge"
import type { RepoSummary } from "@/lib/github"
import { motion } from "framer-motion"
import { ArrowUpRight, Star } from "lucide-react"
import Link from "next/link"

interface ProjectCardProps {
  repo: RepoSummary
  viewMode: "grid" | "list"
}

const TINTS = [
  "hum-card--pear",
  "hum-card--cyan",
  "hum-card--mint",
  "hum-card--lav",
]

const getLanguageColor = (lang: string) => {
  const colors: Record<string, string> = {
    typescript: "bg-cyan",
    javascript: "bg-pear",
    css: "bg-lavender",
    html: "bg-mint",
    astro: "bg-coral",
    "c++": "bg-coral",
    c: "bg-muted-foreground",
    python: "bg-pear",
    rust: "bg-coral",
    glsl: "bg-cyan",
    shell: "bg-mint",
    markdown: "bg-lavender",
  }
  return colors[lang?.toLowerCase()] || "bg-cyan"
}

export function ProjectCard({ repo, viewMode }: ProjectCardProps) {
  const isList = viewMode === "list"

  const tint = TINTS[repo.id % TINTS.length]

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ""
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link
        href={`/projects/${repo.name}`}
        className="block h-full outline-none"
      >
        <div
          className={`hum-card ${tint} group flex h-full overflow-hidden rounded-2xl ${isList ? "flex-col md:flex-row" : "flex-col"}`}
        >
          <div
            className={`flex flex-1 flex-col p-6 md:p-7 ${isList ? "md:w-2/3" : ""}`}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-mono text-xs font-medium text-ink-2">
                <Star className="h-4 w-4" />
                {repo.stargazers_count}
              </div>
              <ArrowUpRight className="h-5 w-5 text-ink-2 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink" />
            </div>

            <h3 className="line-clamp-1 text-xl font-bold tracking-tight text-ink">
              {repo.name}
            </h3>

            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-2">
              {repo.description || "No description provided."}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {repo.topics?.slice(0, 3).map((topic) => (
                <Badge
                  key={topic}
                  className="rounded-full bg-paper-3 px-3 py-0.5 font-mono text-[10px] font-medium text-ink-2"
                >
                  {topic}
                </Badge>
              ))}
              {repo.topics?.length > 3 && (
                <Badge className="rounded-full bg-paper-3 px-3 py-0.5 font-mono text-[10px] font-medium text-ink-2">
                  +{repo.topics.length - 3}
                </Badge>
              )}
            </div>
          </div>

          <div
            className={`flex items-center justify-between gap-3 px-6 pb-6 font-mono md:pb-0 ${isList ? "md:w-1/3 md:flex-col md:items-start md:justify-center md:gap-3 md:border-l md:border-border/60 md:px-7" : ""}`}
          >
            {repo.language && (
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${getLanguageColor(repo.language)}`}
                />
                <span className="text-xs font-medium text-ink-2">
                  {repo.language}
                </span>
              </div>
            )}
            <span className="text-[10px] font-medium tracking-wider text-ink-2 uppercase">
              Updated {formatDate(repo.updated_at)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
