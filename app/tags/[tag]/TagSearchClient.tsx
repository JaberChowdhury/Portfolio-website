"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArticleIcon from "@mui/icons-material/Article";
import CodeIcon from "@mui/icons-material/Code";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SearchIcon from "@mui/icons-material/Search";
import {
	Box,
	CircularProgress,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import TagChip from "@/components/TagChip";

interface BlogResult {
	type: "blog";
	title: string;
	route: string;
	description?: string;
	date?: string;
	author?: string;
	tags: string[];
}

interface ProjectResult {
	type: "project";
	name: string;
	description: string | null;
	html_url: string;
	route: string;
	language: string | null;
	stars: number;
	topics: string[];
	updated_at: string;
}

type SearchResult = BlogResult | ProjectResult;

interface TagSearchClientProps {
	tag: string;
}

export default function TagSearchClient({ tag }: TagSearchClientProps) {
	const [allResults, setAllResults] = useState<SearchResult[]>([]);
	const [loading, setLoading] = useState(true);
	const [query, setQuery] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	// Auto-focus search input on mount
	useEffect(() => {
		const timer = setTimeout(() => {
			inputRef.current?.focus();
		}, 300);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		async function load() {
			setLoading(true);
			try {
				const projectsRes = await fetch("/api/projects");
				const projectsData = await projectsRes.json();

				// Fetch blog posts via dedicated route
				const blogRes = await fetch("/api/blog-posts");
				const blogData = await blogRes.json();

				const results: SearchResult[] = [];

				// Add matching blog posts
				for (const post of blogData.posts ?? []) {
					const postTags: string[] = (post.tags ?? []).map((t: string) =>
						t.toLowerCase().trim(),
					);
					if (postTags.includes(tag)) {
						results.push({
							type: "blog",
							title: post.title ?? post.name,
							route: post.route,
							description: post.description,
							date: post.date,
							author: post.author,
							tags: postTags,
						});
					}
				}

				// Add matching projects (topics)
				const projects = Array.isArray(projectsData) ? projectsData : [];
				for (const project of projects) {
					const topics: string[] = (project.topics ?? []).map((t: string) =>
						t.toLowerCase().trim(),
					);
					if (topics.includes(tag)) {
						results.push({
							type: "project",
							name: project.name,
							description: project.description,
							html_url: project.html_url,
							route: `/projects/${project.name}`,
							language: project.language,
							stars: project.stargazers_count ?? 0,
							topics,
							updated_at: project.updated_at,
						});
					}
				}

				setAllResults(results);
			} catch (err) {
				console.error("Failed to load tag search results:", err);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, [tag]);

	const filtered = query.trim()
		? allResults.filter((r) => {
				const q = query.toLowerCase().trim();
				if (r.type === "blog") {
					return (
						r.title.toLowerCase().includes(q) ||
						(r.description?.toLowerCase().includes(q) ?? false) ||
						r.tags.some((t) => t.includes(q))
					);
				}
				return (
					r.name.toLowerCase().includes(q) ||
					(r.description?.toLowerCase().includes(q) ?? false) ||
					r.topics.some((t) => t.includes(q))
				);
			})
		: allResults;

	const blogResults = filtered.filter((r) => r.type === "blog") as BlogResult[];
	const projectResults = filtered.filter(
		(r) => r.type === "project",
	) as ProjectResult[];

	return (
		<Box>
			{/* Back Navigation */}
			<Box sx={{ mb: 4 }}>
				<Link
					href="/tags"
					style={{
						display: "inline-flex",
						alignItems: "center",
						gap: "0.4rem",
						fontFamily: "monospace",
						fontSize: "0.75rem",
						fontWeight: 700,
						letterSpacing: "0.08em",
						color: "inherit",
						textDecoration: "none",
						opacity: 0.6,
					}}
				>
					<ArrowBackIcon sx={{ fontSize: "0.85rem" }} />
					ALL TAGS
				</Link>
			</Box>

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
					<Typography
						variant="caption"
						sx={{
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: "0.15em",
							color: "text.secondary",
						}}
					>
						TAG SEARCH
					</Typography>
					<Typography
						variant="caption"
						sx={{
							fontFamily: "monospace",
							color: "text.disabled",
							userSelect: "none",
						}}
						aria-hidden
					>
						{"//"}
					</Typography>
					<TagChip tag={tag} size="md" />
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
					#{tag}
				</Typography>
				{!loading && (
					<Typography
						variant="body1"
						sx={{
							color: "text.secondary",
							fontFamily: "monospace",
							fontSize: "0.85rem",
						}}
					>
						{allResults.length} result{allResults.length !== 1 ? "s" : ""} found
						{" — "}
						{blogResults.length} article{blogResults.length !== 1 ? "s" : ""},{" "}
						{projectResults.length} project
						{projectResults.length !== 1 ? "s" : ""}
					</Typography>
				)}
			</Box>

			{/* Search Bar */}
			<TextField
				fullWidth
				inputRef={inputRef}
				placeholder={`Search within #${tag}...`}
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
					mb: 6,
					"& .MuiOutlinedInput-root": {
						borderRadius: 0,
						fontFamily: "monospace",
						fontSize: "0.9rem",
						"& fieldset": { borderColor: "var(--mui-palette-divider)" },
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

			{loading ? (
				<Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
					<CircularProgress size={32} thickness={2} />
				</Box>
			) : filtered.length === 0 ? (
				<Box
					sx={{
						py: 10,
						textAlign: "center",
						border: "2px dashed var(--mui-palette-divider)",
					}}
				>
					<Typography sx={{ color: "text.secondary", fontFamily: "monospace" }}>
						No results found for &quot;{query}&quot;
					</Typography>
				</Box>
			) : (
				<Stack spacing={8}>
					{/* Blog Results */}
					{blogResults.length > 0 && (
						<Box>
							<Stack
								direction="row"
								spacing={1.5}
								sx={{ alignItems: "center", mb: 3 }}
							>
								<ArticleIcon
									sx={{ fontSize: "1rem", color: "text.secondary" }}
								/>
								<Typography
									variant="caption"
									sx={{
										fontFamily: "monospace",
										fontWeight: 800,
										letterSpacing: "0.12em",
										color: "text.secondary",
									}}
								>
									ARTICLES ({blogResults.length})
								</Typography>
							</Stack>
							<Stack spacing={3}>
								{blogResults.map((post) => (
									<Box
										key={post.route}
										component="article"
										sx={{
											border: "1px solid var(--mui-palette-divider)",
											p: { xs: 3, md: 4 },
											bgcolor: "background.paper",
											transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
											"&:hover": {
												transform: "translate(-5px, -5px)",
												boxShadow:
													"5px 5px 0px var(--mui-palette-text-primary)",
												borderColor: "text.primary",
											},
										}}
									>
										{post.date && (
											<Typography
												variant="caption"
												component="time"
												dateTime={post.date}
												sx={{
													fontFamily: "monospace",
													fontWeight: 700,
													color: "text.secondary",
													letterSpacing: "0.05em",
													display: "block",
													mb: 1,
												}}
											>
												{new Date(post.date).toLocaleDateString("en-US", {
													year: "numeric",
													month: "long",
													day: "numeric",
												})}
											</Typography>
										)}
										<Typography
											variant="h5"
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
												style={{ color: "inherit", textDecoration: "none" }}
											>
												{post.title}
											</Link>
										</Typography>
										{post.description && (
											<Typography
												variant="body2"
												sx={{ color: "text.secondary", lineHeight: 1.7, mb: 2 }}
											>
												{post.description}
											</Typography>
										)}
										<Stack
											direction="row"
											spacing={1}
											sx={{ flexWrap: "wrap", gap: 0.75 }}
										>
											{post.tags.map((t) => (
												<TagChip key={t} tag={t} />
											))}
										</Stack>
									</Box>
								))}
							</Stack>
						</Box>
					)}

					{/* Project Results */}
					{projectResults.length > 0 && (
						<Box>
							<Stack
								direction="row"
								spacing={1.5}
								sx={{ alignItems: "center", mb: 3 }}
							>
								<CodeIcon sx={{ fontSize: "1rem", color: "text.secondary" }} />
								<Typography
									variant="caption"
									sx={{
										fontFamily: "monospace",
										fontWeight: 800,
										letterSpacing: "0.12em",
										color: "text.secondary",
									}}
								>
									PROJECTS ({projectResults.length})
								</Typography>
							</Stack>
							<Stack spacing={3}>
								{projectResults.map((project) => (
									<Box
										key={project.name}
										sx={{
											border: "1px solid var(--mui-palette-divider)",
											p: { xs: 3, md: 4 },
											bgcolor: "background.paper",
											transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
											"&:hover": {
												transform: "translate(-5px, -5px)",
												boxShadow:
													"5px 5px 0px var(--mui-palette-text-primary)",
												borderColor: "text.primary",
											},
										}}
									>
										<Stack
											direction="row"
											sx={{
												justifyContent: "space-between",
												alignItems: "flex-start",
												mb: 1.5,
											}}
										>
											<Typography
												variant="h5"
												sx={{
													fontWeight: 800,
													fontFamily: "monospace",
													letterSpacing: "-0.01em",
													textTransform: "uppercase",
												}}
											>
												<Link
													href={project.route}
													style={{ color: "inherit", textDecoration: "none" }}
												>
													{project.name}
												</Link>
											</Typography>
											<Stack
												direction="row"
												spacing={1}
												sx={{ alignItems: "center" }}
											>
												{project.language && (
													<Typography
														variant="caption"
														sx={{
															fontFamily: "monospace",
															fontSize: "0.65rem",
															fontWeight: 700,
															color: "text.disabled",
															letterSpacing: "0.05em",
															border: "1px solid var(--mui-palette-divider)",
															px: 1,
															py: 0.25,
														}}
													>
														{project.language.toUpperCase()}
													</Typography>
												)}
												<Box
													component="a"
													href={project.html_url}
													target="_blank"
													rel="noreferrer"
													sx={{
														color: "text.secondary",
														"&:hover": { color: "text.primary" },
														display: "flex",
													}}
													aria-label={`Open ${project.name} on GitHub`}
												>
													<OpenInNewIcon sx={{ fontSize: "0.9rem" }} />
												</Box>
											</Stack>
										</Stack>
										{project.description && (
											<Typography
												variant="body2"
												sx={{ color: "text.secondary", lineHeight: 1.7, mb: 2 }}
											>
												{project.description}
											</Typography>
										)}
										{project.topics.length > 0 && (
											<Stack
												direction="row"
												spacing={1}
												sx={{ flexWrap: "wrap", gap: 0.75 }}
											>
												{project.topics.map((t) => (
													<TagChip key={t} tag={t} />
												))}
											</Stack>
										)}
									</Box>
								))}
							</Stack>
						</Box>
					)}
				</Stack>
			)}
		</Box>
	);
}
