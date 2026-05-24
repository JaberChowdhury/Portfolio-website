"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RefreshIcon from "@mui/icons-material/Refresh";
import StarIcon from "@mui/icons-material/Star";
import {
  alpha,
  Box,
  Container,
  Link as MuiLink,
  Paper,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import hljs from "highlight.js";
import { marked } from "marked";
import Link from "next/link";
import { useState } from "react";

import ParticleText from "@/app/extras/ParticleText";
import Navbar from "@/components/navbar/Navbar";
import { useLanguageStore } from "@/store/languageStore";

// Interface definitions matches Repository from parent
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

interface BranchData {
  name: string;
  readmeHtml: string;
}

interface ProjectDetailClientProps {
  repoInfo: Repository;
  branchesData: BranchData[];
  allBranches: { name: string }[];
}

const detailTranslations = {
  en: {
    back: "← Back to Projects",
    defaultBranch: "Default Branch",
    branches: "Branches",
    stars: "Stars",
    forks: "Forks",
    lastUpdated: "Last Pushed",
    noReadme: "No README found for this branch.",
    readmeTitle: "README.md",
    demo: "Live Demo",
    livePreview: "Live Preview Canvas",
    loading: "Loading README.md...",
  },
  bn: {
    back: "← প্রজেক্টসমূহে ফিরে যান",
    defaultBranch: "ডিফল্ট ব্রাঞ্চ",
    branches: "ব্রাঞ্চসমূহ",
    stars: "স্টার",
    forks: "ফর্ক",
    lastUpdated: "সর্বশেষ পুশ",
    noReadme: "এই ব্রাঞ্চের জন্য কোনো README পাওয়া যায়নি।",
    readmeTitle: "README.md",
    demo: "লাইভ ডেমো",
    livePreview: "লাইভ প্রিভিউ ক্যানভাস",
    loading: "README.md লোড হচ্ছে...",
  },
};

// Configure client-side marked with highlight.js syntax highlighting
const clientRenderer = new marked.Renderer();
clientRenderer.code = ({
  text,
  lang,
}: {
  text: string;
  lang?: string;
}): string => {
  const language = lang && hljs.getLanguage(lang) ? lang : "plaintext";
  const highlighted = hljs.highlight(text, { language }).value;
  return `<pre class="hljs"><code class="language-${language}">${highlighted}</code></pre>`;
};
marked.use({ renderer: clientRenderer });

export default function ProjectDetailClient({
  repoInfo,
  branchesData,
  allBranches,
}: ProjectDetailClientProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const language = useLanguageStore((s) => s.language);
  const t = detailTranslations[language];
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const mainTextColor = "rgba(0, 0, 0, 0.85)";

  // Local state to store readmes (pre-rendered or dynamically compiled client-side)
  const [readmesMap, setReadmesMap] = useState<Record<string, string>>(() => {
    const initialMap: Record<string, string> = {};
    for (const item of branchesData) {
      initialMap[item.name] = item.readmeHtml;
    }
    return initialMap;
  });

  const [activeBranchIndex, setActiveBranchIndex] = useState<number>(0);
  const activeBranchName = allBranches[activeBranchIndex]?.name || "main";
  const [loadingReadme, setLoadingReadme] = useState(false);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString(language === "en" ? "en-US" : "bn-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getParticleFont = (name: string, mobile: boolean) => {
    const baseDesktopSize = 460;
    const baseMobileSize = 360;
    const factor = name.length > 10 ? Math.min(1, 10 / name.length) : 1;
    const desktopSize = Math.max(70, Math.floor(baseDesktopSize * factor));
    const mobileSize = Math.max(35, Math.floor(baseMobileSize * factor));
    return mobile
      ? `900 ${mobileSize}px Inter, sans-serif`
      : `900 ${desktopSize}px Inter, sans-serif`;
  };

  const handleBranchSelect = async (index: number) => {
    setActiveBranchIndex(index);
    const branchName = allBranches[index]?.name;
    if (!branchName) return;

    // If we don't have the README compiled for this branch yet, fetch and compile it
    if (!readmesMap[branchName]) {
      setLoadingReadme(true);
      try {
        const rawUrl = `https://raw.githubusercontent.com/JaberChowdhury/${repoInfo.name}/${branchName}/README.md`;
        let res = await fetch(rawUrl);
        if (!res.ok) {
          // Try lowercase readme.md just in case
          const rawUrlLower = `https://raw.githubusercontent.com/JaberChowdhury/${repoInfo.name}/${branchName}/readme.md`;
          res = await fetch(rawUrlLower);
        }

        if (!res.ok) {
          throw new Error("README not found on this branch");
        }

        const markdownText = await res.text();
        const compiledHtml = marked.parse(markdownText) as string;

        setReadmesMap((prev) => ({
          ...prev,
          [branchName]: compiledHtml,
        }));
      } catch (err) {
        console.error("Failed to fetch/compile branch readme:", err);
        setReadmesMap((prev) => ({
          ...prev,
          [branchName]: `<h3>Error</h3><p>Could not retrieve or render the README.md for branch <strong>${branchName}</strong>.</p>`,
        }));
      } finally {
        setLoadingReadme(false);
      }
    }
  };

  const reloadIframe = () => {
    const iframe = document.getElementById(
      "demo-preview-iframe",
    ) as HTMLIFrameElement;
    if (iframe) {
      // biome-ignore lint/correctness/noSelfAssign: reload iframe
      iframe.src = iframe.src;
    }
  };

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
        {/* Back Link to Projects Catalog */}
        <MuiLink
          component={Link}
          href="/projects"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            fontWeight: 800,
            fontSize: "12px",
            letterSpacing: "0.08em",
            fontFamily: "monospace",
            color: theme.palette.text.secondary,
            mb: 5,
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "color 0.2s",
            "&:hover": {
              color: theme.palette.text.primary,
            },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 14 }} />
          {t.back}
        </MuiLink>

        {/* Project Meta Details Header */}
        <Box
          sx={{
            mb: 6,
            borderBottom: `1px solid ${theme.palette.divider}`,
            pb: 4,
          }}
        >
          {/* Main Title via ParticleText */}
          <Box
            sx={{
              height: { xs: "120px", md: "250px" },
              width: "100%",
              mb: 3,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <ParticleText
              text={repoInfo.name}
              canvasWidth={2500}
              colorStart={mainTextColor}
              colorEnd={mainTextColor}
              font={getParticleFont(repoInfo.name, isMobile)}
              particleSize={0.4}
            />
          </Box>

          {/* Description */}
          {repoInfo.description && (
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: { xs: "15px", sm: "17px" },
                lineHeight: 1.6,
                maxWidth: "800px",
                mb: 4,
              }}
            >
              {repoInfo.description}
            </Typography>
          )}

          {/* Stats Bar */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 3, sm: 4 },
              alignItems: "center",
            }}
          >
            {/* Stars */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <StarIcon
                sx={{ fontSize: 18, color: theme.palette.text.secondary }}
              />
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 700,
                  fontFamily: "monospace",
                  color: theme.palette.text.secondary,
                }}
              >
                {t.stars}: {repoInfo.stargazers_count}
              </Typography>
            </Box>

            {/* Forks */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{ color: theme.palette.text.secondary }}
              >
                <title>{t.forks}</title>
                <path
                  d="M18 18v-6a4 4 0 0 0-4-4H8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m11 5-3 3 3 3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="18" cy="18" r="3" />
                <circle cx="6" cy="6" r="3" />
              </svg>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 700,
                  fontFamily: "monospace",
                  color: theme.palette.text.secondary,
                }}
              >
                {t.forks}: {repoInfo.forks_count}
              </Typography>
            </Box>

            {/* Last pushed */}
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 700,
                fontFamily: "monospace",
                color: theme.palette.text.secondary,
              }}
            >
              {t.lastUpdated}:{" "}
              {formatDate(repoInfo.pushed_at || repoInfo.updated_at)}
            </Typography>

            {/* GitHub Link */}
            <MuiLink
              href={repoInfo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                fontWeight: 700,
                fontSize: "12px",
                fontFamily: "monospace",
                color: theme.palette.text.primary,
                textDecoration: "underline",
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <GitHubIcon sx={{ fontSize: 16 }} />
              {language === "en" ? "GitHub" : "গিটহাব"}
            </MuiLink>

            {/* Live Demo Link */}
            {repoInfo.homepage && (
              <MuiLink
                href={repoInfo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  fontWeight: 700,
                  fontSize: "12px",
                  fontFamily: "monospace",
                  color: theme.palette.text.primary,
                  textDecoration: "underline",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <LaunchIcon sx={{ fontSize: 16 }} />
                {t.demo}
              </MuiLink>
            )}
          </Box>
        </Box>

        {/* Live Website Preview Mock Browser Canvas */}
        {repoInfo.homepage && (
          <Box sx={{ mb: 6 }}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "12px",
                letterSpacing: "0.15em",
                fontFamily: "monospace",
                color: theme.palette.text.secondary,
                mb: 2,
                textTransform: "uppercase",
              }}
            >
              {t.livePreview}
            </Typography>

            {/* Brutalist Mock Browser */}
            <Paper
              elevation={2}
              sx={{
                backgroundColor: theme.palette.background.paper,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                width: "100%",
                height: { xs: "400px", md: "600px" },
              }}
            >
              {/* Browser Header Bar */}
              <Box
                sx={{
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  backgroundColor: theme.palette.action.hover,
                  px: 2,
                  py: 1.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  userSelect: "none",
                }}
              >
                {/* Window Dots */}
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: "#ff5f56",
                      opacity: 0.8,
                    }}
                  />
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: "#ffbd2e",
                      opacity: 0.8,
                    }}
                  />
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: "#27c93f",
                      opacity: 0.8,
                    }}
                  />
                </Box>

                {/* Reload Button */}
                <Box
                  onClick={reloadIframe}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    color: theme.palette.text.secondary,
                    transition: "color 0.15s ease",
                    "&:hover": {
                      color: theme.palette.text.primary,
                    },
                  }}
                >
                  <RefreshIcon sx={{ fontSize: 16 }} />
                </Box>

                {/* Address Bar */}
                <Box
                  sx={{
                    flexGrow: 1,
                    backgroundColor: theme.palette.background.default,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: "4px",
                    px: 2,
                    py: 0.5,
                    fontSize: "11px",
                    fontFamily: "monospace",
                    color: theme.palette.text.secondary,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {repoInfo.homepage}
                </Box>

                {/* Open in New Tab Button */}
                <MuiLink
                  href={repoInfo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: theme.palette.text.secondary,
                    "&:hover": { color: theme.palette.text.primary },
                  }}
                >
                  <OpenInNewIcon sx={{ fontSize: 16 }} />
                </MuiLink>
              </Box>

              {/* Iframe Website content */}
              <Box
                sx={{
                  flexGrow: 1,
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <iframe
                  id="demo-preview-iframe"
                  src={repoInfo.homepage}
                  title={`${repoInfo.name} Live Demo`}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    backgroundColor: "#ffffff",
                  }}
                  sandbox="allow-scripts allow-same-origin"
                />
              </Box>
            </Paper>
          </Box>
        )}

        {/* Main Details Area: Branch tabs + README content */}
        <Box sx={{ width: "100%" }}>
          {/* Branch Header label */}
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "12px",
              letterSpacing: "0.15em",
              fontFamily: "monospace",
              color: theme.palette.text.secondary,
              mb: 1,
              textTransform: "uppercase",
            }}
          >
            {t.branches}
          </Typography>

          {/* Horizontal Branch Tab Pills (MUI Tabs with flex-wrap) */}
          <Tabs
            value={activeBranchIndex}
            onChange={(_, newValue) => handleBranchSelect(newValue)}
            sx={{
              mb: 4,
              borderBottom: `1px solid ${theme.palette.divider}`,
              "& .MuiTabs-flexContainer": {
                flexWrap: "wrap",
                gap: 0.5,
              },
              "& .MuiTab-root": {
                fontWeight: 700,
                fontFamily: "monospace",
                fontSize: "11px",
                color: theme.palette.text.secondary,
                minWidth: "auto",
                px: 2.5,
                "&.Mui-selected": {
                  color: theme.palette.text.primary,
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: theme.palette.text.primary,
              },
            }}
          >
            {allBranches.map((branch) => (
              <Tab key={branch.name} label={branch.name.toUpperCase()} />
            ))}
          </Tabs>

          {/* README Content Paper-Box */}
          <AnimatePresence mode="wait">
            <Paper
              elevation={0}
              component={motion.div}
              key={activeBranchName}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              sx={{
                backgroundColor: "transparent",
                padding: 0,
                boxSizing: "border-box",
                position: "relative",
                width: "100%",
                minHeight: "300px",

                // Custom styling for parsed README HTML
                "& h1, & h2, & h3, & h4": {
                  fontFamily: "inherit",
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  pb: 1,
                  mt: 4.5,
                  mb: 2,
                },
                "& h1": { fontSize: "24px" },
                "& h2": { fontSize: "20px" },
                "& h3": { fontSize: "17px" },
                "& p": {
                  fontSize: "14px",
                  lineHeight: 1.65,
                  color: theme.palette.text.primary,
                  mb: 2.5,
                },
                "& ul, & ol": {
                  pl: 3,
                  mb: 2.5,
                  fontSize: "14px",
                  color: theme.palette.text.primary,
                },
                "& li": {
                  mb: 1,
                },
                "& pre": {
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.04)",
                  padding: 2.5,
                  borderRadius: "4px",
                  border: `1px solid ${theme.palette.divider}`,
                  overflowX: "auto",
                  fontFamily: "monospace",
                  my: 3,
                },
                "& code": {
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.04)",
                  px: 0.8,
                  py: 0.4,
                  borderRadius: "3px",
                  fontFamily: "monospace",
                  fontSize: "13px",
                  color: theme.palette.text.primary,
                },
                "& a": {
                  color: theme.palette.primary.main,
                  textDecoration: "underline",
                  fontWeight: 700,
                  "&:hover": {
                    color: theme.palette.text.primary,
                  },
                },
                "& table": {
                  width: "100%",
                  borderCollapse: "collapse",
                  my: 3,
                },
                "& th, & td": {
                  border: `1px solid ${theme.palette.divider}`,
                  padding: 1.5,
                  textAlign: "left",
                  fontSize: "13px",
                },
                "& th": {
                  backgroundColor: alpha(theme.palette.text.primary, 0.05),
                  fontWeight: 700,
                },

                // highlight.js Syntax Highlighting styling (Brutalist Code Colors integrated with theme)
                "& .hljs": {
                  display: "block",
                  overflowX: "auto",
                  padding: "0.5em",
                  color: theme.palette.text.primary,
                },
                "& .hljs-comment, & .hljs-quote": {
                  color: isDark ? "#8b949e" : "#6a737d",
                  fontStyle: "italic",
                },
                "& .hljs-keyword, & .hljs-selector-tag, & .hljs-subst": {
                  color: isDark ? "#ff7b72" : "#d73a49",
                  fontWeight: "bold",
                },
                "& .hljs-string, & .hljs-regexp, & .hljs-addition, & .hljs-attribute, & .hljs-meta-string":
                  {
                    color: isDark ? "#a5d6ff" : "#032f62",
                  },
                "& .hljs-title, & .hljs-section, & .hljs-doctag, & .hljs-name, & .hljs-selector-id, & .hljs-selector-class":
                  {
                    color: isDark ? "#d2a8ff" : "#6f42c1",
                    fontWeight: "bold",
                  },
                "& .hljs-variable, & .hljs-template-variable, & .hljs-type, & .hljs-selector-attr, & .hljs-selector-pseudo, & .hljs-number":
                  {
                    color: isDark ? "#f0883e" : "#e36209",
                  },
                "& .hljs-symbol, & .hljs-bullet, & .hljs-meta, & .hljs-built_in, & .hljs-class, & .hljs-title.class_":
                  {
                    color: isDark ? "#79c0ff" : "#005cc5",
                  },
                "& .hljs-emphasis": {
                  fontStyle: "italic",
                },
                "& .hljs-strong": {
                  fontWeight: "bold",
                },
              }}
            >
              {loadingReadme ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "200px",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "monospace",
                      fontWeight: 800,
                      fontSize: "14px",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {t.loading}
                  </Typography>
                </Box>
              ) : (
                /* HTML Render */
                <div
                  style={{ position: "relative", zIndex: 1 }}
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: static readme rendering
                  dangerouslySetInnerHTML={{
                    __html: readmesMap[activeBranchName] || "",
                  }}
                />
              )}
            </Paper>
          </AnimatePresence>
        </Box>
      </Container>
    </>
  );
}
