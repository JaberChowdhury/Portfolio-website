"use client";

import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { useLanguageStore } from "@/store/languageStore";

const translations = {
  en: {
    title1: ["MD", "JABER"],
    title2: ["HOSSAIN", "CHOWDHURY"],
  },
  bn: {
    title1: ["মোঃ", "জাবের"],
    title2: ["হোসেন", "চৌধুরী"],
  },
};

export default function HeroTitle() {
  const theme = useTheme();
  const language = useLanguageStore((s) => s.language);
  const t = translations[language];

  // Shared typography styles to keep the massive text responsive
  const _fluidTextStyle = {
    fontSize: {
      xs: "clamp(1.5rem, 6vw, 9rem)",
      md: "clamp(2.5rem, 8vw, 9rem)",
    }, // Scaled down for mobile to fit long words
    fontWeight: 800,
    letterSpacing: "-0.02em",
    textTransform: "uppercase",
    lineHeight: 0.9,
    color: theme.palette.text.primary,
    whiteSpace: { xs: "normal", md: "nowrap" }, // Allow wrap on very small screens if necessary
    display: "flex",
    flexWrap: { xs: "wrap", md: "nowrap" },
    alignItems: "center",
  };
  if (language === "en") {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          zIndex: 10,
          px: {
            xs: 2,
            sm: 4,
            md: 6,
          },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: "2.2rem", // mobile
              sm: "3rem", // tablet
              md: "4.5rem", // laptop
              lg: "5.5rem", // desktop
              xl: "7rem", // large screen
            },
            lineHeight: 1,
            fontWeight: 700,
          }}
        >
          {t.title1[0]}
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: "2.2rem",
              sm: "3rem",
              md: "4.5rem",
              lg: "5.5rem",
              xl: "7rem",
            },
            lineHeight: 1,
            fontWeight: 700,
          }}
        >
          {t.title1[1]}
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: "2.2rem",
              sm: "3rem",
              md: "4.5rem",
              lg: "5.5rem",
              xl: "7rem",
            },
            lineHeight: 1,
            fontWeight: 700,
          }}
        >
          {t.title2[0]}
        </Typography>

        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: "2.2rem",
              sm: "3rem",
              md: "4.5rem",
              lg: "5.5rem",
              xl: "7rem",
            },
            lineHeight: 1,
            fontWeight: 700,
          }}
        >
          {t.title2[1]}
        </Typography>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          zIndex: 10,
          px: {
            xs: 2,
            sm: 4,
            md: 6,
          },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: "2.2rem", // mobile
              sm: "3rem", // tablet
              md: "4.5rem", // laptop
              lg: "5.5rem", // desktop
              xl: "7rem", // large screen
            },
            lineHeight: 1,
            fontWeight: 700,
          }}
        >
          {t.title1[0]}
          {"  "} {t.title1[1]}
          {"  "}
          {t.title2[0]}
          {"  "}
          {t.title2[1]}
        </Typography>
      </Box>
    );
  }
}
