// components/GridBackground.tsx
"use client";

import { Box } from "@mui/material";
import { useTheme } from "@mui/system";
import type React from "react";

export default function GridBackground({
  children,
}: {
  children: React.ReactNode;
}) {
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
      }}
    >
      {children}
    </Box>
  );
}
