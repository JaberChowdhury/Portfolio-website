"use client";

import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, type Variants } from "framer-motion";

export default function Logo() {
  const theme = useTheme();

  // Animation variants for the SVG "drawing" effect
  const pathVariants: Variants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
    hover: {
      strokeWidth: 12, // Subtly thickens on hover for tactile feedback
      stroke: theme.palette.primary.main, // Shifts to vibrant cyan
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        gap: "20px", // Exact spacing from the design
      }}
    >
      {/* The Geometric Stack Monogram (MJHC) */}
      <motion.svg
        width="56"
        height="56"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        {/* Path 1: The Left Wall and the 'J' hook base */}
        <motion.path
          d="M 16 16 V 84 H 42 V 65"
          stroke={theme.palette.text.primary}
          strokeWidth="10"
          strokeLinecap="square"
          strokeLinejoin="miter"
          variants={pathVariants}
        />
        {/* Path 2: The 'M' diagonals and the Right Wall */}
        <motion.path
          d="M 16 16 L 42 42 L 68 16 V 84"
          stroke={theme.palette.text.primary}
          strokeWidth="10"
          strokeLinecap="square"
          strokeLinejoin="miter"
          variants={pathVariants}
        />
        {/* Path 3: The Central Stem (Left leg of 'H') */}
        <motion.path
          d="M 42 42 V 84"
          stroke={theme.palette.text.primary}
          strokeWidth="10"
          strokeLinecap="square"
          strokeLinejoin="miter"
          variants={pathVariants}
        />
        {/* Path 4: The 'H' Crossbar */}
        <motion.path
          d="M 42 65 H 68"
          stroke={theme.palette.text.primary}
          strokeWidth="10"
          strokeLinecap="square"
          strokeLinejoin="miter"
          variants={pathVariants}
        />
        {/* Path 5: The 'C' shape grafted to the right wall */}
        <motion.path
          d="M 68 32 H 88 V 68 H 68"
          stroke={theme.palette.text.primary}
          strokeWidth="10"
          strokeLinecap="square"
          strokeLinejoin="miter"
          variants={pathVariants}
        />
      </motion.svg>

      {/* The Typographic Block (Perfect vertical stack as seen in Idea 1) */}
      <motion.div
        variants={{
          hover: { x: 5, color: theme.palette.primary.main },
        }}
        transition={{ duration: 0.3 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            color: theme.palette.text.primary,
            fontWeight: 800,
            letterSpacing: "0.1em",
            fontSize: "0.85rem",
            lineHeight: 1.1, // Keeps the text block incredibly tight and structural
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: "bold" }}>
            Hyperloop
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: "bold" }}>
            Studio
          </Typography>
        </Box>
      </motion.div>
    </motion.div>
  );
}
