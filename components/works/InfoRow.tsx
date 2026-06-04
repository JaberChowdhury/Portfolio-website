"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguageStore } from "@/store/languageStore";
import type { Project } from "./worksData";
import { Button } from "@/components/ui/button";

const translations = {
	en: {
		description: "01 Description",
		services: "02 Services",
		industry: "03 Industry",
		location: "04 Location",
		viewProject: "View Project",
	},
	bn: {
		description: "০১ বিবরণ",
		services: "০২ সেবাসমূহ",
		industry: "০৩ শিল্প",
		location: "০৪ অবস্থান",
		viewProject: "প্রকল্প দেখুন",
	},
};

interface InfoRowProps {
	project: Project;
}

export default function InfoRow({ project }: InfoRowProps) {
	const language = useLanguageStore((s) => s.language);
	const t = translations[language];

	const labelClass =
		"text-[10px] font-bold tracking-widest text-muted-foreground block mb-1.5 uppercase";
	const bodyClass =
		"font-normal text-[13px] leading-[1.55] text-foreground m-0";

	return (
		<motion.div
			key={project.id}
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -8 }}
			transition={{ duration: 0.35, ease: "easeOut" }}
			className="flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center pt-7 border-t border-border"
		>
			{/* 01 Description */}
			<div className="flex-grow md:min-w-[250px]">
				<span className={labelClass}>
					{"// "}
					{t.description}
				</span>
				<p className={bodyClass}>{project.description}</p>
			</div>

			{/* 02 Services */}
			<div className="flex-grow md:min-w-[200px]">
				<span className={labelClass}>
					{"// "}
					{t.services}
				</span>
				<p className={bodyClass}>{project.services}</p>
			</div>

			{/* 03 Industry */}
			<div>
				<span className={labelClass}>
					{"// "}
					{t.industry}
				</span>
				<p className={`${bodyClass} whitespace-nowrap`}>{project.industry}</p>
			</div>

			{/* 04 Location */}
			<div>
				<span className={labelClass}>
					{"// "}
					{t.location}
				</span>
				<p className={`${bodyClass} whitespace-nowrap`}>{project.location}</p>
			</div>

			{/* View Project button */}
			<Link
				href={project.repoName ? `/projects/${project.repoName}` : "/projects"}
				passHref
				className="no-underline"
			>
				<Button
					variant="outline"
					className="border-foreground text-foreground hover:bg-foreground hover:text-background rounded-md text-[11px] tracking-[0.12em] px-5 py-2.5 cursor-pointer whitespace-nowrap self-start md:self-center mt-4 md:mt-0 transition-colors uppercase h-auto font-bold"
				>
					{t.viewProject}
				</Button>
			</Link>
		</motion.div>
	);
}
