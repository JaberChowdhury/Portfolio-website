"use client";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface BranchSelectorProps {
	repoName: string;
	allBranches: { name: string }[];
	activeBranchName: string;
	t: {
		branches: string;
	};
}

export default function BranchSelector({
	repoName,
	allBranches,
	activeBranchName,
	t,
}: BranchSelectorProps) {
	const router = useRouter();
	const [mounted, setMounted] = useState(false);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [ripple, setRipple] = useState<{ index: number; key: number } | null>(
		null,
	);
	const rippleKey = useRef(0);

	const activeBranchIndex = allBranches.findIndex(
		(b) => b.name.toLowerCase() === activeBranchName.toLowerCase(),
	);
	const activeIndex = activeBranchIndex === -1 ? 0 : activeBranchIndex;

	useEffect(() => {
		// Stagger mount trigger
		const t = setTimeout(() => setMounted(true), 30);
		return () => clearTimeout(t);
	}, []);

	const handleClick = (index: number, branchName: string) => {
		rippleKey.current += 1;
		setRipple({ index, key: rippleKey.current });
		setTimeout(() => setRipple(null), 500);
		router.push(`/projects/${repoName}/${encodeURIComponent(branchName)}`);
	};

	return (
		<Box sx={{ width: "100%", mb: 4 }}>
			{/* Branch Header label */}
			<Typography
				sx={{
					fontWeight: 800,
					fontSize: "12px",
					letterSpacing: "0.15em",
					fontFamily: "monospace",
					color: "var(--mui-palette-text-secondary)",
					mb: 1.5,
					textTransform: "uppercase",
				}}
			>
				{t.branches}
				<Box
					component="span"
					sx={{
						ml: 1.5,
						fontSize: "10px",
						letterSpacing: "0.05em",
						opacity: 0.5,
						fontWeight: 500,
					}}
				>
					{allBranches.length}
				</Box>
			</Typography>

			{/* Divider top */}
			<Box
				sx={{
					width: "100%",
					height: "1px",
					backgroundColor: "var(--mui-palette-divider)",
					mb: 1.5,
				}}
			/>

			{/* Wrapped pill grid */}
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					gap: "6px",
					pb: 1.5,
				}}
			>
				{allBranches.map((branch, index) => {
					const isActive = index === activeIndex;
					const isHovered = hoveredIndex === index;
					const isRippling = ripple?.index === index;

					return (
						<Box
							key={branch.name}
							onClick={() => handleClick(index, branch.name)}
							onMouseEnter={() => setHoveredIndex(index)}
							onMouseLeave={() => setHoveredIndex(null)}
							sx={{
								position: "relative",
								overflow: "hidden",
								display: "inline-flex",
								alignItems: "center",
								px: 1.5,
								py: 0.5,
								borderRadius: "3px",
								cursor: "pointer",
								fontFamily: "monospace",
								fontSize: "11px",
								fontWeight: isActive ? 800 : 600,
								letterSpacing: "0.08em",
								textTransform: "uppercase",
								userSelect: "none",
								border: "1px solid",
								transition:
									"color 0.18s ease, background-color 0.18s ease, border-color 0.18s ease, transform 0.12s ease, box-shadow 0.18s ease",
								transform:
									isHovered && !isActive ? "translateY(-1px)" : "translateY(0)",

								// Active styles
								...(isActive
									? {
											color: "var(--mui-palette-background-default)",
											backgroundColor: "var(--mui-palette-text-primary)",
											borderColor: "var(--mui-palette-text-primary)",
											boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
										}
									: {
											color: isHovered
												? "var(--mui-palette-text-primary)"
												: "var(--mui-palette-text-secondary)",
											backgroundColor: isHovered
												? "var(--mui-palette-action-hover)"
												: "transparent",
											borderColor: isHovered
												? "var(--mui-palette-text-secondary)"
												: "var(--mui-palette-divider)",
											boxShadow: "none",
										}),

								// Staggered mount animation
								opacity: mounted ? 1 : 0,
								animationName: mounted ? "branchFadeIn" : "none",
								animationDuration: "0.3s",
								animationTimingFunction: "ease-out",
								animationFillMode: "both",
								animationDelay: `${Math.min(index * 28, 600)}ms`,

								"@keyframes branchFadeIn": {
									from: { opacity: 0, transform: "translateY(4px)" },
									to: { opacity: 1, transform: "translateY(0)" },
								},
							}}
						>
							{/* Active dot indicator */}
							{isActive && (
								<Box
									sx={{
										width: 5,
										height: 5,
										borderRadius: "50%",
										backgroundColor: "var(--mui-palette-background-default)",
										mr: 0.75,
										flexShrink: 0,
										opacity: 0.7,
									}}
								/>
							)}

							{branch.name.toUpperCase()}

							{/* Ripple effect on click */}
							{isRippling && (
								<Box
									key={ripple?.key}
									sx={{
										position: "absolute",
										inset: 0,
										borderRadius: "3px",
										backgroundColor: "currentColor",
										opacity: 0,
										animationName: "branchRipple",
										animationDuration: "0.45s",
										animationTimingFunction: "ease-out",
										animationFillMode: "forwards",
										pointerEvents: "none",
										"@keyframes branchRipple": {
											"0%": { opacity: 0.25, transform: "scale(0.85)" },
											"100%": { opacity: 0, transform: "scale(1.05)" },
										},
									}}
								/>
							)}
						</Box>
					);
				})}
			</Box>

			{/* Divider bottom */}
			<Box
				sx={{
					width: "100%",
					height: "1px",
					backgroundColor: "var(--mui-palette-divider)",
				}}
			/>
		</Box>
	);
}
