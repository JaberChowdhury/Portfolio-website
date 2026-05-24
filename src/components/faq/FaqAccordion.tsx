"use client";

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

export default function FaqAccordion() {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <Box sx={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
      {t.faq.items.map((item) => {
        const isExpanded = expandedId === item.id;

        return (
          <Box
            key={item.id}
            sx={{
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              overflow: "hidden",
            }}
          >
            <Box
              onClick={() => toggleAccordion(item.id)}
              sx={{
                py: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.02)",
                },
                transition: "background-color 0.2s ease",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                  color: "#1a1a1a",
                }}
              >
                {item.question}
              </Typography>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1a1a1a",
                  opacity: 0.6,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </motion.div>
            </Box>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
                    opacity: { duration: 0.3, delay: 0.1 },
                  }}
                >
                  <Box sx={{ pb: 4, pr: { xs: 0, md: 4 } }}>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        color: "rgba(0,0,0,0.7)",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.answer}
                    </Typography>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        );
      })}
    </Box>
  );
}
