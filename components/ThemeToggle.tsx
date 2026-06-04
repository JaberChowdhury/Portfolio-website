"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Button
				variant="ghost"
				size="icon"
				disabled
				className="h-8 w-8 rounded-none"
			/>
		);
	}

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
			className="h-8 w-8 rounded-none hover:opacity-70 transition-opacity"
		>
			{resolvedTheme === "light" ? (
				<MdDarkMode className="h-4 w-4" />
			) : (
				<MdLightMode className="h-4 w-4" />
			)}
		</Button>
	);
}
