import { FALLBACK_REPOS } from "@/data/fallbackRepos";
import {
  type BranchData,
  type CombinedRepo,
  fetchAllPortfolios,
  renderLocalMarkdown,
} from "@/lib/github";

/**
 * Resolves the default branch of a project by repository name.
 */
export async function getProjectDefaultBranch(
  repoName: string,
): Promise<string> {
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

/**
 * Server-side loader to fetch metadata and READMEs for all branches of a project.
 */
export async function getProjectDetails(repoName: string): Promise<{
  repoInfo: CombinedRepo;
  branchesData: BranchData[];
  allBranches: { name: string }[];
}> {
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
      repoInfo: {
        ...project,
        default_branch: project.default_branch || "main",
      } as CombinedRepo,
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
        topics: [],
        size: fallbackRepo.size || 0,
        open_issues_count: fallbackRepo.open_issues_count || 0,
      } as CombinedRepo,
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

/**
 * Generates static parameters for project branch routes.
 */
export async function generateProjectBranchStaticParams(): Promise<
  { name: string; branch: string }[]
> {
  try {
    const portfolios = await fetchAllPortfolios();
    const params: { name: string; branch: string }[] = [];

    for (const repo of portfolios) {
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
