"use client";

import { motion } from "framer-motion";
import React from "react";
import type { Project } from "./worksData";
import { CARD_WIDTH } from "./worksData";

interface ProjectCardProps {
  project: Project;
  isCenter: boolean;
  index: number;
  activeIndex: number;
  cardWidth: number;
  dragHint: string;
  featuredText: string;
}

export default function ProjectCard({
  project,
  isCenter,
  index,
  activeIndex,
  cardWidth,
  dragHint,
  featuredText,
}: ProjectCardProps) {
  const distance = Math.abs(index - activeIndex);
  const scale = isCenter ? 1 : Math.max(0.82, 1 - distance * 0.09);
  const brightness = isCenter ? 1 : Math.max(0.55, 1 - distance * 0.2);

  return (
    <motion.div
      animate={{ scale, filter: `brightness(${brightness})` }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        width: cardWidth,
        height: 360,
        flexShrink: 0,
        borderRadius: 2,
        overflow: "hidden",
        background: project.bg,
        position: "relative",
        cursor: "grab",
      }}
    >
      {/* Textured overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
          opacity: 0.4,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Big background title */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize:
            project.title.length > 10
              ? "clamp(42px, 8vw, 68px)"
              : "clamp(60px, 10vw, 96px)",
          // fontFamily: "'Barlow Condensed', Impact, sans-serif",
          fontWeight: 900,
          color: project.textColor,
          opacity: isCenter ? 0.15 : 0.25,
          whiteSpace: "nowrap",
          letterSpacing: "0.04em",
          userSelect: "none",
          zIndex: 2,
          transition: "opacity 0.4s ease",
        }}
      >
        {project.title}
      </div>

      {/* Center card: visible label + drag hint */}
      {isCenter && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute",
            bottom: 28,
            left: 28,
            right: 28,
            zIndex: 10,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                // fontFamily: "'Share Tech Mono', monospace",
                fontSize: 10,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.14em",
                marginBottom: 6,
              }}
            >
              // {String(project.id).padStart(2, "0")} {featuredText}
            </div>
            <div
              style={{
                // fontFamily: "'Barlow Condensed', Impact, sans-serif",
                fontWeight: 700,
                fontSize: 22,
                color: "#fff",
                letterSpacing: "0.06em",
              }}
            >
              {project.title}
            </div>
          </div>

          {/* Drag indicator */}
          <motion.div
            animate={{ x: [0, -4, 0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
            style={{
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: 2,
              padding: "6px 14px",
              // fontFamily: "'Share Tech Mono', monospace",
              fontSize: 10,
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.1em",
              backdropFilter: "blur(6px)",
              background: "rgba(0,0,0,0.2)",
            }}
          >
            {dragHint}
          </motion.div>
        </motion.div>
      )}

      {/* Accent corner bracket — top-left */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          width: 20,
          height: 20,
          borderTop: `1.5px solid ${project.accent}`,
          borderLeft: `1.5px solid ${project.accent}`,
          opacity: isCenter ? 0.8 : 0.3,
          zIndex: 10,
          transition: "opacity 0.3s ease",
        }}
      />
      {/* Accent corner bracket — bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          width: 20,
          height: 20,
          borderBottom: `1.5px solid ${project.accent}`,
          borderRight: `1.5px solid ${project.accent}`,
          opacity: isCenter ? 0.8 : 0.3,
          zIndex: 10,
          transition: "opacity 0.3s ease",
        }}
      />
    </motion.div>
  );
}
