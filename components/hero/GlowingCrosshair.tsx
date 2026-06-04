"use client";

import { motion } from "framer-motion";

export default function GlowingCrosshair() {
	return (
		<motion.span
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ delay: 1.2, duration: 0.5 }}
			className="text-primary font-light mx-2 md:mx-6 inline-block -translate-y-[5px] text-[clamp(2rem,5vw,4rem)]"
			style={{
				textShadow: "0 0 10px currentColor",
			}}
		>
			+
		</motion.span>
	);
}
