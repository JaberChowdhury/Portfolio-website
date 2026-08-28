import React from "react"
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiRust,
  SiC,
  SiCplusplus,
  SiNodedotjs,
  SiPostgresql,
  SiRedis,
  SiMongodb,
  SiDocker,
  SiKubernetes,
  SiGooglecloud,
  SiLinux,
  SiDebian,
  SiVercel,
  SiNginx,
  SiGithub,
  SiGithubactions,
  SiJenkins,
  SiBun,
  SiClaude,
  SiSupabase,
} from "react-icons/si"
import { TbBrandOpenai } from "react-icons/tb"
import { ShieldCheck } from "lucide-react"

// Custom SVG Icons for Antigravity, OpenCode, and MCP
export const AntigravityIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="3" fill="currentColor" />
    <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-30 12 12)" />
    <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(30 12 12)" />
    <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(90 12 12)" />
  </svg>
)

export const McpIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 12h4m8 0h4M12 4v4m0 8v4" />
    <circle cx="12" cy="12" r="3" />
    <rect x="2" y="10" width="4" height="4" rx="1" />
    <rect x="18" y="10" width="4" height="4" rx="1" />
    <rect x="10" y="2" width="4" height="4" rx="1" />
    <rect x="10" y="18" width="4" height="4" rx="1" />
  </svg>
)

export const OpenCodeIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
    <path d="M14 7h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-6" />
  </svg>
)

export type TechCategoryId =
  | "all"
  | "frontend"
  | "languages"
  | "backend"
  | "devops"
  | "tools"

export interface TechCategory {
  id: TechCategoryId
  label: string
  dotColor: string
  accentColor: string
}

export const TECH_CATEGORIES: TechCategory[] = [
  {
    id: "all",
    label: "All Stack",
    dotColor: "bg-foreground/70",
    accentColor: "neutral",
  },
  {
    id: "frontend",
    label: "Frontend",
    dotColor: "bg-[var(--color-cyan)]",
    accentColor: "cyan",
  },
  {
    id: "languages",
    label: "Languages",
    dotColor: "bg-[var(--color-pear)]",
    accentColor: "pear",
  },
  {
    id: "backend",
    label: "Backend & Data",
    dotColor: "bg-[var(--color-mint)]",
    accentColor: "mint",
  },
  {
    id: "devops",
    label: "Cloud & DevOps",
    dotColor: "bg-[var(--color-coral)]",
    accentColor: "coral",
  },
  {
    id: "tools",
    label: "AI, Agents & Tools",
    dotColor: "bg-[var(--color-lavender)]",
    accentColor: "lavender",
  },
]

export type TechCategoryName = "frontend" | "languages" | "backend" | "devops" | "tools"

export type TechItem = {
  id: string
  label: string
  bg: string
  text: string
  icon: React.ReactNode
  category: TechCategoryName
  categoryLabel: string
  accentDot: string
  accentBorder: string
  accentGlow: string
  tag: string
  brandColor: string
  brandLight: string
  brandDeep: string
  textHover: string
  shadowColor: string
  isDarkIcon?: boolean
}

/**
 * Material Expressive Brand Color Generator Helper
 * Transforms actual tech brand colors into calibrated Material 3 Expressive tones:
 * - brandColor: Vibrant, balanced Material 3 primary accent
 * - brandLight: Soft tonal container background (88-94% lightness)
 * - brandDeep: High-contrast deep tone for crisp text in light mode
 * - shadowColor: Subtle ambient glow
 */
function createMaterialExpressiveBrand({
  brandColor,
  brandLight,
  brandDeep,
  isDarkIcon = false,
  textHover = "#FFFFFF",
}: {
  brandColor: string
  brandLight: string
  brandDeep: string
  isDarkIcon?: boolean
  textHover?: string
}) {
  return {
    brandColor,
    brandLight,
    brandDeep,
    bg: `color-mix(in srgb, ${brandColor} 12%, transparent)`,
    text: `text-[${brandDeep}] dark:text-[${brandColor}]`,
    accentDot: `bg-[${brandColor}]`,
    accentBorder: `hover:border-[${brandColor}]/50`,
    accentGlow: `color-mix(in srgb, ${brandColor} 20%, transparent)`,
    shadowColor: `color-mix(in srgb, ${brandColor} 42%, transparent)`,
    textHover: isDarkIcon ? "#1c1d19" : textHover,
    isDarkIcon,
  }
}

export const TECH_STACK_DATA: TechItem[] = [
  // ==========================================================================
  // 1. FRONTEND
  // ==========================================================================
  {
    id: "react",
    label: "React",
    category: "frontend",
    categoryLabel: "UI Library",
    tag: "Core",
    ...createMaterialExpressiveBrand({
      brandColor: "#0284c7", // React Expressive Azure
      brandLight: "#e0f2fe", // Soft Sky Container
      brandDeep: "#0369a1", // Deep Azure Text
    }),
    icon: <SiReact className="h-6 w-6" />,
  },
  {
    id: "nextjs",
    label: "Next.js",
    category: "frontend",
    categoryLabel: "Framework",
    tag: "Production",
    ...createMaterialExpressiveBrand({
      brandColor: "#0f172a", // Next.js Expressive Obsidian
      brandLight: "#e2e8f0", // Soft Slate Container
      brandDeep: "#0f172a", // Deep Slate Text
    }),
    icon: <SiNextdotjs className="h-6 w-6" />,
  },
  {
    id: "tailwind",
    label: "Tailwind CSS",
    category: "frontend",
    categoryLabel: "Styling",
    tag: "Design",
    ...createMaterialExpressiveBrand({
      brandColor: "#0891b2", // Tailwind Expressive Cyan
      brandLight: "#cffafe", // Soft Cyan Container
      brandDeep: "#0e7490", // Deep Cyan Text
    }),
    icon: <SiTailwindcss className="h-6 w-6" />,
  },
  {
    id: "typescript",
    label: "TypeScript",
    category: "frontend",
    categoryLabel: "Typed JS",
    tag: "Type-Safe",
    ...createMaterialExpressiveBrand({
      brandColor: "#2563eb", // TypeScript Expressive Royal Blue
      brandLight: "#dbeafe", // Soft Blue Container
      brandDeep: "#1e40af", // Deep Blue Text
    }),
    icon: <SiTypescript className="h-6 w-6" />,
  },
  {
    id: "javascript",
    label: "JavaScript",
    category: "frontend",
    categoryLabel: "Web Core",
    tag: "Modern ES+",
    ...createMaterialExpressiveBrand({
      brandColor: "#eab308", // JS Expressive Warm Amber
      brandLight: "#fef9c3", // Soft Amber Container
      brandDeep: "#854d0e", // Deep Amber Text (WCAG AAA)
      isDarkIcon: true,
      textHover: "#451a03",
    }),
    icon: <SiJavascript className="h-6 w-6" />,
  },

  // ==========================================================================
  // 2. LANGUAGES
  // ==========================================================================
  {
    id: "rust",
    label: "Rust",
    category: "languages",
    categoryLabel: "Memory Safe",
    tag: "Performance",
    ...createMaterialExpressiveBrand({
      brandColor: "#c2410c", // Rust Expressive Terracotta
      brandLight: "#ffedd5", // Soft Warm Container
      brandDeep: "#9a3412", // Deep Terracotta Text
    }),
    icon: <SiRust className="h-6 w-6" />,
  },
  {
    id: "cpp",
    label: "C++",
    category: "languages",
    categoryLabel: "Competitive & Systems",
    tag: "High Perf",
    ...createMaterialExpressiveBrand({
      brandColor: "#1d4ed8", // C++ Expressive Cobalt
      brandLight: "#dbeafe", // Soft Cobalt Container
      brandDeep: "#1e3a8a", // Deep Cobalt Text
    }),
    icon: <SiCplusplus className="h-6 w-6" />,
  },
  {
    id: "c",
    label: "C",
    category: "languages",
    categoryLabel: "Low-Level Core",
    tag: "Kernel / OS",
    ...createMaterialExpressiveBrand({
      brandColor: "#3b82f6", // C Expressive Steel Blue
      brandLight: "#eff6ff", // Soft Steel Container
      brandDeep: "#1d4ed8", // Deep Steel Text
    }),
    icon: <SiC className="h-6 w-6" />,
  },
  {
    id: "python",
    label: "Python",
    category: "languages",
    categoryLabel: "Scripting & DSA",
    tag: "Algorithms",
    ...createMaterialExpressiveBrand({
      brandColor: "#0284c7", // Python Expressive Ocean Blue
      brandLight: "#e0f2fe", // Soft Blue Container
      brandDeep: "#0369a1", // Deep Ocean Text
    }),
    icon: <SiPython className="h-6 w-6" />,
  },

  // ==========================================================================
  // 3. BACKEND & DATA
  // ==========================================================================
  {
    id: "node",
    label: "Node.js",
    category: "backend",
    categoryLabel: "Runtime",
    tag: "Backend",
    ...createMaterialExpressiveBrand({
      brandColor: "#16a34a", // Node Expressive Emerald
      brandLight: "#dcfce7", // Soft Mint Container
      brandDeep: "#15803d", // Deep Forest Text
    }),
    icon: <SiNodedotjs className="h-6 w-6" />,
  },
  {
    id: "postgres",
    label: "PostgreSQL",
    category: "backend",
    categoryLabel: "Relational DB",
    tag: "SQL",
    ...createMaterialExpressiveBrand({
      brandColor: "#2563eb", // Postgres Expressive Elephant Blue
      brandLight: "#dbeafe", // Soft Azure Container
      brandDeep: "#1e3a8a", // Deep Azure Text
    }),
    icon: <SiPostgresql className="h-6 w-6" />,
  },
  {
    id: "redis",
    label: "Redis",
    category: "backend",
    categoryLabel: "In-Memory DB",
    tag: "Cache / Queue",
    ...createMaterialExpressiveBrand({
      brandColor: "#dc2626", // Redis Expressive Crimson
      brandLight: "#fee2e2", // Soft Rose Container
      brandDeep: "#991b1b", // Deep Crimson Text
    }),
    icon: <SiRedis className="h-6 w-6" />,
  },
  {
    id: "mongodb",
    label: "MongoDB",
    category: "backend",
    categoryLabel: "Document DB",
    tag: "NoSQL",
    ...createMaterialExpressiveBrand({
      brandColor: "#15803d", // MongoDB Expressive Forest
      brandLight: "#dcfce7", // Soft Green Container
      brandDeep: "#166534", // Deep Green Text
    }),
    icon: <SiMongodb className="h-6 w-6" />,
  },
  {
    id: "supabase",
    label: "Supabase",
    category: "backend",
    categoryLabel: "Postgres BaaS",
    tag: "Database",
    ...createMaterialExpressiveBrand({
      brandColor: "#059669", // Supabase Expressive Mint
      brandLight: "#d1fae5", // Soft Mint Container
      brandDeep: "#047857", // Deep Mint Text
    }),
    icon: <SiSupabase className="h-6 w-6" />,
  },
  {
    id: "bun",
    label: "Bun.js",
    category: "backend",
    categoryLabel: "Fast Runtime",
    tag: "Runtime",
    ...createMaterialExpressiveBrand({
      brandColor: "#e11d48", // Bun Expressive Coral Pink
      brandLight: "#ffe4e6", // Soft Coral Container
      brandDeep: "#be123c", // Deep Coral Text
    }),
    icon: <SiBun className="h-6 w-6" />,
  },

  // ==========================================================================
  // 4. CLOUD & DEVOPS
  // ==========================================================================
  {
    id: "docker",
    label: "Docker",
    category: "devops",
    categoryLabel: "Containers",
    tag: "DevOps",
    ...createMaterialExpressiveBrand({
      brandColor: "#0284c7", // Docker Expressive Whale Blue
      brandLight: "#e0f2fe", // Soft Blue Container
      brandDeep: "#0369a1", // Deep Whale Text
    }),
    icon: <SiDocker className="h-6 w-6" />,
  },
  {
    id: "kubernetes",
    label: "Kubernetes",
    category: "devops",
    categoryLabel: "Orchestration",
    tag: "Clusters",
    ...createMaterialExpressiveBrand({
      brandColor: "#2563eb", // K8s Expressive Helm Blue
      brandLight: "#dbeafe", // Soft Helm Container
      brandDeep: "#1e40af", // Deep Helm Text
    }),
    icon: <SiKubernetes className="h-6 w-6" />,
  },
  {
    id: "gcp",
    label: "Google Cloud",
    category: "devops",
    categoryLabel: "Cloud Platform",
    tag: "Infrastructure",
    ...createMaterialExpressiveBrand({
      brandColor: "#3b82f6", // GCP Expressive Royal Blue
      brandLight: "#eff6ff", // Soft Blue Container
      brandDeep: "#1d4ed8", // Deep Blue Text
    }),
    icon: <SiGooglecloud className="h-6 w-6" />,
  },
  {
    id: "linux",
    label: "Linux",
    category: "devops",
    categoryLabel: "OS Kernel",
    tag: "System",
    ...createMaterialExpressiveBrand({
      brandColor: "#f59e0b", // Linux Expressive Gold
      brandLight: "#fef3c7", // Soft Gold Container
      brandDeep: "#92400e", // Deep Gold Text (WCAG AAA)
      isDarkIcon: true,
      textHover: "#451a03",
    }),
    icon: <SiLinux className="h-6 w-6" />,
  },
  {
    id: "debian",
    label: "Debian",
    category: "devops",
    categoryLabel: "Universal OS",
    tag: "Distro",
    ...createMaterialExpressiveBrand({
      brandColor: "#d70a53", // Debian Expressive Crimson Swirl
      brandLight: "#ffe4ec", // Soft Raspberry Container
      brandDeep: "#9f1239", // Deep Crimson Text
    }),
    icon: <SiDebian className="h-6 w-6" />,
  },
  {
    id: "vercel",
    label: "Vercel",
    category: "devops",
    categoryLabel: "Edge & Deploy",
    tag: "Edge",
    ...createMaterialExpressiveBrand({
      brandColor: "#1e293b", // Vercel Expressive Slate
      brandLight: "#f1f5f9", // Soft Slate Container
      brandDeep: "#0f172a", // Deep Slate Text
    }),
    icon: <SiVercel className="h-6 w-6" />,
  },
  {
    id: "nginx",
    label: "Nginx",
    category: "devops",
    categoryLabel: "Reverse Proxy",
    tag: "Proxy",
    ...createMaterialExpressiveBrand({
      brandColor: "#16a34a", // Nginx Expressive Emerald
      brandLight: "#dcfce7", // Soft Emerald Container
      brandDeep: "#15803d", // Deep Emerald Text
    }),
    icon: <SiNginx className="h-6 w-6" />,
  },

  // ==========================================================================
  // 5. TOOLS, AI & AGENT ECOSYSTEM
  // ==========================================================================
  {
    id: "claude",
    label: "Claude AI",
    category: "tools",
    categoryLabel: "Anthropic LLM",
    tag: "AI Model",
    ...createMaterialExpressiveBrand({
      brandColor: "#d97757", // Claude Expressive Coral Terracotta
      brandLight: "#ffedd5", // Soft Coral Container
      brandDeep: "#9a3412", // Deep Coral Text
    }),
    icon: <SiClaude className="h-6 w-6" />,
  },
  {
    id: "chatgpt",
    label: "ChatGPT",
    category: "tools",
    categoryLabel: "OpenAI AI",
    tag: "AI Model",
    ...createMaterialExpressiveBrand({
      brandColor: "#059669", // ChatGPT Expressive Mint Green
      brandLight: "#d1fae5", // Soft Mint Container
      brandDeep: "#065f46", // Deep Mint Text
    }),
    icon: <TbBrandOpenai className="h-6 w-6" />,
  },
  {
    id: "codex",
    label: "Codex",
    category: "tools",
    categoryLabel: "AI Synthesis",
    tag: "Code AI",
    ...createMaterialExpressiveBrand({
      brandColor: "#0d9488", // Codex Expressive Teal
      brandLight: "#ccfbf1", // Soft Teal Container
      brandDeep: "#115e59", // Deep Teal Text
    }),
    icon: <TbBrandOpenai className="h-6 w-6" />,
  },
  {
    id: "opencode",
    label: "OpenCode",
    category: "tools",
    categoryLabel: "AI Terminal",
    tag: "Open Source",
    ...createMaterialExpressiveBrand({
      brandColor: "#0284c7", // OpenCode Expressive Sky Blue
      brandLight: "#e0f2fe", // Soft Sky Container
      brandDeep: "#0369a1", // Deep Sky Text
    }),
    icon: <OpenCodeIcon className="h-6 w-6" />,
  },
  {
    id: "antigravity",
    label: "Antigravity",
    category: "tools",
    categoryLabel: "Agentic IDE",
    tag: "AI Agents",
    ...createMaterialExpressiveBrand({
      brandColor: "#9333ea", // Antigravity Expressive Violet
      brandLight: "#f3e8ff", // Soft Violet Container
      brandDeep: "#6b21a8", // Deep Violet Text
    }),
    icon: <AntigravityIcon className="h-6 w-6" />,
  },
  {
    id: "mcp",
    label: "MCP",
    category: "tools",
    categoryLabel: "Model Protocol",
    tag: "Protocol",
    ...createMaterialExpressiveBrand({
      brandColor: "#f97316", // MCP Expressive Flame Orange
      brandLight: "#ffedd5", // Soft Orange Container
      brandDeep: "#9a3412", // Deep Flame Text
    }),
    icon: <McpIcon className="h-6 w-6" />,
  },
  {
    id: "github",
    label: "GitHub",
    category: "tools",
    categoryLabel: "VCS & Git",
    tag: "Collaboration",
    ...createMaterialExpressiveBrand({
      brandColor: "#6e5494", // GitHub Expressive Octocat Purple
      brandLight: "#f3e8ff", // Soft Purple Container
      brandDeep: "#4c1d95", // Deep Purple Text
    }),
    icon: <SiGithub className="h-6 w-6" />,
  },
  {
    id: "actions",
    label: "GitHub Actions",
    category: "tools",
    categoryLabel: "CI / CD",
    tag: "Automations",
    ...createMaterialExpressiveBrand({
      brandColor: "#2563eb", // Actions Expressive Pipeline Blue
      brandLight: "#dbeafe", // Soft Blue Container
      brandDeep: "#1e40af", // Deep Blue Text
    }),
    icon: <SiGithubactions className="h-6 w-6" />,
  },
  {
    id: "jenkins",
    label: "Jenkins",
    category: "tools",
    categoryLabel: "Pipelines",
    tag: "Pipelines",
    ...createMaterialExpressiveBrand({
      brandColor: "#dc2626", // Jenkins Expressive Crimson
      brandLight: "#fee2e2", // Soft Crimson Container
      brandDeep: "#991b1b", // Deep Crimson Text
    }),
    icon: <SiJenkins className="h-6 w-6" />,
  },
  {
    id: "security",
    label: "Security",
    category: "tools",
    categoryLabel: "Auth & Crypto",
    tag: "Security",
    ...createMaterialExpressiveBrand({
      brandColor: "#059669", // Security Expressive Shield Emerald
      brandLight: "#d1fae5", // Soft Shield Container
      brandDeep: "#065f46", // Deep Shield Text
    }),
    icon: <ShieldCheck className="h-6 w-6" />,
  },
]
