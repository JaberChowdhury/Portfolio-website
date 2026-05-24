"use client";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { projectsData } from "@/data/projects";
import { useLanguageStore } from "@/store/languageStore";
import ParticleText from "../../app/extras/ParticleText";
import InfoRow from "./InfoRow";
import ProjectCard from "./ProjectCard";
import { CARD_GAP } from "./worksData";

const translations = {
  en: {
    sectionTitle: "WORKS",
    dragHint: "← DRAG →",
    featured: "FEATURED",
  },
  bn: {
    sectionTitle: "কাজ",
    dragHint: "← টানুন →",
    featured: "ফিচার্ড",
  },
};

export default function WorksSection() {
  const theme = useTheme();
  const language = useLanguageStore((s) => s.language);
  const t = translations[language];

  const PROJECTS = projectsData.map((p) => ({
    id: p.id,
    title: p.title,
    bg: p.bg,
    accent: p.accent,
    textColor: p.textColor,
    repoName: p.repoName,
    ...p[language],
  }));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeIndex, setActiveIndex] = useState(2);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1440);
  const [offset, setOffsetState] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startOffset = useRef(0);
  const offsetRef = useRef(0);

  // Safely handle window dimensions and resizing
  useEffect(() => {
    const handleResize = () => setContainerWidth(window.innerWidth);
    handleResize(); // Set initial width on the client
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardWidth = Math.min(520, containerWidth * 0.85);
  const cardStride = cardWidth + CARD_GAP;
  const centerOffset = containerWidth / 2 - cardWidth / 2;

  const getOffsetForIndex = useCallback(
    (idx: number) => centerOffset - idx * cardStride,
    [centerOffset, cardStride],
  );

  // Auto-update offset when resizing or changing the active index
  useEffect(() => {
    const targetOffset = getOffsetForIndex(activeIndex);
    offsetRef.current = targetOffset;
    setOffsetState(targetOffset);
  }, [getOffsetForIndex, activeIndex]);

  const snapToIndex = (idx: number) => {
    const clamped = Math.max(0, Math.min(PROJECTS.length - 1, idx));
    setActiveIndex(clamped);
    const target = getOffsetForIndex(clamped);

    // Smooth spring animation
    let start: number | null = null;
    const from = offsetRef.current;
    const duration = 420;

    const spring = (t: number) => {
      if (!start) start = t;
      const elapsed = t - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - 2 ** (-10 * progress);
      const current = from + (target - from) * eased;

      offsetRef.current = current;
      setOffsetState(current);

      if (progress < 1) requestAnimationFrame(spring);
    };
    requestAnimationFrame(spring);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    startX.current = e.clientX;
    startOffset.current = offsetRef.current;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const delta = e.clientX - startX.current;
    const newOff = startOffset.current + delta;
    offsetRef.current = newOff;
    setOffsetState(newOff);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    const delta = e.clientX - startX.current;

    if (Math.abs(delta) < 8) return; // Treat as click, not drag

    const rawIndex = (centerOffset - offsetRef.current) / cardStride;
    const snapped = Math.round(rawIndex);
    snapToIndex(snapped);
  };

  const activeProject = PROJECTS[activeIndex];

  return (
    <Box
      id="works"
      sx={{
        minHeight: "100vh",
        // Apply your noise texture
        // backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Section header */}
      <Box
        sx={{
          mb: { xs: 6, md: 10 },
          height: { xs: "120px", md: "250px" },
          position: "relative",
        }}
      >
        <ParticleText
          text={t.sectionTitle}
          colorStart={theme.palette.text.primary}
          colorEnd={theme.palette.text.primary}
          font={
            isMobile
              ? "900 100px Inter, sans-serif"
              : "900 200px Inter, sans-serif"
          }
          particleSize={0.4}
        />
      </Box>
      {/* Draggable Carousel Track */}
      <Box
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        sx={{
          overflow: "hidden",
          cursor: isDragging ? "grabbing" : "grab",
          pb: "4px",
          userSelect: "none",
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          touchAction: "pan-y",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            gap: `${CARD_GAP}px`,
            willChange: "transform",
            transform: `translateX(${offset}px)`,
            transition: isDragging
              ? "none"
              : "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              activeIndex={activeIndex}
              isCenter={i === activeIndex}
              cardWidth={cardWidth}
              dragHint={t.dragHint}
              featuredText={t.featured}
            />
          ))}
        </Box>
      </Box>

      {/* Footer Info & Title */}
      <Box>
        <Box sx={{ px: "40px", pt: "0", pb: "32px" }}>
          <InfoRow project={activeProject} />
        </Box>
        <Box
          sx={{
            mb: { xs: 6, md: 10 },
            height: { xs: "120px", md: "250px" },
            position: "relative",
          }}
        >
          <ParticleText
            text={activeProject.title}
            canvasWidth={isMobile ? 1200 : 3800}
            colorStart={theme.palette.text.primary}
            colorEnd={theme.palette.text.primary}
            font={
              isMobile
                ? "900 120px Inter, sans-serif"
                : "900 300px Inter, sans-serif"
            }
            particleSize={0.4}
          />
        </Box>
      </Box>
    </Box>
  );
}
