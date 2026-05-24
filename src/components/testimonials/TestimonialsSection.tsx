"use client";
import React from "react";
import { Box, Typography, Grid, Link, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ParticleText from "../../app/extras/ParticleText";
import { useLanguage } from "../../context/LanguageContext";

export default function TestimonialsSection() {
  const theme = useTheme();
  const { t } = useLanguage();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const mainTextColor = "rgba(0, 0, 0, 0.85)";
  const gridLineColor = "rgba(0, 0, 0, 0.15)";

  return (
    <Box
      id="testimonials"
      component="section"
      sx={{
        py: { xs: 8, md: 16 },
        px: { xs: 2, md: 8 },
        color: mainTextColor,
      }}
    >
      {/* Section Header */}
      <Box
        sx={{
          mb: { xs: 6, md: 10 },
          height: { xs: "120px", md: "250px" },
          position: "relative",
        }}
      >
        <ParticleText
          text={t.testimonials.sectionTitle}
          canvasWidth={2500}
          colorStart={mainTextColor}
          colorEnd={mainTextColor}
          font={
            isMobile
              ? "900 60px Inter, sans-serif"
              : "900 160px Inter, sans-serif"
          }
          particleSize={0.4}
        />
      </Box>

      {/* Testimonials Grid */}
      <Grid container spacing={4}>
        {t.testimonials.items.map((item: any, index: number) => (
          <Grid size={{ xs: 12, md: 4 }} key={item.id}>
            <Box
              sx={{
                border: `1px solid ${gridLineColor}`,
                p: { xs: 4, md: 6 },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.02)",
                },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                  lineHeight: 1.4,
                  mb: 6,
                  fontStyle: "italic",
                }}
              >
                "{item.quote}"
              </Typography>

              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    mb: 0.5,
                  }}
                >
                  {item.clientName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(0,0,0,0.6)",
                    mb: 2,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontSize: "0.85rem",
                  }}
                >
                  {item.company}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Link
                    href="#works"
                    underline="hover"
                    sx={{
                      color: mainTextColor,
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    // PROJECT: {item.project}
                  </Link>

                  {item.verified && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        color: "#0077b5", // LinkedIn blue
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      VERIFIED
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
