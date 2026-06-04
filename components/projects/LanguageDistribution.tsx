"use client";

import { Box, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { detailTranslations } from "@/data/projectTranslations";

interface LanguageDistributionProps {
	languages: Record<string, number>;
	titleLabel: string;
	mode: "bytes" | "files";
	language: "en" | "bn";
}

export default function LanguageDistribution({
	languages,
	titleLabel,
	mode,
	language,
}: LanguageDistributionProps) {
	if (!languages || Object.keys(languages).length === 0) {
		return null;
	}

	const total = Object.values(languages).reduce((a, b) => a + b, 0);
	if (total === 0) return null;

	// Dynamically calculate percentages and sort from highest to lowest percentage
	const langSorted = Object.entries(languages)
		.map(([name, val]) => ({
			name,
			value: val,
			percentage: (val / total) * 100,
		}))
		.sort((a, b) => b.value - a.value);

	const langColors: Record<string, string> = {
		TypeScript: "#3178c6",
		JavaScript: "#f1e05a",
		CSS: "#563d7c",
		HTML: "#e34c26",
		Astro: "#ff5a03",
		"C++": "#f34b7d",
		C: "#555555",
		Python: "#3572A5",
		Rust: "#dea584",
		GLSL: "#5686a5",
		Shell: "#89e051",
		Markdown: "#083fa1",
	};

	const getLangColor = (name: string, index: number) => {
		if (langColors[name]) return langColors[name];
		const fallbackColors = [
			"#00E5E5", // Cyan
			"#FF3366", // Pink/Red
			"#FFCC00", // Yellow
			"#00FF66", // Neon Green
			"#CC33FF", // Purple
			"#FF6600", // Orange
		];
		return fallbackColors[index % fallbackColors.length];
	};

	const t = detailTranslations[language];

	return (
		<Paper
			elevation={0}
			sx={{
				border: "1px solid var(--mui-palette-divider)",
				backgroundColor:
					"rgba(var(--mui-palette-background-paperChannel) / 0.4)",
				p: 3,
				width: "100%",
				boxSizing: "border-box",
			}}
		>
			<Typography
				sx={{
					fontWeight: 800,
					fontSize: "12px",
					letterSpacing: "0.15em",
					fontFamily: "monospace",
					color: "var(--mui-palette-text-secondary)",
					mb: 2.5,
					textTransform: "uppercase",
				}}
			>
				{titleLabel}
			</Typography>

			{/* Stacked bar chart with simple grow animation */}
			<Box
				sx={{
					height: "12px",
					display: "flex",
					width: "100%",
					backgroundColor:
						"rgba(var(--mui-palette-text-primaryChannel) / 0.05)",
					border: "1px solid var(--mui-palette-divider)",
					mb: 2.5,
					overflow: "hidden",
				}}
			>
				{langSorted.map((lang, idx) => (
					<motion.div
						key={lang.name}
						initial={{ width: 0 }}
						animate={{ width: `${lang.percentage}%` }}
						transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.1 }}
						style={{
							height: "100%",
							backgroundColor: getLangColor(lang.name, idx),
						}}
					/>
				))}
			</Box>

			{/* Legend */}
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					gap: { xs: 2, sm: 3.5 },
				}}
			>
				{langSorted.map((lang, idx) => {
					const formattedValue =
						mode === "bytes"
							? lang.value > 1024
								? `${(lang.value / 1024).toFixed(1)} KB`
								: `${lang.value} B`
							: `${lang.value} ${lang.value === 1 ? t.file : t.files}`;

					return (
						<Box
							key={lang.name}
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 1,
							}}
						>
							<Box
								sx={{
									width: 10,
									height: 10,
									backgroundColor: getLangColor(lang.name, idx),
								}}
							/>
							<Typography
								sx={{
									fontFamily: "monospace",
									fontSize: "12px",
									fontWeight: 700,
									color: "var(--mui-palette-text-primary)",
								}}
							>
								{lang.name}
							</Typography>
							<Typography
								sx={{
									fontFamily: "monospace",
									fontSize: "12px",
									color: "var(--mui-palette-text-secondary)",
								}}
							>
								{lang.percentage.toFixed(1)}% ({formattedValue})
							</Typography>
						</Box>
					);
				})}
			</Box>
		</Paper>
	);
}
