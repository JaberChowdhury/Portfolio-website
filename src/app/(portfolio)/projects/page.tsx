"use client";

import BrushIcon from "@mui/icons-material/Brush";
import CodeIcon from "@mui/icons-material/Code";
import FeedIcon from "@mui/icons-material/Feed";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GitHubIcon from "@mui/icons-material/GitHub";
import GridViewIcon from "@mui/icons-material/GridView";
import LaunchIcon from "@mui/icons-material/Launch";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import TerminalIcon from "@mui/icons-material/Terminal";
import {
  Box,
  Button,
  Container,
  InputBase,
  Link as MuiLink,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

import ParticleText from "@/app/extras/ParticleText";
import Navbar from "@/components/navbar/Navbar";
import TagChip from "@/components/TagChip";
import { FALLBACK_REPOS } from "@/data/fallbackRepos";
import type { RepoSummary } from "@/lib/github";
import { useLanguageStore } from "@/store/languageStore";

// Client-side cache configuration constants to avoid redundant API refetches
const CACHE_KEY = "github_repos_cache";
const CACHE_TIME_KEY = "github_repos_cache_time";
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes cache expiration

// English and Bangla Translation Dictionaries
const translations = {
  en: {
    title: "PROJECTS",
    subtitle: "Explore my open-source repositories and development work.",
    searchPlaceholder: "Search repositories...",
    filterLanguage: "All Languages",
    viewGrid: "GRID",
    viewList: "LIST",
    stars: "stars",
    forks: "forks",
    noProjects: "No projects found matching your criteria.",
    fallbackWarning: "Displaying cached catalog (GitHub API rate limit hit).",
    sortBy: "Sort by",
    sortOptions: {
      updated: "Latest Update",
      stars: "Most Stars",
      name: "Alphabetical",
    },
    demo: "Live Demo",
    repo: "Repository",
  },
  bn: {
    title: "প্রজেক্টসমূহ",
    subtitle: "আমার ওপেন-সোর্স রিপোজিটরি এবং ডেভেলপমেন্ট কাজগুলো দেখুন।",
    searchPlaceholder: "রিপোজিটরি খুঁজুন...",
    filterLanguage: "সব ভাষা",
    viewGrid: "গ্রিড",
    viewList: "লিস্ট",
    stars: "স্টার",
    forks: "ফর্ক",
    noProjects: "আপনার অনুসন্ধানের সাথে মিলে এমন কোনো প্রজেক্ট পাওয়া যায়নি।",
    fallbackWarning: "স্ট্যাটিক প্রজেক্ট ক্যাটালগ দেখানো হচ্ছে (GitHub API লিমিট শেষ)।",
    sortBy: "ক্রমানুসারে",
    sortOptions: {
      updated: "সাম্প্রতিক আপডেট",
      stars: "সর্বোচ্চ স্টার",
      name: "বর্ণানুক্রমিক",
    },
    demo: "লাইভ ডেমো",
    repo: "রিপোজিটরি",
  },
};

const getLanguageIcon = (lang: string) => {
  const name = lang.toLowerCase();
  if (
    name === "typescript" ||
    name === "javascript" ||
    name === "c++" ||
    name === "c" ||
    name === "python" ||
    name === "rust"
  ) {
    return <CodeIcon sx={{ fontSize: 13 }} />;
  }
  if (name === "shell" || name === "bash") {
    return <TerminalIcon sx={{ fontSize: 13 }} />;
  }
  if (name === "markdown" || name === "text") {
    return <FeedIcon sx={{ fontSize: 13 }} />;
  }
  if (name === "css" || name === "html" || name === "astro") {
    return <BrushIcon sx={{ fontSize: 13 }} />;
  }
  return <CodeIcon sx={{ fontSize: 13 }} />;
};

const getLanguageColor = (lang: string) => {
  const colors: Record<string, string> = {
    typescript: "#3178C6", // Standard blue
    javascript: "#F59E0B", // Bright amber/yellow
    css: "#A855F7", // Bright purple
    html: "#EF4444", // Bright red
    astro: "#F97316", // Bright orange
    "c++": "#EC4899", // Pink
    c: "#708090", // Slate grey
    python: "#3B82F6", // Python blue
    rust: "#E77E23", // Rust orange
    glsl: "#06B6D4", // Cyan
    shell: "#10B981", // Green
    markdown: "#0EA5E9", // Sky blue
  };
  return colors[lang.toLowerCase()] || "#00FFFF";
};

// Keyframe layout-skeleton pulse animation
const pulseAnimation = {
  animation: "pulse-glow 1.5s ease-in-out infinite",
  "@keyframes pulse-glow": {
    "0%, 100%": { opacity: 0.6 },
    "50%": { opacity: 0.3 },
  },
};

export default function ProjectsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const language = useLanguageStore((s) => s.language);
  const t = translations[language];

  // Component States
  const [repos, setRepos] = useState<RepoSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"updated" | "stars" | "name">("updated");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFallback, setIsFallback] = useState<boolean>(false);

  // Set page tab title on mount
  useEffect(() => {
    document.title =
      language === "en" ? "Projects | Portfolio" : "প্রকল্পসমূহ | পোর্টফোলিও";
  }, [language]);

  // Fetch repositories from Github API on mount (using sessionStorage cache)
  useEffect(() => {
    const fetchGithubRepos = async () => {
      try {
        setLoading(true);

        // Check sessionStorage cache first
        const cachedData = sessionStorage.getItem(CACHE_KEY);
        const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);

        if (
          cachedData &&
          cachedTime &&
          Date.now() - Number(cachedTime) < CACHE_DURATION
        ) {
          setRepos(JSON.parse(cachedData));
          setIsFallback(false);
          setLoading(false);
          return;
        }

        // Cache miss: execute fetch
        const response = await fetch("/api/projects");

        if (!response.ok) {
          throw new Error(`Failed to fetch repos: ${response.status}`);
        }

        const data: RepoSummary[] = await response.json();
        // Exclude forks to focus on owner work
        const originalRepos = data;

        // Write to cache
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(originalRepos));
        sessionStorage.setItem(CACHE_TIME_KEY, String(Date.now()));

        setRepos(originalRepos);
        setIsFallback(false);
      } catch (error) {
        console.error(
          "GitHub API fetch failed, loading cached/fallback data:",
          error,
        );

        // Recover from cache if available on failure, else load fallback static data
        const cachedData = sessionStorage.getItem(CACHE_KEY);
        if (cachedData) {
          setRepos(JSON.parse(cachedData));
        } else {
          setRepos(FALLBACK_REPOS);
        }
        setIsFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubRepos();
  }, []);

  // Format pushed/updated timestamp helper
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString(language === "en" ? "en-US" : "bn-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Compile unique languages list from repositories
  const languageList = [
    "All",
    ...(Array.from(
      new Set(repos.map((r) => r.language).filter(Boolean)),
    ) as string[]),
  ];

  // Filtering & Sorting pipeline
  const processedRepos = repos
    .filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description?.toLowerCase().includes(searchQuery.toLowerCase()) ??
          false);
      const matchesLanguage =
        selectedLanguage === "All" || repo.language === selectedLanguage;
      return matchesSearch && matchesLanguage;
    })
    .sort((a, b) => {
      if (sortBy === "stars") {
        return b.stargazers_count - a.stargazers_count;
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      const dateA = new Date(a.updated_at).getTime();
      const dateB = new Date(b.updated_at).getTime();
      return dateB - dateA;
    });

  // Skeleton project card structure for loading states
  const SkeletonCard = () => (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        padding: "24px",
        minHeight: "220px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        boxSizing: "border-box",
        ...pulseAnimation,
      }}
    >
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2.5 }}>
          <Box
            sx={{
              width: "80px",
              height: "12px",
              backgroundColor: theme.palette.divider,
            }}
          />
          <Box
            sx={{
              width: "65px",
              height: "12px",
              backgroundColor: theme.palette.divider,
            }}
          />
        </Box>
        <Box
          sx={{
            width: "55%",
            height: "20px",
            backgroundColor: theme.palette.divider,
            mb: 2,
          }}
        />
        <Box
          sx={{
            width: "100%",
            height: "12px",
            backgroundColor: theme.palette.divider,
            mb: 1,
          }}
        />
        <Box
          sx={{
            width: "92%",
            height: "12px",
            backgroundColor: theme.palette.divider,
            mb: 1,
          }}
        />
        <Box
          sx={{
            width: "70%",
            height: "12px",
            backgroundColor: theme.palette.divider,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Box
          sx={{
            width: "90px",
            height: "14px",
            backgroundColor: theme.palette.divider,
          }}
        />
        <Box
          sx={{
            width: "45px",
            height: "16px",
            backgroundColor: theme.palette.divider,
          }}
        />
      </Box>
    </Box>
  );

  return (
    <>
      <Navbar />

      <Container
        maxWidth="lg"
        sx={{
          pt: { xs: "120px", md: "160px" },
          pb: "100px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 10,
          boxSizing: "border-box",
        }}
      >
        {/* Animated Canvas Page Title */}
        <Box
          sx={{
            mb: { xs: 4, md: 5 },
            height: { xs: "100px", md: "180px" },
            position: "relative",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <ParticleText
            text={t.title}
            colorStart="var(--mui-palette-text-primary)"
            colorEnd="var(--mui-palette-text-primary)"
            canvasWidth={isMobile ? 2200 : 3400}
            canvasHeight={isMobile ? 2200 : 3400}
            font={
              isMobile
                ? "900 280px Inter, sans-serif"
                : "900 470px Inter, sans-serif"
            }
            particleSize={0.4}
          />
        </Box>

        {/* Section Description Subtitle */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            color: "text.secondary",
            mb: 6,
            maxWidth: "600px",
            fontSize: { xs: "15px", sm: "17px" },
            lineHeight: 1.6,
          }}
        >
          {t.subtitle}
        </Typography>

        {/* API Rate Limit Fallback Alert Banner */}
        {isFallback && !loading && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
              mb: 4,
              p: 2,
              borderLeft: "4px solid var(--mui-palette-text-primary)",
              backgroundColor:
                "rgba(var(--mui-palette-background-paperChannel) / 0.6)",
              color: "text.secondary",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "monospace",
            }}
          >
            {"// "}
            {t.fallbackWarning}
          </Box>
        )}

        {/* Controls Panel: Search, Sort, View Toggle */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            justifyContent: "space-between",
            alignItems: { xs: "stretch", md: "center" },
            mb: 5,
            width: "100%",
          }}
        >
          {/* Left: Search input */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid var(--mui-palette-divider)",
              px: 2,
              py: 0.5,
              flexGrow: 1,
              maxWidth: { xs: "100%", md: "400px" },
              backgroundColor: "var(--mui-palette-background-paper)",
            }}
          >
            <SearchIcon
              sx={{
                color: "text.secondary",
                mr: 1.5,
                fontSize: 20,
              }}
            />
            <InputBase
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              sx={{
                flexGrow: 1,
                color: "text.primary",
                fontSize: "14px",
                fontFamily: "inherit",
                "& input::placeholder": {
                  color: "text.secondary",
                  opacity: 0.7,
                },
              }}
            />
          </Box>

          {/* Right Controls: Sort Select + View Mode Slider */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              alignItems: { xs: "stretch", sm: "center" },
            }}
          >
            {/* Sort Select */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                border: "1px solid var(--mui-palette-divider)",
                px: 2.5,
                py: 1.25,
                backgroundColor: "var(--mui-palette-background-paper)",
              }}
            >
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  color: "text.secondary",
                }}
              >
                {t.sortBy}:
              </Typography>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "updated" | "stars" | "name")
                }
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: "var(--mui-palette-text-primary)",
                  fontWeight: 700,
                  fontSize: "11px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textTransform: "uppercase",
                }}
              >
                <option
                  value="updated"
                  style={{ background: "var(--mui-palette-background-paper)" }}
                >
                  {t.sortOptions.updated}
                </option>
                <option
                  value="stars"
                  style={{ background: "var(--mui-palette-background-paper)" }}
                >
                  {t.sortOptions.stars}
                </option>
                <option
                  value="name"
                  style={{ background: "var(--mui-palette-background-paper)" }}
                >
                  {t.sortOptions.name}
                </option>
              </select>
            </Box>

            {/* Grid & List View Toggle Slider (Framer-Motion sliding background) */}
            <Box
              sx={{
                display: "flex",
                border: "1px solid var(--mui-palette-divider)",
                position: "relative",
                overflow: "hidden",
                height: "40px",
                alignItems: "center",
                backgroundColor: "var(--mui-palette-background-paper)",
              }}
            >
              {/* GRID Tab */}
              <Box
                onClick={() => setViewMode("grid")}
                sx={{
                  position: "relative",
                  px: 3,
                  height: "100%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  zIndex: 2,
                  userSelect: "none",
                }}
              >
                <GridViewIcon
                  sx={{
                    fontSize: 15,
                    color:
                      viewMode === "grid"
                        ? "var(--mui-palette-background-default)"
                        : "var(--mui-palette-text-primary)",
                    transition: "color 0.25s",
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    color:
                      viewMode === "grid"
                        ? "var(--mui-palette-background-default)"
                        : "var(--mui-palette-text-primary)",
                    transition: "color 0.25s",
                  }}
                >
                  {t.viewGrid}
                </Typography>
              </Box>

              {/* LIST Tab */}
              <Box
                onClick={() => setViewMode("list")}
                sx={{
                  position: "relative",
                  px: 3,
                  height: "100%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  zIndex: 2,
                  userSelect: "none",
                }}
              >
                <FormatListBulletedIcon
                  sx={{
                    fontSize: 15,
                    color:
                      viewMode === "list"
                        ? "var(--mui-palette-background-default)"
                        : "var(--mui-palette-text-primary)",
                    transition: "color 0.25s",
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    color:
                      viewMode === "list"
                        ? "var(--mui-palette-background-default)"
                        : "var(--mui-palette-text-primary)",
                    transition: "color 0.25s",
                  }}
                >
                  {t.viewList}
                </Typography>
              </Box>

              {/* Sliding active container background */}
              <motion.div
                animate={{ x: viewMode === "grid" ? 0 : "100%" }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: "50%",
                  backgroundColor: "var(--mui-palette-text-primary)",
                  zIndex: 1,
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Language Filter Tags Scrollbar */}
        {!loading && repos.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              overflowX: "auto",
              pb: 2,
              mb: 5,
              maxWidth: "100%",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {languageList.map((lang) => {
              const isSelected = selectedLanguage === lang;

              return (
                <Box
                  key={lang}
                  component={Button}
                  onClick={() => setSelectedLanguage(lang)}
                  sx={{
                    px: 2.2,
                    py: 0.8,
                    border: `1.5px solid ${isSelected ? "var(--mui-palette-text-primary)" : "var(--mui-palette-divider)"}`,
                    backgroundColor: isSelected
                      ? "var(--mui-palette-text-primary)"
                      : "transparent",
                    color: isSelected
                      ? "var(--mui-palette-background-default)"
                      : "var(--mui-palette-text-primary)",
                    fontWeight: 800,
                    fontSize: "11px",
                    fontFamily: "monospace",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease-out",
                    "&:hover": {
                      borderColor: "var(--mui-palette-text-primary)",
                      transform: isSelected ? "none" : "translateY(-1px)",
                    },
                  }}
                >
                  {lang === "All" ? t.filterLanguage : lang.toUpperCase()}
                </Box>
              );
            })}
          </Box>
        )}

        {/* Display loading skeleton grid while fetching */}
        {loading ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 4,
              width: "100%",
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={`skeleton-${i + 1}`} />
            ))}
          </Box>
        ) : (
          <AnimatePresence mode="wait">
            {viewMode === "grid" ? (
              // Grid View Catalog
              <Box
                component={motion.div}
                key="grid-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                    md: "1fr 1fr 1fr",
                  },
                  gap: 4,
                  width: "100%",
                }}
              >
                {processedRepos.map((repo, index) => {
                  const accentColor = "var(--mui-palette-text-primary)";

                  return (
                    <Box
                      component={motion.div}
                      key={repo.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: Math.min(index * 0.05, 0.4),
                      }}
                      variants={{
                        initial: { y: 0 },
                        hover: { y: -6 },
                      }}
                      whileHover="hover"
                      sx={{
                        position: "relative",
                        backgroundColor: "var(--mui-palette-background-paper)",
                        border: "1px solid var(--mui-palette-divider)",
                        padding: "24px",
                        minHeight: "230px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        zIndex: 1,
                        overflow: "hidden",
                        transition:
                          "all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        "&:hover": {
                          borderColor: accentColor,
                          boxShadow: `6px 6px 0px ${accentColor}`,
                        },
                      }}
                    >
                      {/* Sub-card grid noise pattern overlay */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
                          opacity: 0.35,
                          pointerEvents: "none",
                          zIndex: 0,
                        }}
                      />

                      {/* Giant background text matching homepage accent styling */}
                      <Typography
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          fontSize: repo.name.length > 12 ? "44px" : "60px",
                          fontWeight: 900,
                          color: "var(--mui-palette-text-primary)",
                          opacity: 0.04,
                          ".dark &": {
                            opacity: 0.025,
                          },
                          whiteSpace: "nowrap",
                          zIndex: 0,
                          pointerEvents: "none",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                          userSelect: "none",
                        }}
                      >
                        {repo.name.slice(0, 11)}
                      </Typography>

                      {/* Top Left Accent Corner Bracket */}
                      <Box
                        component={motion.div}
                        variants={{
                          initial: { width: 12, height: 12, opacity: 0.3 },
                          hover: {
                            width: 20,
                            height: 20,
                            opacity: 1,
                            borderColor: accentColor,
                          },
                        }}
                        sx={{
                          position: "absolute",
                          top: 14,
                          left: 14,
                          borderTop: "2.5px solid var(--mui-palette-divider)",
                          borderLeft: "2.5px solid var(--mui-palette-divider)",
                          transition: "border-color 0.25s ease",
                        }}
                      />

                      {/* Bottom Right Accent Corner Bracket */}
                      <Box
                        component={motion.div}
                        variants={{
                          initial: { width: 12, height: 12, opacity: 0.3 },
                          hover: {
                            width: 20,
                            height: 20,
                            opacity: 1,
                            borderColor: accentColor,
                          },
                        }}
                        sx={{
                          position: "absolute",
                          bottom: 14,
                          right: 14,
                          borderBottom:
                            "2.5px solid var(--mui-palette-divider)",
                          borderRight: "2.5px solid var(--mui-palette-divider)",
                          transition: "border-color 0.25s ease",
                        }}
                      />

                      {/* Card Content body */}
                      <Box sx={{ zIndex: 1, position: "relative" }}>
                        {/* Upper row: Language name & pushed Date */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2.5,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                color: getLanguageColor(repo.language || ""),
                              }}
                            >
                              {getLanguageIcon(repo.language || "")}
                            </Box>
                            <Typography
                              sx={{
                                fontSize: "10px",
                                fontWeight: 700,
                                fontFamily: "monospace",
                                letterSpacing: "0.08em",
                                color: "text.secondary",
                              }}
                            >
                              {repo.language
                                ? repo.language.toUpperCase()
                                : "UNKNOWN"}
                            </Typography>
                          </Box>
                          <Typography
                            sx={{
                              fontSize: "10px",
                              fontWeight: 600,
                              color: "text.secondary",
                            }}
                          >
                            {formatDate(repo.updated_at)}
                          </Typography>
                        </Box>

                        {/* Repo Title */}
                        <Typography
                          sx={{
                            fontWeight: 800,
                            fontSize: "16px",
                            letterSpacing: "-0.01em",
                            mb: 1.5,
                            textTransform: "uppercase",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <MuiLink
                            component={Link}
                            href={`/projects/${repo.name}`}
                            className="brutalist-hover-link"
                            sx={{
                              color: "text.primary",
                              textDecoration: "none",
                            }}
                          >
                            {repo.name}
                          </MuiLink>
                        </Typography>

                        {/* Repo description */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontSize: "13px",
                            lineHeight: 1.55,
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            height: "60px",
                          }}
                        >
                          {repo.description ||
                            (language === "en"
                              ? "No repository description provided."
                              : "কোনো বিবরণ প্রদান করা হয়নি।")}
                        </Typography>
                        {/* Topics / Tag Chips */}
                        {repo.topics && repo.topics.length > 0 && (
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 0.75,
                              mt: 2,
                            }}
                          >
                            {repo.topics.slice(0, 5).map((topic) => (
                              <TagChip key={topic} tag={topic} />
                            ))}
                            {repo.topics.length > 5 && (
                              <Typography
                                sx={{
                                  fontSize: "0.65rem",
                                  fontFamily: "monospace",
                                  fontWeight: 700,
                                  color: "text.disabled",
                                  alignSelf: "center",
                                }}
                              >
                                +{repo.topics.length - 5}
                              </Typography>
                            )}
                          </Box>
                        )}
                      </Box>

                      {/* Card footer (Stats and links) */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 3,
                          zIndex: 2,
                          position: "relative",
                        }}
                      >
                        {/* Left: Stars stats */}
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2.2,
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.6,
                            }}
                          >
                            <StarIcon
                              sx={{
                                fontSize: 15,
                                color: "text.secondary",
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: "11px",
                                fontWeight: 700,
                                fontFamily: "monospace",
                                color: "text.secondary",
                              }}
                            >
                              {repo.stargazers_count}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Right: Code repo and live demo anchors */}
                        <Box
                          sx={{ display: "flex", gap: 2, alignItems: "center" }}
                        >
                          <MuiLink
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t.repo}
                            className="brutalist-hover-link"
                            sx={{
                              color: "text.primary",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <GitHubIcon sx={{ fontSize: 17 }} />
                          </MuiLink>
                          {repo.homepage && (
                            <MuiLink
                              href={repo.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={t.demo}
                              className="brutalist-hover-link"
                              sx={{
                                color: "text.primary",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <LaunchIcon sx={{ fontSize: 17 }} />
                            </MuiLink>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            ) : (
              // List View Catalog
              <Box
                component={motion.div}
                key="list-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5,
                  width: "100%",
                }}
              >
                {processedRepos.map((repo, index) => {
                  const accentColor = "var(--mui-palette-text-primary)";

                  return (
                    <Box
                      component={motion.div}
                      key={repo.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: Math.min(index * 0.04, 0.3),
                      }}
                      variants={{
                        initial: { x: 0 },
                        hover: { x: 8 },
                      }}
                      whileHover="hover"
                      sx={{
                        position: "relative",
                        backgroundColor: "var(--mui-palette-background-paper)",
                        border: "1px solid var(--mui-palette-divider)",
                        padding: { xs: "20px", sm: "24px" },
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "stretch", md: "center" },
                        gap: { xs: 2.5, md: 4 },
                        zIndex: 1,
                        overflow: "hidden",
                        transition: "all 0.2s ease-out",
                        "&:hover": {
                          borderColor: accentColor,
                          boxShadow: `4px 4px 0px ${accentColor}`,
                        },
                      }}
                    >
                      {/* Noise overlay */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
                          opacity: 0.35,
                          pointerEvents: "none",
                          zIndex: 0,
                        }}
                      />

                      {/* Left side: Repository Title & Description */}
                      <Box
                        sx={{
                          zIndex: 1,
                          flexGrow: 1,
                          maxWidth: { xs: "100%", md: "60%" },
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 800,
                            fontSize: "16px",
                            letterSpacing: "-0.01em",
                            mb: 0.75,
                            textTransform: "uppercase",
                          }}
                        >
                          <MuiLink
                            component={Link}
                            href={`/projects/${repo.name}`}
                            className="brutalist-hover-link"
                            sx={{
                              color: "text.primary",
                              textDecoration: "none",
                            }}
                          >
                            {repo.name}
                          </MuiLink>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontSize: "13px",
                            lineHeight: 1.5,
                          }}
                        >
                          {repo.description ||
                            (language === "en"
                              ? "No repository description provided."
                              : "কোনো বিবরণ প্রদান করা হয়নি।")}
                        </Typography>
                        {/* Topics / Tag Chips */}
                        {repo.topics && repo.topics.length > 0 && (
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 0.75,
                              mt: 1.5,
                            }}
                          >
                            {repo.topics.slice(0, 4).map((topic) => (
                              <TagChip key={topic} tag={topic} />
                            ))}
                            {repo.topics.length > 4 && (
                              <Typography
                                sx={{
                                  fontSize: "0.65rem",
                                  fontFamily: "monospace",
                                  fontWeight: 700,
                                  color: "text.disabled",
                                  alignSelf: "center",
                                }}
                              >
                                +{repo.topics.length - 4}
                              </Typography>
                            )}
                          </Box>
                        )}
                      </Box>

                      {/* Right side: Language, Date, Stars, Forks, & Links */}
                      <Box
                        sx={{
                          zIndex: 1,
                          display: "flex",
                          flexDirection: { xs: "row", sm: "row" },
                          flexWrap: "wrap",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 2,
                          minWidth: { xs: "100%", md: "38%" },
                          pt: { xs: 2, md: 0 },
                          borderTop: {
                            xs: "1px solid var(--mui-palette-divider)",
                            md: "none",
                          },
                        }}
                      >
                        {/* Stats group (Language, Date, Stars, Forks) */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            gap: { xs: 1.5, sm: 3 },
                            alignItems: { xs: "flex-start", sm: "center" },
                          }}
                        >
                          {/* Language & Date Row */}
                          <Box
                            sx={{
                              display: "flex",
                              gap: 2.5,
                              alignItems: "center",
                            }}
                          >
                            {/* Language indicator */}
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  color: getLanguageColor(repo.language || ""),
                                }}
                              >
                                {getLanguageIcon(repo.language || "")}
                              </Box>
                              <Typography
                                sx={{
                                  fontSize: "10px",
                                  fontWeight: 700,
                                  fontFamily: "monospace",
                                  letterSpacing: "0.08em",
                                  color: "text.secondary",
                                }}
                              >
                                {repo.language
                                  ? repo.language.toUpperCase()
                                  : "UNKNOWN"}
                              </Typography>
                            </Box>

                            {/* Date details */}
                            <Typography
                              sx={{
                                fontSize: "10px",
                                fontWeight: 600,
                                color: "text.secondary",
                              }}
                            >
                              {formatDate(repo.updated_at)}
                            </Typography>
                          </Box>

                          {/* Stars Row */}
                          <Box
                            sx={{
                              display: "flex",
                              gap: 2,
                              alignItems: "center",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.6,
                              }}
                            >
                              <StarIcon
                                sx={{
                                  fontSize: 15,
                                  color: "text.secondary",
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: "11px",
                                  fontWeight: 700,
                                  fontFamily: "monospace",
                                  color: "text.secondary",
                                }}
                              >
                                {repo.stargazers_count}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>

                        {/* External Action Buttons */}
                        <Box
                          sx={{ display: "flex", gap: 2, alignItems: "center" }}
                        >
                          <MuiLink
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t.repo}
                            className="brutalist-hover-link"
                            sx={{
                              color: "text.primary",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <GitHubIcon sx={{ fontSize: 17 }} />
                          </MuiLink>
                          {repo.homepage && (
                            <MuiLink
                              href={repo.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={t.demo}
                              className="brutalist-hover-link"
                              sx={{
                                color: "text.primary",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <LaunchIcon sx={{ fontSize: 17 }} />
                            </MuiLink>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            )}
          </AnimatePresence>
        )}

        {/* Empty Search/Filter results state */}
        {!loading && processedRepos.length === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 10,
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                color: theme.palette.text.secondary,
                fontSize: "14px",
                fontFamily: "monospace",
              }}
            >
              {"// "}
              {t.noProjects}
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}
