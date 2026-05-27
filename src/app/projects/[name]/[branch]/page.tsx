import type { Metadata } from "next";
import { generateProjectBranchStaticParams } from "@/lib/projects";
import ProjectDetailClient from "../ProjectDetailClient";

// Generate static routes during build time for all repositories and their branches
// export async function generateStaticParams() {
//   return generateProjectBranchStaticParams();
// }

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

  return (
    <ProjectDetailClient repoName={name} activeBranchName={decodedBranch} />
  );
}
