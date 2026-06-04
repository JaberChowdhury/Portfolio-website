"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ParticleText from "@/app/extras/ParticleText";
import { useLanguageStore } from "@/store/languageStore";
import FaqAccordion from "./FaqAccordion";

const translations = {
	en: {
		header: "ANSWER TO YOUR QUESTIONS",
		subHeader:
			"HOWEVER, WE RECOMMEND REACHING OUT TO US IF YOU HAVE ANY QUESTIONS.",
		questionPrompt: "Any question about the pricing?",
		bookCall: "Book a call",
		emailUs: "Email Us",
	},
	bn: {
		header: "আপনার প্রশ্নগুলোর উত্তর",
		subHeader:
			"যাইহোক, আপনার যদি কোন প্রশ্ন থাকে তবে আমরা আমাদের সাথে যোগাযোগ করার পরামর্শ দিচ্ছি।",
		questionPrompt: "মূল্য তালিকা সম্পর্কে কোন প্রশ্ন আছে?",
		bookCall: "কল বুক করুন",
		emailUs: "আমাদের ইমেইল করুন",
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

export default function FaqSection() {
	const language = useLanguageStore((s) => s.language);
	const t = translations[language];
	const isMobile = useIsMobile();
	const mainTextColor = "var(--foreground)";

	return (
		<section
			id="faq"
			className="min-h-[80vh] text-foreground py-8 md:py-16 px-6 md:px-16 border-t border-border"
		>
			<div className="mb-6 md:mb-10 h-[120px] md:h-[250px] relative">
				<ParticleText
					text="FAQ"
					colorStart={mainTextColor}
					colorEnd={mainTextColor}
					canvasWidth={isMobile ? 2200 : 3200}
					font={
						isMobile
							? "900 280px Inter, sans-serif"
							: "900 300px Inter, sans-serif"
					}
					particleSize={0.4}
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
				{/* Left Column: Title and Links */}
				<div className="md:col-span-5 md:pr-4">
					<h2
						className="font-black uppercase tracking-wide leading-none mb-6"
						style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
					>
						{t.header}
					</h2>

					<h3 className="font-extrabold text-xs uppercase tracking-wider mb-4">
						{t.subHeader}
					</h3>

					<div className="flex flex-wrap gap-4 items-center">
						<span className="font-semibold text-xs text-muted-foreground">
							{t.questionPrompt}
						</span>
						<Link
							href="#"
							className="text-foreground font-extrabold text-xs hover:opacity-70 transition-opacity"
						>
							{t.bookCall}
						</Link>
						<Link
							href="#"
							className="text-foreground font-extrabold text-xs hover:opacity-70 transition-opacity"
						>
							{t.emailUs}
						</Link>
					</div>
				</div>

				{/* Right Column: Accordion */}
				<div className="md:col-span-7">
					<FaqAccordion />
				</div>
			</div>
		</section>
	);
}
