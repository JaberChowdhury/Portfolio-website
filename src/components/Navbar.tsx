"use client";

import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import Logo from "./Logo"; // Import your new interactive logo

export default function Navbar() {
  const theme = useTheme();
  const gridLineColor = theme.palette.divider;

  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 4,
        py: 2, // Slightly reduced padding to accommodate the taller logo
        borderBottom: `1px solid ${gridLineColor}`,

        // --- Glassmorphism Effect ---
        backgroundColor: alpha(theme.palette.background.default, 0.7),
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Left: The Interactive Framer Motion Logo */}
      <Logo />

      {/* Center: Numbered Menu */}
      <Stack
        direction="row"
        spacing={6}
        sx={{ display: { xs: "none", lg: "flex" } }}
      >
        <Typography
          variant="caption"
          sx={{ letterSpacing: "0.05em", cursor: "pointer" }}
        >
          001/ HOMEPAGE
        </Typography>
        <Typography
          variant="caption"
          sx={{ letterSpacing: "0.05em", cursor: "pointer" }}
        >
          002/ PROJECTS
        </Typography>
        <Typography
          variant="caption"
          sx={{ letterSpacing: "0.05em", cursor: "pointer" }}
        >
          003/ MANIFESTO
        </Typography>
      </Stack>

      {/* Right: Extras */}
      <Typography
        variant="caption"
        sx={{ fontWeight: "bold", display: { xs: "none", sm: "block" } }}
      >
        EN | PT
      </Typography>
    </Box>
  );
}
