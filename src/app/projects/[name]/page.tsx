import { redirect } from "next/navigation";
import { fetchAllPortfolios } from "@/lib/github";

async function getProjectDefaultBranch(repoName: string): Promise<string> {
  try {
    const portfolios = await fetchAllPortfolios();
    const project = portfolios.find(
      (p) => p.name.toLowerCase() === repoName.toLowerCase(),
    );
    return project?.default_branch || "main";
  } catch (err) {
    console.error("Failed to load repo default branch, using fallback:", err);
    return "main";
  }
}

// Generate static routes during build time for all repositories
export async function generateStaticParams() {
  try {
    const repos = await fetchAllPortfolios();
    return repos
      .filter((r) => !r.fork)
      .map((repo) => ({
        name: repo.name,
      }));
  } catch (err) {
    console.error("Failed to generate static params:", err);
    return [];
  }
}

// Dynamic route Server Component (Next.js 16)
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const defaultBranch = await getProjectDefaultBranch(name);
  redirect(`/projects/${name}/${encodeURIComponent(defaultBranch)}`);
}
