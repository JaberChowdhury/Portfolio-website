export interface ProcessItem {
	id: string;
	title: { en: string; bn: string };
	headline: { en: string; bn: string };
	desc: { en: string; bn: string };
	skills: { en: string[]; bn: string[] };
}

export const processData: ProcessItem[] = [
	{
		id: "01",
		title: { en: "Discovery & Strategy", bn: "আবিষ্কার এবং কৌশল" },
		headline: {
			en: "ALIGNING ON OBJECTIVES AND DEFINING THE PATH",
			bn: "লক্ষ্য নির্ধারণ এবং পথ নির্দেশ করা",
		},
		desc: {
			en: "We align on objectives, define user personas, and conduct a brand audit.",
			bn: "আমরা লক্ষ্যসমূহ নির্ধারণ করি, ব্যবহারকারীদের চরিত্র (personas) বিশ্লেষণ করি এবং একটি ব্র্যান্ড অডিট পরিচালনা করি।",
		},
		skills: {
			en: [
				"Research",
				"Workshops",
				"Competitive Analysis",
				"Strategy Planning",
			],
			bn: ["গবেষণা", "ওয়ার্কশপ", "প্রতিযোগী বিশ্লেষণ", "কৌশল পরিকল্পনা"],
		},
	},
	{
		id: "02",
		title: { en: "Design & Prototyping", bn: "ডিজাইন এবং প্রোটোটাইপিং" },
		headline: {
			en: "CRAFTING UNIQUE IDENTITIES AND EXPERIENCES",
			bn: "অনন্য পরিচয় এবং অভিজ্ঞতা তৈরি করা",
		},
		desc: {
			en: "I craft unique visual identities and interactive wireframes that deliver seamless user experiences.",
			bn: "আমি অনন্য ভিজ্যুয়াল আইডেন্টিটি এবং ইন্টারঅ্যাকটিভ ওয়্যারফ্রেম তৈরি করি যা চমৎকার ইউজার এক্সপেরিয়েন্স প্রদান করে।",
		},
		skills: {
			en: [
				"Concept Development",
				"User Flows",
				"Prototyping",
				"Usability Testing",
			],
			bn: ["কনসেপ্ট ডেভেলপমেন্ট", "ইউজার ফ্লো", "প্রোটোটাইপিং", "ইউজাবিলিটি টেস্টিং"],
		},
	},
	{
		id: "03",
		title: { en: "Development & Integration", bn: "উন্নয়ন এবং সমন্বয়" },
		headline: {
			en: "BUILDING SCALABLE AND PERFORMANT SOLUTIONS",
			bn: "স্কেলেবল এবং পারফরম্যান্ট সলিউশন তৈরি করা",
		},
		desc: {
			en: "Building clean, scalable solutions using React, Next.js, and WebGL/Three.js with optimized performance.",
			bn: "উন্নত পারফরম্যান্স এবং ক্লিন ইন্টিগ্রেশন সহ পরিচ্ছন্ন ও স্কেলেবল সলিউশন (Next.js, WebGL/Three.js) তৈরি করি।",
		},
		skills: {
			en: [
				"Component Development",
				"Immersive 3D Systems",
				"Content Integration",
				"API Development",
				"QA & Testing",
			],
			bn: [
				"কম্পোনেন্ট ডেভেলপমেন্ট",
				"ইমারসিভ থ্রিডি সিস্টেমস",
				"কন্টেন্ট ইন্টিগ্রেশন",
				"এপিআই ডেভেলপমেন্ট",
				"কিউএ ও টেস্টিং",
			],
		},
	},
	{
		id: "04",
		title: { en: "Deployment & Support", bn: "ডিপ্লয়মেন্ট এবং সাপোর্ট" },
		headline: {
			en: "FINAL OPTIMIZATIONS AND SUCCESSFUL LAUNCH",
			bn: "চূড়ান্ত অপ্টিমাইজেশন এবং সফল লঞ্চ",
		},
		desc: {
			en: "Final performance optimizations, successful server deployment, and continuous post-launch support.",
			bn: "চূড়ান্ত পারফরম্যান্স অপ্টিমাইজেশন, সফল সার্ভার ডিপ্লয়মেন্ট এবং ক্রমাগত পোস্ট-লঞ্চ সাপোর্ট।",
		},
		skills: {
			en: [
				"Performance Testing",
				"Launch Checklist",
				"Analytics Integration",
				"Post-Launch Support",
			],
			bn: [
				"পারফরম্যান্স টেস্টিং",
				"লঞ্চ চেকলিস্ট",
				"অ্যানালিটিক্স ইন্টিগ্রেশন",
				"পোস্ট-লঞ্চ সাপোর্ট",
			],
		},
	},
];
