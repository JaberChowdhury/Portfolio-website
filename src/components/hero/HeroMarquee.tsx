"use client";

import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { useLanguageStore } from "@/store/languageStore";
import { marqueeScroll } from "./heroAnimations";

const translations = {
  en: {
    marquee: [
      "High-Performance Web Graphics —",
      "Three.js & WebGPU Animations —",
      "Modern Toolchains: Bun & Vite —",
      "C++ Execution Engines —",
      "Competitive Programming Logic —",
      "Advanced System Architecture —",
    ],
  },
  bn: {
    marquee: [
      "উচ্চ-কার্যক্ষমতাসম্পন্ন ওয়েব গ্রাফিক্স —",
      "থ্রি.জেএস (Three.js) ও ওয়েবজিপিইউ (WebGPU) অ্যানিমেশন —",
      "আধুনিক টুলচেইন: বান (Bun) ও ভিটে (Vite) —",
      "সি++ (C++) এক্সিকিউশন ইঞ্জিন —",
      "কম্পিটিটিভ প্রোগ্রামিং লজিক —",
      "উন্নত সিস্টেম আর্কিটেকচার —",
    ],
  },
};

export default function HeroMarquee() {
  const theme = useTheme();
  const language = useLanguageStore((s) => s.language);
  const t = translations[language];
  const gridLineColor = theme.palette.divider;

  return (
    <Box
      sx={{
        width: "100%",
        borderTop: `1px solid ${gridLineColor}`,
        borderBottom: `1px solid ${gridLineColor}`,
        py: 2,
        display: "flex",
        whiteSpace: "nowrap",
        overflow: "hidden",
        backgroundColor: theme.palette.background.default,
        zIndex: 20,
      }}
    >
      <Box
        sx={{
          display: "flex",
          animation: `${marqueeScroll} 25s linear infinite`,
        }}
      >
        {/*
          Spreading the array twice ([...t.hero.marquee, ...t.hero.marquee])
          ensures the marquee has enough content to scroll seamlessly
          without a visible break or pop when the animation restarts.
        */}
        {[...t.marquee, ...t.marquee].map((text, index) => (
          <Typography
            key={index}
            variant="h5"
            sx={{
              mx: { xs: 2, md: 4 },
              fontSize: { xs: "1rem", md: "1.5rem" },
              fontWeight: 300,
              textTransform: "uppercase",
            }}
          >
            {text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
