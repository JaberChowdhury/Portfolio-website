import type { Metadata } from "next";
import { fetchAllPortfolios, renderLocalMarkdown } from "@/lib/github";
import ProjectDetailClient from "../ProjectDetailClient";

// Type definitions matching client & parent
interface Repository {
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

interface BranchData {
  name: string;
  readmeHtml: string;
}

interface GitHubBranch {
  name: string;
  commit?: { sha: string; url: string };
  protected?: boolean;
}

// Fallback catalog list to ensure static generation parameter success
const FALLBACK_REPOS: Repository[] = [
  {
    id: 743209978,
    name: "Astro-express-project",
    full_name: "JaberChowdhury/Astro-express-project",
    html_url: "https://github.com/JaberChowdhury/Astro-express-project",
    description:
      "Building a full stack curd app with astro and expressjs and typescript",
    homepage: "https://astro-express-project.vercel.app",
    stargazers_count: 3,
    watchers_count: 3,
    forks_count: 0,
    language: "TypeScript",
    updated_at: "2025-06-21T10:43:03Z",
    pushed_at: "2024-01-15T11:47:18Z",
  },
  {
    id: 812938475,
    name: "raylib-projects",
    full_name: "JaberChowdhury/raylib-projects",
    html_url: "https://github.com/JaberChowdhury/raylib-projects",
    description:
      "A suite of interactive games and visual simulations built with Raylib and C++, including bouncing ball physics and tick-tack-toe game logic.",
    homepage: null,
    stargazers_count: 5,
    watchers_count: 5,
    forks_count: 0,
    language: "C++",
    updated_at: "2026-05-24T20:00:00Z",
    pushed_at: "2026-05-24T20:00:00Z",
  },
  {
    id: 752391024,
    name: "Brutalist-Portfolio",
    full_name: "JaberChowdhury/Brutalist-Portfolio",
    html_url: "https://github.com/JaberChowdhury/Brutalist-Portfolio",
    description:
      "A premium personal portfolio built with Next.js 16, Material UI (MUI), and Framer Motion, highlighting interactive animations and clean brutalist layouts.",
    homepage: "https://jaber-portfolio.vercel.app",
    stargazers_count: 5,
    watchers_count: 5,
    forks_count: 1,
    language: "TypeScript",
    updated_at: "2026-05-24T20:00:00Z",
    pushed_at: "2026-05-24T20:00:00Z",
  },
  {
    id: 732918203,
    name: "express-typescript-boilerplate",
    full_name: "JaberChowdhury/express-typescript-boilerplate",
    html_url:
      "https://github.com/JaberChowdhury/express-typescript-boilerplate",
    description:
      "Production-ready boilerplates for Express.js API development with TypeScript, ESLint, Biome, and structured modular architecture.",
    homepage: null,
    stargazers_count: 2,
    watchers_count: 2,
    forks_count: 0,
    language: "TypeScript",
    updated_at: "2025-11-12T14:22:00Z",
    pushed_at: "2025-11-12T14:22:00Z",
  },
  {
    id: 711928374,
    name: "react-native-chat-ui",
    full_name: "JaberChowdhury/react-native-chat-ui",
    html_url: "https://github.com/JaberChowdhury/react-native-chat-ui",
    description:
      "A beautifully styled, high-performance chat interface components built for React Native and Expo projects, incorporating reanimated and gesture handlers.",
    homepage: null,
    stargazers_count: 3,
    watchers_count: 3,
    forks_count: 0,
    language: "JavaScript",
    updated_at: "2025-08-04T09:15:30Z",
    pushed_at: "2025-08-04T09:15:30Z",
  },
  {
    id: 721029384,
    name: "threejs-creative-landing",
    full_name: "JaberChowdhury/threejs-creative-landing",
    html_url: "https://github.com/JaberChowdhury/threejs-creative-landing",
    description:
      "Interactive 3D landing page experience utilizing Three.js, React Three Fiber (R3F), and custom GLSL shader materials for ambient micro-interactions.",
    homepage: "https://threejs-creative.vercel.app",
    stargazers_count: 8,
    watchers_count: 8,
    forks_count: 2,
    language: "GLSL",
    updated_at: "2026-02-18T18:40:00Z",
    pushed_at: "2026-02-18T18:40:00Z",
  },
  {
    id: 703928172,
    name: "mini-rust-compiler",
    full_name: "JaberChowdhury/mini-rust-compiler",
    html_url: "https://github.com/JaberChowdhury/mini-rust-compiler",
    description:
      "An educational toy compiler and parser written in Rust to translate a simplified subset of programming language syntax to WebAssembly (Wasm).",
    homepage: null,
    stargazers_count: 4,
    watchers_count: 4,
    forks_count: 1,
    language: "Rust",
    updated_at: "2025-04-10T12:00:00Z",
    pushed_at: "2025-04-10T12:00:00Z",
  },
];

// Server-side loader to fetch metadata and READMEs for all branches
async function getProjectDetails(repoName: string) {
  try {
    const portfolios = await fetchAllPortfolios();
    const project = portfolios.find(
      (p) => p.name.toLowerCase() === repoName.toLowerCase(),
    );

    if (!project) {
      throw new Error(
        `Repository ${repoName} not found in static portfolio file`,
      );
    }

    // Exclude readmes/branches from repoInfo to match Repository interface expected by client component
    const { readmes, branches: _branches, ...repoInfo } = project;

    const branchesData: BranchData[] =
      readmes && readmes.length > 0
        ? readmes
        : [
            {
              name: project.default_branch || "main",
              readmeHtml:
                "<h3>No README.md content found for this project.</h3>",
            },
          ];

    return {
      repoInfo: {
        ...repoInfo,
        default_branch: repoInfo.default_branch || "main",
      } as Repository,
      branchesData,
      allBranches: project.branches || [
        { name: project.default_branch || "main" },
      ],
    };
  } catch (err) {
    console.error(
      "Failed to load repo details from static portfolio file, using fallback:",
      err,
    );

    const fallbackRepo =
      FALLBACK_REPOS.find(
        (r) => r.name.toLowerCase() === repoName.toLowerCase(),
      ) || FALLBACK_REPOS[0];
    const markdown = `# ${fallbackRepo.name}\n\nWelcome to **${fallbackRepo.name}**!\n\nThis is a static placeholder page. View the repository directly on GitHub: [Repository Link](${fallbackRepo.html_url})`;
    const html = renderLocalMarkdown(markdown);

    return {
      repoInfo: fallbackRepo,
      branchesData: [
        {
          name: fallbackRepo.default_branch || "main",
          readmeHtml: html,
        },
      ],
      allBranches: [{ name: fallbackRepo.default_branch || "main" }],
    };
  }
}

// Generate static routes during build time for all repositories and their branches
export async function generateStaticParams() {
  try {
    const repos = await fetchAllPortfolios();
    const params: { name: string; branch: string }[] = [];

    for (const repo of repos) {
      if (repo.fork) continue;

      const branches = repo.branches || [
        { name: repo.default_branch || "main" },
      ];
      for (const branch of branches) {
        params.push({
          name: repo.name,
          branch: branch.name,
        });
      }
    }
    return params;
  } catch (err) {
    console.error(
      "Failed to generate static params from static portfolio file, using fallbacks:",
      err,
    );
    const params: { name: string; branch: string }[] = [];
    for (const repo of FALLBACK_REPOS) {
      params.push({
        name: repo.name,
        branch: repo.default_branch || "main",
      });
    }
    return params;
  }
}

// Metadata Generator
export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string; branch: string }>;
}): Promise<Metadata> {
  const { name, branch } = await params;
  const decodedBranch = decodeURIComponent(branch);
  return {
    title: `${name} (${decodedBranch}) | Projects`,
    description: `Details and README for the repository: ${name} on branch ${decodedBranch}`,
  };
}

// Dynamic route Server Component (Next.js 16)
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ name: string; branch: string }>;
}) {
  const { name, branch } = await params;
  const decodedBranch = decodeURIComponent(branch);
  const { repoInfo, branchesData, allBranches } = await getProjectDetails(name);

  return (
    <ProjectDetailClient
      repoInfo={repoInfo}
      branchesData={branchesData}
      allBranches={allBranches}
      activeBranchName={decodedBranch}
    />
  );
}
