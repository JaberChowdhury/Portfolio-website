"use client";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {
	Box,
	Drawer,
	IconButton,
	Stack,
	Tooltip,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguageStore } from "@/store/languageStore";

// ── Helpers ──────────────────────────────────────────────────────────
interface Section {
	id: string;
	labelEn: string;
	labelBn: string;
	level: number; // 2 = h2, 3 = h3
}

const slugify = (text: string) =>
	text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

// ── Component ────────────────────────────────────────────────────────
export default function BlogSidebar() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const language = useLanguageStore((s) => s.language);

	const [sections, setSections] = useState<Section[]>([]);
	const [activeSection, setActiveSection] = useState("");
	const [isExpanded, setIsExpanded] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	// ── Build sections from headings inside #blog-post-content ────────
	useEffect(() => {
		const content = document.getElementById("blog-post-content");
		if (!content) return;

		const headingElements = Array.from(
			content.querySelectorAll("h2, h3"),
		) as HTMLElement[];

		const usedIds = new Set<string>();
		const secs: Section[] = headingElements.map((el, idx) => {
			let id = el.id || slugify(el.innerText);
			// Guarantee uniqueness
			while (usedIds.has(id)) {
				id = `${id}-${idx}`;
			}
			usedIds.add(id);
			if (!el.id) el.id = id;

			return {
				id,
				labelEn: el.innerText,
				labelBn: el.innerText, // fallback – replace with real translations later
				level: el.tagName === "H2" ? 2 : 3,
			};
		});

		setSections(secs);
		if (secs.length) setActiveSection(secs[0].id);
	}, []);

	// ── IntersectionObserver scroll-spy ────────────────────────────────
	useEffect(() => {
		if (!sections.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				}
			},
			{ root: null, rootMargin: "-25% 0px -55% 0px", threshold: 0 },
		);

		for (const sec of sections) {
			const el = document.getElementById(sec.id);
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
	}, [sections]);

	// ── Scroll handler ────────────────────────────────────────────────
	const handleScrollTo = (id: string) => {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: "smooth" });
			setActiveSection(id);
			setMobileOpen(false);
		}
	};

	// ── Render nav links (used in expanded & mobile views) ────────────
	const renderLinks = (fontSize = "0.75rem") =>
		sections.map((sec, idx) => {
			const label = language === "en" ? sec.labelEn : sec.labelBn;
			const isActive = activeSection === sec.id;

			return (
				<Box
					key={`${sec.id}-${idx}`}
					onClick={() => handleScrollTo(sec.id)}
					sx={{
						cursor: "pointer",
						py: 0.75,
						px: 1.5,
						pl: sec.level === 3 ? 3 : 1.5, // indent h3
						borderLeft: isActive
							? "3px solid var(--mui-palette-text-primary)"
							: "3px solid transparent",
						bgcolor: isActive ? "action.selected" : "transparent",
						transition: "all 0.15s ease-out",
						"&:hover": {
							bgcolor: "action.hover",
							borderLeftColor: isActive
								? "var(--mui-palette-text-primary)"
								: "var(--mui-palette-divider)",
						},
					}}
				>
					<Typography
						sx={{
							fontFamily: "monospace",
							fontSize,
							fontWeight: isActive ? 800 : 500,
							color: isActive ? "text.primary" : "text.secondary",
							letterSpacing: "0.08em",
							textTransform: "uppercase",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
						}}
					>
						{label}
					</Typography>
				</Box>
			);
		});

	// Don't render anything if there are no headings
	if (!sections.length) return null;

	// ── Mobile: floating FAB + bottom drawer ──────────────────────────
	if (isMobile) {
		return (
			<>
				<IconButton
					onClick={() => setMobileOpen(true)}
					sx={{
						position: "fixed",
						right: 20,
						bottom: 20,
						zIndex: 90,
						bgcolor: "text.primary",
						color: "background.default",
						border: "1px solid var(--mui-palette-divider)",
						borderRadius: 0,
						boxShadow: "3px 3px 0px var(--mui-palette-action-focus)",
						width: 48,
						height: 48,
						"&:hover": {
							bgcolor: "text.secondary",
							transform: "translate(-2px, -2px)",
							boxShadow: "5px 5px 0px var(--mui-palette-action-focus)",
						},
						transition: "all 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
					}}
					aria-label="Open table of contents"
				>
					<FormatListBulletedIcon />
				</IconButton>

				<Drawer
					anchor="bottom"
					open={mobileOpen}
					onClose={() => setMobileOpen(false)}
					sx={{
						zIndex: 1000,
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: "100%",
							backgroundColor: "background.paper",
							borderTop: "3px solid var(--mui-palette-text-primary)",
							p: 3,
							pb: 4,
						},
					}}
				>
					<Stack
						direction="row"
						sx={{
							justifyContent: "space-between",
							alignItems: "center",
							mb: 2,
							pb: 1,
							borderBottom: "1px solid var(--mui-palette-divider)",
						}}
					>
						<Typography
							variant="subtitle2"
							sx={{
								fontFamily: "monospace",
								fontWeight: 800,
								letterSpacing: "0.05em",
							}}
						>
							{language === "en" ? "TABLE OF CONTENTS" : "বিষয়বস্তু"}
						</Typography>
						<IconButton size="small" onClick={() => setMobileOpen(false)}>
							<ChevronRightIcon />
						</IconButton>
					</Stack>
					<Stack spacing={0.5}>{renderLinks("0.85rem")}</Stack>
				</Drawer>
			</>
		);
	}

	// ── Desktop: collapsible notch-style side dock ────────────────────
	return (
		<Box
			sx={{
				position: "fixed",
				right: 0,
				top: "50%",
				transform: "translateY(-50%)",
				zIndex: 90,
				display: "flex",
				alignItems: "center",
			}}
		>
			<AnimatePresence initial={false} mode="wait">
				{!isExpanded ? (
					/* ── Collapsed: dot indicators ─────────────────────────── */
					<motion.div
						key="collapsed"
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 20 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
					>
						<Box
							sx={{
								bgcolor: "background.paper",
								border: "1px solid var(--mui-palette-text-primary)",
								borderRight: "none",
								py: 2,
								px: 1,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: 1.5,
								boxShadow: "-3px 3px 0px var(--mui-palette-text-primary)",
							}}
						>
							{/* Expand button */}
							<IconButton
								size="small"
								onClick={() => setIsExpanded(true)}
								sx={{
									color: "text.primary",
									p: 0.25,
									borderRadius: 0,
									"&:hover": { bgcolor: "action.hover" },
								}}
								title="Expand outline"
							>
								<ChevronLeftIcon fontSize="small" />
							</IconButton>

							{/* Dots list with tooltips */}
							<Stack spacing={1.5} sx={{ alignItems: "center" }}>
								{sections.map((sec, idx) => {
									const label = language === "en" ? sec.labelEn : sec.labelBn;
									const isActive = activeSection === sec.id;

									return (
										<Tooltip
											key={`${sec.id}-${idx}`}
											title={label}
											placement="left"
											arrow
											slotProps={{
												tooltip: {
													sx: {
														bgcolor: "text.primary",
														color: "background.default",
														fontFamily: "monospace",
														fontSize: "0.65rem",
														fontWeight: 700,
														borderRadius: 0,
														border: "1px solid var(--mui-palette-divider)",
													},
												},
												arrow: {
													sx: { color: "text.primary" },
												},
											}}
										>
											<Box
												onClick={() => handleScrollTo(sec.id)}
												sx={{
													width: sec.level === 3 ? 6 : 8,
													height: sec.level === 3 ? 6 : 8,
													borderRadius: 0,
													border: "1px solid var(--mui-palette-text-primary)",
													bgcolor: isActive ? "text.primary" : "transparent",
													cursor: "pointer",
													transform: isActive
														? "rotate(45deg) scale(1.2)"
														: "rotate(0deg)",
													transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
													"&:hover": {
														bgcolor: isActive ? "text.primary" : "action.hover",
														transform: "rotate(45deg) scale(1.3)",
													},
												}}
											/>
										</Tooltip>
									);
								})}
							</Stack>
						</Box>
					</motion.div>
				) : (
					/* ── Expanded: text outline panel ──────────────────────── */
					<motion.div
						key="expanded"
						initial={{ opacity: 0, x: 200 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 200 }}
						transition={{ duration: 0.25, ease: "easeOut" }}
					>
						<Box
							sx={{
								width: 200,
								maxHeight: "60vh",
								overflowY: "auto",
								bgcolor: "background.paper",
								border: "1px solid var(--mui-palette-text-primary)",
								borderRight: "none",
								p: 2,
								display: "flex",
								flexDirection: "column",
								gap: 2,
								boxShadow: "-4px 4px 0px var(--mui-palette-text-primary)",
								/* Custom scrollbar */
								"&::-webkit-scrollbar": { width: 4 },
								"&::-webkit-scrollbar-track": { bgcolor: "transparent" },
								"&::-webkit-scrollbar-thumb": {
									bgcolor: "text.disabled",
									borderRadius: 0,
								},
							}}
						>
							{/* Header */}
							<Stack
								direction="row"
								sx={{
									justifyContent: "space-between",
									alignItems: "center",
									pb: 1,
									borderBottom: "1px solid var(--mui-palette-divider)",
								}}
							>
								<Typography
									sx={{
										fontFamily: "monospace",
										fontSize: "0.7rem",
										fontWeight: 800,
										letterSpacing: "0.05em",
										color: "text.secondary",
									}}
								>
									{language === "en" ? "TABLE OF CONTENTS" : "বিষয়বস্তু"}
								</Typography>
								<IconButton
									size="small"
									onClick={() => setIsExpanded(false)}
									sx={{
										color: "text.primary",
										p: 0,
										borderRadius: 0,
										"&:hover": { bgcolor: "action.hover" },
									}}
								>
									<ChevronRightIcon fontSize="small" />
								</IconButton>
							</Stack>

							{/* Navigation links */}
							<Stack spacing={0.5}>{renderLinks()}</Stack>
						</Box>
					</motion.div>
				)}
			</AnimatePresence>
		</Box>
	);
}
