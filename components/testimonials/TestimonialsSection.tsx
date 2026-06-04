"use client";
import React, { useState, useEffect } from "react";
import { MdVerified } from "react-icons/md";
import Link from "next/link";
import { testimonialsData } from "@/data/testimonials";
import { useLanguageStore } from "@/store/languageStore";
import ParticleText from "../../app/extras/ParticleText";

const translations = {
	en: {
		sectionTitle: "TESTIMONIALS",
		projectLabel: "PROJECT",
		verifiedLabel: "VERIFIED",
	},
	bn: {
		sectionTitle: "প্রশংসাপত্র",
		projectLabel: "প্রকল্প",
		verifiedLabel: "যাচাইকৃত",
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

export default function TestimonialsSection() {
	const language = useLanguageStore((s) => s.language);
	const t = translations[language];
	const isMobile = useIsMobile();
	const mainTextColor = "var(--foreground)";

	return (
		<section
			id="testimonials"
			className="py-8 md:py-16 px-6 md:px-16 text-foreground"
		>
			{/* Section Header */}
			<div className="mb-6 md:mb-10 h-[120px] md:h-[250px] relative">
				<ParticleText
					text={t.sectionTitle}
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

			{/* Testimonials Grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{testimonialsData.map((item) => (
					<div key={item.id} className="h-full">
						<div className="border border-border p-8 md:p-12 h-full flex flex-col justify-between transition-colors duration-300 hover:bg-muted/30">
							<h4
								className="font-semibold leading-relaxed mb-12 italic text-foreground"
								style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}
							>
								"{item.quote}"
							</h4>

							<div>
								<h6 className="font-extrabold text-[1.1rem] uppercase tracking-wider mb-1 text-foreground">
									{item.clientName}
								</h6>
								<p className="text-muted-foreground text-sm uppercase tracking-wider mb-4">
									{item.company}
								</p>

								<div className="flex flex-wrap gap-4 items-center">
									<Link
										href="#works"
										className="text-foreground hover:underline font-semibold text-xs uppercase tracking-wider"
									>
										{"// "}
										{t.projectLabel}: {item.project}
									</Link>

									{item.verified && (
										<div className="flex items-center gap-1 text-primary text-xs font-semibold uppercase tracking-wider">
											<MdVerified className="h-3.5 w-3.5" />
											{t.verifiedLabel}
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
