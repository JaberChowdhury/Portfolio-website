import { ExternalLink, GitPullRequestClosed } from "lucide-react"

import { Button } from "@/components/ui/button"

export interface Project {
  title: string
  description: string
  tech: string[]
  live: string
  github: string
}

interface ProjectCardProps {
  project: Project
  accent?: string
}

export function ProjectCard({
  project,
  accent = "hum-card--pear",
}: ProjectCardProps) {
  return (
    <div className={`hum-card flex h-full flex-col rounded-2xl p-6 md:p-7 ${accent}`}>
      <h3
        data-cursor="text"
        className="text-xl font-bold tracking-tight text-ink"
      >
        {project.title}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-2 md:text-base">
        {project.description}
      </p>

      <div className="mt-5 flex min-h-8 flex-wrap gap-2">
        {project.tech.map((tech, idx) => (
          <span
            key={idx}
            className="rounded-full bg-paper-3 px-3 py-1 text-[11px] font-semibold tracking-wide text-ink-2"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button
          className="px-8 text-xs tracking-wide"
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
          className="px-5 text-xs font-bold tracking-wide"
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
    </div>
  )
}
