"use client";

import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { useLanguageStore } from "@/store/languageStore";
import type { Project } from "./worksData";
import { bodyStyle, labelStyle } from "./worksStyles";

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
  const language = useLanguageStore((s) => s.language);
  const t = translations[language];
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
        borderTop: "1px solid #c8c4bb",
      }}
    >
      {/* 01 Description */}
      <Box sx={{ flex: 1, minWidth: { md: "250px" } }}>
        <Typography style={labelStyle}>// {t.description}</Typography>
        <Typography style={bodyStyle}>{project.description}</Typography>
      </Box>

      {/* 02 Services */}
      <Box sx={{ flex: 1, minWidth: { md: "200px" } }}>
        <Typography style={labelStyle}>// {t.services}</Typography>
        <Typography style={bodyStyle}>{project.services}</Typography>
      </Box>

      {/* 03 Industry */}
      <Box>
        <Typography style={labelStyle}>// {t.industry}</Typography>
        <Typography style={{ ...bodyStyle, whiteSpace: "nowrap" }}>
          {project.industry}
        </Typography>
      </Box>

      {/* 04 Location */}
      <Box>
        <Typography style={labelStyle}>// {t.location}</Typography>
        <Typography style={{ ...bodyStyle, whiteSpace: "nowrap" }}>
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
            border: "1px solid #1a1a1a",
            borderRadius: 2,
            background: "transparent",
            color: "#1a1a1a",
            fontSize: 11,
            letterSpacing: "0.12em",
            padding: "10px 20px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            alignSelf: { xs: "flex-start", md: "center" },
            mt: { xs: 2, md: 0 },
          }}
        >
          {t.viewProject}
        </Button>
      </Link>
    </Box>
  );
}
