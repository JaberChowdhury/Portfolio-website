"use client";

import { motion } from "framer-motion";
import {
	circuitVariants,
	lineStretchVariants,
	nodeVariants,
} from "./heroAnimations";

export default function CircuitGraphic() {
	const cyanAccent = "var(--primary)";

	return (
		<div className="flex-grow hidden sm:flex items-center ml-4 md:ml-8 h-[100px]">
			{/* Stretching Horizontal Line */}
			<motion.div
				variants={lineStretchVariants}
				initial="hidden"
				animate="visible"
				style={{
					height: "6px",
					backgroundColor: "var(--foreground)",
					flexGrow: 1,
				}}
			/>

			{/* Fixed-Size Circuit Nodes & Arrow (Covers the space above CHOWDHURY) */}
			<div className="flex-shrink-0 w-[160px] h-full">
				<motion.svg
					aria-labelledby="circuit-graphic-title"
					width="100%"
					height="100%"
					viewBox="0 0 160 100"
					style={{ overflow: "visible" }}
				>
					<title id="circuit-graphic-title">Circuit accent graphic</title>
					{/* Branching Lines */}
					<motion.path
						d="M 0 50 L 30 20 H 70 M 0 50 L 30 80 H 70"
						stroke="var(--foreground)"
						strokeWidth="6"
						fill="none"
						variants={circuitVariants}
						initial="hidden"
						animate="visible"
					/>

					{/* Data Nodes */}
					<motion.g variants={nodeVariants} initial="hidden" animate="visible">
						<motion.rect
							x="80"
							y="10"
							width="20"
							height="20"
							fill="var(--foreground)"
							variants={nodeVariants}
						/>
						<motion.rect
							x="110"
							y="10"
							width="20"
							height="20"
							fill={cyanAccent}
							variants={nodeVariants}
						/>
						<motion.rect
							x="80"
							y="70"
							width="20"
							height="20"
							fill={cyanAccent}
							variants={nodeVariants}
						/>
						<motion.rect
							x="110"
							y="70"
							width="20"
							height="20"
							fill="var(--foreground)"
							variants={nodeVariants}
						/>
					</motion.g>

					{/* Final Arrow */}
					<motion.path
						d="M 140 50 H 200 L 180 30 M 200 50 L 180 70"
						stroke="var(--foreground)"
						strokeWidth="6"
						fill="none"
						strokeLinecap="square"
						variants={circuitVariants}
						initial="hidden"
						animate="visible"
					/>
				</motion.svg>
			</div>
		</div>
	);
}
