"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { marqueeScroll } from "./heroAnimations";

// Extracted content into an array for easy updating and cleaner JSX.
const MARQUEE_ITEMS = [
  "High-Performance Web Graphics —",
  "Three.js & WebGPU Animations —",
  "Modern Toolchains: Bun & Vite —",
  "C++ Execution Engines —",
  "Competitive Programming Logic —",
  "Advanced System Architecture —",
];

export default function HeroMarquee() {
  const theme = useTheme();
  const gridLineColor = theme.palette.divider;

  return (
    <Box
      sx={{
        width: "100%",
        borderTop: `1px solid ${gridLineColor}`,
        borderBottom: `1px solid ${gridLineColor}`,
        py: 2,
        display: "flex",
        whiteSpace: "nowrap",
        overflow: "hidden",
        backgroundColor: theme.palette.background.default,
        zIndex: 20,
      }}
    >
      <Box
        sx={{
          display: "flex",
          animation: `${marqueeScroll} 25s linear infinite`,
        }}
      >
        {/*
          Spreading the array twice ([...MARQUEE_ITEMS, ...MARQUEE_ITEMS])
          ensures the marquee has enough content to scroll seamlessly
          without a visible break or pop when the animation restarts.
        */}
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((text, index) => (
          <Typography
            key={index}
            variant="h5"
            sx={{ mx: { xs: 2, md: 4 }, fontSize: { xs: "1rem", md: "1.5rem" }, fontWeight: 300, textTransform: "uppercase" }}
          >
            {text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
