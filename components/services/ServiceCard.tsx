"use client";

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
			<img
				src={project.image}
				className="w-full h-full object-cover border border-border"
				alt={project.title}
			/>
		</motion.div>
	);
}
