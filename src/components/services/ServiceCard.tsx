"use client";

import { Box } from "@mui/material";
import { motion } from "framer-motion";
import type { ServiceProject } from "./servicesData";

interface ServiceCardProps {
  project: ServiceProject;
  index: number;
  activeIndex: number;
  onClick: () => void;
}

export default function ServiceCard({
  project,
  index,
  activeIndex,
  onClick,
}: ServiceCardProps) {
  return (
    <motion.div
      key={project.id}
      animate={{
        scale: index === activeIndex ? 1 : 0.8,
        opacity: index === activeIndex ? 1 : 0.4,
        filter: index === activeIndex ? "grayscale(0%)" : "grayscale(100%)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        scrollSnapAlign: "center",
        width: "450px",
        height: "350px",
        flexShrink: 0,
        position: "relative",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Box
        component="img"
        src={project.image}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          border: "1px solid",
          borderColor: "divider",
        }}
      />
    </motion.div>
  );
}
