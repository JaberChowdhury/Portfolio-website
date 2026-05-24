"use client";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLanguageStore } from "@/store/languageStore";
import ParticleText from "../../app/extras/ParticleText";
import PricingCard from "./PricingCard";

const translations = {
  en: {
    header: "PRICING",
    submitProject: {
      label: "SUBMIT YOUR PROJECT",
      prompt:
        "Flexible engagement model designed to accommodate a varying scale of ambition and complexity.",
      buttonText: "Book a call",
    },
    tiers: [
      {
        id: "hourly",
        title: "HOURLY SESSION",
        description:
          "Flexible engagement for specific tasks, consulting, audits, or rapid sprints.",
        buttonText: "Hire Me",
        variant: "light",
      },
      {
        id: "monthly",
        title: "MONTHLY RETAINER",
        description:
          "Dedicated design & engineering resources for continuous product evolution.",
        buttonText: "Hire Me",
        variant: "light",
      },
      {
        id: "project",
        title: "PROJECT BASED",
        hasBullet: true,
        description:
          "End-to-end execution. Full scope with defined deliverables and fixed timeline.",
        buttonText: "Hire Me",
        variant: "dark",
      },
    ],
    emailLink: "EMAIL ME",
  },
  bn: {
    header: "মূল্য তালিকা",
    submitProject: {
      label: "আপনার প্রজেক্ট জমা দিন",
      prompt: "বিভিন্ন মাত্রার উচ্চাকাঙ্ক্ষা এবং জটিলতার সাথে মানানসই একটি নমনীয় কাজের মডেল।",
      buttonText: "কল বুক করুন",
    },
    tiers: [
      {
        id: "hourly",
        title: "ঘণ্টাভিত্তিক সেশন",
        description: "নির্দিষ্ট কাজ, পরামর্শ, অডিট বা দ্রুত স্প্রিন্টের জন্য নমনীয় চুক্তি।",
        buttonText: "নিয়োগ দিন",
        variant: "light",
      },
      {
        id: "monthly",
        title: "মাসিক রিটেইনার",
        description:
          "ক্রমাগত পণ্য বিকাশের জন্য ডেডিকেটেড ডিজাইন এবং ইঞ্জিনিয়ারিং রিসোর্স।",
        buttonText: "নিয়োগ দিন",
        variant: "light",
      },
      {
        id: "project",
        title: "প্রকল্প ভিত্তিক",
        hasBullet: true,
        description:
          "শুরু থেকে শেষ পর্যন্ত বাস্তবায়ন। নির্দিষ্ট টাইমলাইন ও ডেলিভারেবলের সাথে সম্পূর্ণ স্কোপ।",
        buttonText: "নিয়োগ দিন",
        variant: "dark",
      },
    ],
    emailLink: "ইমেইল করুন",
  },
};

// Main Pricing Page Component
const PricingSection = () => {
  const theme = useTheme();
  const language = useLanguageStore((s) => s.language);
  const pricingData = translations[language];
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const mainTextColor = theme.palette.text.primary;
  return (
    <Box
      id="pricing"
      sx={{
        minHeight: "100vh",
        color: "text.primary",
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
              backgroundColor: "text.primary",
              color: "background.default",
              borderRadius: 1,
              px: 3,
              py: 1.5,
              fontSize: "1rem",
              textTransform: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              "&:hover": { opacity: 0.85 },
            }}
          >
            {/* User-specified case and singular context */}
            {pricingData.submitProject.buttonText}
            {/* MUI icon for external link */}
            <ArrowOutwardIcon sx={{ fontSize: "1.1rem" }} />
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
              color: "var(--mui-palette-text-secondary)",
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
