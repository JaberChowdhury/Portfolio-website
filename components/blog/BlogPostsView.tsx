"use client";

import {
	Box,
	Stack,
	TextField,
	IconButton,
	Typography,
	InputAdornment,
	TextFieldProps,
} from "@mui/material";
import Link from "next/link";
import TagChip from "@/components/TagChip";
import { useState, useMemo } from "react";
import { GridView, ViewWeek } from "@mui/icons-material";
import type { BlogPost } from "@/app/blog/get-posts";

interface BlogPostsViewProps {
	posts: BlogPost[];
}

type ViewMode = "grid" | "list";

export default function BlogPostsView({ posts }: BlogPostsViewProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [viewMode, setViewMode] = useState<ViewMode>("list");

	const filteredPosts = useMemo(() => {
		if (!searchQuery.trim()) return posts;

		const query = searchQuery.toLowerCase();
		return posts.filter(
			(post) =>
				post.frontMatter.title?.toLowerCase().includes(query) ||
				post.frontMatter.description?.toLowerCase().includes(query) ||
				post.frontMatter.tags?.some((tag: string) =>
					tag.toLowerCase().includes(query),
				) ||
				post.name.toLowerCase().includes(query),
		);
	}, [posts, searchQuery]);

	return (
		<Box>
			{/* Search Bar and View Toggle */}
			<Box
				sx={{
					mb: 5,
					display: "flex",
					gap: 2,
					alignItems: "center",
					justifyContent: "space-between",
					flexWrap: "wrap",
				}}
			>
				<TextField
					{...({
						placeholder: "Search posts by title, tags, or description...",
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value),
						size: "small",
						sx: {
							flex: 1,
							minWidth: "250px",
							"& .MuiOutlinedInput-root": {
								fontFamily: "monospace",
							},
						},
						InputProps: {
							startAdornment: (
								<InputAdornment position="start">
									<Typography sx={{ color: "text.secondary" }}>🔍</Typography>
								</InputAdornment>
							),
						},
					} as TextFieldProps)}
				/>

				{/* View Toggle Buttons */}
				<Stack direction="row" spacing={0.5}>
					<IconButton
						size="small"
						onClick={() => setViewMode("list")}
						sx={{
							border: "1px solid var(--mui-palette-divider)",
							backgroundColor:
								viewMode === "list" ? "action.selected" : "background.paper",
							"&:hover": {
								backgroundColor:
									viewMode === "list" ? "action.selected" : "action.hover",
							},
						}}
						title="List View"
					>
						<ViewWeek fontSize="small" />
					</IconButton>
					<IconButton
						size="small"
						onClick={() => setViewMode("grid")}
						sx={{
							border: "1px solid var(--mui-palette-divider)",
							backgroundColor:
								viewMode === "grid" ? "action.selected" : "background.paper",
							"&:hover": {
								backgroundColor:
									viewMode === "grid" ? "action.selected" : "action.hover",
							},
						}}
						title="Grid View"
					>
						<GridView fontSize="small" />
					</IconButton>
				</Stack>
			</Box>

			{/* Posts Display */}
			{filteredPosts.length === 0 ? (
				<Box
					sx={{
						py: 8,
						px: 4,
						textAlign: "center",
						border: "2px dashed var(--mui-palette-divider)",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 2,
					}}
				>
					<Typography sx={{ opacity: 0.6, fontSize: "1.1rem" }}>
						{searchQuery
							? "No posts found matching your search."
							: "No posts published yet."}
					</Typography>
					{!searchQuery && (
						<Link
							href="/blog/posts/hello-world"
							style={{
								fontSize: "0.95rem",
								color: "inherit",
								fontWeight: 700,
								textDecoration: "underline",
							}}
						>
							Read the Hello World sample post →
						</Link>
					)}
				</Box>
			) : (
				<Box
					sx={
						viewMode === "grid"
							? {
									display: "grid",
									gridTemplateColumns: {
										xs: "1fr",
										sm: "repeat(2, 1fr)",
										lg: "repeat(3, 1fr)",
									},
									gap: 3,
								}
							: {}
					}
				>
					{viewMode === "list" ? (
						<Stack spacing={4}>
							{filteredPosts.map((post) => (
								<PostCard key={post.route} post={post} />
							))}
						</Stack>
					) : (
						filteredPosts.map((post) => (
							<PostCard key={post.route} post={post} />
						))
					)}
				</Box>
			)}

			{/* Search Results Info */}
			{searchQuery && filteredPosts.length > 0 && (
				<Typography
					variant="caption"
					sx={{
						display: "block",
						mt: 3,
						color: "text.secondary",
						textAlign: "center",
					}}
				>
					Found {filteredPosts.length} post
					{filteredPosts.length !== 1 ? "s" : ""} matching "{searchQuery}"
				</Typography>
			)}
		</Box>
	);
}

function PostCard({ post }: { post: BlogPost }) {
	return (
		<Box
			component="article"
			sx={{
				border: "1px solid var(--mui-palette-divider)",
				p: 4,
				bgcolor: "background.paper",
				transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
				"&:hover": {
					transform: "translate(-6px, -6px)",
					boxShadow: "6px 6px 0px var(--mui-palette-text-primary)",
					borderColor: "text.primary",
				},
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Stack
				direction="row"
				spacing={1.5}
				sx={{ mb: 1.5, alignItems: "center", flexWrap: "wrap" }}
			>
				<Typography
					variant="caption"
					component="time"
					dateTime={post.frontMatter.date}
					sx={{
						color: "text.secondary",
						fontWeight: 700,
						letterSpacing: "0.05em",
					}}
				>
					{post.frontMatter.date
						? new Date(post.frontMatter.date).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})
						: "Draft"}
				</Typography>
				{post.frontMatter.author && (
					<>
						<Typography
							variant="caption"
							sx={{ color: "text.secondary", opacity: 0.5 }}
						>
							•
						</Typography>
						<Typography
							variant="caption"
							sx={{
								color: "text.secondary",
								fontWeight: 700,
								letterSpacing: "0.05em",
							}}
						>
							BY {post.frontMatter.author.toUpperCase()}
						</Typography>
					</>
				)}
			</Stack>

			<Typography
				variant="h4"
				sx={{
					fontWeight: 800,
					mb: 1.5,
					fontFamily: "inherit",
					letterSpacing: "-0.01em",
					textTransform: "uppercase",
				}}
			>
				<Link
					href={post.route}
					style={{
						color: "inherit",
						textDecoration: "none",
					}}
				>
					{post.frontMatter.title || post.name}
				</Link>
			</Typography>

			{post.frontMatter.description && (
				<Typography
					variant="body1"
					sx={{ color: "text.secondary", lineHeight: 1.7, mb: 2, flex: 1 }}
				>
					{post.frontMatter.description}
				</Typography>
			)}

			{post.frontMatter.tags && post.frontMatter.tags.length > 0 && (
				<Stack
					direction="row"
					spacing={1}
					sx={{
						mt: "auto",
						pt: 2,
						flexWrap: "wrap",
						gap: 0.75,
						alignItems: "center",
					}}
				>
					<Typography
						variant="caption"
						sx={{
							fontFamily: "monospace",
							fontWeight: 700,
							color: "text.secondary",
							letterSpacing: "0.1em",
							fontSize: "0.65rem",
							mr: 0.5,
						}}
					>
						{"TAGS //"}
					</Typography>
					{post.frontMatter.tags.map((tag: string) => (
						<TagChip key={tag} tag={tag} />
					))}
				</Stack>
			)}
		</Box>
	);
}
