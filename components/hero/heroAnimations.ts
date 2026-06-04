import { keyframes } from "@mui/system";
import type { Variants } from "framer-motion";

// ─── CSS Keyframe Animations ──────────────────────────────────────────────────

export const floatAnimation = keyframes`
  0% { transform: translateY(0px); opacity: 0.8; }
  50% { transform: translateY(-10px); opacity: 1; }
  100% { transform: translateY(0px); opacity: 0.8; }
`;

export const marqueeScroll = keyframes`
  0% { transform: translateX(100vw); }
  100% { transform: translateX(-100%); }
`;

// ─── Framer Motion Variants ───────────────────────────────────────────────────

export const lineStretchVariants: Variants = {
	hidden: { scaleX: 0, transformOrigin: "left" },
	visible: {
		scaleX: 1,
		transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 },
	},
};

export const circuitVariants: Variants = {
	hidden: { pathLength: 0, opacity: 0 },
	visible: {
		pathLength: 1,
		opacity: 1,
		transition: { duration: 1, ease: "easeInOut", delay: 1.5 },
	},
};

export const nodeVariants: Variants = {
	hidden: { scale: 0, opacity: 0 },
	visible: {
		scale: 1,
		opacity: 1,
		transition: {
			duration: 0.4,
			ease: "backOut",
			staggerChildren: 0.1,
			delayChildren: 2,
		},
	},
};
