import type { Metadata } from "next"
import ProjectDetailClient from "@/components/projects/project-detail-client"
import { generateProjectBranchStaticParams } from "@/lib/projects"

export { generateProjectBranchStaticParams as generateStaticParams }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string; branch: string }>
}): Promise<Metadata> {
  const { name, branch } = await params
  const decodedBranch = decodeURIComponent(branch)
  return {
    title: `${name} (${decodedBranch}) | Projects`,
    description: `Details and README for the repository: ${name} on branch ${decodedBranch}`,
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ name: string; branch: string }>
}) {
  const { name, branch } = await params
  const decodedBranch = decodeURIComponent(branch)

  return (
    <ProjectDetailClient repoName={name} activeBranchName={decodedBranch} />
  )
}
