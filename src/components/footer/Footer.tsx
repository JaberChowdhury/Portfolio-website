"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  Link,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { useColorScheme, useTheme } from "@mui/material/styles";
import ParticleText from "@/app/extras/ParticleText";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { mode } = useColorScheme();
  const theme = useTheme();
  const { t, language } = useLanguage();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Determine if we are in light mode (defaulting to light if not explicitly dark)
  const isLightMode = mode === "light" || mode === "system" || !mode;

  // Inverse Theme Logic
  // When the site is light, the footer is dark. When the site is dark, the footer is light.
  const bgColor = isLightMode ? "#3B3A36" : "#EBEAE5"; // Deep grey-brown for dark mode, beige for light mode
  const textColor = isLightMode ? "#EBEAE5" : "#1a1a1a";
  const dividerColor = isLightMode
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(0, 0, 0, 0.08)";
  const secondaryTextColor = isLightMode
    ? "rgba(235, 234, 229, 0.5)"
    : "rgba(26, 26, 26, 0.5)";

  return (
    <Box
      id="contact"
      component="footer"
      sx={{
        backgroundColor: bgColor,
        color: textColor,
        pt: { xs: 10, md: 16 },
        pb: { xs: 4, md: 6 },
        px: { xs: 3, md: 8 },
        backgroundImage: `
          linear-gradient(${dividerColor} 1px, transparent 1px),
          linear-gradient(90deg, ${dividerColor} 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <Grid container spacing={{ xs: 8, md: 4 }}>
        {/* Left Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box>
              {/* Logo */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: { xs: 6, md: 10 },
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: "16px" }}
                >
                  <path d="M4 10H14V13H4V10Z" />
                  <path d="M10 15H20V18H10V15Z" />
                </svg>
                <Typography
                  sx={{
                    fontWeight: 800,
                    textTransform: "uppercase",
                    lineHeight: 1.1,
                    letterSpacing: "0.02em",
                  }}
                >
                  {t.footer.logoText1}
                  <br />
                  {t.footer.logoText2}
                </Typography>
              </Box>

              <Box
                sx={{
                  mb: 1,
                  height: { xs: "80px", md: "120px" },
                  position: "relative",
                  left: {
                    xs: "-60px",
                    md: language == "en" ? "-170px" : "-120px",
                  },
                }}
              >
                {language == "en" ? (
                  <ParticleText
                    text={
                      t.footer.collaborate[0] + " " + t.footer.collaborate[1]
                    }
                    canvasWidth={isMobile ? 1200 : 3800}
                    canvasHeight={isMobile ? 400 : 1000}
                    colorStart={textColor}
                    colorEnd={textColor}
                    font={
                      isMobile
                        ? "400 120px Georgia, serif"
                        : "400 500px Georgia, serif"
                    }
                    particleSize={isMobile ? 0.4 : 0.84}
                  />
                ) : (
                  <ParticleText
                    text={
                      t.footer.collaborate[0] + " " + t.footer.collaborate[1]
                    }
                    canvasWidth={isMobile ? 2200 : 4800}
                    canvasHeight={isMobile ? 400 : 1000}
                    colorStart={textColor}
                    colorEnd={textColor}
                    font={
                      isMobile
                        ? "400 220px Georgia, serif"
                        : "400 400px Georgia, serif"
                    }
                    particleSize={isMobile ? 0.4 : 0.84}
                  />
                )}
              </Box>

              <Typography
                sx={{
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  mb: 6,
                  opacity: 0.9,
                  letterSpacing: "-0.01em",
                }}
              >
                jaberhc2002@gmail.com
              </Typography>

              <Button
                variant="outlined"
                sx={{
                  borderColor: dividerColor,
                  color: textColor,
                  borderRadius: 0,
                  px: 4,
                  py: 1.5,
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  border: "1px solid white",
                  fontWeight: 700,
                  width: "fit-content",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: textColor,
                    color: bgColor,
                    borderColor: textColor,
                  },
                }}
              >
                {t.footer.viewProposal}
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Right Section */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: { xs: "flex-start", md: "flex-end" },
            pb: { xs: 4, md: 10 },
          }}
        >
          <Grid
            container
            spacing={{ xs: 4, sm: 2 }}
            sx={{ width: "100%", maxWidth: "500px" }}
          >
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography
                sx={{
                  color: secondaryTextColor,
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  mb: 2,
                  fontFamily: "monospace",
                }}
              >
                {t.footer.locationLabel}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  lineHeight: 1.6,
                }}
              >
                {t.footer.locationText1}
                <br />
                {t.footer.locationText2}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography
                sx={{
                  color: secondaryTextColor,
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  mb: 2,
                  fontFamily: "monospace",
                }}
              >
                {t.footer.socialLabel}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Link
                  href="#"
                  underline="none"
                  sx={{
                    color: textColor,
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    "&:hover": { opacity: 0.7 },
                  }}
                >
                  BEHANCE{" "}
                  <span style={{ fontSize: "1rem", fontWeight: 400 }}>↗</span>
                </Link>
                <Link
                  href="#"
                  underline="none"
                  sx={{
                    color: textColor,
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    "&:hover": { opacity: 0.7 },
                  }}
                >
                  INSTAGRAM{" "}
                  <span style={{ fontSize: "1rem", fontWeight: 400 }}>↗</span>
                </Link>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography
                sx={{
                  color: secondaryTextColor,
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  mb: 2,
                  fontFamily: "monospace",
                }}
              >
                {t.footer.hoursLabel}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  lineHeight: 1.6,
                }}
              >
                {t.footer.hoursText1}
                <br />
                {t.footer.hoursText2}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Bottom Copyright Text */}
      <Box sx={{ mt: { xs: 8, md: 4 } }}>
        <Typography
          sx={{
            color: secondaryTextColor,
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontFamily: "monospace",
          }}
        >
          {t.footer.copyright}
        </Typography>
      </Box>
    </Box>
  );
}
