"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MdMenu, MdClose } from "react-icons/md";
import { useLanguageStore } from "@/store/languageStore";
import Logo from "../Logo";
import ThemeToggle from "../ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const translations = {
	en: {
		home: "HOME",
		projects: "PROJECTS",
		blog: "BLOG",
		lang: "LANGUAGE: EN | BN",
	},
	bn: {
		home: "০০১/ হোম",
		projects: "০০২/ প্রকল্পসমূহ",
		blog: "০০৩/ ব্লগ",
		lang: "ভাষা: EN | BN",
	},
};

function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const check = () => setIsMobile(window.innerWidth < 1024);

		check();

		window.addEventListener("resize", check);

		return () => window.removeEventListener("resize", check);
	}, []);

	return isMobile;
}

export default function Navbar() {
	const isMobile = useIsMobile();
	const [mobileOpen, setMobileOpen] = useState(false);
	const pathname = usePathname();

	const language = useLanguageStore((s) => s.language);
	const setLanguage = useLanguageStore((s) => s.setLanguage);
	const toggleLanguage = useLanguageStore((s) => s.toggleLanguage);
	const t = translations[language];

	// Enforce English language strictly on mobile viewports
	useEffect(() => {
		if (isMobile && language !== "en") {
			setLanguage("en");
		}
	}, [isMobile, language, setLanguage]);

	const navLinks = [
		{ label: t.home, href: "/" },
		{ label: t.projects, href: "/projects" },
		{ label: t.blog, href: "/blog" },
	];

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<nav className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-4 md:px-8 py-4 border-b border-border bg-background/70 backdrop-blur-md">
			{/* Left: The Interactive Framer Motion Logo */}
			<div className="z-[120]">
				<NextLink href="/#home" className="no-underline">
					<Logo />
				</NextLink>
			</div>

			{/* Center: Desktop Menu */}
			<div className="hidden lg:flex flex-row space-x-8">
				{navLinks.map((link) => {
					const isLinkActive =
						link.href === "/"
							? pathname === "/"
							: pathname.startsWith(link.href);

					return (
						<div key={link.label} className="relative inline-block">
							<NextLink
								href={link.href}
								className="tracking-wider text-xs font-bold transition-opacity hover:opacity-60 relative z-[1] text-foreground"
							>
								{link.label}
							</NextLink>
							{isLinkActive && (
								<motion.div
									layoutId="navbar-underline"
									className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-foreground rounded-sm"
								/>
							)}
						</div>
					);
				})}
			</div>

			{/* Right: Extras & Mobile Menu Toggle */}
			<div className="flex items-center gap-4">
				<ThemeToggle />

				<Button
					variant="ghost"
					onClick={toggleLanguage}
					className="font-bold hidden lg:block hover:bg-transparent hover:opacity-70 p-0 h-auto min-w-0"
				>
					{language === "en" ? "EN | BN" : "BN | EN"}
				</Button>

				{/* Mobile Hamburger Button */}
				<Button
					variant="ghost"
					size="icon"
					aria-label="open drawer"
					onClick={handleDrawerToggle}
					className="lg:hidden z-[120] h-9 w-9 p-0 hover:bg-transparent"
				>
					{mobileOpen ? (
						<MdClose className="h-5 w-5 text-foreground" />
					) : (
						<MdMenu className="h-5 w-5 text-foreground" />
					)}
				</Button>
			</div>

			{/* Mobile Slide Menu (Drawer/Sheet) */}
			<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
				<SheetContent
					side="top"
					className="w-full bg-background pt-24 pb-8 px-8 border-b border-border lg:hidden"
				>
					<div className="flex flex-col gap-4 mt-4">
						{navLinks.map((link) => (
							<NextLink
								key={link.label}
								href={link.href}
								onClick={handleDrawerToggle}
								className="text-3xl font-black tracking-tight uppercase text-foreground transition-opacity hover:opacity-70"
							>
								{link.label}
							</NextLink>
						))}
					</div>
				</SheetContent>
			</Sheet>
		</nav>
	);
}
