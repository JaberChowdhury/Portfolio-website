"use client";

import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { faqData } from "@/data/faq";
import { useLanguageStore } from "@/store/languageStore";

export default function FaqAccordion() {
	const language = useLanguageStore((s) => s.language);
	const FAQS = faqData.map((f) => ({
		id: f.id,
		question: f.question[language],
		answer: f.answer[language],
	}));

	const [openId, setOpenId] = useState<string | null>(null);

	const toggle = (id: string) => {
		setOpenId(openId === id ? null : id);
	};

	return (
		<div className="border-t border-border">
			{FAQS.map((item) => {
				const isOpen = openId === item.id;
				return (
					<div
						key={item.id}
						className="border-b border-border transition-colors duration-300"
					>
						<button
							onClick={() => toggle(item.id)}
							className="w-full flex items-center justify-between py-6 text-left cursor-pointer hover:bg-muted/10 transition-colors focus:outline-none"
						>
							<span
								className="font-semibold text-foreground leading-snug"
								style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
							>
								{item.question}
							</span>
							<MdExpandMore
								className={`h-5 w-5 text-foreground/60 transition-transform duration-300 shrink-0 ml-4 ${
									isOpen ? "rotate-180" : ""
								}`}
							/>
						</button>
						<AnimatePresence initial={false}>
							{isOpen && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: "auto", opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
									className="overflow-hidden"
								>
									<div className="pb-6 text-muted-foreground leading-relaxed text-[1rem]">
										{item.answer}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				);
			})}
		</div>
	);
}
