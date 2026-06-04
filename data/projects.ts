export interface ProjectTranslations {
	description: string;
	services: string;
	industry: string;
	location: string;
}

export interface ProjectData {
	id: number;
	title: string;
	bg: string;
	accent: string;
	textColor: string;
	repoName?: string;
	en: ProjectTranslations;
	bn: ProjectTranslations;
}

export const projectsData: ProjectData[] = [
	{
		id: 1,
		title: "ROTA DO NEVEIRO",
		bg: "#3d4a3e",
		accent: "contrast",
		textColor: "contrast",
		en: {
			description:
				"Unified web platform connecting municipalities of Cadaval, Castanheira de Pera, and Funchal. The site showcases historical ice routes and hiking trails, acting as a complete digital guide to the nature and heritage of these regions.",
			services:
				"UX Design, Website Design, Full Stack Solutions, Technical SEO, Performance, CMS Integration",
			industry: "Tourism & Public Sector",
			location: "Portugal",
		},
		bn: {
			description:
				"পর্তুগালের ক্যাডাভাল, কাস্টানহেইরা দে পেরা এবং ফুনচাল পৌরসভাকে সংযুক্তকারী একটি ইউনিফাইড ওয়েব প্ল্যাটফর্ম।",
			services: "ইউএক্স ডিজাইন, ওয়েবসাইট ডিজাইন, ফুল স্ট্যাক সলিউশন",
			industry: "পর্যটন ও পাবলিক সেক্টর",
			location: "পর্তুগাল",
		},
	},
	{
		id: 2,
		title: "REPULSOR",
		bg: "#111111",
		accent: "#c8c8c8",
		textColor: "#c8c8c8",
		en: {
			description:
				"Futuristic brand system and digital experience for an advanced technology company operating at the intersection of hardware and software innovation.",
			services: "Brand Strategy, UI/UX Design, Motion Design",
			industry: "Technology",
			location: "Remote, Global",
		},
		bn: {
			description:
				"হার্ডওয়্যার এবং সফ্টওয়্যার উদ্ভাবনের সংযোগস্থলে পরিচালিত একটি উন্নত প্রযুক্তি কোম্পানির জন্য ফিউচারিস্টিক ব্র্যান্ড সিস্টেম।",
			services: "ব্র্যান্ড স্ট্র্যাটেজি, ইউআই/ইউএক্স ডিজাইন, মোশন ডিজাইন",
			industry: "প্রযুক্তি",
			location: "রিমোট, গ্লোবাল",
		},
	},
	{
		id: 3,
		title: "MJHC STUDIO",
		bg: "#1c1c2e",
		accent: "#00E5FF",
		textColor: "#00E5FF",
		en: {
			description:
				"Personal portfolio and design studio identity for MD Jaber Hossain Chowdhury — a multidisciplinary designer and developer based in Bangladesh.",
			services: "Brand Identity, Web Design, Development",
			industry: "Design & Technology",
			location: "Jinudpur, Bangladesh",
		},
		bn: {
			description:
				"বাংলাদেশের একজন মাল্টিডিসিপ্লিনারি ডিজাইনার এবং ডেভেলপার মোঃ জাবের হোসেন চৌধুরীর ব্যক্তিগত পোর্টফোলিও এবং ডিজাইন স্টুডিও আইডেন্টিটি।",
			services: "ব্র্যান্ড আইডেন্টিটি, ওয়েব ডিজাইন, ডেভেলপমেন্ট",
			industry: "ডিজাইন ও প্রযুক্তি",
			location: "জিনুদপুর, বাংলাদেশ",
		},
	},
	{
		id: 4,
		title: "THREEJS CREATIVE",
		bg: "#101626",
		accent: "#00FFCC",
		textColor: "#00FFCC",
		repoName: "threejs-creative-landing",
		en: {
			description:
				"An interactive 3D landing page experience utilizing Three.js, React Three Fiber (R3F), and custom GLSL shader materials for ambient micro-interactions.",
			services: "3D Graphics, WebGL, React Three Fiber, GLSL Shaders",
			industry: "Creative Web Design",
			location: "Jinudpur, Bangladesh",
		},
		bn: {
			description:
				"থ্রি.জেএস, রিঅ্যাক্ট থ্রি ফাইবার (R3F) এবং কাস্টম জিএলএসএল শেডার ব্যবহার করে তৈরি করা একটি ইন্টারেক্টিভ থ্রিডি ল্যান্ডিং পেজ অভিজ্ঞতা।",
			services: "থ্রিডি গ্রাফিক্স, ওয়েবজিএল, রিঅ্যাক্ট থ্রি ফাইবার, কাস্টম শেডার্স",
			industry: "ক্রিয়েটিভ ওযেব ডিজাইন",
			location: "জিনুদপুর, বাংলাদেশ",
		},
	},
	{
		id: 5,
		title: "RAYLIB ENGINE",
		bg: "#2b1c0e",
		accent: "#ff9800",
		textColor: "#ff9800",
		repoName: "raylib-projects",
		en: {
			description:
				"A suite of interactive games and visual simulations built with Raylib and C++, including a custom physics bouncing ball engine, click-buttons, and multiple game logic states.",
			services: "C++ Development, Game Engine Logic, Physics Simulations",
			industry: "Software Engineering & Gaming",
			location: "Bangladesh",
		},
		bn: {
			description:
				"রেলিব এবং সি++ দিয়ে তৈরি ইন্টারেক্টিভ গেম এবং ফিজিক্স সিমুলেশন, যার মধ্যে রয়েছে বাউন্সিং বল ফিজিক্স এবং টিক-ট্যাক-টো গেম লজিক।",
			services: "সি++ ডেভেলপমেন্ট, গেম ইঞ্জিন লজিক, ফিজিক্স সিমুলেশন",
			industry: "সফটওয়্যার ইঞ্জিনিয়ারিং ও গেমিং",
			location: "বাংলাদেশ",
		},
	},
	{
		id: 6,
		title: "ASTRO FULLSTACK",
		bg: "#1d0f2b",
		accent: "#d800ff",
		textColor: "#d800ff",
		repoName: "Astro-express-project",
		en: {
			description:
				"A full-stack CRUD application and developer environment built with Astro, Express.js, TypeScript, and MongoDB, integrating seamless RESTful APIs.",
			services: "Full Stack, REST APIs, Astro, TypeScript, Backend Systems",
			industry: "Software Architecture",
			location: "Bangladesh",
		},
		bn: {
			description:
				"অ্যাস্ট্রো, এক্সপ্রেস.জেএস, টাইপস্ক্রিপ্ট এবং মঙ্গোডিবি ব্যবহার করে তৈরি একটি ফুল-স্ট্যাক ক্রাড (CRUD) অ্যাপ্লিকেশন এবং রেস্টফুল এপিআই।",
			services: "ফুল স্ট্যাক, অ্যাস্ট্রো, এক্সপ্রেস.জেএস, টাইপস্ক্রিপ্ট",
			industry: "সফটওয়্যার আর্কিটেকচার",
			location: "বাংলাদেশ",
		},
	},
	{
		id: 7,
		title: "MINI RUST COMPILER",
		bg: "#2b1c1c",
		accent: "#ff5533",
		textColor: "#ff5533",
		repoName: "mini-rust-compiler",
		en: {
			description:
				"An educational toy compiler and parser written in Rust to translate a simplified subset of programming language syntax to WebAssembly (Wasm).",
			services: "Rust Development, Compiler Design, WebAssembly",
			industry: "Developer Tools",
			location: "Remote, Global",
		},
		bn: {
			description:
				"রাস্ট দিয়ে তৈরি একটি শিক্ষামূলক কম্পাইলার এবং পার্সার যা একটি সরলীকৃত প্রোগ্রামিং ল্যাঙ্গুয়েজ সিনট্যাক্সকে ওয়েবঅ্যাসেম্বলিতে (Wasm) অনুবাদ করে।",
			services: "রাস্ট ডেভেলপমেন্ট, কম্পাইলার ডিজাইন, ওয়েবঅ্যাসেম্বলি",
			industry: "ডেভেলপার টুলস",
			location: "রিমোট, গ্লোবাল",
		},
	},
	{
		id: 8,
		title: "REACT NATIVE CHAT UI",
		bg: "#0d1b2a",
		accent: "#415a77",
		textColor: "#e0e1dd",
		repoName: "react-native-chat-ui",
		en: {
			description:
				"A beautifully styled, high-performance chat interface components built for React Native and Expo projects, incorporating reanimated and gesture handlers.",
			services: "Mobile UI/UX, React Native, Expo, Reanimated",
			industry: "Mobile App Development",
			location: "Bangladesh",
		},
		bn: {
			description:
				"রিঅ্যাক্ট নেটিভ এবং এক্সপো প্রজেক্টের জন্য তৈরি করা একটি চমৎকার ডিজাইনের এবং হাই-পারফরম্যান্স চ্যাট ইন্টারফেস কম্পোনেন্ট যা রিঅ্যানিমেটেড ব্যবহার করে।",
			services: "মোবাইল ইউআই/ইউএক্স, রিঅ্যাক্ট নেটিভ, এক্সপো",
			industry: "মোবাইল অ্যাপ ডেভেলপমেন্ট",
			location: "বাংলাদেশ",
		},
	},
];
