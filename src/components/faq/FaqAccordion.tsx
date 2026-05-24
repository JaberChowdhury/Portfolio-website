"use client";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { faqData } from "@/data/faq";
import { useLanguageStore } from "@/store/languageStore";

export default function FaqAccordion() {
  const language = useLanguageStore((s) => s.language);
  const FAQS = faqData.map((f) => ({
    id: f.id,
    question: f.question[language],
    answer: f.answer[language],
  }));

  return (
    <Box sx={{ borderTop: "1px solid", borderColor: "divider" }}>
      {FAQS.map((item) => (
        <Accordion
          key={item.id}
          disableGutters
          elevation={0}
          square
          sx={{
            backgroundColor: "transparent",
            borderBottom: "1px solid",
            borderColor: "divider",
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ opacity: 0.6 }} />}
            sx={{
              px: 0,
              py: 1,
              "&:hover": {
                backgroundColor: "action.hover",
              },
              "& .MuiAccordionSummary-content": {
                margin: "12px 0",
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                color: "text.primary",
              }}
            >
              {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0, pb: 3 }}>
            <Typography
              sx={{
                fontSize: "1rem",
                color: "text.secondary",
                lineHeight: 1.6,
              }}
            >
              {item.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
