"use client";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Box, Grid, Link, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { testimonialsData } from "@/data/testimonials";
import { useLanguageStore } from "@/store/languageStore";
import ParticleText from "../../app/extras/ParticleText";

const translations = {
  en: {
    sectionTitle: "TESTIMONIALS",
    projectLabel: "PROJECT",
    verifiedLabel: "VERIFIED",
  },
  bn: {
    sectionTitle: "প্রশংসাপত্র",
    projectLabel: "প্রকল্প",
    verifiedLabel: "যাচাইকৃত",
  },
};

export default function TestimonialsSection() {
  const theme = useTheme();
  const language = useLanguageStore((s) => s.language);
  const t = translations[language];
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const mainTextColor = theme.palette.text.primary;
  const gridLineColor = theme.palette.divider;

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
          text={t.sectionTitle}
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
        {testimonialsData.map((item) => (
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
                  backgroundColor: "action.hover",
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
                    color: "text.secondary",
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
                    {"// "}
                    {t.projectLabel}: {item.project}
                  </Link>

                  {item.verified && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        color: "primary.main",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      <VerifiedIcon sx={{ fontSize: 14 }} />
                      {t.verifiedLabel}
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
