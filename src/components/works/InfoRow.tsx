"use client";

import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguageStore } from "@/store/languageStore";
import type { Project } from "./worksData";

const translations = {
  en: {
    description: "01 Description",
    services: "02 Services",
    industry: "03 Industry",
    location: "04 Location",
    viewProject: "View Project",
  },
  bn: {
    description: "০১ বিবরণ",
    services: "০২ সেবাসমূহ",
    industry: "০৩ শিল্প",
    location: "০৪ অবস্থান",
    viewProject: "প্রকল্প দেখুন",
  },
};

interface InfoRowProps {
  project: Project;
}

export default function InfoRow({ project }: InfoRowProps) {
  const theme = useTheme();
  const language = useLanguageStore((s) => s.language);
  const t = translations[language];
  const labelSx = {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.1em",
    color: theme.palette.text.secondary,
    mb: 0.75,
  };
  const bodySx = {
    fontWeight: 400,
    fontSize: 13,
    lineHeight: 1.55,
    color: theme.palette.text.primary,
    m: 0,
  };

  return (
    <Box
      component={motion.div}
      key={project.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 3, md: 5 },
        alignItems: { xs: "flex-start", md: "center" },
        pt: 3.5,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* 01 Description */}
      <Box sx={{ flex: 1, minWidth: { md: "250px" } }}>
        <Typography sx={labelSx}>
          {"// "}
          {t.description}
        </Typography>
        <Typography sx={bodySx}>{project.description}</Typography>
      </Box>

      {/* 02 Services */}
      <Box sx={{ flex: 1, minWidth: { md: "200px" } }}>
        <Typography sx={labelSx}>
          {"// "}
          {t.services}
        </Typography>
        <Typography sx={bodySx}>{project.services}</Typography>
      </Box>

      {/* 03 Industry */}
      <Box>
        <Typography sx={labelSx}>
          {"// "}
          {t.industry}
        </Typography>
        <Typography sx={{ ...bodySx, whiteSpace: "nowrap" }}>
          {project.industry}
        </Typography>
      </Box>

      {/* 04 Location */}
      <Box>
        <Typography sx={labelSx}>
          {"// "}
          {t.location}
        </Typography>
        <Typography sx={{ ...bodySx, whiteSpace: "nowrap" }}>
          {project.location}
        </Typography>
      </Box>

      {/* View Project button */}
      <Link
        href={project.repoName ? `/projects/${project.repoName}` : "/projects"}
        passHref
        style={{ textDecoration: "none" }}
      >
        <Button
          sx={{
            border: `1px solid ${theme.palette.text.primary}`,
            borderRadius: 2,
            backgroundColor: "transparent",
            color: theme.palette.text.primary,
            fontSize: 11,
            letterSpacing: "0.12em",
            padding: "10px 20px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            alignSelf: { xs: "flex-start", md: "center" },
            mt: { xs: 2, md: 0 },
            "&:hover": {
              backgroundColor: theme.palette.text.primary,
              color: theme.palette.background.default,
            },
          }}
        >
          {t.viewProject}
        </Button>
      </Link>
    </Box>
  );
}
