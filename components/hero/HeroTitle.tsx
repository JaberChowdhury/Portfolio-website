"use client";

import { useLanguageStore } from "@/store/languageStore";

const translations = {
	en: {
		title1: ["MD", "JABER"],
		title2: ["HOSSAIN", "CHOWDHURY"],
	},
	bn: {
		title1: ["মোঃ", "জাবের"],
		title2: ["হোসেন", "চৌধুরী"],
	},
};

export default function HeroTitle() {
	const language = useLanguageStore((s) => s.language);
	const t = translations[language];

	const titleClass =
		"text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[7rem] leading-none font-bold text-foreground";

	if (language === "en") {
		return (
			<div className="w-full max-w-[1400px] z-10 px-4 sm:px-8 md:px-12">
				<h1 className={titleClass}>{t.title1[0]}</h1>

				<h1 className={titleClass}>{t.title1[1]}</h1>

				<h1 className={titleClass}>{t.title2[0]}</h1>

				<h1 className={titleClass}>{t.title2[1]}</h1>
			</div>
		);
	} else {
		return (
			<div className="w-full max-w-[1400px] z-10 px-4 sm:px-8 md:px-12">
				<h1 className={titleClass}>
					{t.title1[0]}
					{"  "} {t.title1[1]}
					{"  "}
					{t.title2[0]}
					{"  "}
					{t.title2[1]}
				</h1>
			</div>
		);
	}
}
