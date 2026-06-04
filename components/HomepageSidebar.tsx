"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
	MdChevronLeft,
	MdChevronRight,
	MdFormatListBulleted,
} from "react-icons/md";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguageStore } from "@/store/languageStore";
import { cn } from "@/lib/utils";

const sections = [
	{ id: "home", labelEn: "HOME", labelBn: "হোম" },
	{ id: "works", labelEn: "WORKS", labelBn: "কাজ" },
	{ id: "services", labelEn: "SERVICES", labelBn: "সেবাসমূহ" },
	{ id: "process", labelEn: "PROCESS", labelBn: "প্রক্রিয়া" },
	{ id: "pricing", labelEn: "PRICING", labelBn: "মূল্য" },
	{ id: "testimonials", labelEn: "TESTIMONIALS", labelBn: "প্রশংসাপত্র" },
	{ id: "faq", labelEn: "FAQ", labelBn: "প্রশ্নাবলী" },
	{ id: "contact", labelEn: "CONTACT", labelBn: "যোগাযোগ" },
];

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

export default function HomepageSidebar() {
	const language = useLanguageStore((s) => s.language);

	const isMobile = useIsMobile();

	const [activeSection, setActiveSection] = useState("home");
	const [isExpanded, setIsExpanded] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				}
			},
			{
				root: null,
				rootMargin: "-25% 0px -55% 0px",
				threshold: 0,
			},
		);

		sections.forEach((section) => {
			const element = document.getElementById(section.id);

			if (element) {
				observer.observe(element);
			}
		});

		return () => observer.disconnect();
	}, []);

	const handleScrollTo = (id: string) => {
		const element = document.getElementById(id);

		if (!element) return;

		element.scrollIntoView({
			behavior: "smooth",
		});

		setActiveSection(id);
		setMobileOpen(false);
	};

	const renderLinks = (fontSize = "text-xs") =>
		sections.map((section) => {
			const label = language === "en" ? section.labelEn : section.labelBn;

			const isActive = activeSection === section.id;

			return (
				<div
					key={section.id}
					onClick={() => handleScrollTo(section.id)}
					className={cn(
						"cursor-pointer border-l-[3px] px-4 py-2 transition-all duration-150",
						isActive
							? "border-foreground bg-accent"
							: "border-transparent hover:border-border hover:bg-accent/50",
					)}
				>
					<span
						className={cn(
							"font-mono tracking-[0.08em]",
							fontSize,
							isActive
								? "font-extrabold text-foreground"
								: "font-medium text-muted-foreground",
						)}
					>
						{label}
					</span>
				</div>
			);
		});

	if (isMobile) {
		return (
			<>
				<Button
					size="icon"
					onClick={() => setMobileOpen(true)}
					className="fixed right-5 bottom-5 z-[90] h-12 w-12 rounded-none border border-border shadow-[3px_3px_0px] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px]"
				>
					<MdFormatListBulleted className="h-5 w-5" />
				</Button>

				<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
					<SheetContent
						side="bottom"
						className="w-full border-t-[3px] p-6 pb-8"
					>
						<div className="mb-4 flex items-center justify-between border-b pb-2">
							<p className="font-mono text-sm font-extrabold tracking-wider">
								{language === "en" ? "PAGE OUTLINE" : "পৃষ্ঠার আউটলাইন"}
							</p>

							<Button
								variant="ghost"
								size="icon"
								className="rounded-none"
								onClick={() => setMobileOpen(false)}
							>
								<MdChevronRight className="h-4 w-4" />
							</Button>
						</div>

						<div className="flex flex-col gap-1">{renderLinks("text-sm")}</div>
					</SheetContent>
				</Sheet>
			</>
		);
	}

	return (
		<div className="fixed top-1/2 right-0 z-[90] flex -translate-y-1/2 items-center">
			<AnimatePresence initial={false} mode="wait">
				{!isExpanded ? (
					<motion.div
						key="collapsed"
						initial={{
							opacity: 0,
							x: 20,
						}}
						animate={{
							opacity: 1,
							x: 0,
						}}
						exit={{
							opacity: 0,
							x: 20,
						}}
						transition={{
							duration: 0.2,
							ease: "easeOut",
						}}
					>
						<div className="flex flex-col items-center gap-4 border border-r-0 border-foreground bg-background px-2 py-4 shadow-[-3px_3px_0px]">
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setIsExpanded(true)}
								className="h-8 w-8 rounded-none"
							>
								<MdChevronLeft className="h-4 w-4" />
							</Button>

							<TooltipProvider>
								<div className="flex flex-col items-center gap-4">
									{sections.map((section) => {
										const label =
											language === "en" ? section.labelEn : section.labelBn;

										const isActive = activeSection === section.id;

										return (
											<Tooltip key={section.id}>
												<TooltipTrigger asChild>
													<div
														onClick={() => handleScrollTo(section.id)}
														className={cn(
															"h-2 w-2 cursor-pointer border border-foreground transition-all duration-200",
															isActive
																? "scale-125 rotate-45 bg-foreground"
																: "bg-transparent hover:scale-125 hover:rotate-45 hover:bg-accent",
														)}
													/>
												</TooltipTrigger>

												<TooltipContent
													side="left"
													className="rounded-none border font-mono text-[10px] font-bold"
												>
													{label}
												</TooltipContent>
											</Tooltip>
										);
									})}
								</div>
							</TooltipProvider>
						</div>
					</motion.div>
				) : (
					<motion.div
						key="expanded"
						initial={{
							opacity: 0,
							x: 200,
						}}
						animate={{
							opacity: 1,
							x: 0,
						}}
						exit={{
							opacity: 0,
							x: 200,
						}}
						transition={{
							duration: 0.25,
							ease: "easeOut",
						}}
					>
						<div className="w-[170px] border border-r-0 border-foreground bg-background p-4 shadow-[-4px_4px_0px]">
							<div className="mb-4 flex items-center justify-between border-b pb-2">
								<span className="font-mono text-[0.7rem] font-extrabold tracking-wider text-muted-foreground">
									{language === "en" ? "OUTLINE" : "আউটলাইন"}
								</span>

								<Button
									variant="ghost"
									size="icon"
									onClick={() => setIsExpanded(false)}
									className="h-8 w-8 rounded-none"
								>
									<MdChevronRight className="h-4 w-4" />
								</Button>
							</div>

							<div className="flex flex-col gap-1">{renderLinks()}</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
