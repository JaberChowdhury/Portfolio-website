"use client";

import { Container } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import Navbar from "@/components/navbar/Navbar";
import BranchSelector from "@/components/projects/BranchSelector";
import BrowserPreview from "@/components/projects/BrowserPreview";
import ProjectHeader from "@/components/projects/ProjectHeader";
import ProjectVisualizations from "@/components/projects/ProjectVisualizations";
import ReadmeRenderer from "@/components/projects/ReadmeRenderer";
import { detailTranslations } from "@/data/projectTranslations";
import type { CombinedRepo } from "@/lib/github";
import { useLanguageStore } from "@/store/languageStore";

interface ProjectDetailClientProps {
	repoName: string;
	activeBranchName: string;
}

export default function ProjectDetailClient({
	repoName,
	activeBranchName,
}: ProjectDetailClientProps) {
	const language = useLanguageStore((s) => s.language);
	const t = detailTranslations[language];

	const [repoInfo, setRepoInfo] = useState<CombinedRepo | null>(null);
	const [loadingRepo, setLoadingRepo] = useState<boolean>(true);
	const [errorRepo, setErrorRepo] = useState<string | null>(null);

	// Local state to store readmes (pre-rendered or dynamically compiled client-side)
	const [readmesMap, setReadmesMap] = useState<Record<string, string>>({});
	const [loadingReadme, setLoadingReadme] = useState(false);

	useEffect(() => {
		let isMounted = true;
		const fetchRepoDetails = async () => {
			setLoadingRepo(true);
			setErrorRepo(null);
			try {
				const res = await fetch(`/api/projects/${repoName}`);
				if (!res.ok) {
					throw new Error(`Failed to fetch project details: ${res.status}`);
				}
				const data: CombinedRepo = await res.json();
				if (isMounted) {
					setRepoInfo(data);

					const initialMap: Record<string, string> = {};
					if (data.readmes) {
						for (const item of data.readmes) {
							initialMap[item.name] = item.readmeHtml;
						}
					}
					setReadmesMap(initialMap);
				}
			} catch (err) {
				console.error("Error fetching repository details on client:", err);
				if (isMounted) {
					const errorMessage =
						err instanceof Error
							? err.message
							: "Failed to load project details";
					setErrorRepo(errorMessage);
				}
			} finally {
				if (isMounted) {
					setLoadingRepo(false);
				}
			}
		};

		fetchRepoDetails();

		return () => {
			isMounted = false;
		};
	}, [repoName]);

	const hasReadme = !!readmesMap[activeBranchName];

	useEffect(() => {
		if (!repoInfo || hasReadme) return;

		let isMounted = true;
		const fetchReadme = async () => {
			setLoadingReadme(true);
			try {
				const res = await fetch(
					`/api/projects/readme?repo=${repoName}&branch=${activeBranchName}`,
				);
				if (!res.ok) {
					throw new Error("Failed to fetch branch readme from API route");
				}

				const data = await res.json();
				const compiledHtml = data.readmeHtml;

				if (isMounted) {
					setReadmesMap((prev) => ({
						...prev,
						[activeBranchName]: compiledHtml,
					}));
				}
			} catch (err) {
				console.error("Failed to fetch branch readme from API:", err);
				if (isMounted) {
					setReadmesMap((prev) => ({
						...prev,
						[activeBranchName]: `<h3>Error</h3><p>Could not retrieve or render the README.md for branch <strong>${activeBranchName}</strong>.</p>`,
					}));
				}
			} finally {
				if (isMounted) {
					setLoadingReadme(false);
				}
			}
		};

		fetchReadme();

		return () => {
			isMounted = false;
		};
	}, [activeBranchName, repoName, hasReadme, repoInfo]);

	if (loadingRepo || !repoInfo) {
		return (
			<>
				<Navbar />
				<Container
					maxWidth="lg"
					sx={{
						pt: { xs: "120px", md: "160px" },
						pb: "100px",
						minHeight: "100vh",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						position: "relative",
						zIndex: 10,
						boxSizing: "border-box",
					}}
				>
					<Loading />
				</Container>
			</>
		);
	}

	if (errorRepo) {
		return (
			<>
				<Navbar />
				<Container
					maxWidth="lg"
					sx={{
						pt: { xs: "120px", md: "160px" },
						pb: "100px",
						minHeight: "100vh",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						position: "relative",
						zIndex: 10,
						boxSizing: "border-box",
					}}
				>
					<h2 style={{ color: "var(--mui-palette-error-main)" }}>Error</h2>
					<p>{errorRepo}</p>
				</Container>
			</>
		);
	}

	const allBranches = repoInfo.branches || [
		{ name: repoInfo.default_branch || "main" },
	];

	return (
		<>
			<Navbar />

			<Container
				maxWidth="lg"
				sx={{
					pt: { xs: "120px", md: "160px" },
					pb: "100px",
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
					position: "relative",
					zIndex: 10,
					boxSizing: "border-box",
				}}
			>
				{/* 1. Project Title, Description, and Stats Badges */}
				<ProjectHeader repoInfo={repoInfo} t={t} language={language} />

				{/* 2. Branch Selector (Horizontal Branch Tab Pills only, placed at the top of stats) */}
				<BranchSelector
					repoName={repoInfo.name}
					allBranches={allBranches}
					activeBranchName={activeBranchName}
					t={t}
				/>

				{/* 3. Repository Visualizations (Charts & Feed) */}
				<ProjectVisualizations
					repoInfo={repoInfo}
					activeBranchName={activeBranchName}
					t={t}
					language={language}
				/>

				{/* 4. Simulated Live Website Preview Mock Browser Canvas */}
				{repoInfo.homepage && (
					<BrowserPreview
						homepage={repoInfo.homepage}
						repoName={repoInfo.name}
						t={t}
					/>
				)}

				{/* 5. README content / Markdown Renderer (placed at the bottom, after the canvas view) */}
				<AnimatePresence mode="wait">
					{loadingReadme ? (
						<motion.div
							key="loading-readme"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.35, ease: "easeInOut" }}
						>
							<Loading />
						</motion.div>
					) : (
						<motion.div
							key={activeBranchName}
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -15 }}
							transition={{ duration: 0.45, ease: "easeOut" }}
							style={{ width: "100%" }}
						>
							<ReadmeRenderer html={readmesMap[activeBranchName] || ""} />
						</motion.div>
					)}
				</AnimatePresence>
			</Container>
		</>
	);
}
