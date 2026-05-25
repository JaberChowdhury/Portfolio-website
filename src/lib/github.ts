import hljs from "highlight.js";
import { marked } from "marked";

// Types
export interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  pushed_at: string;
  default_branch?: string;
  fork?: boolean;
  branches?: GitHubBranch[];
  readmes?: BranchData[];
}

export interface BranchData {
  name: string;
  readmeHtml: string;
}

export interface GitHubBranch {
  name: string;
  commit?: { sha: string; url: string };
  protected?: boolean;
}

// Configure marked with highlight.js syntax highlighting
const renderer = new marked.Renderer();
renderer.code = ({ text, lang }: { text: string; lang?: string }): string => {
  const language = lang && hljs.getLanguage(lang) ? lang : "plaintext";
  const highlighted = hljs.highlight(text, { language }).value;
  return `<pre class="hljs"><code class="language-${language}">${highlighted}</code></pre>`;
};
marked.use({ renderer });

// Robust Markdown parser using marked and highlight.js
export function renderLocalMarkdown(markdown: string): string {
  try {
    return marked.parse(markdown) as string;
  } catch (err) {
    console.error(
      "Failed to parse markdown with marked, returning fallback:",
      err,
    );
    return `<pre><code>${markdown}</code></pre>`;
  }
}

// Fetch all portfolios from the user's static API repository
export async function fetchAllPortfolios(): Promise<Repository[]> {
  const res = await fetch(
    "https://raw.githubusercontent.com/JaberChowdhury/my_github_data/refs/heads/main/api/portfolio.json",
    {
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch portfolios JSON: ${res.status}`);
  }
  return await res.json();
}

// Fetch README from GitHub and compile to HTML
export async function fetchReadmeHtml(
  repoName: string,
  branchName: string,
): Promise<string> {
  const rawUrl = `https://raw.githubusercontent.com/JaberChowdhury/${repoName}/${branchName}/README.md`;
  let res = await fetch(rawUrl, { next: { revalidate: 3600 } });
  if (!res.ok) {
    // Try lowercase readme.md just in case
    const rawUrlLower = `https://raw.githubusercontent.com/JaberChowdhury/${repoName}/${branchName}/readme.md`;
    res = await fetch(rawUrlLower, { next: { revalidate: 3600 } });
  }

  if (!res.ok) {
    throw new Error(
      `README.md not found on branch ${branchName} for repo ${repoName}`,
    );
  }

  const markdownText = await res.text();
  return renderLocalMarkdown(markdownText);
}
