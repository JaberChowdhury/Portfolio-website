import { fetchAllPortfolios } from "@/lib/github";
import { FALLBACK_REPOS } from "@/data/fallbackRepos";
import ProjectsClient from "./ProjectsClient";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
	let repos = [];
	let isFallback = false;

	try {
		repos = await fetchAllPortfolios();
	} catch (error) {
		console.error(
			"Failed to fetch GitHub repos on server, using static fallback:",
			error,
		);
		repos = FALLBACK_REPOS;
		isFallback = true;
	}

	return (
		<ProjectsClient initialRepos={repos} isInitiallyFallback={isFallback} />
	);
}
