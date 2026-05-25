"use client";

import ForkRightIcon from "@mui/icons-material/ForkRight";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GitHubIcon from "@mui/icons-material/GitHub";
import GridViewIcon from "@mui/icons-material/GridView";
import LaunchIcon from "@mui/icons-material/Launch";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Button,
  Container,
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
import { useLanguageStore } from "@/store/languageStore";

// Type definitions for GitHub Repositories
interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  pushed_at: string;
  fork?: boolean;
}

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
    fallbackWarning:
      "স্ট্যাটিক প্রজেক্ট ক্যাটালগ দেখানো হচ্ছে (GitHub API লিমিট শেষ)।",
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

// Fallback high-quality repository entries (in case GitHub API rate limits the browser)
const FALLBACK_REPOS: Repository[] = [
  {
    id: 743209978,
    name: "Astro-express-project",
    full_name: "JaberChowdhury/Astro-express-project",
    html_url: "https://github.com/JaberChowdhury/Astro-express-project",
    description:
      "Building a full stack curd app with astro and expressjs and typescript",
    homepage: "https://astro-express-project.vercel.app",
    stargazers_count: 3,
    watchers_count: 3,
    forks_count: 0,
    language: "TypeScript",
    updated_at: "2025-06-21T10:43:03Z",
    pushed_at: "2024-01-15T11:47:18Z",
  },
  {
    id: 812938475,
    name: "raylib-projects",
    full_name: "JaberChowdhury/raylib-projects",
    html_url: "https://github.com/JaberChowdhury/raylib-projects",
    description:
      "A suite of interactive games and visual simulations built with Raylib and C++, including bouncing ball physics and tick-tack-toe game logic.",
    homepage: null,
    stargazers_count: 5,
    watchers_count: 5,
    forks_count: 0,
    language: "C++",
    updated_at: "2026-05-24T20:00:00Z",
    pushed_at: "2026-05-24T20:00:00Z",
  },
  {
    id: 752391024,
    name: "Brutalist-Portfolio",
    full_name: "JaberChowdhury/Brutalist-Portfolio",
    html_url: "https://github.com/JaberChowdhury/Brutalist-Portfolio",
    description:
      "A premium personal portfolio built with Next.js 16, Material UI (MUI), and Framer Motion, highlighting interactive animations and clean brutalist layouts.",
    homepage: "https://jaber-portfolio.vercel.app",
    stargazers_count: 5,
    watchers_count: 5,
    forks_count: 1,
    language: "TypeScript",
    updated_at: "2026-05-24T20:00:00Z",
    pushed_at: "2026-05-24T20:00:00Z",
  },
  {
    id: 732918203,
    name: "express-typescript-boilerplate",
    full_name: "JaberChowdhury/express-typescript-boilerplate",
    html_url:
      "https://github.com/JaberChowdhury/express-typescript-boilerplate",
    description:
      "Production-ready boilerplates for Express.js API development with TypeScript, ESLint, Biome, and structured modular architecture.",
    homepage: null,
    stargazers_count: 2,
    watchers_count: 2,
    forks_count: 0,
    language: "TypeScript",
    updated_at: "2025-11-12T14:22:00Z",
    pushed_at: "2025-11-12T14:22:00Z",
  },
  {
    id: 711928374,
    name: "react-native-chat-ui",
    full_name: "JaberChowdhury/react-native-chat-ui",
    html_url: "https://github.com/JaberChowdhury/react-native-chat-ui",
    description:
      "A beautifully styled, high-performance chat interface components built for React Native and Expo projects, incorporating reanimated and gesture handlers.",
    homepage: null,
    stargazers_count: 3,
    watchers_count: 3,
    forks_count: 0,
    language: "JavaScript",
    updated_at: "2025-08-04T09:15:30Z",
    pushed_at: "2025-08-04T09:15:30Z",
  },
  {
    id: 721029384,
    name: "threejs-creative-landing",
    full_name: "JaberChowdhury/threejs-creative-landing",
    html_url: "https://github.com/JaberChowdhury/threejs-creative-landing",
    description:
      "Interactive 3D landing page experience utilizing Three.js, React Three Fiber (R3F), and custom GLSL shader materials for ambient micro-interactions.",
    homepage: "https://threejs-creative.vercel.app",
    stargazers_count: 8,
    watchers_count: 8,
    forks_count: 2,
    language: "GLSL",
    updated_at: "2026-02-18T18:40:00Z",
    pushed_at: "2026-02-18T18:40:00Z",
  },
  {
    id: 703928172,
    name: "mini-rust-compiler",
    full_name: "JaberChowdhury/mini-rust-compiler",
    html_url: "https://github.com/JaberChowdhury/mini-rust-compiler",
    description:
      "An educational toy compiler and parser written in Rust to translate a simplified subset of programming language syntax to WebAssembly (Wasm).",
    homepage: null,
    stargazers_count: 4,
    watchers_count: 4,
    forks_count: 1,
    language: "Rust",
    updated_at: "2025-04-10T12:00:00Z",
    pushed_at: "2025-04-10T12:00:00Z",
  },
];

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
  const [repos, setRepos] = useState<Repository[]>([]);
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

        const data: Repository[] = await response.json();
        // Exclude forks to focus on owner work
        const originalRepos = data.filter((r) => !r.fork);

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
      const dateA = new Date(a.pushed_at || a.updated_at).getTime();
      const dateB = new Date(b.pushed_at || b.updated_at).getTime();
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
            color: theme.palette.text.secondary,
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
              color: theme.palette.text.secondary,
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
              border: `1px solid ${theme.palette.divider}`,
              px: 2,
              py: 1,
              flexGrow: 1,
              maxWidth: { xs: "100%", md: "400px" },
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <SearchIcon
              sx={{
                color: theme.palette.text.secondary,
                mr: 1.5,
                fontSize: 20,
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                color: "var(--mui-palette-text-primary)",
                width: "100%",
                fontSize: "14px",
                fontFamily: "inherit",
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
                border: `1px solid ${theme.palette.divider}`,
                px: 2.5,
                py: 1.25,
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  color: theme.palette.text.secondary,
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
                border: `1px solid ${theme.palette.divider}`,
                position: "relative",
                overflow: "hidden",
                height: "40px",
                alignItems: "center",
                backgroundColor: theme.palette.background.paper,
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
                        ? theme.palette.background.default
                        : theme.palette.text.primary,
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
                        ? theme.palette.background.default
                        : theme.palette.text.primary,
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
                        ? theme.palette.background.default
                        : theme.palette.text.primary,
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
                        ? theme.palette.background.default
                        : theme.palette.text.primary,
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
                    border: `1.5px solid ${isSelected ? theme.palette.text.primary : theme.palette.divider}`,
                    backgroundColor: isSelected
                      ? theme.palette.text.primary
                      : "transparent",
                    color: isSelected
                      ? theme.palette.background.default
                      : theme.palette.text.primary,
                    fontWeight: 800,
                    fontSize: "11px",
                    fontFamily: "monospace",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease-out",
                    "&:hover": {
                      borderColor: theme.palette.text.primary,
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
                  const accentColor = theme.palette.text.primary;
                  const themeAccentColor = theme.palette.primary.main;

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
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
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
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                backgroundColor: themeAccentColor,
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: "10px",
                                fontWeight: 700,
                                fontFamily: "monospace",
                                letterSpacing: "0.08em",
                                color: theme.palette.text.secondary,
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
                              color: theme.palette.text.secondary,
                            }}
                          >
                            {formatDate(repo.pushed_at || repo.updated_at)}
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
                            sx={{
                              color: theme.palette.text.primary,
                              textDecoration: "none",
                              "&:hover": {
                                color: theme.palette.primary.main,
                              },
                            }}
                          >
                            {repo.name}
                          </MuiLink>
                        </Typography>

                        {/* Repo description */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.text.secondary,
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
                        {/* Left: Stars & Forks stats */}
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
                                color: theme.palette.text.secondary,
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: "11px",
                                fontWeight: 700,
                                fontFamily: "monospace",
                                color: theme.palette.text.secondary,
                              }}
                            >
                              {repo.stargazers_count}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.6,
                            }}
                          >
                            <ForkRightIcon
                              sx={{
                                fontSize: 15,
                                color: theme.palette.text.secondary,
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: "11px",
                                fontWeight: 700,
                                fontFamily: "monospace",
                                color: theme.palette.text.secondary,
                              }}
                            >
                              {repo.forks_count}
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
                            sx={{
                              color: theme.palette.text.primary,
                              display: "flex",
                              alignItems: "center",
                              transition: "color 0.2s",
                              "&:hover": { color: themeAccentColor },
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
                              sx={{
                                color: theme.palette.text.primary,
                                display: "flex",
                                alignItems: "center",
                                transition: "color 0.2s",
                                "&:hover": { color: themeAccentColor },
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
                  const accentColor = theme.palette.text.primary;
                  const themeAccentColor = theme.palette.primary.main;

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
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
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
                            sx={{
                              color: theme.palette.text.primary,
                              textDecoration: "none",
                              "&:hover": {
                                color: theme.palette.primary.main,
                              },
                            }}
                          >
                            {repo.name}
                          </MuiLink>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.text.secondary,
                            fontSize: "13px",
                            lineHeight: 1.5,
                          }}
                        >
                          {repo.description ||
                            (language === "en"
                              ? "No repository description provided."
                              : "কোনো বিবরণ প্রদান করা হয়নি।")}
                        </Typography>
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
                          gap: { xs: 2.5, sm: 4 },
                          minWidth: { xs: "100%", md: "38%" },
                          pt: { xs: 1.5, md: 0 },
                          borderTop: {
                            xs: `1px solid ${theme.palette.divider}`,
                            md: "none",
                          },
                        }}
                      >
                        {/* Meta metadata row: Language & Pushed Date */}
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
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                backgroundColor: themeAccentColor,
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: "10px",
                                fontWeight: 700,
                                fontFamily: "monospace",
                                letterSpacing: "0.08em",
                                color: theme.palette.text.secondary,
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
                              color: theme.palette.text.secondary,
                            }}
                          >
                            {formatDate(repo.pushed_at || repo.updated_at)}
                          </Typography>
                        </Box>

                        {/* Stars & Forks Stats */}
                        <Box
                          sx={{ display: "flex", gap: 2, alignItems: "center" }}
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
                                color: theme.palette.text.secondary,
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: "11px",
                                fontWeight: 700,
                                fontFamily: "monospace",
                                color: theme.palette.text.secondary,
                              }}
                            >
                              {repo.stargazers_count}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.6,
                            }}
                          >
                            <ForkRightIcon
                              sx={{
                                fontSize: 15,
                                color: theme.palette.text.secondary,
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: "11px",
                                fontWeight: 700,
                                fontFamily: "monospace",
                                color: theme.palette.text.secondary,
                              }}
                            >
                              {repo.forks_count}
                            </Typography>
                          </Box>
                        </Box>

                        {/* External Anchor Buttons */}
                        <Box
                          sx={{ display: "flex", gap: 2, alignItems: "center" }}
                        >
                          <MuiLink
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t.repo}
                            sx={{
                              color: theme.palette.text.primary,
                              display: "flex",
                              alignItems: "center",
                              transition: "color 0.2s",
                              "&:hover": { color: themeAccentColor },
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
                              sx={{
                                color: theme.palette.text.primary,
                                display: "flex",
                                alignItems: "center",
                                transition: "color 0.2s",
                                "&:hover": { color: themeAccentColor },
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
