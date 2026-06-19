import hljs from "highlight.js"
import { marked } from "marked"

export interface RepoSummary {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  topics: string[]
  stargazers_count: number
  updated_at: string
}

export interface CommitData {
  sha: string
  message: string
  author: string
  date: string // ISO 8601 Date string
  url: string // Direct link to the commit on GitHub
}

export interface GitHubBranch {
  name: string
  commit?: {
    sha: string
    url: string
  }
  protected?: boolean
  languages?: Record<string, number> // Count of files per language specifically in this branch
  recentCommits?: CommitData[] // The 5 most recent commits strictly for this branch
}

export interface BranchData {
  name: string // Usually "main" or "master"
  readmeHtml: string // Raw HTML string of the repository's README
}

export interface LanguageStats {
  [language: string]: number // e.g., { "TypeScript": 45000, "HTML": 1200 } (Values are in bytes)
}

export interface Repository extends RepoSummary {
  full_name: string
  watchers_count: number
  forks_count: number
  pushed_at: string // ISO 8601 Date string
  default_branch?: string
  fork?: boolean
  size: number
  open_issues_count: number
}

export interface DetailedRepo extends Repository {
  branches: GitHubBranch[]
  readmes: BranchData[]
  languages: LanguageStats
  weeklyActivity: number[] // Array of 52 integers representing commits per week
}

export type CombinedRepo = DetailedRepo

// Configure marked with highlight.js syntax highlighting
const renderer = new marked.Renderer()
renderer.code = ({ text, lang }: { text: string; lang?: string }): string => {
  const language = lang && hljs.getLanguage(lang) ? lang : "plaintext"
  const highlighted = hljs.highlight(text, { language }).value
  return `<pre class="hljs"><code class="language-${language}">${highlighted}</code></pre>`
}
marked.use({ renderer })

// Robust Markdown parser using marked and highlight.js
export function renderLocalMarkdown(markdown: string): string {
  try {
    return marked.parse(markdown) as string
  } catch (err) {
    console.error(
      "Failed to parse markdown with marked, returning fallback:",
      err
    )
    return `<pre><code>${markdown}</code></pre>`
  }
}

// Fetch lightweight summaries (index feed) from the static API
export async function fetchAllSummaries(): Promise<RepoSummary[]> {
  const res = await fetch(
    "https://raw.githubusercontent.com/JaberChowdhury/my_github_data/main/api/projects/index.json"
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch projects index JSON: ${res.status}`)
  }
  return await res.json()
}

// Fetch all portfolios (aliased for backward compatibility)
export async function fetchAllPortfolios(): Promise<RepoSummary[]> {
  return fetchAllSummaries()
}

// Fetch detailed repository data by repository name
export async function fetchDetailedRepo(
  repoName: string
): Promise<DetailedRepo> {
  const res = await fetch(
    `https://raw.githubusercontent.com/JaberChowdhury/my_github_data/main/api/projects/${repoName}.json`
  )
  if (!res.ok) {
    throw new Error(
      `Failed to fetch detailed repo JSON for ${repoName}: ${res.status}`
    )
  }
  return await res.json()
}

// Fetch README from GitHub and compile to HTML
export async function fetchReadmeHtml(
  repoName: string,
  branchName: string
): Promise<string> {
  const rawUrl = `https://raw.githubusercontent.com/JaberChowdhury/${repoName}/${branchName}/README.md`
  let res = await fetch(rawUrl)
  if (!res.ok) {
    // Try lowercase readme.md just in case
    const rawUrlLower = `https://raw.githubusercontent.com/JaberChowdhury/${repoName}/${branchName}/readme.md`
    res = await fetch(rawUrlLower)
  }

  if (!res.ok) {
    throw new Error(
      `README.md not found on branch ${branchName} for repo ${repoName}`
    )
  }

  const markdownText = await res.text()
  return renderLocalMarkdown(markdownText)
}
