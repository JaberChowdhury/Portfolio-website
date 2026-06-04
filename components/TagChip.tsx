"use client";

import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface TagChipProps {
	tag: string;
	size?: "sm" | "md";
	count?: number;
}

/**
 * Clickable tag chip that navigates to /tags/[tag] on click.
 * Used across blog posts, blog listing, and project cards.
 */
export default function TagChip({ tag, size = "sm", count }: TagChipProps) {
	const router = useRouter();
	const normalized = tag.toLowerCase().trim();

	return (
		<Box
			component="button"
			type="button"
			onClick={(e: React.MouseEvent) => {
				e.stopPropagation();
				e.preventDefault();
				router.push(`/tags/${encodeURIComponent(normalized)}`);
			}}
			sx={{
				display: "inline-flex",
				alignItems: "center",
				gap: 0.5,
				cursor: "pointer",
				background: "none",
				border: "1px solid var(--mui-palette-divider)",
				borderRadius: 0,
				px: size === "md" ? 1.5 : 1,
				py: size === "md" ? 0.75 : 0.4,
				transition: "all 0.15s ease-out",
				"&:hover": {
					borderColor: "var(--mui-palette-text-primary)",
					bgcolor: "action.hover",
					transform: "translateY(-1px)",
				},
				"&:active": {
					transform: "translateY(0)",
				},
			}}
			aria-label={`Search posts and projects tagged ${normalized}`}
		>
			<Typography
				component="span"
				sx={{
					fontFamily: "monospace",
					fontSize: size === "md" ? "0.8rem" : "0.7rem",
					fontWeight: 700,
					color: "text.primary",
					letterSpacing: "0.05em",
					lineHeight: 1,
				}}
			>
				#{normalized}
			</Typography>
			{count !== undefined && (
				<Typography
					component="span"
					sx={{
						fontFamily: "monospace",
						fontSize: "0.6rem",
						fontWeight: 700,
						color: "text.disabled",
						letterSpacing: "0.05em",
						lineHeight: 1,
					}}
				>
					{count}
				</Typography>
			)}
		</Box>
	);
}
