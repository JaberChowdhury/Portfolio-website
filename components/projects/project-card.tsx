import { Icon } from "@/components/pouf/Icon"
import { Blob, Dot } from "@/components/pouf/media"
import { Card } from "@/components/pouf/surface"
import { Heading, Text } from "@/components/pouf/text"
import type { IconName } from "@/components/pouf/Icon"
import type { Tone } from "@/components/pouf/tone"
import { Link } from "@/i18n/routing"
import type { RepoSummary } from "@/lib/github"

interface ProjectCardProps {
  repo: RepoSummary
  viewMode: "grid" | "list"
}

const LANGUAGE_COLORS: Record<string, string> = {
  typescript: "#c9a8ff",
  javascript: "#ffe58a",
  css: "#9ec8ff",
  html: "#ffb38a",
  astro: "#ffb3d1",
  "c++": "#9ec8ff",
  c: "#c9a8ff",
  python: "#a8f0d0",
  rust: "#ffb3d1",
  glsl: "#3a2e5c",
  shell: "#ffb38a",
  markdown: "#71609b",
}

const LANGUAGE_ICONS: Record<string, IconName> = {
  typescript: "lab",
  javascript: "sparkle",
  css: "wind",
  html: "photo",
  python: "chart",
  rust: "shield",
  "c++": "overview",
  c: "overview",
  shell: "log",
}

const LANGUAGE_TONES: Record<string, Tone> = {
  typescript: "blue",
  javascript: "yellow",
  css: "pink",
  html: "orange",
  python: "mint",
  rust: "purple",
  "c++": "blue",
  c: "purple",
  shell: "orange",
}

const getLanguageColor = (lang: string) =>
  LANGUAGE_COLORS[lang?.toLowerCase()] || "#9ec8ff"

const getLanguageIcon = (lang: string | null): IconName =>
  LANGUAGE_ICONS[lang?.toLowerCase() || ""] || "tag"

const getLanguageTone = (lang: string | null): Tone =>
  LANGUAGE_TONES[lang?.toLowerCase() || ""] || "purple"

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

  const language = repo.language

  return (
    <Link
      href={`/projects/${repo.name}`}
      className="block h-full no-underline [&_.pouf-card]:h-full"
    >
      <Card motion="lift">
        <div
          className={
            isList
              ? "flex h-full flex-col gap-(--s4) md:flex-row md:items-center"
              : "flex h-full flex-col gap-(--s4)"
          }
        >
          <div className="flex items-start justify-between gap-(--s3)">
            <Blob
              tone={getLanguageTone(language)}
              size="md"
              icon={getLanguageIcon(language)}
            />
            <span className="inline-flex items-center gap-[6px] rounded-control bg-bg px-(--s3) py-[6px]">
              <Icon name="star" size="sm" />
              <Text size="sm" num>
                {repo.stargazers_count}
              </Text>
            </span>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-(--s2)">
            <Heading level={3}>{repo.name}</Heading>
            <Text muted>{repo.description || "No description provided."}</Text>

            {repo.topics && repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-(--s3)">
                {repo.topics.slice(0, 3).map((topic) => (
                  <span key={topic} className="inline-flex items-center gap-[6px]">
                    <Dot tone="idle" />
                    <Text size="sm" muted>
                      {topic}
                    </Text>
                  </span>
                ))}
                {repo.topics.length > 3 && (
                  <Text size="sm" muted num>
                    +{repo.topics.length - 3}
                  </Text>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-(--s4) pt-(--s2)">
              {language && (
                <span className="inline-flex items-center gap-2">
                  <span
                    className="h-[9px] w-[9px] flex-none rounded-[50%]"
                    style={{ backgroundColor: getLanguageColor(language) }}
                  />
                  <Text size="sm">{language}</Text>
                </span>
              )}
              <Text size="sm" muted>
                Updated {formatDate(repo.updated_at)}
              </Text>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
