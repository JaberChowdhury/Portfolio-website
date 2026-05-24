export interface ServiceItem {
  id: string;
  title: { en: string; bn: string };
  headline: { en: string; bn: string };
  desc: { en: string; bn: string };
  skills: { en: string[]; bn: string[] };
}

export const servicesData: ServiceItem[] = [
  {
    id: "01",
    title: { en: "Brand Strategy", bn: "ব্র্যান্ড স্ট্র্যাটেজি" },
    headline: {
      en: "SHAPING IDENTITIES THAT RESONATE AND ENDURE",
      bn: "এমন পরিচয় তৈরি করা যা অনুরণিত হয় এবং টিকে থাকে",
    },
    desc: {
      en: "From brand identity to visual systems, our strategic approach crafts cohesive narratives that define who you are and how you connect with your audience.",
      bn: "ব্র্যান্ড আইডেন্টিটি থেকে শুরু করে ভিজ্যুয়াল সিস্টেম পর্যন্ত, আমাদের কৌশলগত পদ্ধতি একটি সুসংহত আখ্যান তৈরি করে।",
    },
    skills: {
      en: [
        "BRAND IDENTITY",
        "VISUAL SYSTEMS",
        "ART DIRECTION",
        "BRAND GUIDELINES",
        "VERBAL IDENTITY",
      ],
      bn: [
        "ব্র্যান্ড আইডেন্টিটি",
        "ভিজ্যুয়াল সিস্টেমস",
        "আর্ট ডিরেকশন",
        "ব্র্যান্ড গাইডলাইন্স",
        "ভার্বাল আইডেন্টিটি",
      ],
    },
  },
  {
    id: "02",
    title: { en: "Interface Design", bn: "ইন্টারফেস ডিজাইন" },
    headline: {
      en: "BLENDING AESTHETICS WITH FUNCTIONALITY FOR CONVERSION",
      bn: "রূপান্তরের জন্য কার্যকারিতার সাথে নান্দনিকতার সংমিশ্রণ",
    },
    desc: {
      en: "My design approach blends aesthetics with functionality, creating digital experiences that convert.",
      bn: "আমার ডিজাইন অ্যাপ্রোচ নান্দনিকতার সাথে কার্যকারিতার সংমিশ্রণ ঘটায়, যা ডিজিটাল অভিজ্ঞতায় রূপান্তর আনে।",
    },
    skills: {
      en: [
        "UI / UX DESIGN",
        "WEBSITE DESIGN",
        "MOBILE APPLICATIONS",
        "E-COMMERCE & PLATFORMS",
      ],
      bn: [
        "ইউআই / ইউএক্স ডিজাইন",
        "ওয়েবসাইট ডিজাইন",
        "মোবাইল অ্যাপ্লিকেশন",
        "ই-কমার্স ও প্ল্যাটফর্ম",
      ],
    },
  },
  {
    id: "03",
    title: { en: "Immersive & Motion", bn: "ইমারসিভ ও মোশন" },
    headline: {
      en: "CAPTIVATING VISUAL EXPERIENCES THAT TRANSPORT AUDIENCES",
      bn: "মনোমুগ্ধকর ভিজ্যুয়াল অভিজ্ঞতা যা দর্শকদের মুগ্ধ করে",
    },
    desc: {
      en: "I create captivating visual experiences that transport audiences.",
      bn: "আমি আকর্ষণীয় ভিজ্যুয়াল অভিজ্ঞতা তৈরি করি যা দর্শকদের মন্ত্রমুগ্ধ করে।",
    },
    skills: {
      en: [
        "3D EXPERIENCES",
        "MOTION GRAPHICS",
        "VIDEO EDITING",
        "INTERACTIVE NARRATIVES",
      ],
      bn: [
        "থ্রিডি এক্সপেরিয়েন্স",
        "মোশন গ্রাফিক্স",
        "ভিডিও এডিটিং",
        "ইন্টারঅ্যাকটিভ ন্যারেটিভস",
      ],
    },
  },
  {
    id: "04",
    title: { en: "Engineering", bn: "ইঞ্জিনিয়ারিং" },
    headline: {
      en: "DELIVERING CLEAN, SCALABLE SOLUTIONS BUILT FOR THE FUTURE",
      bn: "ভবিষ্যতের জন্য তৈরি পরিচ্ছন্ন এবং স্কেলেবল সলিউশন",
    },
    desc: {
      en: "My engineering skill sets deliver clean, scalable solutions built for the future.",
      bn: "আমার ইঞ্জিনিয়ারিং দক্ষতা ভবিষ্যতের জন্য পরিচ্ছন্ন, স্কেলেবল সমাধান প্রদান করে।",
    },
    skills: {
      en: [
        "REACT & NEXT.JS",
        "THREE.JS & MATTER.JS",
        "WORDPRESS & CMS",
        "DEPLOYMENT PIPELINES",
      ],
      bn: [
        "রিঅ্যাক্ট ও নেক্সট.জেএস",
        "থ্রি.জেএস ও ম্যাটার.জেএস",
        "ওয়ার্ডপ্রেস ও সিএমএস",
        "ডেভেলপমেন্ট পাইপলাইন",
      ],
    },
  },
];
