"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { marqueeScroll } from "./heroAnimations";

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
        <Typography
          variant="h5"
          sx={{ mx: 4, fontWeight: 300, textTransform: "uppercase" }}
        >
          A Designer and Developer with Art and Precision —
        </Typography>
        <Typography
          variant="h5"
          sx={{ mx: 4, fontWeight: 300, textTransform: "uppercase" }}
        >
          Exploring the Intersections Beyond the Ordinary —
        </Typography>
        <Typography
          variant="h5"
          sx={{ mx: 4, fontWeight: 300, textTransform: "uppercase" }}
        >
          Through interfaces that breathe —
        </Typography>
        <Typography
          variant="h5"
          sx={{ mx: 4, fontWeight: 300, textTransform: "uppercase" }}
        >
          Pushing boundaries where code meets imagination —
        </Typography>
        <Typography
          variant="h5"
          sx={{ mx: 4, fontWeight: 300, textTransform: "uppercase" }}
        >
          Every pixel has purpose —
        </Typography>
      </Box>
    </Box>
  );
}
