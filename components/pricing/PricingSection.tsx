"use client";

import { MdNorthEast } from "react-icons/md";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/store/languageStore";
import ParticleText from "../../app/extras/ParticleText";
import PricingCard from "./PricingCard";
import { Button } from "@/components/ui/button";

const translations = {
	en: {
		header: "PRICING",
		submitProject: {
			label: "SUBMIT YOUR PROJECT",
			prompt:
				"Flexible engagement model designed to accommodate a varying scale of ambition and complexity.",
			buttonText: "Book a call",
		},
		tiers: [
			{
				id: "hourly",
				title: "HOURLY SESSION",
				description:
					"Flexible engagement for specific tasks, consulting, audits, or rapid sprints.",
				buttonText: "Hire Me",
				variant: "light",
			},
			{
				id: "monthly",
				title: "MONTHLY RETAINER",
				description:
					"Dedicated design & engineering resources for continuous product evolution.",
				buttonText: "Hire Me",
				variant: "light",
			},
			{
				id: "project",
				title: "PROJECT BASED",
				hasBullet: true,
				description:
					"End-to-end execution. Full scope with defined deliverables and fixed timeline.",
				buttonText: "Hire Me",
				variant: "dark",
			},
		],
		emailLink: "EMAIL ME",
	},
	bn: {
		header: "মূল্য তালিকা",
		submitProject: {
			label: "আপনার প্রজেক্ট জমা দিন",
			prompt: "বিভিন্ন মাত্রার উচ্চাকাঙ্ক্ষা এবং জটিলতার সাথে মানানসই একটি নমনীয় কাজের মডেল।",
			buttonText: "কল বুক করুন",
		},
		tiers: [
			{
				id: "hourly",
				title: "ঘণ্টাভিত্তিক সেশন",
				description: "নির্দিষ্ট কাজ, পরামর্শ, অডিট বা দ্রুত স্প্রিন্টের জন্য নমনীয় চুক্তি।",
				buttonText: "নিয়োগ দিন",
				variant: "light",
			},
			{
				id: "monthly",
				title: "মাসিক রিটেইনার",
				description:
					"ক্রমাগত পণ্য বিকাশের জন্য ডেডিকেটেড ডিজাইন এবং ইঞ্জিনিয়ারিং রিসোর্স।",
				buttonText: "নিয়োগ দিন",
				variant: "light",
			},
			{
				id: "project",
				title: "প্রকল্প ভিত্তিক",
				hasBullet: true,
				description:
					"শুরু থেকে শেষ পর্যন্ত বাস্তবায়ন। নির্দিষ্ট টাইমলাইন ও ডেলিভারেবলের সাথে সম্পূর্ণ স্কোপ।",
				buttonText: "নিয়োগ দিন",
				variant: "dark",
			},
		],
		emailLink: "ইমেইল করুন",
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

const PricingSection = () => {
	const language = useLanguageStore((s) => s.language);
	const pricingData = translations[language];
	const isMobile = useIsMobile();

	return (
		<div id="pricing" className="min-h-screen text-foreground">
			<section className="py-8 md:py-16 px-6 md:px-16">
				<div className="mb-6 md:mb-10 h-[120px] md:h-[250px] relative">
					<ParticleText
						text={pricingData.header}
						colorStart="var(--foreground)"
						colorEnd="var(--foreground)"
						canvasWidth={isMobile ? 1200 : 3200}
						font={
							isMobile
								? "900 300px Inter, sans-serif"
								: "900 300px Inter, sans-serif"
						}
						particleSize={0.4}
					/>
				</div>

				{/* Submit Project text block */}
				<div className="max-w-[720px] mb-6 md:mb-10">
					<h2 className="text-[1.1rem] font-black uppercase mb-4">
						{pricingData.submitProject.label}
					</h2>
					<p className="text-[clamp(1.5rem, 4vw, 2rem)] mb-8 leading-snug">
						{pricingData.submitProject.prompt}
					</p>
					{/* Book a call button */}
					<Button
						asChild
						className="bg-foreground text-background hover:opacity-85 px-6 py-6 text-base inline-flex items-center gap-2 rounded-md font-medium h-auto"
					>
						<Link href="/">
							{pricingData.submitProject.buttonText}
							<MdNorthEast className="h-[1.1rem] w-[1.1rem]" />
						</Link>
					</Button>
				</div>

				{/* Pricing Tiers Grid - Exact three-block layout */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
					{pricingData.tiers.map((tier) => (
						<PricingCard
							key={tier.id}
							tier={tier}
							isLight={tier.variant === "light"}
						/>
					))}
				</div>

				{/* EMAIL US link at bottom right */}
				<div className="text-right">
					<Link
						href="mailto:your_email@example.com"
						className="no-underline text-muted-foreground hover:text-foreground text-sm uppercase transition-colors"
					>
						{pricingData.emailLink}
					</Link>
				</div>
			</section>
		</div>
	);
};

export default PricingSection;
