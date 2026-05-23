"use client";

import React from "react";
import { motion } from "framer-motion";
import { Box, Button, Typography } from "@mui/material";
import type { Project } from "./worksData";
import { labelStyle, bodyStyle } from "./worksStyles";

interface InfoRowProps {
  project: Project;
}

export default function InfoRow({ project }: InfoRowProps) {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr auto auto auto",
        gap: "40px",
        alignItems: "start",
        paddingTop: 28,
        borderTop: "1px solid #c8c4bb",
      }}
    >
      {/* 01 Description */}
      <div>
        <div style={labelStyle}>// 01 Description</div>
        <p style={bodyStyle}>{project.description}</p>
      </div>

      {/* 02 Services */}
      <div>
        <div style={labelStyle}>// 02 Services</div>
        <p style={bodyStyle}>{project.services}</p>
      </div>

      {/* 03 Industry */}
      <div>
        <div style={labelStyle}>// 03 Industry</div>
        <p style={{ ...bodyStyle, whiteSpace: "nowrap" }}>{project.industry}</p>
      </div>

      {/* 04 Location */}
      <div>
        <div style={labelStyle}>// 04 Location</div>
        <p style={{ ...bodyStyle, whiteSpace: "nowrap" }}>{project.location}</p>
      </div>

      {/* View Project button */}
      <Button
        sx={{
          border: "1px solid #1a1a1a",
          borderRadius: 2,
          background: "transparent",
          color: "#1a1a1a",
          // fontFamily: "'Share Tech Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.12em",
          padding: "10px 20px",
          cursor: "pointer",
          whiteSpace: "nowrap",
          alignSelf: "center",
        }}
      >
        {" "}
        View Project
      </Button>
      {/*<motion.button
        whileHover={{ backgroundColor: "#1a1a1a", color: "#fff" }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
        style={{
          border: "1px solid #1a1a1a",
          borderRadius: 2,
          background: "transparent",
          color: "#1a1a1a",
          // fontFamily: "'Share Tech Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.12em",
          padding: "10px 20px",
          cursor: "pointer",
          whiteSpace: "nowrap",
          alignSelf: "center",
        }}
      >
        View Project
      </motion.button>*/}
    </motion.div>
  );
}
