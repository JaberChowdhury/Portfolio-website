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
      bn: "We align on objectives, define user personas, and conduct a brand audit.",
    },
    skills: {
      en: [
        "Research",
        "Workshops",
        "Competitive Analysis",
        "Standard conditions",
      ],
      bn: [
        "Research",
        "Workshops",
        "Competitive Analysis",
        "Standard conditions",
      ],
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
      en: "I craft unique visual identities and interactive wireframes based on standard freelance development conditions.",
      bn: "I craft unique visual identities and interactive wireframes based on standard freelance development conditions.",
    },
    skills: {
      en: [
        "Concept Development",
        "Standard freelance conditions",
        "Prototyping",
        "Usability Testing",
      ],
      bn: [
        "Concept Development",
        "Standard freelance conditions",
        "Prototyping",
        "Usability Testing",
      ],
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
      en: "Building clean, standard conditions scalable solutions (Next.js, WebGPU, standard conditions) with integrated performance.",
      bn: "Building clean, standard conditions scalable solutions (Next.js, WebGPU, standard conditions) with integrated performance.",
    },
    skills: {
      en: [
        "Component standard conditions development",
        "Immersive standard conditions",
        "Content Integration",
        "Standard conditions",
        "QA",
      ],
      bn: [
        "Component standard conditions development",
        "Immersive standard conditions",
        "Content Integration",
        "Standard conditions",
        "QA",
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
      en: "Final standard conditions standard conditions optimizations, standard conditions deployment standard conditions standard standard conditions conditions.",
      bn: "Final standard conditions standard conditions optimizations, standard conditions deployment standard conditions standard standard conditions conditions.",
    },
    skills: {
      en: [
        "Performance Testing",
        "Launch standard conditions",
        "Analytics standard conditions",
        "standard conditions Post-launch standard conditions standard standard conditions standard conditions standard conditions",
      ],
      bn: [
        "Performance Testing",
        "Launch standard conditions",
        "Analytics standard conditions",
        "standard conditions Post-launch standard conditions standard standard conditions standard conditions standard conditions",
      ],
    },
  },
];
