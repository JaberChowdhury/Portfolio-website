# Jaber Chowdhury — Portfolio Website

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-black?style=for-the-badge&logo=framer&logoColor=blue)
![i18n](https://img.shields.io/badge/next--intl-EN%20%7C%20BN-4F46E5?style=for-the-badge)

<p align="center">
  A modern, performant, and interactive personal portfolio engineered with <b>Next.js 16</b>, <b>React 19</b>, <b>Tailwind CSS v4</b>, and <b>Framer Motion</b>. Featuring a bespoke 3D card stack navigation, bilingual support (English & Bengali), dark/light theme dynamics, and interactive competitive programming & systems engineering showcases.
</p>

[**🌐 Live Demo**](https://portfolio-website-git-v2-shadcn-jaberchowdhurys-projects.vercel.app/) • [**Report Bug**](https://github.com/JaberChowdhury/Portfolio-website/issues) • [**Request Feature**](https://github.com/JaberChowdhury/Portfolio-website/issues)

</div>

---

## 🌟 Key Features

- 🃏 **Interactive Card Stack Navigation**: Smooth full-screen stacked card transitions with gesture support, keyboard controls, wheel locking, and mobile touch optimization.
- 🌐 **Internationalization (i18n)**: Native bilingual experience supporting **English** and **Bengali** with localized typography (`Marlin`, `Sohid`, `JetBrains Mono`, `Syne`, `Playfair Display`).
- 🎨 **Adaptive Hallmark Theme & Mode Toggle**: Dynamic Dark/Light theme switching with custom color palettes (`--color-pear`, `--color-lavender`, `--color-coral`, `--color-cyan`, etc.) tailored per section with depth shading and backdrop glassmorphism.
- 🏆 **Competitive Programming Showcase**:
  - Live statistics breakdown (359+ solved across Codeforces & Beecrowd).
  - ICPC 2025 Regional Contestant hub with verified certificate viewer modal and interactive methodology breakdown.
- 🚀 **Curated Engineering Projects**: Featured project showcases including **Wallmod** (Rust/GPUI desktop app), **AnonGo** (real-time WebSocket/Redis social platform), and **BU QB PRO** (Next.js/Supabase exam archive).
- 🦀 **Current Learning & Systems Focus**: Active technical logs tracking low-level systems programming in Rust (Tokio, Rayon concurrency, memory safety) and database architecture in PostgreSQL (indexing, RLS, query optimization).
- 🌍 **Interactive 3D Elements**: Theme-aware interactive 3D Globe powered by Cobe & Three.js, paired with custom particle and meteor background effects.
- 📱 **Fully Responsive & Performance-Optimized**: DOM virtualization, smooth layout scaling, fluid mobile bottom sheets, and SEO metadata with dynamic sitemaps and OpenGraph tags.

---

## 🛠️ Tech Stack

| Domain | Technologies |
|---|---|
| **Core Framework** | [Next.js 16 (App Router)](https://nextjs.org/), [React 19](https://react.dev/), [TypeScript 6](https://www.typescriptlang.org/) |
| **Styling & Design** | [Tailwind CSS v4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/), [Base UI](https://base-ui.com/), [tw-animate-css](https://github.com/) |
| **Motion & Animation** | [Framer Motion](https://www.framer.com/motion/), Motion One |
| **Localization** | [next-intl](https://next-intl-docs.vercel.app/) (English & Bengali) |
| **3D & Visuals** | [Cobe (3D Globe)](https://github.com/shuding/cobe), [Three.js](https://threejs.org/), [Recharts](https://recharts.org/) |
| **Icons & Fonts** | [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/), [Next Font Google](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) |
| **Theme & Utilities** | [next-themes](https://github.com/pacocoursey/next-themes), [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge) |

---

## 📂 Project Structure

```text
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx         # Root layout with providers, fonts, and metadata
│   │   └── page.tsx           # Main homepage hosting the CardStack
│   ├── favicon.ico
│   ├── globals.css            # Tailwind v4 directives and CSS custom variables
│   ├── robots.ts              # SEO robots configuration
│   └── sitemap.ts             # Dynamic sitemap generation
├── components/
│   ├── CardStack/             # Custom stacked-section controller & animation hooks
│   ├── Footer/                # Interactive footer with 3D Globe & theme controls
│   ├── Home/                  # Section components
│   │   ├── HeroSection/       # Introduction and interactive CTAs
│   │   ├── TechnologySection/ # Categorized tech stack matrix
│   │   ├── ProjectsSection/   # Curated project cards with live links
│   │   ├── CompetitiveProgrammingSection/ # CP stats, modal tabs, and ICPC certificate
│   │   ├── ExperienceSection/ # Professional timeline and open-source contributions
│   │   ├── EducationSection/  # Academic background and milestone tracker
│   │   ├── LearningSection/   # Systems programming & Postgres learning log
│   │   ├── ContactSection/    # Social links and reach-out hub
│   │   └── HomeStack.tsx      # Main CardStack configuration
│   ├── Navbar/                # Top navigation header with active section tracking
│   ├── ui/                    # Reusable UI primitives (buttons, cards, badges, globe)
│   ├── LanguageToggle.tsx     # English / Bengali locale switcher
│   └── ThemeToggle.tsx        # Dark / Light theme switcher
├── data/
│   └── fallbackRepos.ts       # Fallback repository metadata
├── i18n/
│   ├── routing.ts             # Next-intl locale routing definition
│   └── request.ts             # Server-side translation request handler
├── messages/
│   ├── en.json                # English localized copy
│   └── bn.json                # Bengali localized copy
├── public/                    # Static assets, images, and fonts
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have one of the following package managers installed:
- [Node.js](https://nodejs.org/) (v18.18+ or later)
- [Bun](https://bun.sh/) (recommended)
- [pnpm](https://pnpm.io/) or [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JaberChowdhury/Portfolio-website.git
   cd Portfolio-website
   ```

2. **Install dependencies:**
   ```bash
   # Using Bun
   bun install

   # Or using npm
   npm install
   ```

3. **Start the development server:**
   ```bash
   # Using Bun
   bun dev

   # Or using npm
   npm run dev
   ```

4. **Open in browser:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔧 Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `next dev` | Launches the local development server |
| `build` | `next build` | Compiles the production build |
| `start` | `next start` | Starts the production server |
| `typecheck` | `tsc --noEmit` | Runs TypeScript compiler checks |
| `lint` | `eslint` | Lints files for code quality |
| `format` | `prettier --write "**/*.{ts,tsx}"` | Formats codebase using Prettier |

---

## 👤 Author

**Jaber Chowdhury**
- 🌐 **Portfolio**: [portfolio-website-git-v2-shadcn-jaberchowdhurys-projects.vercel.app](https://portfolio-website-git-v2-shadcn-jaberchowdhurys-projects.vercel.app/)
- 🐙 **GitHub**: [@JaberChowdhury](https://github.com/JaberChowdhury)
- 💼 **LinkedIn**: [Md. Jaber Hossain Chowdhury](https://www.linkedin.com/in/md-jaber-hossain-chowdhury-543335252/)
- ⚡ **Codeforces**: [jaber02](https://codeforces.com/profile/jaber02)
- 📧 **Email**: [jaberhc2002@gmail.com](mailto:jaberhc2002@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
