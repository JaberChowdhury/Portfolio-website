"use client";

import ArticleIcon from "@mui/icons-material/Article";
import CodeIcon from "@mui/icons-material/Code";
import SearchIcon from "@mui/icons-material/Search";
import TagIcon from "@mui/icons-material/Tag";
import {
	Box,
	CircularProgress,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import TagChip from "@/components/TagChip";

interface TagEntry {
	tag: string;
	blogCount: number;
	projectCount: number;
	total: number;
}

export default function TagsIndexClient() {
	const [tags, setTags] = useState<TagEntry[]>([]);
	const [loading, setLoading] = useState(true);
	const [query, setQuery] = useState("");

	useEffect(() => {
		fetch("/api/tags")
			.then((r) => r.json())
			.then((data) => {
				setTags(data.tags ?? []);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	const filtered = query.trim()
		? tags.filter((t) => t.tag.includes(query.toLowerCase().trim()))
		: tags;

	return (
		<Box>
			{/* Page Header */}
			<Box
				sx={{
					mb: 6,
					pb: 4,
					borderBottom: "2px solid var(--mui-palette-divider)",
				}}
			>
				<Stack
					direction="row"
					spacing={1.5}
					sx={{ alignItems: "center", mb: 2 }}
				>
					<TagIcon sx={{ fontSize: "1rem", color: "text.secondary" }} />
					<Typography
						variant="caption"
						sx={{
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: "0.15em",
							color: "text.secondary",
						}}
					>
						TAG EXPLORER
					</Typography>
				</Stack>
				<Typography
					variant="h3"
					sx={{
						fontWeight: 800,
						mb: 2,
						fontFamily: "inherit",
						letterSpacing: "-0.03em",
						textTransform: "uppercase",
					}}
				>
					Browse by Tag
				</Typography>
				<Typography
					variant="body1"
					sx={{ color: "text.secondary", fontSize: "1.05rem", lineHeight: 1.7 }}
				>
					Click any tag to explore all related blog posts and GitHub projects in
					one place.
				</Typography>
			</Box>

			{/* Search Input */}
			<TextField
				fullWidth
				placeholder="Filter tags..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				variant="outlined"
				size="small"
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon
									sx={{ fontSize: "1rem", color: "text.secondary" }}
								/>
							</InputAdornment>
						),
					},
				}}
				sx={{
					mb: 5,
					"& .MuiOutlinedInput-root": {
						borderRadius: 0,
						fontFamily: "monospace",
						fontSize: "0.9rem",
						"& fieldset": {
							borderColor: "var(--mui-palette-divider)",
						},
						"&:hover fieldset": {
							borderColor: "var(--mui-palette-text-primary)",
						},
						"&.Mui-focused fieldset": {
							borderColor: "var(--mui-palette-primary-main)",
							borderWidth: 2,
						},
					},
				}}
			/>

			{/* Stats Row */}
			{!loading && (
				<Stack
					direction="row"
					spacing={4}
					sx={{
						mb: 4,
						pb: 3,
						borderBottom: "1px solid var(--mui-palette-divider)",
					}}
				>
					<Box>
						<Typography
							variant="caption"
							sx={{
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: "0.1em",
								color: "text.secondary",
								fontSize: "0.65rem",
							}}
						>
							TOTAL TAGS
						</Typography>
						<Typography
							variant="h5"
							sx={{
								fontWeight: 900,
								fontFamily: "monospace",
								letterSpacing: "-0.02em",
							}}
						>
							{tags.length}
						</Typography>
					</Box>
					<Box>
						<Typography
							variant="caption"
							sx={{
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: "0.1em",
								color: "text.secondary",
								fontSize: "0.65rem",
							}}
						>
							FILTERED
						</Typography>
						<Typography
							variant="h5"
							sx={{
								fontWeight: 900,
								fontFamily: "monospace",
								letterSpacing: "-0.02em",
							}}
						>
							{filtered.length}
						</Typography>
					</Box>
				</Stack>
			)}

			{/* Tag Grid */}
			{loading ? (
				<Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
					<CircularProgress size={32} thickness={2} />
				</Box>
			) : filtered.length === 0 ? (
				<Box
					sx={{
						py: 8,
						textAlign: "center",
						border: "2px dashed var(--mui-palette-divider)",
					}}
				>
					<Typography sx={{ color: "text.secondary", fontFamily: "monospace" }}>
						No tags match &quot;{query}&quot;
					</Typography>
				</Box>
			) : (
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: {
							xs: "1fr 1fr",
							sm: "repeat(3, 1fr)",
							md: "repeat(4, 1fr)",
						},
						gap: 2,
					}}
				>
					{filtered.map((entry) => (
						<Box
							key={entry.tag}
							sx={{
								border: "1px solid var(--mui-palette-divider)",
								p: 2,
								bgcolor: "background.paper",
								transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
								"&:hover": {
									transform: "translate(-3px, -3px)",
									boxShadow: "3px 3px 0px var(--mui-palette-text-primary)",
									borderColor: "text.primary",
								},
							}}
						>
							<TagChip tag={entry.tag} size="md" />
							<Stack direction="row" spacing={2} sx={{ mt: 1.5 }}>
								{entry.blogCount > 0 && (
									<Stack
										direction="row"
										spacing={0.5}
										sx={{ alignItems: "center" }}
									>
										<ArticleIcon
											sx={{ fontSize: "0.75rem", color: "text.disabled" }}
										/>
										<Typography
											variant="caption"
											sx={{
												fontFamily: "monospace",
												fontSize: "0.65rem",
												color: "text.disabled",
												fontWeight: 700,
											}}
										>
											{entry.blogCount}
										</Typography>
									</Stack>
								)}
								{entry.projectCount > 0 && (
									<Stack
										direction="row"
										spacing={0.5}
										sx={{ alignItems: "center" }}
									>
										<CodeIcon
											sx={{ fontSize: "0.75rem", color: "text.disabled" }}
										/>
										<Typography
											variant="caption"
											sx={{
												fontFamily: "monospace",
												fontSize: "0.65rem",
												color: "text.disabled",
												fontWeight: 700,
											}}
										>
											{entry.projectCount}
										</Typography>
									</Stack>
								)}
							</Stack>
						</Box>
					))}
				</Box>
			)}
		</Box>
	);
}
