"use client";

import { Box, Link as MuiLink, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import type { CommitData } from "@/lib/github";

interface CommitTimelineProps {
  commits: CommitData[];
  titleLabel: string;
  noCommitsLabel: string;
  commitsLabel: string;
  language: "en" | "bn";
}

export default function CommitTimeline({
  commits,
  titleLabel,
  noCommitsLabel,
  commitsLabel,
  language,
}: CommitTimelineProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString(language === "en" ? "en-US" : "bn-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid var(--mui-palette-divider)",
        backgroundColor:
          "rgba(var(--mui-palette-background-paperChannel) / 0.4)",
        p: 3,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Title */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          borderBottom: "1px solid var(--mui-palette-divider)",
          pb: 1.5,
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "12px",
            letterSpacing: "0.15em",
            fontFamily: "monospace",
            color: "var(--mui-palette-text-secondary)",
            textTransform: "uppercase",
          }}
        >
          {titleLabel}
        </Typography>
        <Typography
          sx={{
            fontFamily: "monospace",
            fontSize: "11px",
            fontWeight: 700,
            color: "var(--mui-palette-text-secondary)",
          }}
        >
          {commits.length} {commitsLabel}
        </Typography>
      </Box>

      {/* Activity Feed container */}
      <Box sx={{ flexGrow: 1, position: "relative" }}>
        {commits.length === 0 ? (
          <Typography
            sx={{
              color: "var(--mui-palette-text-secondary)",
              fontStyle: "italic",
              fontFamily: "monospace",
              fontSize: "12px",
            }}
          >
            {noCommitsLabel}
          </Typography>
        ) : (
          <Box
            sx={{
              position: "relative",
              pl: 3.5,
              maxHeight: "220px",
              overflowY: "auto",
              pr: 1,
              "&::-webkit-scrollbar": { width: "4px" },
              "&::-webkit-scrollbar-track": { background: "transparent" },
              "&::-webkit-scrollbar-thumb": {
                background: "var(--mui-palette-divider)",
              },
            }}
          >
            {/* Vertical dashed timeline line */}
            <Box
              sx={{
                position: "absolute",
                left: "8px",
                top: "8px",
                bottom: "8px",
                width: "2px",
                borderLeft: "2px dashed var(--mui-palette-divider)",
              }}
            />

            {/* Feed items */}
            {commits.slice(0, 5).map((commit, idx) => (
              <Box
                key={commit.sha}
                component={motion.div}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                sx={{
                  position: "relative",
                  mb: idx === commits.slice(0, 5).length - 1 ? 0 : 3,
                }}
              >
                {/* Timeline bullet node */}
                <Box
                  sx={{
                    position: "absolute",
                    left: "-33.5px",
                    top: "4px",
                    width: "10px",
                    height: "10px",
                    backgroundColor: "var(--mui-palette-background-default)",
                    border: "2.5px solid var(--mui-palette-text-primary)",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      backgroundColor: "var(--mui-palette-primary-main)",
                      transform: "scale(1.2)",
                    },
                  }}
                />

                {/* Commit metadata details */}
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                >
                  {/* Header info */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    {/* Author badge letter */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "18px",
                        height: "18px",
                        backgroundColor: "var(--mui-palette-text-primary)",
                        color: "var(--mui-palette-background-default)",
                        fontFamily: "monospace",
                        fontSize: "10px",
                        fontWeight: 900,
                        textTransform: "uppercase",
                      }}
                    >
                      {commit.author.charAt(0)}
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "var(--mui-palette-text-primary)",
                      }}
                    >
                      @{commit.author}
                    </Typography>

                    <Typography
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "10px",
                        color: "var(--mui-palette-text-secondary)",
                      }}
                    >
                      {formatDate(commit.date)}
                    </Typography>

                    {/* SHA Link tag */}
                    <MuiLink
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        ml: "auto",
                        fontFamily: "monospace",
                        fontSize: "9px",
                        fontWeight: 800,
                        backgroundColor:
                          "rgba(var(--mui-palette-text-primaryChannel) / 0.04)",
                        border: "1px solid var(--mui-palette-divider)",
                        color: "var(--mui-palette-text-secondary)",
                        px: 0.75,
                        py: 0.25,
                        textDecoration: "none",
                        transition: "all 0.15s ease-out",
                        "&:hover": {
                          borderColor: "var(--mui-palette-text-primary)",
                          color: "var(--mui-palette-text-primary)",
                          backgroundColor:
                            "rgba(var(--mui-palette-text-primaryChannel) / 0.08)",
                        },
                      }}
                    >
                      {commit.sha.substring(0, 7)}
                    </MuiLink>
                  </Box>

                  {/* Commit Message */}
                  <Typography
                    sx={{
                      fontSize: "13.5px",
                      lineHeight: 1.55,
                      fontWeight: 500,
                      color: "var(--mui-palette-text-primary)",
                      pl: { xs: 0, sm: 3.2 },
                      mt: 0.5,
                    }}
                  >
                    {commit.message}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  );
}
