// ─── Types ────────────────────────────────────────────────────────────────────

export interface ServiceProject {
  id: string;
  title: string;
  client: string;
  services: string;
  desc: string;
  year: string;
  image: string;
}

// ─── Project Data ─────────────────────────────────────────────────────────────

export const projectsData: ServiceProject[] = [
  {
    id: "01",
    title: "MUSEUM 3D",
    client: "Local Museum",
    services: "3D / UI / Dev",
    desc: "Immersive 3D experience for museum exhibits.",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "NEXUS SYSTEM",
    client: "FinTech Corp",
    services: "React / Next",
    desc: "Scalable design system library.",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "AETHER BRAND",
    client: "E-Comm Global",
    services: "Motion / Art",
    desc: "Complete visual identity overhaul.",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "CYBER LABS",
    client: "Open Source",
    services: "AI / Python",
    desc: "Experimental research into neural networks.",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800&auto=format&fit=crop",
  },
];
