"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { projectsData } from "@/data/projects";
import { useLanguageStore } from "@/store/languageStore";
import ParticleText from "../../app/extras/ParticleText";
import InfoRow from "./InfoRow";
import ProjectCard from "./ProjectCard";
import { CARD_GAP } from "./worksData";

const translations = {
	en: {
		sectionTitle: "WORKS",
		dragHint: "← DRAG →",
		featured: "FEATURED",
	},
	bn: {
		sectionTitle: "কাজ",
		dragHint: "← টানুন →",
		featured: "ফিচার্ড",
	},
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

export default function WorksSection() {
	const language = useLanguageStore((s) => s.language);
	const t = translations[language];
	const isMobile = useIsMobile();

	const PROJECTS = projectsData.map((p) => ({
		id: p.id,
		title: p.title,
		bg: p.bg,
		accent: p.accent,
		textColor: p.textColor,
		repoName: p.repoName,
		...p[language],
	}));

	const [activeIndex, setActiveIndex] = useState(2);
	const [isDragging, setIsDragging] = useState(false);
	const [containerWidth, setContainerWidth] = useState(1440);
	const [offset, setOffsetState] = useState(0);

	const trackRef = useRef<HTMLDivElement>(null);
	const startX = useRef(0);
	const startOffset = useRef(0);
	const offsetRef = useRef(0);

	// Safely handle window dimensions and resizing
	useEffect(() => {
		const handleResize = () => setContainerWidth(window.innerWidth);
		handleResize(); // Set initial width on the client
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const cardWidth = Math.min(520, containerWidth * 0.85);
	const cardStride = cardWidth + CARD_GAP;
	const centerOffset = containerWidth / 2 - cardWidth / 2;

	const getOffsetForIndex = useCallback(
		(idx: number) => centerOffset - idx * cardStride,
		[centerOffset, cardStride],
	);

	// Auto-update offset when resizing or changing the active index
	useEffect(() => {
		const targetOffset = getOffsetForIndex(activeIndex);
		offsetRef.current = targetOffset;
		setOffsetState(targetOffset);
	}, [getOffsetForIndex, activeIndex]);

	const snapToIndex = (idx: number) => {
		const clamped = Math.max(0, Math.min(PROJECTS.length - 1, idx));
		setActiveIndex(clamped);
		const target = getOffsetForIndex(clamped);

		// Smooth spring animation
		let start: number | null = null;
		const from = offsetRef.current;
		const duration = 420;

		const spring = (t: number) => {
			if (!start) start = t;
			const elapsed = t - start;
			const progress = Math.min(elapsed / duration, 1);
			const eased = progress === 1 ? 1 : 1 - 2 ** (-10 * progress);
			const current = from + (target - from) * eased;

			offsetRef.current = current;
			setOffsetState(current);

			if (progress < 1) requestAnimationFrame(spring);
		};
		requestAnimationFrame(spring);
	};

	const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		setIsDragging(true);
		startX.current = e.clientX;
		startOffset.current = offsetRef.current;
		e.currentTarget.setPointerCapture(e.pointerId);
	};

	const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		if (!isDragging) return;
		const delta = e.clientX - startX.current;
		const newOff = startOffset.current + delta;
		offsetRef.current = newOff;
		setOffsetState(newOff);
	};

	const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
		if (!isDragging) return;
		setIsDragging(false);
		const delta = e.clientX - startX.current;

		if (Math.abs(delta) < 8) return; // Treat as click, not drag

		const rawIndex = (centerOffset - offsetRef.current) / cardStride;
		const snapped = Math.round(rawIndex);
		snapToIndex(snapped);
	};

	const activeProject = PROJECTS[activeIndex];
	const mainTextColor = "var(--foreground)";

	return (
		<div id="works" className="min-h-screen flex flex-col justify-between">
			{/* Section header */}
			<div className="mb-6 md:mb-10 h-[120px] md:h-[250px] relative">
				<ParticleText
					text={t.sectionTitle}
					colorStart={mainTextColor}
					colorEnd={mainTextColor}
					canvasWidth={isMobile ? 1200 : 3200}
					font={
						isMobile
							? "900 300px Inter, sans-serif"
							: "900 300px Inter, sans-serif"
					}
					particleSize={0.4}
				/>
			</div>

			{/* Draggable Carousel Track */}
			<div
				ref={trackRef}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerUp}
				onPointerLeave={handlePointerUp}
				className="overflow-hidden pb-1 select-none flex-grow flex items-center touch-y"
				style={{ cursor: isDragging ? "grabbing" : "grab" }}
			>
				<div
					className="flex will-change-transform"
					style={{
						gap: `${CARD_GAP}px`,
						transform: `translateX(${offset}px)`,
						transition: isDragging
							? "none"
							: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
					}}
				>
					{PROJECTS.map((project, i) => (
						<ProjectCard
							key={project.id}
							project={project}
							index={i}
							activeIndex={activeIndex}
							isCenter={i === activeIndex}
							cardWidth={cardWidth}
							dragHint={t.dragHint}
							featuredText={t.featured}
						/>
					))}
				</div>
			</div>

			{/* Footer Info & Title */}
			<div>
				<div className="px-10 pt-0 pb-8">
					<InfoRow project={activeProject} />
				</div>
				<div className="mb-6 md:mb-10 h-[120px] md:h-[250px] relative">
					<ParticleText
						text={activeProject.title}
						canvasWidth={isMobile ? 1200 : 3800}
						colorStart="var(--foreground)"
						colorEnd="var(--foreground)"
						font={
							isMobile
								? "900 120px Inter, sans-serif"
								: "900 300px Inter, sans-serif"
						}
						particleSize={0.4}
					/>
				</div>
			</div>
		</div>
	);
}
