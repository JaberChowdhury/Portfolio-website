"use client";

import { Box } from "@mui/material";
import type { CombinedRepo } from "@/lib/github";
import CommitTimeline from "./CommitTimeline";
import LanguageDistribution from "./LanguageDistribution";
import WeeklyActivityChart from "./WeeklyActivityChart";

interface ProjectVisualizationsProps {
  repoInfo: CombinedRepo;
  activeBranchName: string;
  t: {
    languages: string;
    weeklyActivity: string;
    recentCommits: string;
    noCommits: string;
  };
  language: "en" | "bn";
}

export default function ProjectVisualizations({
  repoInfo,
  activeBranchName,
  t,
  language,
}: ProjectVisualizationsProps) {
  const activeBranch = repoInfo.branches?.find(
    (b) => b.name.toLowerCase() === activeBranchName.toLowerCase(),
  );
  const branchLanguages = activeBranch?.languages;
  const hasBranchLanguages =
    branchLanguages && Object.keys(branchLanguages).length > 0;

  // Resolve dynamic language data and its mode (file counts vs byte counts)
  const languagesData = hasBranchLanguages
    ? branchLanguages
    : repoInfo.languages;
  const mode = hasBranchLanguages ? "files" : "bytes";

  const hasLanguages = languagesData && Object.keys(languagesData).length > 0;
  const hasWeeklyActivity =
    repoInfo.weeklyActivity && repoInfo.weeklyActivity.length > 0;

  // Extract branch commits with a fallback to empty array
  const branchCommits = activeBranch?.recentCommits || [];

  return (
    <Box
      sx={{
        mb: 6,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        width: "100%",
      }}
    >
      {hasLanguages && (
        <LanguageDistribution
          languages={languagesData}
          titleLabel={t.languages}
          mode={mode}
          language={language}
        />
      )}

      {(hasWeeklyActivity || branchCommits.length >= 0) && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
            alignItems: "stretch",
          }}
        >
          {hasWeeklyActivity && (
            <WeeklyActivityChart
              weeklyActivity={repoInfo.weeklyActivity}
              titleLabel={t.weeklyActivity}
              language={language}
            />
          )}
          <CommitTimeline
            commits={branchCommits}
            titleLabel={t.recentCommits}
            noCommitsLabel={t.noCommits}
            commitsLabel={language === "en" ? "commits" : "কমিট"}
            language={language}
          />
        </Box>
      )}
    </Box>
  );
}
