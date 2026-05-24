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
  en: ProjectTranslations;
  bn: ProjectTranslations;
}

export const projectsData: ProjectData[] = [
  {
    id: 1,
    title: "MONKEYS",
    bg: "#1a1a1a",
    accent: "#e63329",
    textColor: "#e63329",
    en: {
      description:
        "Brand identity and visual language system for a creative collective pushing boundaries in contemporary street culture and urban art.",
      services: "Brand Identity, Art Direction, Typography",
      industry: "Creative & Culture",
      location: "Dhaka, Bangladesh",
    },
    bn: {
      description:
        "সমসাময়িক স্ট্রিট কালচার এবং আর্বান আর্টের সীমানা ছাড়িয়ে যাওয়া একটি ক্রিয়েটিভ কালেক্টিভের জন্য ব্র্যান্ড আইডেন্টিটি এবং ভিজ্যুয়াল ল্যাঙ্গুয়েজ সিস্টেম।",
      services: "ব্র্যান্ড আইডেন্টিটি, আর্ট ডিরেকশন, টাইপোগ্রাফি",
      industry: "ক্রিয়েটিভ এবং কালচার",
      location: "ঢাকা, বাংলাদেশ",
    },
  },
  {
    id: 2,
    title: "MORGADO SA",
    bg: "#2c2c2c",
    accent: "#d4b896",
    textColor: "#d4b896",
    en: {
      description:
        "Heritage wine label redesign and packaging system for a century-old Portuguese estate, blending tradition with contemporary craft.",
      services: "Packaging Design, Brand Identity, Print",
      industry: "Food & Beverage",
      location: "Portugal",
    },
    bn: {
      description:
        "ঐতিহ্যের সাথে সমসাময়িক ক্র্যাফটের মিশ্রণ ঘটিয়ে এক শতাব্দী প্রাচীন পর্তুগিজ এস্টেটের জন্য হেরিটেজ ওয়াইন লেবেল রিডিজাইন এবং প্যাকেজিং সিস্টেম।",
      services: "প্যাকেজিং ডিজাইন, ব্র্যান্ড আইডেন্টিটি, প্রিন্ট",
      industry: "খাদ্য ও পানীয়",
      location: "পর্তুগাল",
    },
  },
  {
    id: 3,
    title: "ROTA DO NEVEIRO",
    bg: "#3d4a3e",
    accent: "#ffffff",
    textColor: "#ffffff",
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
    id: 4,
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
    id: 5,
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
];
