"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ForkRightIcon from "@mui/icons-material/ForkRight";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import StarIcon from "@mui/icons-material/Star";
import {
	Box,
	Link as MuiLink,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import Link from "next/link";
import ParticleText from "@/app/extras/ParticleText";
import type { CombinedRepo } from "@/lib/github";

interface ProjectHeaderProps {
	repoInfo: CombinedRepo;
	t: {
		back: string;
		stars: string;
		forks: string;
		size: string;
		openIssues: string;
		lastUpdated: string;
		demo: string;
	};
	language: "en" | "bn";
}

export default function ProjectHeader({
	repoInfo,
	t,
	language,
}: ProjectHeaderProps) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const mainTextColor = "var(--mui-palette-text-primary)";

	const formatDate = (dateStr: string) => {
		if (!dateStr) return "";
		const d = new Date(dateStr);
		return d.toLocaleDateString(language === "en" ? "en-US" : "bn-BD", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	const getParticleFont = (name: string, mobile: boolean) => {
		const baseDesktopSize = 410;
		const baseMobileSize = 360;
		const factor = name.length > 10 ? Math.min(1, 10 / name.length) : 1;
		const desktopSize = Math.max(70, Math.floor(baseDesktopSize * factor));
		const mobileSize = Math.max(35, Math.floor(baseMobileSize * factor));
		return mobile
			? `900 ${mobileSize}px Inter, sans-serif`
			: `900 ${desktopSize}px Inter, sans-serif`;
	};

	return (
		<Box sx={{ width: "100%" }}>
			{/* Back Link to Projects Catalog */}
			<MuiLink
				component={Link}
				href="/projects"
				sx={{
					display: "inline-flex",
					alignItems: "center",
					gap: 1,
					fontWeight: 800,
					fontSize: "12px",
					letterSpacing: "0.08em",
					fontFamily: "monospace",
					color: "var(--mui-palette-text-secondary)",
					mb: 5,
					textTransform: "uppercase",
					textDecoration: "none",
					transition: "color 0.2s",
					"&:hover": {
						color: "var(--mui-palette-text-primary)",
					},
				}}
			>
				<ArrowBackIcon sx={{ fontSize: 14 }} />
				{t.back}
			</MuiLink>

			{/* Project Meta Details Header Container */}
			<Box
				sx={{
					mb: 6,
					borderBottom: "1px solid var(--mui-palette-divider)",
					pb: 4,
				}}
			>
				{/* Main Title via ParticleText */}
				<Box
					sx={{
						height: { xs: "120px", md: "250px" },
						width: "100%",
						mb: 3,
						position: "relative",
						overflow: "hidden",
					}}
				>
					<ParticleText
						text={repoInfo.name}
						canvasWidth={2500}
						colorStart={mainTextColor}
						colorEnd={mainTextColor}
						font={getParticleFont(repoInfo.name, isMobile)}
						particleSize={0.4}
					/>
				</Box>

				{/* Description */}
				{repoInfo.description && (
					<Typography
						variant="body1"
						sx={{
							color: "var(--mui-palette-text-secondary)",
							fontSize: { xs: "15px", sm: "17px" },
							lineHeight: 1.6,
							maxWidth: "800px",
							mb: 4,
						}}
					>
						{repoInfo.description}
					</Typography>
				)}

				{/* Stats Bar */}
				<Box
					sx={{
						display: "flex",
						flexWrap: "wrap",
						gap: { xs: 3, sm: 4 },
						alignItems: "center",
					}}
				>
					{/* Stars */}
					<Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
						<StarIcon
							sx={{
								fontSize: 18,
								color: "var(--mui-palette-text-secondary)",
							}}
						/>
						<Typography
							sx={{
								fontSize: "12px",
								fontWeight: 700,
								fontFamily: "monospace",
								color: "var(--mui-palette-text-secondary)",
							}}
						>
							{t.stars}: {repoInfo.stargazers_count}
						</Typography>
					</Box>

					{/* Forks */}
					<Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
						<ForkRightIcon
							sx={{
								fontSize: 16,
								color: "var(--mui-palette-text-secondary)",
							}}
						/>
						<Typography
							sx={{
								fontSize: "12px",
								fontWeight: 700,
								fontFamily: "monospace",
								color: "var(--mui-palette-text-secondary)",
							}}
						>
							{t.forks}: {repoInfo.forks_count}
						</Typography>
					</Box>

					{/* Size */}
					{repoInfo.size !== undefined && repoInfo.size > 0 && (
						<Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
							<Typography
								sx={{
									fontSize: "12px",
									fontWeight: 700,
									fontFamily: "monospace",
									color: "var(--mui-palette-text-secondary)",
								}}
							>
								{t.size}:{" "}
								{repoInfo.size > 1024
									? `${(repoInfo.size / 1024).toFixed(1)} MB`
									: `${repoInfo.size} KB`}
							</Typography>
						</Box>
					)}

					{/* Open Issues */}
					{repoInfo.open_issues_count !== undefined &&
						repoInfo.open_issues_count > 0 && (
							<Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
								<Typography
									sx={{
										fontSize: "12px",
										fontWeight: 700,
										fontFamily: "monospace",
										color: "var(--mui-palette-text-secondary)",
									}}
								>
									{t.openIssues}: {repoInfo.open_issues_count}
								</Typography>
							</Box>
						)}

					{/* Last pushed */}
					<Typography
						sx={{
							fontSize: "12px",
							fontWeight: 700,
							fontFamily: "monospace",
							color: "var(--mui-palette-text-secondary)",
						}}
					>
						{t.lastUpdated}:{" "}
						{formatDate(repoInfo.pushed_at || repoInfo.updated_at)}
					</Typography>

					{/* GitHub Link */}
					<MuiLink
						href={repoInfo.html_url}
						target="_blank"
						rel="noopener noreferrer"
						sx={{
							display: "inline-flex",
							alignItems: "center",
							gap: 0.5,
							fontWeight: 700,
							fontSize: "12px",
							fontFamily: "monospace",
							color: "var(--mui-palette-text-primary)",
							textDecoration: "underline",
							"&:hover": {
								color: "var(--mui-palette-primary-main)",
							},
						}}
					>
						<GitHubIcon sx={{ fontSize: 16 }} />
						{language === "en" ? "GitHub" : "গিটহাব"}
					</MuiLink>

					{/* Live Demo Link */}
					{repoInfo.homepage && (
						<MuiLink
							href={repoInfo.homepage}
							target="_blank"
							rel="noopener noreferrer"
							sx={{
								display: "inline-flex",
								alignItems: "center",
								gap: 0.5,
								fontWeight: 700,
								fontSize: "12px",
								fontFamily: "monospace",
								color: "var(--mui-palette-text-primary)",
								textDecoration: "underline",
								"&:hover": {
									color: "var(--mui-palette-primary-main)",
								},
							}}
						>
							<LaunchIcon sx={{ fontSize: 16 }} />
							{t.demo}
						</MuiLink>
					)}
				</Box>
			</Box>
		</Box>
	);
}
