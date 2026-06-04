import { redirect } from "next/navigation";
import { getProjectDefaultBranch } from "@/lib/projects";

// Generate static routes during build time for all repositories
// export async function generateStaticParams() {
//   return generateProjectStaticParams();
// }

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
