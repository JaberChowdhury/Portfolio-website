// components/GridBackground.tsx
"use client";

import { Box } from "@mui/material";
import type React from "react";

export default function GridBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "background.default",
        backgroundImage: `
          linear-gradient(var(--mui-palette-divider) 1px, transparent 1px),
          linear-gradient(90deg, var(--mui-palette-divider) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        color: "text.primary",
        position: "relative",
      }}
    >
      {children}
    </Box>
  );
}
