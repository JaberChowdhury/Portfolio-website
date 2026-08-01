import {
  Activity,
  Braces,
  Cloud,
  Code,
  Command,
  Container,
  Cpu,
  Database,
  GitBranch,
  Globe,
  HardDrive,
  Layout,
  Layers,
  Lock,
  Network,
  Rocket,
  Server,
  Share2,
  Shield,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react"
import type { ReactElement } from "react"
import type { Tone } from "@/components/pouf/tone"

export type TechItem = {
  id: string
  label: string
  tone: Tone
  value: number
  icon: ReactElement
}

export const TECH_STACK_DATA: TechItem[] = [
  { id: "react", label: "React", tone: "blue", value: 95, icon: <Code size={20} /> },
  { id: "nextjs", label: "Next.js", tone: "purple", value: 92, icon: <Rocket size={20} /> },
  { id: "tailwind", label: "Tailwind", tone: "blue", value: 94, icon: <Layout size={20} /> },
  { id: "typescript", label: "TypeScript", tone: "blue", value: 90, icon: <Code size={20} /> },
  { id: "javascript", label: "JavaScript", tone: "yellow", value: 96, icon: <Code size={20} /> },
  { id: "node", label: "Node.js", tone: "mint", value: 88, icon: <Server size={20} /> },
  { id: "python", label: "Python", tone: "blue", value: 85, icon: <Braces size={20} /> },
  { id: "golang", label: "Go", tone: "blue", value: 78, icon: <Zap size={20} /> },
  { id: "rust", label: "Rust", tone: "orange", value: 72, icon: <Cpu size={20} /> },
  { id: "linux", label: "Linux", tone: "orange", value: 90, icon: <Terminal size={20} /> },
  { id: "ubuntu", label: "Ubuntu", tone: "orange", value: 88, icon: <Command size={20} /> },
  { id: "docker", label: "Docker", tone: "blue", value: 85, icon: <Container size={20} /> },
  { id: "kubernetes", label: "Kubernetes", tone: "purple", value: 75, icon: <Network size={20} /> },
  { id: "postgres", label: "PostgreSQL", tone: "blue", value: 82, icon: <Database size={20} /> },
  { id: "mongodb", label: "MongoDB", tone: "mint", value: 80, icon: <HardDrive size={20} /> },
  { id: "redis", label: "Redis", tone: "pink", value: 76, icon: <Layers size={20} /> },
  { id: "aws", label: "AWS", tone: "orange", value: 74, icon: <Cloud size={20} /> },
  { id: "gcp", label: "Google Cloud", tone: "blue", value: 70, icon: <Globe size={20} /> },
  { id: "vercel", label: "Vercel", tone: "purple", value: 90, icon: <Share2 size={20} /> },
  { id: "nginx", label: "Nginx", tone: "mint", value: 72, icon: <Shield size={20} /> },
  { id: "github", label: "GitHub", tone: "purple", value: 92, icon: <GitBranch size={20} /> },
  { id: "actions", label: "GitHub Actions", tone: "blue", value: 84, icon: <Workflow size={20} /> },
  { id: "jenkins", label: "Jenkins", tone: "pink", value: 68, icon: <Activity size={20} /> },
  { id: "security", label: "Security", tone: "purple", value: 78, icon: <Lock size={20} /> },
]
