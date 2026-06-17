import { redirect } from "next/navigation";
import { getProjectDefaultBranch } from "@/lib/projects";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const defaultBranch = await getProjectDefaultBranch(name);
  redirect(`/projects/${name}/${encodeURIComponent(defaultBranch)}`);
}
