"use client";
import React from "react";
import PricingCard from "./PricingCard";
import ParticleText from "../../app/extras/ParticleText";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "@mui/material/styles";

// Main Pricing Page Component
const PricingSection = () => {
  const theme = useTheme();
  const { t } = useLanguage();
  const pricingData = t.pricing;
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const mainTextColor = "rgba(0, 0, 0, 0.85)";
  return (
    <Box
      id="pricing"
      sx={{
        minHeight: "100vh",
        color: "#1a1a1a",
      }}
    >
      <Box
        component="section"
        sx={{ py: { xs: 8, md: 16 }, px: { xs: 3, md: 8 } }}
      >
        <Box
          sx={{
            mb: { xs: 6, md: 10 },
            height: { xs: "120px", md: "250px" },
            position: "relative",
          }}
        >
          <ParticleText
            text={pricingData.header}
            colorStart={mainTextColor}
            colorEnd={mainTextColor}
            font={
              isMobile
                ? "900 100px Inter, sans-serif"
                : "900 200px Inter, sans-serif"
            }
            particleSize={0.4}
          />
        </Box>

        {/* Submit Project text block */}
        <Box sx={{ maxWidth: "720px", mb: { xs: 6, md: 10 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: "1.1rem",
              fontWeight: 900,
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            {pricingData.submitProject.label}
          </Typography>
          <Typography
            sx={{
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              mb: 4,
              lineHeight: 1.3,
            }}
          >
            {pricingData.submitProject.prompt}
          </Typography>
          {/* Book a call button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1a1a1a", // Black background for a strong CTA
              color: "#fff",
              borderRadius: 1,
              px: 3,
              py: 1.5,
              fontSize: "1rem",
              textTransform: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            {/* User-specified case and singular context */}
            {pricingData.submitProject.buttonText}
            {/* Placeholder icon for external link */}
            <Box
              component="span"
              sx={{
                fontSize: "1.2rem",
                display: "flex",
                transform: "rotate(-45deg)",
              }}
            >
              ↗
            </Box>
          </Button>
        </Box>

        {/* Pricing Tiers Grid - Exact three-block layout */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "repeat(3, 1fr)" },
            gap: 4,
            mb: 10,
          }}
        >
          {pricingData.tiers.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              isLight={tier.variant === "light"}
            />
          ))}
        </Box>

        {/* EMAIL US link at bottom right */}
        <Box sx={{ textAlign: "right" }}>
          <a
            href="mailto:your_email@example.com"
            style={{
              textDecoration: "none",
              color: "#666",
              fontSize: "14px",
              textTransform: "uppercase",
            }}
          >
            {pricingData.emailLink}
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default PricingSection;
