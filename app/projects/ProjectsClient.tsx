"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
	MdSearch,
	MdGridView,
	MdFormatListBulleted,
	MdStar,
	MdLaunch,
	MdCode,
	MdTerminal,
	MdFeed,
	MdBrush,
} from "react-icons/md";
import { FaGithub } from "react-icons/fa";

import ParticleText from "@/app/extras/ParticleText";
import Navbar from "@/components/navbar/Navbar";
import TagChip from "@/components/TagChip";
import type { RepoSummary } from "@/lib/github";
import { useLanguageStore } from "@/store/languageStore";

interface ProjectsClientProps {
	initialRepos: RepoSummary[];
	isInitiallyFallback: boolean;
}

const translations = {
	en: {
		title: "PROJECTS",
		subtitle: "Explore my open-source repositories and development work.",
		searchPlaceholder: "Search repositories...",
		filterLanguage: "All Languages",
		viewGrid: "GRID",
		viewList: "LIST",
		stars: "stars",
		forks: "forks",
		noProjects: "No projects found matching your criteria.",
		fallbackWarning: "Displaying cached catalog (GitHub API rate limit hit).",
		sortBy: "Sort by",
		sortOptions: {
			updated: "Latest Update",
			stars: "Most Stars",
			name: "Alphabetical",
		},
		demo: "Live Demo",
		repo: "Repository",
	},
	bn: {
		title: "প্রজেক্টসমূহ",
		subtitle: "আমার ওপেন-সোর্স রিপোজিটরি এবং ডেভেলপমেন্ট কাজগুলো দেখুন।",
		searchPlaceholder: "রিপোজিটরি খুঁজুন...",
		filterLanguage: "সব ভাষা",
		viewGrid: "গ্রিড",
		viewList: "লিস্ট",
		stars: "স্টার",
		forks: "ফর্ক",
		noProjects: "আপনার অনুসন্ধানের সাথে মিলে এমন কোনো প্রজেক্ট পাওয়া যায়নি।",
		fallbackWarning: "স্ট্যাটিক প্রজেক্ট ক্যাটালগ দেখানো হচ্ছে (GitHub API লিমিট শেষ)।",
		sortBy: "ক্রমানুসারে",
		sortOptions: {
			updated: "সাম্প্রতিক আপডেট",
			stars: "সর্বোচ্চ স্টার",
			name: "বর্ণানুक्रमিক",
		},
		demo: "লাইভ ডেমো",
		repo: "রিপোজিটরি",
	},
};

const getLanguageIcon = (lang: string) => {
	const name = lang.toLowerCase();
	if (
		name === "typescript" ||
		name === "javascript" ||
		name === "c++" ||
		name === "c" ||
		name === "python" ||
		name === "rust"
	) {
		return <MdCode className="h-4 w-4" />;
	}
	if (name === "shell" || name === "bash") {
		return <MdTerminal className="h-4 w-4" />;
	}
	if (name === "markdown" || name === "text") {
		return <MdFeed className="h-4 w-4" />;
	}
	if (name === "css" || name === "html" || name === "astro") {
		return <MdBrush className="h-4 w-4" />;
	}
	return <MdCode className="h-4 w-4" />;
};

const getLanguageColor = (lang: string) => {
	const colors: Record<string, string> = {
		typescript: "#3178C6",
		javascript: "#F59E0B",
		css: "#A855F7",
		html: "#EF4444",
		astro: "#F97316",
		"c++": "#EC4899",
		c: "#708090",
		python: "#3B82F6",
		rust: "#E77E23",
		glsl: "#06B6D4",
		shell: "#10B981",
		markdown: "#0EA5E9",
	};
	return colors[lang.toLowerCase()] || "#00FFFF";
};

function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const check = () => setIsMobile(window.innerWidth < 768);
		check();
		window.addEventListener("resize", check);
		return () => window.removeEventListener("resize", check);
	}, []);

	return isMobile;
}

export default function ProjectsClient({
	initialRepos,
	isInitiallyFallback,
}: ProjectsClientProps) {
	const isMobile = useIsMobile();
	const language = useLanguageStore((s) => s.language);
	const t = translations[language];

	const [searchQuery, setSearchQuery] = useState("");
	const [selectedLanguage, setSelectedLanguage] = useState("All");
	const [sortBy, setSortBy] = useState<"updated" | "stars" | "name">("updated");
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	// Set tab title
	useEffect(() => {
		document.title =
			language === "en" ? "Projects | Portfolio" : "প্রকল্পসমূহ | পোর্টফোলিও";
	}, [language]);

	// Format date helper
	const formatDate = (dateStr: string) => {
		if (!dateStr) return "";
		const d = new Date(dateStr);
		return d.toLocaleDateString(language === "en" ? "en-US" : "bn-BD", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	// Compile unique languages list
	const languageList = useMemo<string[]>(() => {
		const langs = initialRepos
			.map((r) => r.language)
			.filter(
				(lang): lang is string => typeof lang === "string" && lang !== "",
			);
		return ["All", ...Array.from(new Set(langs))];
	}, [initialRepos]);

	// Process and sort repos
	const processedRepos = useMemo(() => {
		return initialRepos
			.filter((repo) => {
				const matchesSearch =
					repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					(repo.description
						?.toLowerCase()
						.includes(searchQuery.toLowerCase()) ??
						false);
				const matchesLanguage =
					selectedLanguage === "All" || repo.language === selectedLanguage;
				return matchesSearch && matchesLanguage;
			})
			.sort((a, b) => {
				if (sortBy === "stars") {
					return b.stargazers_count - a.stargazers_count;
				}
				if (sortBy === "name") {
					return a.name.localeCompare(b.name);
				}
				const dateA = new Date(a.updated_at).getTime();
				const dateB = new Date(b.updated_at).getTime();
				return dateB - dateA;
			});
	}, [initialRepos, searchQuery, selectedLanguage, sortBy]);

	return (
		<>
			<Navbar />

			<div className="max-w-7xl mx-auto px-6 md:px-16 pt-[120px] md:pt-[160px] pb-24 text-foreground relative z-10 box-border">
				{/* Animated Canvas Page Title */}
				<div className="mb-4 md:mb-5 h-[100px] md:h-[180px] relative w-full overflow-hidden">
					<ParticleText
						text={t.title}
						colorStart="var(--foreground)"
						colorEnd="var(--foreground)"
						canvasWidth={isMobile ? 2200 : 3400}
						canvasHeight={isMobile ? 2200 : 3400}
						font={
							isMobile
								? "900 280px Inter, sans-serif"
								: "900 470px Inter, sans-serif"
						}
						particleSize={0.4}
					/>
				</div>

				{/* Subtitle */}
				<p className="font-semibold text-muted-foreground mb-12 max-w-[600px] text-[15px] sm:text-[17px] leading-relaxed">
					{t.subtitle}
				</p>

				{/* Fallback warning banner */}
				{isInitiallyFallback && (
					<div className="mb-8 p-4 border-l-4 border-foreground bg-card/60 text-muted-foreground text-xs font-semibold font-mono">
						{"// "}
						{t.fallbackWarning}
					</div>
				)}

				{/* Controls Panel */}
				<div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch lg:items-center mb-10 w-full">
					{/* Left: Search Input */}
					<div className="flex items-center border border-border px-4 py-2 flex-grow max-w-full lg:max-w-md bg-card">
						<MdSearch className="h-5 w-5 text-muted-foreground mr-3 shrink-0" />
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder={t.searchPlaceholder}
							className="flex-grow bg-transparent border-none text-sm text-foreground focus:outline-none placeholder:text-muted-foreground/70"
						/>
					</div>

					{/* Right Controls */}
					<div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
						{/* Sort Select */}
						<div className="flex items-center gap-2 border border-border px-4 py-2 bg-card">
							<span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
								{t.sortBy}:
							</span>
							<select
								value={sortBy}
								onChange={(e) =>
									setSortBy(e.target.value as "updated" | "stars" | "name")
								}
								className="bg-transparent border-none outline-none text-[11px] font-bold text-foreground cursor-pointer uppercase font-mono"
							>
								<option value="updated" className="bg-background">
									{t.sortOptions.updated}
								</option>
								<option value="stars" className="bg-background">
									{t.sortOptions.stars}
								</option>
								<option value="name" className="bg-background">
									{t.sortOptions.name}
								</option>
							</select>
						</div>

						{/* View Mode Toggle */}
						<div className="flex border border-border relative overflow-hidden h-10 items-center bg-card">
							<button
								onClick={() => setViewMode("grid")}
								className={`flex items-center gap-2 px-6 h-full text-[11px] font-bold tracking-widest relative z-[2] transition-colors duration-250 select-none ${
									viewMode === "grid" ? "text-background" : "text-foreground"
								}`}
							>
								<MdGridView className="h-4 w-4" />
								{t.viewGrid}
							</button>
							<button
								onClick={() => setViewMode("list")}
								className={`flex items-center gap-2 px-6 h-full text-[11px] font-bold tracking-widest relative z-[2] transition-colors duration-250 select-none ${
									viewMode === "list" ? "text-background" : "text-foreground"
								}`}
							>
								<MdFormatListBulleted className="h-4 w-4" />
								{t.viewList}
							</button>
							<motion.div
								animate={{ x: viewMode === "grid" ? 0 : "100%" }}
								transition={{ type: "spring", stiffness: 380, damping: 28 }}
								className="absolute top-0 bottom-0 left-0 w-1/2 bg-foreground z-[1]"
							/>
						</div>
					</div>
				</div>

				{/* Language Filter Tags */}
				{initialRepos.length > 0 && (
					<div className="flex flex-wrap gap-3 overflow-x-auto pb-4 mb-10 max-w-full scrollbar-none">
						{languageList.map((lang) => {
							const isSelected = selectedLanguage === lang;
							return (
								<button
									key={lang}
									onClick={() => setSelectedLanguage(lang)}
									className={`px-4 py-2 border text-[11px] font-extrabold font-mono transition-all duration-200 cursor-pointer ${
										isSelected
											? "border-foreground bg-foreground text-background"
											: "border-border bg-transparent text-foreground hover:border-foreground hover:-translate-y-[1px]"
									}`}
								>
									{lang === "All" ? t.filterLanguage : lang.toUpperCase()}
								</button>
							);
						})}
					</div>
				)}

				{/* Repos Catalog Display */}
				<AnimatePresence mode="wait">
					{viewMode === "grid" ? (
						/* Grid View */
						<motion.div
							key="grid-view"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
						>
							{processedRepos.map((repo, index) => {
								const accentColor = "var(--foreground)";
								return (
									<motion.div
										key={repo.id}
										initial={{ opacity: 0, y: 15 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.4,
											delay: Math.min(index * 0.05, 0.4),
										}}
										whileHover={{ y: -6 }}
										className="relative bg-card border border-border p-6 min-h-[230px] flex flex-col justify-between overflow-hidden transition-all duration-250 hover:border-foreground hover:shadow-[6px_6px_0px_var(--foreground)]"
									>
										{/* Noise pattern overlay */}
										<div
											className="absolute inset-0 opacity-[0.035] pointer-events-none z-0"
											style={{
												background:
													"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
											}}
										/>

										{/* Giant background text */}
										<span
											className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-foreground opacity-[0.04] dark:opacity-[0.025] z-0 pointer-events-none select-none uppercase tracking-wide"
											style={{
												fontSize: repo.name.length > 12 ? "44px" : "60px",
											}}
										>
											{repo.name.slice(0, 11)}
										</span>

										{/* Accent Corner Brackets */}
										<div className="absolute top-3.5 left-3.5 w-3 h-3 border-t-[2.5px] border-l-[2.5px] border-border transition-colors duration-200" />
										<div className="absolute bottom-3.5 right-3.5 w-3 h-3 border-b-[2.5px] border-r-[2.5px] border-border transition-colors duration-200" />

										{/* Upper row */}
										<div className="relative z-10 flex justify-between items-center mb-4">
											<div className="flex items-center gap-2">
												<span
													className="flex items-center"
													style={{
														color: getLanguageColor(repo.language || ""),
													}}
												>
													{getLanguageIcon(repo.language || "")}
												</span>
												<span className="text-[10px] font-bold font-mono tracking-wider text-muted-foreground">
													{repo.language
														? repo.language.toUpperCase()
														: "UNKNOWN"}
												</span>
											</div>
											<span className="text-[10px] font-semibold text-muted-foreground">
												{formatDate(repo.updated_at)}
											</span>
										</div>

										{/* Title */}
										<h3 className="relative z-10 font-extrabold text-lg tracking-tight mb-2 truncate uppercase text-foreground">
											<Link
												href={`/projects/${repo.name}`}
												className="hover:underline"
											>
												{repo.name}
											</Link>
										</h3>

										{/* Description */}
										<p className="relative z-10 text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-3 h-[60px]">
											{repo.description ||
												(language === "en"
													? "No repository description provided."
													: "কোনো বিবরণ প্রদান করা হয়নি।")}
										</p>

										{/* Tags */}
										{repo.topics && repo.topics.length > 0 && (
											<div className="relative z-10 flex flex-wrap gap-1.5 mb-4">
												{repo.topics.slice(0, 4).map((topic) => (
													<TagChip key={topic} tag={topic} />
												))}
												{repo.topics.length > 4 && (
													<span className="text-[10px] font-bold font-mono text-muted-foreground self-center">
														+{repo.topics.length - 4}
													</span>
												)}
											</div>
										)}

										{/* Stats & Links Footer */}
										<div className="relative z-10 flex justify-between items-center mt-auto pt-4 border-t border-border/50">
											{/* Stars */}
											<div className="flex items-center gap-1.5">
												<MdStar className="h-4 w-4 text-muted-foreground" />
												<span className="text-xs font-bold font-mono text-muted-foreground">
													{repo.stargazers_count}
												</span>
											</div>

											{/* Links */}
											<div className="flex items-center gap-4">
												<a
													href={repo.html_url}
													target="_blank"
													rel="noopener noreferrer"
													aria-label={t.repo}
													className="text-foreground hover:opacity-70 transition-opacity"
												>
													<FaGithub className="h-[17px] w-[17px]" />
												</a>
												{repo.homepage && (
													<a
														href={repo.homepage}
														target="_blank"
														rel="noopener noreferrer"
														aria-label={t.demo}
														className="text-foreground hover:opacity-70 transition-opacity"
													>
														<MdLaunch className="h-[17px] w-[17px]" />
													</a>
												)}
											</div>
										</div>
									</motion.div>
								);
							})}
						</motion.div>
					) : (
						/* List View */
						<motion.div
							key="list-view"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="flex flex-col gap-6 w-full"
						>
							{processedRepos.map((repo, index) => {
								return (
									<motion.div
										key={repo.id}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.3,
											delay: Math.min(index * 0.04, 0.3),
										}}
										whileHover={{ x: 8 }}
										className="relative bg-card border border-border p-6 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6 overflow-hidden transition-all duration-200 hover:border-foreground hover:shadow-[4px_4px_0px_var(--foreground)]"
									>
										{/* Noise pattern overlay */}
										<div
											className="absolute inset-0 opacity-[0.035] pointer-events-none z-0"
											style={{
												background:
													"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
											}}
										/>

										{/* Left: Info */}
										<div className="relative z-10 flex-grow max-w-full lg:max-w-[60%]">
											<h3 className="font-extrabold text-lg tracking-tight mb-2 uppercase text-foreground">
												<Link
													href={`/projects/${repo.name}`}
													className="hover:underline"
												>
													{repo.name}
												</Link>
											</h3>
											<p className="text-muted-foreground text-xs leading-relaxed mb-4">
												{repo.description ||
													(language === "en"
														? "No repository description provided."
														: "কোনো বিবরণ প্রদান করা হয়নি।")}
											</p>
											{repo.topics && repo.topics.length > 0 && (
												<div className="flex flex-wrap gap-1.5">
													{repo.topics.slice(0, 4).map((topic) => (
														<TagChip key={topic} tag={topic} />
													))}
													{repo.topics.length > 4 && (
														<span className="text-[10px] font-bold font-mono text-muted-foreground self-center">
															+{repo.topics.length - 4}
														</span>
													)}
												</div>
											)}
										</div>

										{/* Right: Metadata & Links */}
										<div className="relative z-10 flex flex-row items-center justify-between gap-6 min-w-full lg:min-w-[38%] pt-4 lg:pt-0 border-t lg:border-t-0 border-border/50">
											<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
												<div className="flex gap-4 items-center">
													<div className="flex items-center gap-1.5">
														<span
															className="flex items-center"
															style={{
																color: getLanguageColor(repo.language || ""),
															}}
														>
															{getLanguageIcon(repo.language || "")}
														</span>
														<span className="text-[10px] font-bold font-mono tracking-wider text-muted-foreground">
															{repo.language
																? repo.language.toUpperCase()
																: "UNKNOWN"}
														</span>
													</div>
													<span className="text-[10px] font-semibold text-muted-foreground">
														{formatDate(repo.updated_at)}
													</span>
												</div>
												<div className="flex items-center gap-1.5">
													<MdStar className="h-4 w-4 text-muted-foreground" />
													<span className="text-xs font-bold font-mono text-muted-foreground">
														{repo.stargazers_count}
													</span>
												</div>
											</div>

											<div className="flex items-center gap-4">
												<a
													href={repo.html_url}
													target="_blank"
													rel="noopener noreferrer"
													aria-label={t.repo}
													className="text-foreground hover:opacity-70 transition-opacity"
												>
													<FaGithub className="h-[17px] w-[17px]" />
												</a>
												{repo.homepage && (
													<a
														href={repo.homepage}
														target="_blank"
														rel="noopener noreferrer"
														aria-label={t.demo}
														className="text-foreground hover:opacity-70 transition-opacity"
													>
														<MdLaunch className="h-[17px] w-[17px]" />
													</a>
												)}
											</div>
										</div>
									</motion.div>
								);
							})}
						</motion.div>
					)}
				</AnimatePresence>

				{/* Empty Search/Filter results state */}
				{processedRepos.length === 0 && (
					<div className="flex flex-col items-center justify-center py-20 w-full">
						<span className="font-bold text-sm font-mono text-muted-foreground">
							{"// "}
							{t.noProjects}
						</span>
					</div>
				)}
			</div>
		</>
	);
}
