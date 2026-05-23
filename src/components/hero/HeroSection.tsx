"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { floatAnimation } from "./heroAnimations";
import Navbar from "../Navbar";
import HeroTitle from "./HeroTitle";
import HeroMarquee from "./HeroMarquee";

export default function HeroSection() {
  const theme = useTheme();
  const gridLineColor = theme.palette.divider;

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        backgroundImage: `
          linear-gradient(${gridLineColor} 1px, transparent 1px),
          linear-gradient(90deg, ${gridLineColor} 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        color: theme.palette.text.primary,
        position: "relative",
        // CRITICAL: Prevents horizontal scrollbars
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      {/* Hero Centerpiece */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          px: { xs: 2, md: 8 },
          width: "100%",
        }}
      >
        {/* Floating Parallax Elements */}
        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            top: "25%",
            left: { xs: "5%", md: "15%" },
            fontStyle: "italic",
            opacity: 0.6,
            animation: `${floatAnimation} 6s ease-in-out infinite`,
          }}
        >
          system architecture
        </Typography>

        <Typography
          variant="body2"
          sx={{
            position: "absolute",
            bottom: "25%",
            right: { xs: "5%", md: "15%" },
            fontStyle: "italic",
            opacity: 0.6,
            animation: `${floatAnimation} 7s ease-in-out infinite reverse`,
          }}
        >
          horizontal continuity
        </Typography>

        <HeroTitle />
      </Box>

      <HeroMarquee />
    </Box>
  );
}
