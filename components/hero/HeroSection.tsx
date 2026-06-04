"use client";

import Navbar from "../navbar/Navbar";
import HeroMarquee from "./HeroMarquee";
import HeroTitle from "./HeroTitle";

export default function HeroSection() {
	return (
		<div
			id="home"
			className="w-screen min-h-screen relative overflow-x-hidden flex flex-col"
		>
			<Navbar />

			{/* Hero Centerpiece */}
			<div className="flex-1 flex justify-center items-center relative px-4 md:px-16 w-full">
				{/* Floating Parallax Elements */}
				<p className="absolute top-[25%] left-[5%] md:left-[15%] italic opacity-60 text-sm animate-float">
					system architecture
				</p>

				<p className="absolute bottom-[25%] right-[5%] md:right-[15%] italic opacity-60 text-sm animate-float-reverse">
					horizontal continuity
				</p>

				<HeroTitle />
			</div>

			<HeroMarquee />
		</div>
	);
}
