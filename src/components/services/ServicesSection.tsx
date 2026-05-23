"use client";

import React, { useState, useRef } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { useTheme } from "@mui/system";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { projectsData } from "./servicesData";
import ServiceCard from "./ServiceCard";

export default function WorksSection() {
  const theme = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track scroll position to update active index dynamically
  const { scrollXProgress } = useScroll({ container: scrollRef });

  useMotionValueEvent(scrollXProgress, "change", (latest) => {
    // Map scroll progress to project index
    const index = Math.round(latest * (projectsData.length - 1));
    if (index !== activeIndex) setActiveIndex(index);
  });

  const activeProject = projectsData[activeIndex];

  return (
    <Box
      component="section"
      sx={{
        py: 12,
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: theme.palette.background.default,
      }}
    >
      {/* Blueprint Header */}
      <Box
        sx={{
          px: { xs: 2, md: 8 },
          mb: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontWeight: 800, textTransform: "uppercase" }}
        >
          WORKS
        </Typography>
        <Typography variant="caption" sx={{ letterSpacing: "0.2em" }}>
          // INTERACTIVE_ARCHIVE_2026
        </Typography>
      </Box>

      {/* Draggable/Scrollable Track */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          gap: 4,
          px: "40vw",
          py: 4,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {projectsData.map((project, index) => (
          <ServiceCard
            key={project.id}
            project={project}
            index={index}
            activeIndex={activeIndex}
            onClick={() => {
              // Smooth scroll to element if clicked
              scrollRef.current?.scrollTo({
                left: index * 480,
                behavior: "smooth",
              });
            }}
          />
        ))}
      </Box>

      {/* Information Blueprint Grid */}
      <Box sx={{ px: { xs: 2, md: 8 }, mt: 8 }}>
        <Box
          sx={{
            border: "1px solid",
            borderColor: "divider",
            p: 4,
            bgcolor: "background.paper",
          }}
        >
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              <Box sx={{ flex: "1 1 400px" }}>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 800, mb: 3, textTransform: "uppercase" }}
                >
                  {activeProject.title}
                </Typography>
                <Typography variant="body1" sx={{ maxWidth: "600px", mb: 4 }}>
                  {activeProject.desc}
                </Typography>
                <Stack direction="row" spacing={4}>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", display: "block" }}
                    >
                      // CLIENT
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {activeProject.client}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", display: "block" }}
                    >
                      // SERVICES
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {activeProject.services}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              <Box
                sx={{
                  flex: "0 0 auto",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: { xs: "flex-start", md: "flex-end" },
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: 0,
                    px: 6,
                    py: 2,
                    borderColor: "text.primary",
                  }}
                >
                  VIEW CASE STUDY
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
}
