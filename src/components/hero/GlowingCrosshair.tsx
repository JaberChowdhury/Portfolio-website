"use client";

import { Box } from "@mui/material";
import { useTheme } from "@mui/system";
import { motion } from "framer-motion";

export default function GlowingCrosshair() {
  const theme = useTheme();
  const cyanAccent = theme.palette.primary.main;

  return (
    <Box
      component={motion.span}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      sx={{
        color: cyanAccent,
        // Responsive size using clamp so it never blows out the layout
        fontSize: "clamp(2rem, 5vw, 4rem)",
        fontWeight: 300,
        mx: { xs: 1, md: 3 },
        textShadow: `0 0 10px ${cyanAccent}80`,
        display: "inline-block",
        transform: "translateY(-5px)",
      }}
    >
      +
    </Box>
  );
}
