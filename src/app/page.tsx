"use client";

import React from "react";
import ParticleText from "@/components/extras/ParticleText";
import {
  Box,
  Typography,
  Button,
  Stack,
  Container,
  Paper,
  keyframes,
} from "@mui/material";

// Icons
import GitHubIcon from "@mui/icons-material/GitHub";
import TerminalIcon from "@mui/icons-material/Terminal";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ProjectsSection from "@/components/sections/Home/ProjectsSection";

// Animations
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
`;

const marquee = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
`;

// Helper for floating cards
const FloatingCard = ({
  icon,
  title,
  subtitle,
  delay,
  top,
  left,
  right,
  bottom,
}: any) => (
  <Paper
    elevation={0}
    sx={{
      position: "absolute",
      top,
      left,
      right,
      bottom,
      display: { xs: "none", lg: "flex" },
      alignItems: "center",
      gap: 2,
      p: 2,
      borderRadius: 4,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(0,0,0,0.05)",
      boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
      animation: `${float} 6s ease-in-out infinite`,
      animationDelay: delay,
      zIndex: 20,
    }}
  >
    <Box
      sx={{
        bgcolor: "#7c3aed",
        color: "white",
        p: 1,
        borderRadius: 2,
        display: "flex",
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 700, color: "#111" }}>
        {title}
      </Typography>
      <Typography variant="caption" sx={{ color: "#6b7280", fontWeight: 500 }}>
        {subtitle}
      </Typography>
    </Box>
  </Paper>
);

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        marginTop: "100px",
      }}
    >
      {/* Main Content Wrapper */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          pt: { xs: 8, md: 0 },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10 }}>
          {/* Informational Floating Cards to fill empty space */}
          <FloatingCard
            top="15%"
            left="2%"
            icon={<CodeIcon fontSize="small" />}
            title="Full-Stack Dev"
            subtitle="Next.js & React"
            delay="0s"
          />
          <FloatingCard
            bottom="25%"
            right="5%"
            icon={<StorageIcon fontSize="small" />}
            title="Systems & C++"
            subtitle="Linux Enthusiast"
            delay="1.5s"
          />

          <Stack spacing={0} sx={{ alignItems: "center", textAlign: "center" }}>
            {/* 1. Greeting Badge */}
            <Paper
              elevation={0}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: "50px",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(124, 58, 237, 0.2)",
                mb: -2,
              }}
            >
              <AutoAwesomeIcon sx={{ fontSize: 16, color: "#7c3aed" }} />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: "#7c3aed",
                  letterSpacing: "0.05em",
                }}
              >
                HI THERE, I AM
              </Typography>
            </Paper>

            {/* 2. Interactive Name (Updated to fit Light Mode) */}
            <Box
              sx={{
                width: "100%",
                height: { xs: "250px", sm: "350px", md: "450px" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // Subtle shadow behind the canvas to make it pop on white
                filter: "drop-shadow(0px 20px 40px rgba(124, 58, 237, 0.15))",
              }}
            >
              <ParticleText
                text="JABER"
                canvasWidth={1134}
                canvasHeight={94}
                // colorStart="#7c3aed" // Deep Purple
                // colorEnd="#db2777" // Pink
                // particleSize={0.25}
                // hoverForceZ={2.0}
                // explodeForceZ={8.0}
              />
            </Box>

            {/* 3. Subtitle & Bio */}
            <Box sx={{ mt: -6, maxWidth: "600px", px: 2 }}>
              <Box sx={{ display: "inline-flex", alignItems: "center", mb: 2 }}>
                <TerminalIcon
                  sx={{ color: "#4b5563", mr: 1.5, fontSize: 32 }}
                />
                <Typography
                  variant="h4"
                  sx={{
                    color: "#111827",
                    fontWeight: 800,
                    fontSize: { xs: "1.75rem", md: "2.5rem" },
                    letterSpacing: "-0.02em",
                  }}
                >
                  I build things for the web
                </Typography>
                {/* Blinking Cursor */}
                <Box
                  sx={{
                    width: { xs: 12, md: 16 },
                    height: { xs: 32, md: 44 },
                    backgroundColor: "#7c3aed",
                    ml: 1.5,
                    animation: `${blink} 1s step-end infinite`,
                  }}
                />
              </Box>

              {/* Short Bio to add information density */}
              <Typography
                variant="body1"
                sx={{
                  color: "#4b5563",
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                  fontWeight: 500,
                }}
              >
                I am a developer specializing in modern front-end architectures,
                high-performance backends, and system-level programming.
              </Typography>
            </Box>

            {/* 4. Action Buttons */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              sx={{ mt: 6 }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#111827",
                  color: "#fff",
                  px: 5,
                  py: 1.5,
                  borderRadius: "50px",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor: "#000",
                    transform: "translateY(-2px)",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                View My Projects
              </Button>

              <Button
                variant="outlined"
                startIcon={<GitHubIcon />}
                sx={{
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  color: "#374151",
                  backgroundColor: "rgba(255,255,255,0.5)",
                  px: 4,
                  py: 1.5,
                  borderRadius: "50px",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  backdropFilter: "blur(10px)",
                  "&:hover": {
                    borderColor: "#7c3aed",
                    backgroundColor: "white",
                    color: "#7c3aed",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                GitHub Profile
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* 5. Infinite Tech Stack Ticker (Fills the bottom empty space) */}
      <Box
        sx={{
          width: "100%",
          borderTop: "1px solid rgba(0,0,0,0.05)",
          // bgcolor: "rgba(255,255,255,0.4)",
          py: 3,
          mt: 8,
          overflow: "hidden",
          border: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "max-content",
            animation: `${marquee} 30s linear infinite`,
          }}
        >
          <Stack direction="row" spacing={8} sx={{ px: 4 }}>
            {/* Duplicated list for seamless looping */}
            {[
              "Next.js",
              "React 19",
              "TypeScript",
              "Material UI",
              "Three.js",
              "Bun Runtime",
              "C++",
              "Linux/Arch",
              "Next.js",
              "React 19",
              "TypeScript",
              "Material UI",
              "Three.js",
              "Bun Runtime",
              "C++",
              "Linux/Arch",
              "Next.js",
              "React 19",
              "TypeScript",
              "Material UI",
              "Three.js",
              "WebGPU",
              "Bun Runtime",
              "Vite",
              "C++",
              "Bash / Shell",
              "Arch Linux",
              "Alpine Linux",
              "Waydroid",
              "Git",

              // --- Duplicated Set (for the seamless infinite marquee loop) ---
              "Next.js",
              "React 19",
              "TypeScript",
              "Material UI",
              "Three.js",
              "WebGPU",
              "Bun Runtime",
              "Vite",
              "C++",
              "Bash / Shell",
              "Arch Linux",
              "Alpine Linux",
              "Waydroid",
              "Git",
            ].map((tech, i) => (
              <Typography
                key={i}
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {tech}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Box>
      <ProjectsSection />
    </Box>
  );
}
