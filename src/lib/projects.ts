import { FALLBACK_REPOS } from "@/data/fallbackRepos";
import {
  type BranchData,
  type CombinedRepo,
  type DetailedRepo,
  fetchAllPortfolios,
  fetchDetailedRepo,
  renderLocalMarkdown,
} from "@/lib/github";

/**
 * Resolves the default branch of a project by repository name.
 */
export async function getProjectDefaultBranch(
  repoName: string,
): Promise<string> {
  try {
    const project = await fetchDetailedRepo(repoName);
    return project.default_branch || "main";
  } catch (err) {
    console.error("Failed to load repo default branch, using fallback:", err);
    return "main";
  }
}

/**
 * Server-side loader to fetch metadata and READMEs for all branches of a project.
 */
export async function getProjectDetails(repoName: string): Promise<{
  repoInfo: CombinedRepo;
  branchesData: BranchData[];
  allBranches: { name: string }[];
}> {
  try {
    const project = await fetchDetailedRepo(repoName);

    const branchesData: BranchData[] =
      project.readmes && project.readmes.length > 0
        ? project.readmes
        : [
            {
              name: project.default_branch || "main",
              readmeHtml:
                "<h3>No README.md content found for this project.</h3>",
            },
          ];

    return {
      repoInfo: project,
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
      repoInfo: {
        ...fallbackRepo,
        branches: [
          {
            name: fallbackRepo.default_branch || "main",
            languages: {},
            recentCommits: [],
          },
        ],
        readmes: [
          { name: fallbackRepo.default_branch || "main", readmeHtml: html },
        ],
        languages: {},
        weeklyActivity: Array(52).fill(0),
        topics: fallbackRepo.topics || [],
        size: fallbackRepo.size || 0,
        open_issues_count: fallbackRepo.open_issues_count || 0,
        full_name: fallbackRepo.full_name || "",
        watchers_count: fallbackRepo.watchers_count || 0,
        forks_count: fallbackRepo.forks_count || 0,
        pushed_at: fallbackRepo.pushed_at || fallbackRepo.updated_at,
      } as DetailedRepo,
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

/**
 * Generates static parameters for parent project routes.
 */
export async function generateProjectStaticParams(): Promise<
  { name: string }[]
> {
  try {
    const repos = await fetchAllPortfolios();
    return repos.map((repo) => ({
      name: repo.name,
    }));
  } catch (err) {
    console.error("Failed to generate static params:", err);
    return [];
  }
}

/**
 * Generates static parameters for project branch routes.
 */
export async function generateProjectBranchStaticParams(): Promise<
  { name: string; branch: string }[]
> {
  try {
    const portfolios = await fetchAllPortfolios();
    const params: { name: string; branch: string }[] = [];

    for (const summary of portfolios) {
      try {
        const repo = await fetchDetailedRepo(summary.name);
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
      } catch (err) {
        console.error(
          `Failed to generate static branch parameters for "${summary.name}":`,
          err,
        );
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
