"use client";

import React from "react";
import { Box, Typography, Link, Grid } from "@mui/material";
import FaqAccordion from "./FaqAccordion";
import { useLanguage } from "../../context/LanguageContext";

export default function FaqSection() {
  const { t } = useLanguage();
  return (
    <Box
      id="faq"
      component="section"
      sx={{
        // backgroundColor: "#EBEAE5", // Match the image beige background
        minHeight: "80vh",
        color: "#1a1a1a",
        // fontFamily: "system-ui, -apple-system, sans-serif",
        // backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`, // Noise background
        py: { xs: 8, md: 16 },
        px: { xs: 3, md: 8 },
        borderTop: "1px solid rgba(0,0,0,0.1)", // Top border for separation from previous section
      }}
    >
      <Grid container spacing={{ xs: 8, md: 4 }}>
        {/* Left Column: Title and Links */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ pr: { md: 4 } }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                lineHeight: 1.1,
                mb: 6,
              }}
            >
              {t.faq.header}
            </Typography>

            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                mb: 2,
              }}
            >
              {t.faq.subHeader}
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "rgba(0,0,0,0.6)",
                }}
              >
                {t.faq.questionPrompt}
              </Typography>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "#1a1a1a",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  "&:hover": { opacity: 0.7 },
                }}
              >
                {t.faq.bookCall}
              </Link>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "#1a1a1a",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  "&:hover": { opacity: 0.7 },
                }}
              >
                {t.faq.emailUs}
              </Link>
            </Box>
          </Box>
        </Grid>

        {/* Right Column: Accordion */}
        <Grid size={{ xs: 12, md: 7 }}>
          <FaqAccordion />
        </Grid>
      </Grid>
    </Box>
  );
}
