"use client";

import { Box, Grid, Link, Typography } from "@mui/material";
import { useLanguageStore } from "@/store/languageStore";
import FaqAccordion from "./FaqAccordion";

const translations = {
  en: {
    header: "ANSWER TO YOUR QUESTIONS",
    subHeader:
      "HOWEVER, WE RECOMMEND REACHING OUT TO US IF YOU HAVE ANY QUESTIONS.",
    questionPrompt: "Any question about the pricing?",
    bookCall: "Book a call",
    emailUs: "Email Us",
  },
  bn: {
    header: "আপনার প্রশ্নগুলোর উত্তর",
    subHeader:
      "যাইহোক, আপনার যদি কোন প্রশ্ন থাকে তবে আমরা আমাদের সাথে যোগাযোগ করার পরামর্শ দিচ্ছি।",
    questionPrompt: "মূল্য তালিকা সম্পর্কে কোন প্রশ্ন আছে?",
    bookCall: "কল বুক করুন",
    emailUs: "আমাদের ইমেইল করুন",
  },
};

export default function FaqSection() {
  const language = useLanguageStore((s) => s.language);
  const t = translations[language];
  return (
    <Box
      id="faq"
      component="section"
      sx={{
        minHeight: "80vh",
        color: "text.primary",
        py: { xs: 8, md: 16 },
        px: { xs: 3, md: 8 },
        borderTop: "1px solid",
        borderColor: "divider",
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
              {t.header}
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
              {t.subHeader}
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
                  color: "text.secondary",
                }}
              >
                {t.questionPrompt}
              </Typography>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "text.primary",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  "&:hover": { opacity: 0.7 },
                }}
              >
                {t.bookCall}
              </Link>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "text.primary",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  "&:hover": { opacity: 0.7 },
                }}
              >
                {t.emailUs}
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
