"use client";

import { Box, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

export default function Loading() {
  const theme = useTheme();

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0.3 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.8,
        ease: "easeInOut" as const,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // Frosted glassmorphism background that lets the grid background show through
        backgroundColor: alpha(theme.palette.background.default, 0.75),
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        gap: "24px",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Dynamic Drawing Monogram Logo */}
      <motion.svg
        aria-labelledby="loading-logo-title"
        width="80"
        height="80"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          overflow: "visible",
          filter: `drop-shadow(0px 0px 10px ${alpha(
            theme.palette.primary.main,
            0.34,
          )})`,
        }}
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 1.8,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <title id="loading-logo-title">Loading</title>
        {/* Path 1: The Left Wall and the 'J' hook base */}
        <motion.path
          d="M 16 16 V 84 H 42 V 65"
          stroke={theme.palette.text.primary}
          strokeWidth="8"
          strokeLinecap="square"
          strokeLinejoin="miter"
          initial="hidden"
          animate="visible"
          variants={pathVariants}
        />
        {/* Path 2: The 'M' diagonals and the Right Wall */}
        <motion.path
          d="M 16 16 L 42 42 L 68 16 V 84"
          stroke={theme.palette.text.primary}
          strokeWidth="8"
          strokeLinecap="square"
          strokeLinejoin="miter"
          initial="hidden"
          animate="visible"
          variants={pathVariants}
        />
        {/* Path 3: The Central Stem (Left leg of 'H') */}
        <motion.path
          d="M 42 42 V 84"
          stroke={theme.palette.text.primary}
          strokeWidth="8"
          strokeLinecap="square"
          strokeLinejoin="miter"
          initial="hidden"
          animate="visible"
          variants={pathVariants}
        />
        {/* Path 4: The 'H' Crossbar */}
        <motion.path
          d="M 42 65 H 68"
          stroke={theme.palette.text.primary}
          strokeWidth="8"
          strokeLinecap="square"
          strokeLinejoin="miter"
          initial="hidden"
          animate="visible"
          variants={pathVariants}
        />
        {/* Path 5: The 'C' shape grafted to the right wall */}
        <motion.path
          d="M 68 32 H 88 V 68 H 68"
          stroke={theme.palette.text.primary}
          strokeWidth="8"
          strokeLinecap="square"
          strokeLinejoin="miter"
          initial="hidden"
          animate="visible"
          variants={pathVariants}
        />
      </motion.svg>

      {/* Indeterminate Brutalist Progress Line */}
      <Box
        sx={{
          width: "120px",
          height: "2px",
          backgroundColor: theme.palette.divider,
          position: "relative",
          overflow: "hidden",
          borderRadius: 0,
        }}
      >
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "60%",
            height: "100%",
            backgroundColor: "var(--mui-palette-primary-main)",
            boxShadow: "0 0 8px var(--mui-palette-primary-main)",
          }}
        />
      </Box>

      {/* Pulsing Status Text */}
      <Typography
        variant="caption"
        sx={{
          fontFamily: "monospace",
          letterSpacing: "0.25em",
          color: "text.secondary",
          fontSize: "0.68rem",
          textTransform: "uppercase",
          fontWeight: 700,
          animation: "pulse 1.8s ease-in-out infinite",
          "@keyframes pulse": {
            "0%, 100%": { opacity: 0.4 },
            "50%": { opacity: 1 },
          },
        }}
      >
        Loading Experience
      </Typography>
    </motion.div>
  );
}
