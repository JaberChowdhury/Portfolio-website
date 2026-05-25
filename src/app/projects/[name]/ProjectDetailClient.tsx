"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RefreshIcon from "@mui/icons-material/Refresh";
import StarIcon from "@mui/icons-material/Star";
import {
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ParticleText from "@/app/extras/ParticleText";
import Loading from "@/app/loading";
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
  activeBranchName: string;
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

// Client-side markdown compilation is processed on the server-side API route.

export default function ProjectDetailClient({
  repoInfo,
  branchesData,
  allBranches,
  activeBranchName,
}: ProjectDetailClientProps) {
  const theme = useTheme();
  const router = useRouter();
  const language = useLanguageStore((s) => s.language);
  const t = detailTranslations[language];
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const mainTextColor = "var(--mui-palette-text-primary)";
  const codeSurfaceColor =
    "rgba(var(--mui-palette-text-primaryChannel) / 0.05)";
  const syntaxMutedColor = "var(--mui-palette-text-secondary)";
  const syntaxDangerColor = "var(--mui-palette-error-main)";
  const syntaxStringColor = "var(--mui-palette-info-main)";
  const syntaxTitleColor = "var(--mui-palette-secondary-main)";
  const syntaxNumberColor = "var(--mui-palette-warning-main)";

  // Local state to store readmes (pre-rendered or dynamically compiled client-side)
  const [readmesMap, setReadmesMap] = useState<Record<string, string>>(() => {
    const initialMap: Record<string, string> = {};
    for (const item of branchesData) {
      initialMap[item.name] = item.readmeHtml;
    }
    return initialMap;
  });

  const activeBranchIndex = allBranches.findIndex(
    (b) => b.name.toLowerCase() === activeBranchName.toLowerCase(),
  );
  const activeBranchIndexNormalized =
    activeBranchIndex === -1 ? 0 : activeBranchIndex;
  const [loadingReadme, setLoadingReadme] = useState(false);

  const hasReadme = !!readmesMap[activeBranchName];

  useEffect(() => {
    if (hasReadme) return;

    let isMounted = true;
    const fetchReadme = async () => {
      setLoadingReadme(true);
      try {
        const res = await fetch(
          `/api/projects/readme?repo=${repoInfo.name}&branch=${activeBranchName}`,
        );
        if (!res.ok) {
          throw new Error("Failed to fetch branch readme from API route");
        }

        const data = await res.json();
        const compiledHtml = data.readmeHtml;

        if (isMounted) {
          setReadmesMap((prev) => ({
            ...prev,
            [activeBranchName]: compiledHtml,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch branch readme from API:", err);
        if (isMounted) {
          setReadmesMap((prev) => ({
            ...prev,
            [activeBranchName]: `<h3>Error</h3><p>Could not retrieve or render the README.md for branch <strong>${activeBranchName}</strong>.</p>`,
          }));
        }
      } finally {
        if (isMounted) {
          setLoadingReadme(false);
        }
      }
    };

    fetchReadme();

    return () => {
      isMounted = false;
    };
  }, [activeBranchName, repoInfo.name, hasReadme]);

  // Sync branchesData pre-fetched content to local readmesMap state when navigated on server-side
  useEffect(() => {
    setReadmesMap((prev) => {
      const nextMap = { ...prev };
      let changed = false;
      for (const item of branchesData) {
        if (item.readmeHtml && nextMap[item.name] !== item.readmeHtml) {
          nextMap[item.name] = item.readmeHtml;
          changed = true;
        }
      }
      return changed ? nextMap : prev;
    });
  }, [branchesData]);

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
    const baseDesktopSize = 410;
    const baseMobileSize = 360;
    const factor = name.length > 10 ? Math.min(1, 10 / name.length) : 1;
    const desktopSize = Math.max(70, Math.floor(baseDesktopSize * factor));
    const mobileSize = Math.max(35, Math.floor(baseMobileSize * factor));
    return mobile
      ? `900 ${mobileSize}px Inter, sans-serif`
      : `900 ${desktopSize}px Inter, sans-serif`;
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
            color: "var(--mui-palette-text-secondary)",
            mb: 5,
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "color 0.2s",
            "&:hover": {
              color: "var(--mui-palette-text-primary)",
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
            borderBottom: "1px solid var(--mui-palette-divider)",
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
                color: "var(--mui-palette-text-secondary)",
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
                sx={{
                  fontSize: 18,
                  color: "var(--mui-palette-text-secondary)",
                }}
              />
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 700,
                  fontFamily: "monospace",
                  color: "var(--mui-palette-text-secondary)",
                }}
              >
                {t.stars}: {repoInfo.stargazers_count}
              </Typography>
            </Box>

            {/* Forks */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <ForkRightIcon
                sx={{
                  fontSize: 16,
                  color: "var(--mui-palette-text-secondary)",
                }}
              />
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 700,
                  fontFamily: "monospace",
                  color: "var(--mui-palette-text-secondary)",
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
                color: "var(--mui-palette-text-secondary)",
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
                color: "var(--mui-palette-text-primary)",
                textDecoration: "underline",
                "&:hover": {
                  color: "var(--mui-palette-primary-main)",
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
                  color: "var(--mui-palette-text-primary)",
                  textDecoration: "underline",
                  "&:hover": {
                    color: "var(--mui-palette-primary-main)",
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
                color: "var(--mui-palette-text-secondary)",
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
                backgroundColor: "var(--mui-palette-background-paper)",
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
                  borderBottom: "1px solid var(--mui-palette-divider)",
                  backgroundColor: "var(--mui-palette-action-hover)",
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
                      backgroundColor: "var(--mui-palette-error-main)",
                      opacity: 0.8,
                    }}
                  />
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: "var(--mui-palette-warning-main)",
                      opacity: 0.8,
                    }}
                  />
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: "var(--mui-palette-success-main)",
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
                    color: "var(--mui-palette-text-secondary)",
                    transition: "color 0.15s ease",
                    "&:hover": {
                      color: "var(--mui-palette-text-primary)",
                    },
                  }}
                >
                  <RefreshIcon sx={{ fontSize: 16 }} />
                </Box>

                {/* Address Bar */}
                <Box
                  sx={{
                    flexGrow: 1,
                    backgroundColor: "var(--mui-palette-background-default)",
                    border: "1px solid var(--mui-palette-divider)",
                    borderRadius: "4px",
                    px: 2,
                    py: 0.5,
                    fontSize: "11px",
                    fontFamily: "monospace",
                    color: "var(--mui-palette-text-secondary)",
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
                    color: "var(--mui-palette-text-secondary)",
                    "&:hover": { color: "var(--mui-palette-text-primary)" },
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
                    backgroundColor: "var(--mui-palette-background-paper)",
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
              color: "var(--mui-palette-text-secondary)",
              mb: 1,
              textTransform: "uppercase",
            }}
          >
            {t.branches}
          </Typography>

          {/* Horizontal Branch Tab Pills (MUI Tabs with flex-wrap) */}
          <Tabs
            value={activeBranchIndexNormalized}
            onChange={(_, newValue) => {
              const targetBranch = allBranches[newValue]?.name;
              if (targetBranch) {
                router.push(
                  `/projects/${repoInfo.name}/${encodeURIComponent(targetBranch)}`,
                );
              }
            }}
            sx={{
              mb: 4,
              borderBottom: "1px solid var(--mui-palette-divider)",
              "& .MuiTabs-flexContainer": {
                flexWrap: "wrap",
                gap: 0.5,
              },
              "& .MuiTab-root": {
                fontWeight: 700,
                fontFamily: "monospace",
                fontSize: "11px",
                color: "var(--mui-palette-text-secondary)",
                minWidth: "auto",
                px: 2.5,
                "&.Mui-selected": {
                  color: "var(--mui-palette-text-primary)",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "var(--mui-palette-text-primary)",
              },
            }}
          >
            {allBranches.map((branch) => (
              <Tab key={branch.name} label={branch.name.toUpperCase()} />
            ))}
          </Tabs>

          <AnimatePresence mode="wait">
            {loadingReadme ? (
              <motion.div
                key="loading-readme"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <Loading />
              </motion.div>
            ) : (
              <Paper
                elevation={0}
                component={motion.div}
                key={activeBranchName}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                sx={{
                  backgroundColor: "transparent",
                  color: "var(--mui-palette-text-primary)",
                  padding: 0,
                  boxSizing: "border-box",
                  position: "relative",
                  width: "100%",
                  minHeight: "300px",

                  // Custom styling for parsed README HTML
                  "& h1, & h2, & h3, & h4": {
                    fontFamily: "inherit",
                    fontWeight: 700,
                    color: "var(--mui-palette-text-primary)",
                    borderBottom: "1px solid var(--mui-palette-divider)",
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
                    color: "var(--mui-palette-text-primary)",
                    mb: 2.5,
                  },
                  "& ul, & ol": {
                    pl: 3,
                    mb: 2.5,
                    fontSize: "14px",
                    color: "var(--mui-palette-text-primary)",
                  },
                  "& li": {
                    mb: 1,
                    color: "var(--mui-palette-text-primary)",
                  },
                  "& pre": {
                    backgroundColor: codeSurfaceColor,
                    padding: 2.5,
                    borderRadius: "4px",
                    border: "1px solid var(--mui-palette-divider)",
                    overflowX: "auto",
                    fontFamily: "monospace",
                    my: 3,
                  },
                  "& code": {
                    backgroundColor: codeSurfaceColor,
                    px: 0.8,
                    py: 0.4,
                    borderRadius: "3px",
                    fontFamily: "monospace",
                    fontSize: "13px",
                    color: "var(--mui-palette-text-primary)",
                  },
                  "& a": {
                    color: "var(--mui-palette-primary-main)",
                    textDecoration: "underline",
                    fontWeight: 700,
                    "&:hover": {
                      color: "var(--mui-palette-text-primary)",
                    },
                  },
                  "& table": {
                    width: "100%",
                    borderCollapse: "collapse",
                    my: 3,
                  },
                  "& th, & td": {
                    border: "1px solid var(--mui-palette-divider)",
                    padding: 1.5,
                    textAlign: "left",
                    fontSize: "13px",
                  },
                  "& th": {
                    backgroundColor: codeSurfaceColor,
                    fontWeight: 700,
                  },

                  // highlight.js Syntax Highlighting styling (Brutalist Code Colors integrated with theme)
                  "& .hljs": {
                    display: "block",
                    overflowX: "auto",
                    padding: "0.5em",
                    color: "var(--mui-palette-text-primary)",
                  },
                  "& .hljs-comment, & .hljs-quote": {
                    color: syntaxMutedColor,
                    fontStyle: "italic",
                  },
                  "& .hljs-keyword, & .hljs-selector-tag, & .hljs-subst": {
                    color: syntaxDangerColor,
                    fontWeight: "bold",
                  },
                  "& .hljs-string, & .hljs-regexp, & .hljs-addition, & .hljs-attribute, & .hljs-meta-string":
                    {
                      color: syntaxStringColor,
                    },
                  "& .hljs-title, & .hljs-section, & .hljs-doctag, & .hljs-name, & .hljs-selector-id, & .hljs-selector-class":
                    {
                      color: syntaxTitleColor,
                      fontWeight: "bold",
                    },
                  "& .hljs-variable, & .hljs-template-variable, & .hljs-type, & .hljs-selector-attr, & .hljs-selector-pseudo, & .hljs-number":
                    {
                      color: syntaxNumberColor,
                    },
                  "& .hljs-symbol, & .hljs-bullet, & .hljs-meta, & .hljs-built_in, & .hljs-class, & .hljs-title.class_":
                    {
                      color: syntaxStringColor,
                    },
                  "& .hljs-emphasis": {
                    fontStyle: "italic",
                  },
                  "& .hljs-strong": {
                    fontWeight: "bold",
                  },
                }}
              >
                <div
                  style={{ position: "relative", zIndex: 1 }}
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: static readme rendering
                  dangerouslySetInnerHTML={{
                    __html: readmesMap[activeBranchName] || "",
                  }}
                />
              </Paper>
            )}
          </AnimatePresence>
        </Box>
      </Container>
    </>
  );
}
