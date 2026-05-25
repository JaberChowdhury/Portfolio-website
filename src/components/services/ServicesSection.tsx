"use client";

import PaletteIcon from "@mui/icons-material/Palette";
import TerminalIcon from "@mui/icons-material/Terminal";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import WebIcon from "@mui/icons-material/Web";
import {
  Box,
  Button,
  Grid,
  Link,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { servicesData } from "@/data/services";
import { useLanguageStore } from "@/store/languageStore";
import ParticleText from "../../app/extras/ParticleText";

const translations = {
  en: {
    sectionTitle: "SERVICES",
    projectsLabel: "// PROJECTS",
    exploreMore: "EXPLORE MORE",
  },
  bn: {
    sectionTitle: "সেবাসমূহ",
    projectsLabel: "// প্রকল্পসমূহ",
    exploreMore: "আরও এক্সপ্লোর করুন",
  },
};

const serviceIcons: { [key: string]: React.ReactNode } = {
  "01": <PaletteIcon />,
  "02": <WebIcon />,
  "03": <ViewInArIcon />,
  "04": <TerminalIcon />,
};

export default function ServicesSection() {
  const theme = useTheme();
  const language = useLanguageStore((s) => s.language);
  const t = translations[language];

  const SERVICES = servicesData.map((s) => ({
    id: s.id,
    title: s.title[language],
    headline: s.headline[language],
    desc: s.desc[language],
    skills: s.skills[language],
  }));

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [expandedId, setExpandedId] = useState<string>("03");

  const mainTextColor = "var(--mui-palette-text-primary)";
  const expandedBgColor = "var(--mui-palette-text-primary)";
  const expandedTextColor = "var(--mui-palette-background-default)";
  const paragraphTextColor =
    "rgba(var(--mui-palette-background-defaultChannel) / 0.72)";
  const skillsTextColor =
    "rgba(var(--mui-palette-background-defaultChannel) / 0.55)";

  return (
    <Box
      id="services"
      component="section"
      sx={{
        py: { xs: 8, md: 16 },
        px: { xs: 2, md: 8 },
        // backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
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
          colorStart={mainTextColor}
          colorEnd={mainTextColor}
          canvasWidth={isMobile ? 2200 : 3200}
          font={
            isMobile
              ? "900 300px Inter, sans-serif"
              : "900 300px Inter, sans-serif"
          }
          particleSize={0.4}
        />
      </Box>

      {/* Main Service List Container */}
      <Box sx={{ borderTop: "1px solid", borderColor: "divider" }}>
        {SERVICES.map((service) => {
          const isExpanded = expandedId === service.id;
          const numId = service.id.replace("0", ""); // "1", "2", "3", "4"

          return (
            <motion.div
              key={service.id}
              layout
              onMouseEnter={() => setExpandedId(service.id)}
              style={{
                borderBottom: "1px solid",
                borderColor: isExpanded
                  ? "transparent"
                  : "var(--mui-palette-divider)",
                position: "relative",
                cursor: "pointer",
                overflow: "hidden", // Ensures background doesn't leak during animation
              }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            >
              {/* Dark Background Animation */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: expandedBgColor,
                      zIndex: 0,
                    }}
                  />
                )}
              </AnimatePresence>

              <Box
                sx={{ position: "relative", zIndex: 1, px: { xs: 2, md: 4 } }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {isExpanded ? (
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <Box sx={{ py: { xs: 5, md: 8 } }}>
                        <Grid container spacing={4}>
                          {/* Left Column */}
                          <Grid
                            size={{ xs: 12, md: 3 }}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                gap: 1.5,
                                alignItems: "center",
                                color: paragraphTextColor,
                                mb: { xs: 4, md: 0 },
                              }}
                            >
                              {serviceIcons[service.id]}
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 400,
                                  textTransform: "uppercase",
                                  fontSize: "0.95rem",
                                  letterSpacing: "0.05em",
                                }}
                              >
                                {service.title}
                              </Typography>
                            </Box>
                            <Box sx={{ mt: { xs: 2, md: "auto" } }}>
                              <Typography
                                variant="h1"
                                sx={{
                                  fontWeight: 400,
                                  color: expandedTextColor,
                                  fontSize: "clamp(3rem, 5vw, 4.5rem)",
                                  letterSpacing: "0.2em",
                                  lineHeight: 1,
                                }}
                              >
                                0 0 {numId}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: skillsTextColor,
                                  letterSpacing: "0.2em",
                                  mt: 1,
                                }}
                              >
                                {t.projectsLabel}
                              </Typography>
                            </Box>
                          </Grid>

                          {/* Middle Column */}
                          <Grid size={{ xs: 12, md: 7 }}>
                            <Typography
                              variant="h4"
                              sx={{
                                fontWeight: 800,
                                textTransform: "uppercase",
                                color: expandedTextColor,
                                fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
                                lineHeight: 1.3,
                                mb: 3,
                                maxWidth: "90%",
                              }}
                            >
                              {service.headline}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                color: paragraphTextColor,
                                fontSize: "clamp(0.9rem, 1.1vw, 1.1rem)",
                                lineHeight: 1.6,
                                mb: 4,
                                maxWidth: "85%",
                              }}
                            >
                              {service.desc}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1.5,
                                color: skillsTextColor,
                              }}
                            >
                              {service.skills.map((skill, index) => (
                                <React.Fragment key={skill}>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontSize: "0.8rem",
                                      letterSpacing: "0.05em",
                                    }}
                                  >
                                    {skill}
                                  </Typography>
                                  {index < service.skills.length - 1 && (
                                    <Typography
                                      variant="body2"
                                      sx={{ fontSize: "0.8rem" }}
                                    >
                                      /
                                    </Typography>
                                  )}
                                </React.Fragment>
                              ))}
                            </Box>
                          </Grid>

                          {/* Right Column */}
                          <Grid
                            size={{ xs: 12, md: 2 }}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: { xs: "flex-start", md: "flex-end" },
                              justifyContent: "space-between",
                              mt: { xs: 4, md: 0 },
                            }}
                          >
                            <Button
                              LinkComponent={Link}
                              href="/"
                              // underline="none"
                              sx={{
                                color: expandedTextColor,
                                fontWeight: 600,
                                fontSize: "0.85rem",
                                letterSpacing: "0.05em",
                                transition: "opacity 0.2s",
                                "&:hover": { opacity: 0.7 },
                              }}
                            >
                              {t.exploreMore}
                            </Button>
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                backgroundColor:
                                  "rgba(var(--mui-palette-background-defaultChannel) / 0.3)",
                                mt: { xs: 2, md: "auto" },
                                mb: { md: 6 },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box
                        sx={{
                          py: 3.5,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            gap: 3,
                            alignItems: "center",
                            color: mainTextColor,
                          }}
                        >
                          <Box sx={{ opacity: 0.6, display: "flex" }}>
                            {serviceIcons[service.id]}
                          </Box>
                          <Typography
                            variant="h3"
                            sx={{
                              fontWeight: 800,
                              textTransform: "uppercase",
                              fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
                              letterSpacing: "0.02em",
                            }}
                          >
                            {service.title}
                          </Typography>
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: mainTextColor,
                            fontSize: "1.1rem",
                            letterSpacing: "0.05em",
                          }}
                        >
                          00{numId} {"//"}
                        </Typography>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
}
