"use client";

import { useLanguageStore } from "@/store/languageStore";

const translations = {
	en: {
		marquee: [
			"High-Performance Web Graphics —",
			"Three.js & WebGPU Animations —",
			"Modern Toolchains: Bun & Vite —",
			"C++ Execution Engines —",
			"Competitive Programming Logic —",
			"Advanced System Architecture —",
		],
	},
	bn: {
		marquee: [
			"উচ্চ-কার্যক্ষমতাসম্পন্ন ওয়েব গ্রাফিক্স —",
			"থ্রি.জেএস (Three.js) ও ওয়েবজিপিইউ (WebGPU) অ্যানিমেশন —",
			"আধুনিক টুলচেইন: বান (Bun) ও ভিটে (Vite) —",
			"সি++ (C++) এক্সিকিউশন ইঞ্জিন —",
			"কম্পিটিটিভ প্রোগ্রামিং লজিক —",
			"উন্নত সিস্টেম আর্কিটেকচার —",
		],
	},
};

export default function HeroMarquee() {
	const language = useLanguageStore((s) => s.language);
	const t = translations[language];
	const marqueeItems = ["first", "second"].flatMap((group) =>
		t.marquee.map((text) => ({ key: `${group}-${text}`, text })),
	);

	return (
		<div className="w-full border-t border-b border-border py-4 flex whitespace-nowrap overflow-hidden bg-background z-20">
			<div className="flex animate-marquee">
				{/*
          Spreading the array twice ([...t.hero.marquee, ...t.hero.marquee])
          ensures the marquee has enough content to scroll seamlessly
          without a visible break or pop when the animation restarts.
        */}
				{marqueeItems.map((item) => (
					<h5
						key={item.key}
						className="mx-4 md:mx-8 text-base md:text-2xl font-light uppercase"
					>
						{item.text}
					</h5>
				))}
			</div>
		</div>
	);
}
