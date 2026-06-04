"use client";

import { MdPalette, MdWeb, MdViewInAr, MdTerminal } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { useLanguageStore } from "@/store/languageStore";
import ParticleText from "../../app/extras/ParticleText";
import { Button } from "@/components/ui/button";

const translations = {
	en: {
		sectionTitle: "SERVICES",
		projectsLabel: "// PROJECTS",
		exploreMore: "EXPLORE MORE",
	},
	bn: {
		sectionTitle: "সেবাসমূহ",
		projectsLabel: "// প্রকল্পসমূহ",
		exploreMore: "আরও এক্সপ্লোর করুন",
	},
};

const serviceIcons: { [key: string]: React.ReactNode } = {
	"01": <MdPalette className="h-5 w-5" />,
	"02": <MdWeb className="h-5 w-5" />,
	"03": <MdViewInAr className="h-5 w-5" />,
	"04": <MdTerminal className="h-5 w-5" />,
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

export default function ServicesSection() {
	const language = useLanguageStore((s) => s.language);
	const t = translations[language];
	const isMobile = useIsMobile();

	const SERVICES = servicesData.map((s) => ({
		id: s.id,
		title: s.title[language],
		headline: s.headline[language],
		desc: s.desc[language],
		skills: s.skills[language],
	}));

	const [expandedId, setExpandedId] = useState<string>("03");

	return (
		<section id="services" className="py-8 md:py-16 px-4 md:px-16">
			{/* Section Header */}
			<div className="mb-6 md:mb-10 h-[120px] md:h-[250px] relative">
				<ParticleText
					text={t.sectionTitle}
					colorStart="var(--foreground)"
					colorEnd="var(--foreground)"
					canvasWidth={isMobile ? 2200 : 3200}
					font={
						isMobile
							? "900 300px Inter, sans-serif"
							: "900 300px Inter, sans-serif"
					}
					particleSize={0.4}
				/>
			</div>

			{/* Main Service List Container */}
			<div className="border-t border-border">
				{SERVICES.map((service) => {
					const isExpanded = expandedId === service.id;
					const numId = service.id.replace("0", ""); // "1", "2", "3", "4"

					return (
						<motion.div
							key={service.id}
							layout
							onMouseEnter={() => setExpandedId(service.id)}
							className="border-b border-border relative cursor-pointer overflow-hidden"
							style={{
								borderBottomColor: isExpanded ? "transparent" : "var(--border)",
							}}
							transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
						>
							{/* Dark Background Animation */}
							<AnimatePresence initial={false}>
								{isExpanded && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.4 }}
										className="absolute inset-0 bg-foreground z-0"
									/>
								)}
							</AnimatePresence>

							<div className="relative z-10 px-4 md:px-8">
								<AnimatePresence mode="popLayout" initial={false}>
									{isExpanded ? (
										<motion.div
											key="expanded"
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -10 }}
											transition={{ duration: 0.4, delay: 0.1 }}
										>
											<div className="py-10 md:py-16">
												<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
													{/* Left Column */}
													<div className="col-span-12 md:col-span-3 flex flex-col justify-between">
														<div className="flex gap-3 items-center text-background/70 mb-8 md:mb-0">
															{serviceIcons[service.id]}
															<h6 className="font-normal uppercase text-[0.95rem] tracking-wider">
																{service.title}
															</h6>
														</div>
														<div className="mt-4 md:mt-auto">
															<h1 className="font-normal text-background tracking-widest text-[clamp(3rem,5vw,4.5rem)] leading-none">
																00{numId}
															</h1>
															<span className="text-background/60 tracking-widest text-xs mt-2 block">
																{t.projectsLabel}
															</span>
														</div>
													</div>

													{/* Middle Column */}
													<div className="col-span-12 md:col-span-7">
														<h4 className="font-extrabold uppercase text-background text-[clamp(1.2rem,2vw,1.8rem)] leading-snug mb-6 max-w-[90%]">
															{service.headline}
														</h4>
														<p className="text-background/75 text-[clamp(0.9rem,1.1vw,1.1rem)] leading-relaxed mb-8 max-w-[85%]">
															{service.desc}
														</p>
														<div className="flex flex-wrap gap-3 text-background/60">
															{service.skills.map((skill, index) => (
																<React.Fragment key={skill}>
																	<span className="text-xs tracking-wider">
																		{skill}
																	</span>
																	{index < service.skills.length - 1 && (
																		<span className="text-xs">/</span>
																	)}
																</React.Fragment>
															))}
														</div>
													</div>

													{/* Right Column */}
													<div className="col-span-12 md:col-span-2 flex flex-col items-start md:items-end justify-between mt-8 md:mt-0">
														<Button
															variant="ghost"
															asChild
															className="text-background font-semibold text-[0.85rem] tracking-wider hover:opacity-75 p-0 h-auto hover:bg-transparent"
														>
															<Link href="/">{t.exploreMore}</Link>
														</Button>
														<div className="w-1.5 h-1.5 bg-background/30 mt-4 md:mt-auto md:mb-12" />
													</div>
												</div>
											</div>
										</motion.div>
									) : (
										<motion.div
											key="collapsed"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.3 }}
										>
											<div className="py-7 flex justify-between items-center text-foreground">
												<div className="flex gap-6 items-center">
													<div className="opacity-60 flex">
														{serviceIcons[service.id]}
													</div>
													<h3 className="font-extrabold uppercase text-[clamp(1.2rem,2.5vw,1.5rem)] tracking-wide">
														{service.title}
													</h3>
												</div>
												<span className="font-bold text-lg tracking-wider">
													00{numId} {"//"}
												</span>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</motion.div>
					);
				})}
			</div>
		</section>
	);
}
