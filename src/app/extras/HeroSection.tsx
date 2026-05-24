"use client";

import AppsIcon from "@mui/icons-material/Apps"; // Placeholder for the Diamond Clarity icon
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// Icons
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BarChartIcon from "@mui/icons-material/BarChart";
import CallMadeIcon from "@mui/icons-material/CallMade";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import {
  Box,
  Button,
  Container,
  keyframes,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import type React from "react";

// 1. Define Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(124, 58, 237, 0); }
  100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); }
`;

// 2. Helper Component for Floating Feature Cards
const FloatingFeature = ({
  top,
  left,
  right,
  bottom,
  icon,
  text,
  delay,
}: {
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  icon: React.ReactNode;
  text: string;
  delay: string;
}) => (
  <Box
    sx={{
      position: "absolute",
      top,
      left,
      right,
      bottom,
      animation: `${float} 5s ease-in-out infinite`,
      animationDelay: delay,
      display: { xs: "none", lg: "flex" },
      alignItems: "center",
      gap: 1.5,
      maxWidth: 220,
      zIndex: 10,
    }}
  >
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 4,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#111",
        transition: "transform 0.3s ease",
        "&:hover": { transform: "scale(1.05) rotate(-2deg)" },
      }}
    >
      {icon}
    </Paper>
    <Typography
      variant="caption"
      sx={{
        fontWeight: 500,
        color: "#4b5563",
        lineHeight: 1.3,
        fontSize: "0.75rem",
      }}
    >
      • {text}
    </Typography>
  </Box>
);

// 3. Main Component
export default function CorelyHero() {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "#fdfcfb",
        // Complex gradient + dotted mesh background
        backgroundImage: `
          radial-gradient(circle at 15% 75%, rgba(216, 180, 254, 0.4) 0%, transparent 40%),
          radial-gradient(circle at 85% 25%, rgba(255, 218, 185, 0.5) 0%, transparent 40%),
          radial-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 100% 100%, 20px 20px",
        backgroundPosition: "0 0, 0 0, -10px -10px",
        display: "flex",
        flexDirection: "column",
        fontFamily:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* --- NAVBAR --- */}
      <Box
        sx={{
          px: { xs: 2, md: 6 },
          py: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 20,
        }}
      >
        {/* Logo */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center", cursor: "pointer" }}
        >
          <Box
            sx={{
              bgcolor: "#7c3aed",
              color: "white",
              p: 0.5,
              borderRadius: 1.5,
              display: "flex",
            }}
          >
            <AutoAwesomeIcon fontSize="small" />
          </Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, letterSpacing: "-0.05em", color: "#111" }}
          >
            CORELY
          </Typography>
        </Stack>

        {/* Center Nav (Hidden on Mobile) */}
        <Paper
          elevation={0}
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 4,
            px: 4,
            py: 1.5,
            borderRadius: "50px",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.8)",
          }}
        >
          {["About Us", "Features", "For Partners"].map((item) => (
            <Typography
              key={item}
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#374151",
                cursor: "pointer",
                "&:hover": { color: "#7c3aed" },
              }}
            >
              {item}
            </Typography>
          ))}
        </Paper>

        {/* Right Nav */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", cursor: "pointer" }}
        >
          <Paper
            elevation={0}
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 3,
              px: 3,
              py: 1.5,
              borderRadius: "50px",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "#374151", cursor: "pointer" }}
            >
              For HR
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "#374151", cursor: "pointer" }}
            >
              For Employee
            </Typography>
          </Paper>
          <Button
            variant="contained"
            disableElevation
            sx={{
              bgcolor: "#1f2937",
              color: "white",
              borderRadius: "50px",
              px: 3,
              py: 1.5,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { bgcolor: "#000" },
            }}
          >
            Book a Demo {">"}
          </Button>
        </Stack>
      </Box>

      {/* --- HERO CONTENT --- */}
      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          mt: { xs: 8, md: 0 },
        }}
      >
        {/* Floating Elements */}
        <FloatingFeature
          top="15%"
          left="5%"
          icon={<ShowChartIcon />}
          text="Track employee engagement in real time"
          delay="0s"
        />
        <FloatingFeature
          top="20%"
          right="5%"
          icon={<BarChartIcon />}
          text="Understand team dynamics"
          delay="1.5s"
        />
        <FloatingFeature
          bottom="25%"
          left="8%"
          icon={<NotificationsActiveIcon />}
          text="Identify burnout and stress risks early"
          delay="3s"
        />
        <FloatingFeature
          bottom="20%"
          right="8%"
          icon={<EmojiObjectsIcon />}
          text="Measure focus, energy, and productivity trends"
          delay="0.8s"
        />

        {/* Top Badge */}
        <Paper
          elevation={0}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 1,
            borderRadius: "50px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(124, 58, 237, 0.2)",
            mb: 4,
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 16, color: "#7c3aed" }} />
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              color: "#7c3aed",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            AI-powered HR insights
          </Typography>
        </Paper>

        {/* Main Headline */}
        <Typography
          variant="h1"
          sx={{
            fontWeight: 500,
            fontSize: { xs: "3rem", md: "5rem", lg: "5.5rem" },
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            color: "#111",
            mb: 3,
            maxWidth: "900px",
          }}
        >
          Understand your people.
          <br />
          Lead with
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "white",
              borderRadius: 4,
              p: { xs: 1, md: 1.5 },
              boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
              mx: 2,
              verticalAlign: "middle",
              transform: "translateY(-4px)",
            }}
          >
            <AppsIcon sx={{ color: "#111", fontSize: { xs: 24, md: 40 } }} />
          </Box>
          clarity.
        </Typography>

        {/* Subheadline */}
        <Typography
          variant="h6"
          sx={{
            color: "#6b7280",
            fontWeight: 400,
            maxWidth: "600px",
            mb: 6,
            fontSize: { xs: "1rem", md: "1.125rem" },
            lineHeight: 1.6,
          }}
        >
          Discover engagement levels, burnout risks, team dynamics, and hidden
          patterns across your workforce.
        </Typography>

        {/* CTA Buttons */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ position: "relative", zIndex: 20 }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#7c3aed",
              color: "white",
              borderRadius: "50px",
              pl: 4,
              pr: 2,
              py: 1.5,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              display: "flex",
              gap: 2,
              animation: `${pulseGlow} 3s infinite`,
              "&:hover": { bgcolor: "#6d28d9", transform: "translateY(-2px)" },
              transition: "all 0.2s ease",
            }}
          >
            Request a Demo
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 0.5,
              }}
            >
              <PlayArrowIcon sx={{ color: "#7c3aed", fontSize: 20 }} />
            </Box>
          </Button>

          <Button
            variant="outlined"
            sx={{
              bgcolor: "white",
              color: "#111",
              borderColor: "transparent",
              borderRadius: "50px",
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
              "&:hover": {
                bgcolor: "#f9fafb",
                borderColor: "#e5e7eb",
                transform: "translateY(-2px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Explore platform
          </Button>
        </Stack>
      </Container>

      {/* --- BOTTOM SECTION --- */}
      <Box
        sx={{
          mt: "auto",
          px: { xs: 2, md: 6 },
          pb: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 4,
          zIndex: 20,
        }}
      >
        {/* Scroll Indicator */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", cursor: "pointer" }}
        >
          <Box
            sx={{
              bgcolor: "#111",
              color: "white",
              borderRadius: "50%",
              p: 1,
              display: "flex",
            }}
          >
            <ArrowDownwardIcon fontSize="small" />
          </Box>
          <Paper
            elevation={0}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: "50px",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.8)",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "#374151" }}
            >
              Scroll To Discover The Platform
            </Typography>
          </Paper>
        </Stack>

        {/* Logos (Using Typography to simulate the image logos to keep it single-component clean) */}
        <Stack
          direction="row"
          spacing={{ xs: 3, md: 5 }}
          sx={{
            opacity: 0.6,
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, letterSpacing: "-1px" }}
          >
            # slack
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#464EB8" }}>
            Teams
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#0052CC" }}>
            Trello
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#0052CC" }}>
            Jira
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, fontFamily: "serif" }}
          >
            N
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            monday.com
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 500, letterSpacing: "1px" }}
          >
            asana
          </Typography>
        </Stack>

        {/* Stats */}
        <Stack direction="row" spacing={3}>
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "#6b7280", fontWeight: 600, display: "block" }}
            >
              HR Teams
              <br />
              Onboarded
            </Typography>
            <Paper
              elevation={0}
              sx={{
                bgcolor: "#ebdcf9",
                color: "#7c3aed",
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                mt: 0.5,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 800 }}>
                1.5K
              </Typography>
              <CallMadeIcon sx={{ fontSize: 14 }} />
            </Paper>
          </Box>
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "#6b7280", fontWeight: 600, display: "block" }}
            >
              Employees
              <br />
              Analyzed
            </Typography>
            <Paper
              elevation={0}
              sx={{
                bgcolor: "#ebdcf9",
                color: "#7c3aed",
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                mt: 0.5,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 800 }}>
                1.3K
              </Typography>
              <CallMadeIcon sx={{ fontSize: 14 }} />
            </Paper>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
