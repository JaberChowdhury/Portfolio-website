import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { RepoSummary } from "@/lib/github"
import { motion } from "framer-motion"
import { ArrowUpRight, GitFork, Star, Terminal } from "lucide-react"
import Link from "next/link"

interface ProjectCardProps {
  repo: RepoSummary
  viewMode: "grid" | "list"
}

const getLanguageColor = (lang: string) => {
  const colors: Record<string, string> = {
    typescript: "oklch(72% 0.12 225)",
    javascript: "oklch(78% 0.11 200)",
    css: "oklch(64% 0.12 205)",
    html: "oklch(80% 0.09 180)",
    astro: "oklch(58% 0.13 235)",
    "c++": "oklch(70% 0.12 190)",
    c: "oklch(82% 0.08 210)",
    python: "oklch(66% 0.12 215)",
    rust: "oklch(76% 0.11 195)",
    glsl: "oklch(60% 0.13 245)",
    shell: "oklch(85% 0.07 200)",
    markdown: "oklch(55% 0.14 240)",
  }
  return colors[lang?.toLowerCase()] || "oklch(78% 0.11 200)"
}

export function ProjectCard({ repo, viewMode }: ProjectCardProps) {
  const isList = viewMode === "list"

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
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link
        href={`/projects/${repo.name}`}
        className="block h-full outline-none"
      >
        <Card
          className={`group relative flex h-full flex-col overflow-hidden rounded-2xl bg-paper-2 text-ink shadow-none ring-0 transition-colors duration-300 hover:bg-paper-3 hover:shadow-glow-cyan ${
            isList ? "md:flex-row" : ""
          }`}
        >
          <CardHeader
            className={`w-full ${isList ? "md:w-1/3 md:justify-center" : ""}`}
          >
            <div className="mb-3 flex items-baseline justify-between">
              <div className="flex items-baseline gap-2 font-mono text-[10px] tracking-widest text-ink-2 uppercase">
                <span>{repo.language || "repository"}</span>
                <span className="text-ink-2/60">·</span>
                <span className="flex items-baseline gap-1">
                  <Star className="h-3.5 w-3.5 translate-y-0.5" />
                  {repo.stargazers_count}
                </span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-ink-2 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan" />
            </div>

            <CardTitle className="line-clamp-1 text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-cyan">
              {repo.name}
            </CardTitle>
          </CardHeader>

          <CardContent
            className={`w-full flex-grow ${isList ? "md:w-2/3 md:pt-6" : ""}`}
          >
            <p className="mb-5 line-clamp-2 text-sm text-ink-2">
              {repo.description || "No description provided."}
            </p>

            <div className="flex flex-wrap gap-2">
              {repo.topics?.slice(0, 3).map((topic) => (
                <Badge
                  key={topic}
                  variant="secondary"
                  className="border-0 bg-paper-3 px-2 py-0 font-mono text-[10px] tracking-widest text-ink-2 uppercase hover:bg-paper-3!"
                >
                  {topic}
                </Badge>
              ))}
              {repo.topics?.length > 3 && (
                <Badge
                  variant="secondary"
                  className="border-0 bg-paper-3 px-2 py-0 font-mono text-[10px] tracking-widest text-ink-2 uppercase hover:bg-paper-3!"
                >
                  +{repo.topics.length - 3}
                </Badge>
              )}
            </div>
          </CardContent>

          <CardFooter
            className={`flex w-full items-center justify-between gap-4 ${isList ? "md:w-auto md:flex-col md:justify-center md:gap-2" : ""}`}
          >
            {repo.language && (
              <div className="flex items-baseline gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full`}
                  style={{ backgroundColor: getLanguageColor(repo.language) }}
                />
                <span className="font-mono text-xs font-bold text-ink-2">
                  {repo.language}
                </span>
              </div>
            )}
            <span className="font-mono text-[10px] tracking-widest text-ink-2 uppercase">
              Updated {formatDate(repo.updated_at)}
            </span>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}
