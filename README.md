# Personal Portfolio - MD Jaber Hossain Chowdhury

A high-performance, interactive personal portfolio website built with modern web technologies. This project showcases a brutalist, typography-heavy design language paired with smooth animations and interactive 3D elements.

## ✨ Features

- **Interactive 3D Particle Text:** Uses `Three.js` to render performant, interactive text that reacts to cursor movements with physics-based hover and click explosions.
- **Fluid Typography & Responsive Design:** Fully responsive layout that elegantly scales from desktop down to mobile viewports using CSS `clamp()` functions and MUI's Grid system.
- **Draggable Project Carousel:** A smooth, spring-physics-driven carousel built with `framer-motion` for navigating through featured projects.
- **Inverse Theming:** Supports dynamic light/dark color schemes via Material UI's `useColorScheme`, with intelligent inverse-color component mapping (e.g., the footer swaps modes dynamically).
- **Parallax & Marquee Animations:** Continuous infinite-scroll marquees and floating parallax background text elements for a dynamic visual experience.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI Library:** [React](https://react.dev/)
- **Styling & Components:** [Material UI (MUI v6)](https://mui.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics:** [Three.js](https://threejs.org/)

## 🚀 Getting Started

First, ensure you have Node.js installed, then install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `src/app/` - Next.js App Router pages and global layouts.
- `src/components/` - Reusable UI components organized by section:
  - `hero/` - Hero banner, marquee, and floating title elements.
  - `works/` - Project showcase with the draggable carousel.
  - `services/` - Animated accordion-style services list.
  - `pricing/` - Responsive pricing tier cards.
  - `faq/` - Interactive FAQ accordions.
  - `extras/` - Contains the complex `ParticleText` Three.js component.
- `src/theme.ts` - Centralized MUI theme configuration supporting CSS variables for rapid mode switching.

## 📄 License

This project is open-source and available under the MIT License.
