"use client";

import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import GlowingCrosshair from "./GlowingCrosshair";
import CircuitGraphic from "./CircuitGraphic";
import { useLanguage } from "../../context/LanguageContext";
import { Item } from "three/examples/jsm/inspector/ui/Item.js";

export default function HeroTitle() {
  const theme = useTheme();
  const { t, language } = useLanguage();

  // Shared typography styles to keep the massive text responsive
  const fluidTextStyle = {
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
  if (language == "en") {
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
          {t.hero.title1[0]}
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
          {t.hero.title1[1]}
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
          {t.hero.title2[0]}
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
          {t.hero.title2[1]}
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
          {t.hero.title1[0]}
          {"  "} {t.hero.title1[1]}
          {"  "}
          {t.hero.title2[0]}
          {"  "}
          {t.hero.title2[1]}
        </Typography>
      </Box>
    );
  }
}
