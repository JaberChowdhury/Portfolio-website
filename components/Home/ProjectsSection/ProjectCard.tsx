import { ArrowUpRight } from "lucide-react"

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
    <article className="aurora-card group flex h-full flex-col gap-5">
      {/* Title links to the live project */}
      <div className="flex items-start justify-between gap-4">
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="font-heading text-xl font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-cyan"
        >
          {project.title}
        </a>
        <ArrowUpRight
          aria-hidden="true"
          className="mt-1.5 h-5 w-5 shrink-0 text-ink-2 transition-transform duration-300 ease-[var(--ease-fade)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan"
        />
      </div>

      {/* Description */}
      <p className="flex-1 font-serif text-sm leading-relaxed text-ink-2">
        {project.description}
      </p>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech, idx) => (
          <span
            key={idx}
            className="mono-label rounded-full border border-white/10 bg-paper-2/70 px-3 py-1"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Source CTA */}
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="cta-word self-start"
      >
        <span>Code</span>
        <span className="cta-word__arrow" aria-hidden="true">
          →
        </span>
      </a>
    </article>
  )
}
