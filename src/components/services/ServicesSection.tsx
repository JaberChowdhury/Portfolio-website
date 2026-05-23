"use client";

import React, { useState } from "react";
import { Box, Typography, Grid, Chip } from "@mui/material";
import { useTheme } from "@mui/system";
import { motion, AnimatePresence } from "framer-motion";

// --- Services Data ---
// Adapted exactly from your personal portfolio specifications
const servicesData = [
  {
    id: "01",
    title: "Brand Identity",
    desc: "Shaping personal and startup identities that connect and endure.",
    skills: [
      "Brand Audit",
      "Art Direction",
      "Design Systems",
      "Naming Strategies",
    ],
  },
  {
    id: "02",
    title: "Interface Design",
    desc: "My design approach blends aesthetics with functionality, creating digital experiences that convert.",
    skills: [
      "UI / UX Design",
      "Website Design",
      "Mobile Applications",
      "E-Commerce & Platforms",
    ],
  },
  {
    id: "03",
    title: "Immersive & Motion",
    desc: "I create captivating visual experiences that transport audiences.",
    skills: [
      "3D Experiences",
      "Motion Graphics",
      "Video Editing",
      "Interactive Narratives",
    ],
  },
  {
    id: "04",
    title: "Development",
    desc: "My engineering skill sets deliver clean, scalable solutions built for the future.",
    skills: [
      "React & Next.js",
      "Three.js & Matter.js",
      "WordPress & CMS",
      "Deployment Pipelines",
    ],
  },
];

// --- Custom Arrow Icon ---
const ArrowIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      d="M5 12h14M12 5l7 7-7 7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ServicesSection() {
  const theme = useTheme();
  // Default state: The first item ("01") is expanded automatically.
  const [expandedId, setExpandedId] = useState<string>("01");

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 16 },
        px: { xs: 2, md: 8 },
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Section Header */}
      <Box sx={{ mb: { xs: 6, md: 10 } }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
          }}
        >
          Services
        </Typography>
      </Box>

      {/* Accordion List */}
      <Box sx={{ borderTop: "1px solid", borderColor: "divider" }}>
        {servicesData.map((service) => {
          const isExpanded = expandedId === service.id;

          return (
            <Box
              key={service.id}
              // Hover interaction to expand the item
              onMouseEnter={() => setExpandedId(service.id)}
              sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.02)", // Subtle highlight on hover
                },
              }}
            >
              {/* Row Header (Always Visible) */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: { xs: 3, md: 5 },
                  px: { xs: 1, md: 2 },
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
                    fontWeight: isExpanded ? 800 : 400, // Becomes bold when active
                    color: isExpanded ? "text.primary" : "text.secondary",
                    transition: "all 0.3s ease",
                    textTransform: "uppercase",
                  }}
                >
                  {service.title}
                </Typography>

                {/* Animated Arrow */}
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }} // Rotates down when expanded
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ color: theme.palette.text.primary }}
                >
                  <ArrowIcon />
                </motion.div>
              </Box>

              {/* Expandable Content (Visible on Hover) */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // Apple-like smooth easing
                    style={{ overflow: "hidden" }}
                  >
                    <Box sx={{ px: { xs: 1, md: 2 }, pb: { xs: 4, md: 6 } }}>
                      <Grid container spacing={4} alignItems="flex-start">
                        {/* Left Side: Description */}
                        <Grid item xs={12} md={5}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 400,
                              color: "text.secondary",
                              lineHeight: 1.6,
                              maxWidth: "90%",
                            }}
                          >
                            {service.desc}
                          </Typography>
                        </Grid>

                        {/* Right Side: Skill Tags */}
                        <Grid item xs={12} md={7}>
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}
                          >
                            {service.skills.map((skill) => (
                              <Chip
                                key={skill}
                                label={skill}
                                variant="outlined"
                                sx={{
                                  borderRadius: "100px", // Pill-shaped
                                  px: 1,
                                  py: 2.5,
                                  fontSize: "0.85rem",
                                  fontWeight: 600,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.05em",
                                  borderColor: "divider",
                                  color: "text.primary",
                                  backgroundColor: "transparent",
                                }}
                              />
                            ))}
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
