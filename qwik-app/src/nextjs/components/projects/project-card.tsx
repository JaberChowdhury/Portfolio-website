/** @jsxImportSource react */
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


interface ProjectCardProps {
  repo: RepoSummary
  viewMode: "grid" | "list"
}

const getLanguageColor = (lang: string) => {
  const colors: Record<string, string> = {
    typescript: "bg-blue-500",
    javascript: "bg-yellow-400",
    css: "bg-purple-500",
    html: "bg-red-500",
    astro: "bg-orange-500",
    "c++": "bg-pink-500",
    c: "bg-slate-500",
    python: "bg-blue-400",
    rust: "bg-orange-600",
    glsl: "bg-cyan-500",
    shell: "bg-green-500",
    markdown: "bg-sky-500",
  }
  return colors[lang?.toLowerCase()] || "bg-cyan-400"
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
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <a
        href={`/projects/${repo.name}`}
        className="block h-full outline-none"
      >
        <Card
          className={`group relative flex h-full overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-[6px_6px_0px_0px_hsl(var(--primary))] ${isList ? "flex-col items-center md:flex-row" : "flex-col"}`}
        >
          {/* Subtle noise pattern overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <CardHeader
            className={`relative z-10 w-full ${isList ? "md:w-1/3" : ""}`}
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4" />
                  <span className="text-xs font-medium">
                    {repo.stargazers_count}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
            </div>

            <CardTitle className="line-clamp-1 text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
              {repo.name}
            </CardTitle>
          </CardHeader>

          <CardContent
            className={`relative z-10 w-full flex-grow ${isList ? "md:w-2/3 md:pt-6" : ""}`}
          >
            <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
              {repo.description || "No description provided."}
            </p>

            <div className="flex flex-wrap gap-2">
              {repo.topics?.slice(0, 3).map((topic) => (
                <Badge
                  key={topic}
                  variant="secondary"
                  className="px-1.5 py-0 font-mono text-[10px]"
                >
                  {topic}
                </Badge>
              ))}
              {repo.topics?.length > 3 && (
                <Badge
                  variant="secondary"
                  className="px-1.5 py-0 font-mono text-[10px]"
                >
                  +{repo.topics.length - 3}
                </Badge>
              )}
            </div>
          </CardContent>

          <CardFooter
            className={`relative z-10 flex w-full items-center justify-between border-t border-border/50 bg-muted/20 px-6 py-4 ${isList ? "md:w-auto md:flex-col md:justify-center md:gap-2 md:border-t-0 md:border-l" : ""}`}
          >
            {repo.language && (
              <div className="flex items-center space-x-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${getLanguageColor(repo.language)}`}
                />
                <span className="text-xs font-medium text-muted-foreground">
                  {repo.language}
                </span>
              </div>
            )}
            <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
              Updated {formatDate(repo.updated_at)}
            </span>
          </CardFooter>
        </Card>
      </a>
    </motion.div>
  )
}
