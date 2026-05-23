// ─── Types ────────────────────────────────────────────────────────────────────

export interface Project {
  id: number;
  title: string;
  bg: string;
  accent: string;
  description: string;
  services: string;
  industry: string;
  location: string;
  textColor: string;
}

// ─── Card Layout Constants ────────────────────────────────────────────────────

export const CARD_WIDTH = 520;
export const CARD_GAP = 16;
export const CARD_STRIDE = CARD_WIDTH + CARD_GAP;

// ─── Project Data ─────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "MONKEYS",
    bg: "#1a1a1a",
    accent: "#e63329",
    description:
      "Brand identity and visual language system for a creative collective pushing boundaries in contemporary street culture and urban art.",
    services: "Brand Identity, Art Direction, Typography",
    industry: "Creative & Culture",
    location: "Dhaka, Bangladesh",
    textColor: "#e63329",
  },
  {
    id: 2,
    title: "MORGADO SA",
    bg: "#2c2c2c",
    accent: "#d4b896",
    description:
      "Heritage wine label redesign and packaging system for a century-old Portuguese estate, blending tradition with contemporary craft.",
    services: "Packaging Design, Brand Identity, Print",
    industry: "Food & Beverage",
    location: "Portugal",
    textColor: "#d4b896",
  },
  {
    id: 3,
    title: "ROTA DO NEVEIRO",
    bg: "#3d4a3e",
    accent: "#ffffff",
    description:
      "Unified web platform connecting municipalities of Cadaval, Castanheira de Pera, and Funchal. The site showcases historical ice routes and hiking trails, acting as a complete digital guide to the nature and heritage of these regions.",
    services:
      "UX Design, Website Design, Full Stack Solutions, Technical SEO, Performance, CMS Integration",
    industry: "Tourism & Public Sector",
    location: "Portugal",
    textColor: "#ffffff",
  },
  {
    id: 4,
    title: "REPULSOR",
    bg: "#111111",
    accent: "#c8c8c8",
    description:
      "Futuristic brand system and digital experience for an advanced technology company operating at the intersection of hardware and software innovation.",
    services: "Brand Strategy, UI/UX Design, Motion Design",
    industry: "Technology",
    location: "Remote, Global",
    textColor: "#c8c8c8",
  },
  {
    id: 5,
    title: "MJHC STUDIO",
    bg: "#1c1c2e",
    accent: "#00E5FF",
    description:
      "Personal portfolio and design studio identity for MD Jaber Hossain Chowdhury — a multidisciplinary designer and developer based in Bangladesh.",
    services: "Brand Identity, Web Design, Development",
    industry: "Design & Technology",
    location: "Jinudpur, Bangladesh",
    textColor: "#00E5FF",
  },
];
