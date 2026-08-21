import { ExternalLink, GitPullRequestClosed } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface Project {
  title: string
  description: string
  tech: string[]
  live?: string
  github?: string
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/40 md:p-5">
      <div>
        <CardHeader className="p-0 space-y-1.5">
          <CardTitle className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
            {project.title}
          </CardTitle>

          <CardDescription className="line-clamp-2 text-xs leading-relaxed text-muted-foreground md:text-sm font-normal">
            {project.description}
          </CardDescription>
        </CardHeader>

        {/* Tech Pills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 3).map((tech, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="rounded-md border-0 bg-secondary px-2 py-0.5 text-[10px] font-medium tracking-wide text-secondary-foreground"
            >
              {tech}
            </Badge>
          ))}
          {project.tech.length > 3 && (
            <span className="self-center text-[10px] font-medium text-muted-foreground">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            <span>Live</span>
            <ExternalLink className="h-3 w-3 text-muted-foreground" />
          </a>
        ) : (
          <div className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary/50 text-xs font-medium text-muted-foreground">
            <span>Demo</span>
          </div>
        )}

        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <GitPullRequestClosed className="h-3 w-3" />
            <span>Code</span>
          </a>
        ) : (
          <div className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg text-xs font-medium text-muted-foreground/60">
            <GitPullRequestClosed className="h-3 w-3 opacity-50" />
            <span>Code</span>
          </div>
        )}
      </div>
    </Card>
  )
}

