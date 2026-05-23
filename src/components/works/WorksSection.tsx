"use client";

import React, { useState, useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ProjectCard from "./ProjectCard";
import InfoRow from "./InfoRow";
import { PROJECTS, CARD_STRIDE, CARD_GAP } from "./worksData";

export default function WorksSection() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);
  const startX = useRef(0);
  const startOffset = useRef(0);
  const offsetRef = useRef(0);
  const [offset, setOffsetState] = useState(0);

  const containerWidth =
    typeof window !== "undefined" ? window.innerWidth : 1440;
  const centerOffset = containerWidth / 2 - 520 / 2; // CARD_WIDTH = 520

  const getOffsetForIndex = (idx: number) => centerOffset - idx * CARD_STRIDE;

  useEffect(() => {
    const initial = getOffsetForIndex(activeIndex);
    offsetRef.current = initial;
    setOffsetState(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const snapToIndex = (idx: number) => {
    const clamped = Math.max(0, Math.min(PROJECTS.length - 1, idx));
    setActiveIndex(clamped);
    const target = getOffsetForIndex(clamped);
    // smooth spring to target
    let start: number | null = null;
    const from = offsetRef.current;
    const duration = 420;
    const spring = (t: number) => {
      if (!start) start = t;
      const elapsed = t - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
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

    if (Math.abs(delta) < 8) return; // click, not drag

    // figure out which index is closest
    const rawIndex = (centerOffset - offsetRef.current) / CARD_STRIDE;
    const snapped = Math.round(rawIndex);
    snapToIndex(snapped);
  };

  const activeProject = PROJECTS[activeIndex];

  return (
    <Box
      sx={{
        background: "#e8e4db",
        minHeight: "100vh",
        // fontFamily: "'Barlow Condensed', Impact, sans-serif",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Barlow+Condensed:wght@400;700;900&display=swap');
      `}</style>

      {/* Section header */}
      <Box sx={{ px: "40px", pt: "48px", pb: "28px" }}>
        <Typography
          sx={{
            // fontFamily: "'Barlow Condensed', Impact, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(32px, 5vw, 48px)",
            letterSpacing: "0.04em",
            color: "#1a1a1a",
            lineHeight: 1,
          }}
        >
          WORKS
        </Typography>
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
            />
          ))}
        </Box>
      </Box>

      {/* Info row */}
      <Box sx={{ px: "40px", pt: "0", pb: "32px" }}>
        <InfoRow project={activeProject} />
      </Box>

      {/* Giant project name at bottom */}
      <Box sx={{ px: "40px", pb: "48px", overflow: "hidden" }}>
        <Typography
          sx={{
            // fontFamily: "'Barlow Condensed', Impact, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(56px, 10vw, 120px)",
            letterSpacing: "-0.01em",
            color: "#1a1a1a",
            lineHeight: 0.9,
            textTransform: "uppercase",
          }}
        >
          {activeProject.title}
        </Typography>
      </Box>
    </Box>
  );
}
