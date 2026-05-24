"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import GlowingCrosshair from "./GlowingCrosshair";
import CircuitGraphic from "./CircuitGraphic";

export default function HeroTitle() {
  const theme = useTheme();

  // Shared typography styles to keep the massive text responsive
  const fluidTextStyle = {
    fontSize: { xs: "clamp(1.5rem, 6vw, 9rem)", md: "clamp(2.5rem, 8vw, 9rem)" }, // Scaled down for mobile to fit long words
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

  return (
    <Box sx={{ width: "100%", maxWidth: "1400px", zIndex: 10 }}>
      {/* Top Line: MD JABER + Dynamic Flow Graphic */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          mb: { xs: 2, md: 0 },
        }}
      >
        <Typography variant="h1" sx={fluidTextStyle}>
          MD <GlowingCrosshair /> JABER
        </Typography>

        <CircuitGraphic />
      </Box>

      {/* Bottom Line: HOSSAIN CHOWDHURY */}
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Typography variant="h1" sx={fluidTextStyle}>
          HOSSAIN <GlowingCrosshair /> CHOWDHURY
        </Typography>
      </Box>
    </Box>
  );
}
