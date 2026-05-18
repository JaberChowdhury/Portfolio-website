"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
  IconButton,
  Paper,
  Grid, // Modern MUI v9 Grid
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import CodeIcon from "@mui/icons-material/Code";

// Ensure this path matches where you saved ParticleText.tsx
import ParticleText from "@/components/extras/ParticleText";

const projectData = [
  {
    title: "C++ Code Runner (Bun)",
    description:
      "A high-performance full-stack application utilizing the Bun runtime to instantly compile, execute, and stream execution logs for C++ code in real-time.",
    tech: ["Bun", "C++", "React", "TypeScript"],
    gradient: "linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)",
  },
  {
    title: "BU Routine Parser",
    description:
      "A web-based routine parser designed specifically for Bangladesh University schedules, simplifying class and time management with a modern UI.",
    tech: ["TypeScript", "React", "Material UI"],
    gradient: "linear-gradient(135deg, #db2777 0%, #f59e0b 100%)",
  },
  {
    title: "Fancy YT-DLP TUI",
    description:
      "A custom terminal-based YouTube downloader script featuring a beautiful Terminal User Interface (TUI) built with gum, Nerd Fonts, and yt-dlp.",
    tech: ["Bash", "yt-dlp", "Linux/Arch", "CLI"],
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  },
  {
    title: "Waydroid Gaming Subsystem",
    description:
      "Complex system configuration running ARM translation layers (libhoudini) on CachyOS to play mobile games natively with GPU acceleration on Intel hardware.",
    tech: ["Linux", "Waydroid", "Shell", "Systemd"],
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  },
  {
    title: "Obsidian Git Sync",
    description:
      "Seamless integration of Git version control into an Obsidian knowledge base for multi-device synchronization and secure backups.",
    tech: ["Git", "Obsidian", "Markdown"],
    gradient: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)",
  },
];

export default function ProjectsSection() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        py: { xs: 10, md: 15 },
        zIndex: 10,
      }}
    >
      <Container maxWidth="lg">
        {/* --- SECTION HEADER --- */}
        <Box sx={{ mb: { xs: 8, md: 12 }, position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: -6,
              position: "relative",
              zIndex: 2,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: "50px",
                backgroundColor: "background.paper",
                backdropFilter: "blur(8px)",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CodeIcon sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: "text.secondary",
                  letterSpacing: "0.05em",
                }}
              >
                SELECTED PROJECTS
              </Typography>
            </Paper>
          </Box>

          <Box
            sx={{
              width: "100%",
              height: { xs: "150px", sm: "200px", md: "250px" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.8,
            }}
          >
            <ParticleText
              text="WORK"
              canvasHeight={300}
              particleSize={0.2}
              hoverForceZ={3.0}
              explodeForceZ={10.0}
            />
          </Box>
        </Box>

        {/* --- PROJECT GRID --- */}
        <Grid container spacing={4}>
          {projectData.map((project, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 4,
                  backgroundColor: "background.paper",
                  backgroundImage: "none",
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: (theme) =>
                      theme.palette.mode === "dark"
                        ? "0 20px 40px rgba(0,0,0,0.5)"
                        : "0 20px 40px rgba(0,0,0,0.08)",
                    borderColor: "primary.main",
                  },
                }}
              >
                {/* Abstract Project Thumbnail */}
                <Box
                  sx={{
                    height: 140,
                    width: "100%",
                    background: project.gradient,
                    opacity: 0.9,
                    position: "relative",
                  }}
                />

                <CardContent sx={{ flexGrow: 1, p: 3, pb: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 800, mb: 1.5, letterSpacing: "-0.02em" }}
                  >
                    {project.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 3, lineHeight: 1.6 }}
                  >
                    {project.description}
                  </Typography>

                  {/* Tech Stack Chips */}
                  <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    sx={{ flexWrap: "wrap", mb: 2 }}
                  >
                    {project.tech.map((tech, i) => (
                      <Chip
                        key={i}
                        label={tech}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.7rem",
                          backgroundColor: "action.hover",
                          color: "text.primary",
                          borderRadius: "6px",
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      />
                    ))}
                  </Stack>
                </CardContent>

                <CardActions
                  sx={{ p: 3, pt: 0, justifyContent: "space-between" }}
                >
                  <Button
                    size="small"
                    endIcon={<LaunchIcon fontSize="small" />}
                    sx={{
                      fontWeight: 700,
                      color: "primary.main",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "action.hover" },
                    }}
                  >
                    View Project
                  </Button>
                  <IconButton
                    size="small"
                    sx={{
                      color: "text.secondary",
                      "&:hover": {
                        color: "text.primary",
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <GitHubIcon fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <Button
            variant="outlined"
            sx={{
              borderColor: "divider",
              color: "text.primary",
              px: 4,
              py: 1.5,
              borderRadius: "50px",
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": {
                borderColor: "primary.main",
                backgroundColor: "transparent",
                color: "primary.main",
              },
            }}
          >
            Explore all repositories
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
