import { ExternalLink, GitPullRequestClosed } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface Project {
  title: string
  description: string
  tech: string[]
  live: string
  github: string
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group relative overflow-hidden border border-border/60 bg-card/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.25)]">
      {/* Soft hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <CardHeader className="space-y-3">
        {/* Project Title Typography */}
        <CardTitle className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
          {project.title}
        </CardTitle>

        <CardDescription className="min-h-20 leading-relaxed text-muted-foreground">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Tech Pills */}
        <div className="flex min-h-20 flex-wrap gap-2">
          {project.tech.map((tech, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="rounded-full border border-border/50 bg-muted/40 px-3 py-1 text-[11px] tracking-wide"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            className="rounded-full px-8 text-xs tracking-wide"
            nativeButton={false}
            render={
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Live
            <ExternalLink className="ml-2 h-3.5 w-3.5" />
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="rounded-full border-border/60 bg-card/30 px-5 text-xs font-bold tracking-wide backdrop-blur-md"
            nativeButton={false}
            render={
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Code
            <GitPullRequestClosed className="ml-2 h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
