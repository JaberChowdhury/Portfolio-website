/* biome-ignore-all lint/suspicious/noArrayIndexKey: static 52-week activity list order never changes */
/* biome-ignore-all lint/a11y/noStaticElementInteractions: hover tooltip interactive bars */
"use client";

import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";

interface WeeklyActivityChartProps {
	weeklyActivity: number[];
	titleLabel: string;
	language: "en" | "bn";
}

export default function WeeklyActivityChart({
	weeklyActivity,
	titleLabel,
	language,
}: WeeklyActivityChartProps) {
	const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);

	const activity = weeklyActivity || [];
	if (activity.length === 0) return null;

	const maxCommits = Math.max(...activity, 1);
	const totalCommits = activity.reduce((a, b) => a + b, 0);

	const getWeekDateRange = (weekIndex: number) => {
		const today = new Date();
		const daysAgoStart = (51 - weekIndex) * 7;
		const startOfWeek = new Date(
			today.getTime() - daysAgoStart * 24 * 60 * 60 * 1000,
		);
		const dayOfWeek = startOfWeek.getDay();
		const monday = new Date(
			startOfWeek.getTime() -
				(dayOfWeek === 0 ? 6 : dayOfWeek - 1) * 24 * 60 * 60 * 1000,
		);
		const sunday = new Date(monday.getTime() + 6 * 24 * 60 * 60 * 1000);

		const formatWeekDate = (d: Date) => {
			return d.toLocaleDateString(language === "en" ? "en-US" : "bn-BD", {
				month: "short",
				day: "numeric",
				year: "numeric",
			});
		};

		return `${formatWeekDate(monday)} – ${formatWeekDate(sunday)}`;
	};

	return (
		<Paper
			elevation={0}
			sx={{
				border: "1px solid var(--mui-palette-divider)",
				backgroundColor:
					"rgba(var(--mui-palette-background-paperChannel) / 0.4)",
				p: 3,
				display: "flex",
				flexDirection: "column",
				height: "100%",
				justifyContent: "space-between",
				boxSizing: "border-box",
			}}
		>
			<Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-start",
						mb: 2,
					}}
				>
					<Typography
						sx={{
							fontWeight: 800,
							fontSize: "12px",
							letterSpacing: "0.15em",
							fontFamily: "monospace",
							color: "var(--mui-palette-text-secondary)",
							textTransform: "uppercase",
						}}
					>
						{titleLabel}
					</Typography>
					<Typography
						sx={{
							fontFamily: "monospace",
							fontSize: "11px",
							fontWeight: 700,
							backgroundColor: "var(--mui-palette-text-primary)",
							color: "var(--mui-palette-background-default)",
							px: 1,
							py: 0.5,
						}}
					>
						{totalCommits} {language === "en" ? "commits" : "কমিট"}
					</Typography>
				</Box>

				<Typography
					sx={{
						fontFamily: "monospace",
						fontSize: "12px",
						color:
							hoveredWeek !== null
								? "var(--mui-palette-text-primary)"
								: "var(--mui-palette-text-secondary)",
						mb: 3,
						height: "20px",
						fontWeight: hoveredWeek !== null ? 700 : 400,
					}}
				>
					{hoveredWeek !== null
						? `${getWeekDateRange(hoveredWeek)}: ${activity[hoveredWeek]} ${activity[hoveredWeek] === 1 ? (language === "en" ? "commit" : "কমিট") : language === "en" ? "commits" : "কমিটসমূহ"}`
						: language === "en"
							? "Hover over the bars to see activity detail"
							: "বিস্তারিত দেখতে বারের ওপর মাউস রাখুন"}
				</Typography>
			</Box>

			{/* SVG Chart Container */}
			<Box sx={{ width: "100%", position: "relative" }}>
				<svg
					viewBox="0 0 520 100"
					width="100%"
					height="100"
					style={{ overflow: "visible", display: "block" }}
					role="img"
				>
					<title>Weekly Commit Activity Chart</title>
					{/* Horizontal dashed grid lines */}
					<line
						x1="0"
						y1="0"
						x2="520"
						y2="0"
						stroke="var(--mui-palette-divider)"
						strokeDasharray="3,3"
					/>
					<line
						x1="0"
						y1="50"
						x2="520"
						y2="50"
						stroke="var(--mui-palette-divider)"
						strokeDasharray="3,3"
					/>
					<line
						x1="0"
						y1="100"
						x2="520"
						y2="100"
						stroke="var(--mui-palette-divider)"
					/>

					{/* Bars */}
					{activity.map((commits, idx) => {
						const barWidth = 7;
						const spacing = 3;
						const x = idx * (barWidth + spacing);
						const barHeight = maxCommits > 0 ? (commits / maxCommits) * 90 : 0;
						const y = 100 - barHeight;

						const isHovered = hoveredWeek === idx;
						let fill = "rgba(var(--mui-palette-text-primaryChannel) / 0.15)";
						if (commits > 0) {
							fill = isHovered
								? "var(--mui-palette-primary-main)"
								: "rgba(var(--mui-palette-primary-mainChannel) / 0.65)";
						} else if (isHovered) {
							fill = "rgba(var(--mui-palette-text-primaryChannel) / 0.4)";
						}

						return (
							<rect
								key={idx}
								x={x}
								y={y}
								width={barWidth}
								height={barHeight || 3}
								fill={fill}
								aria-label={`Week ${idx + 1}: ${commits} commits`}
								style={{
									cursor: "pointer",
									transition: "fill 0.15s ease",
								}}
								onMouseEnter={() => setHoveredWeek(idx)}
								onMouseLeave={() => setHoveredWeek(null)}
							/>
						);
					})}
				</svg>

				{/* X Axis Labels */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mt: 1,
						fontFamily: "monospace",
						fontSize: "10px",
						color: "var(--mui-palette-text-secondary)",
					}}
				>
					<Typography
						variant="caption"
						sx={{ fontSize: "10px", fontFamily: "monospace" }}
					>
						{language === "en" ? "1 year ago" : "১ বছর আগে"}
					</Typography>
					<Typography
						variant="caption"
						sx={{ fontSize: "10px", fontFamily: "monospace" }}
					>
						{language === "en" ? "Today" : "আজ"}
					</Typography>
				</Box>
			</Box>
		</Paper>
	);
}
