import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        display: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
        marlin: ['"Marlin Soft"', "sans-serif"],
        abcfont: ["abcfont"],
      },
      colors: {
        pear: {
          DEFAULT: "var(--color-pear)",
          light: "var(--color-pear-light)",
          deep: "var(--color-pear-deep)",
          foreground: "var(--color-pear-foreground)",
        },
        "hum-cyan": {
          DEFAULT: "var(--color-cyan)",
          light: "var(--color-cyan-light)",
          deep: "var(--color-cyan-deep)",
          foreground: "var(--color-cyan-foreground)",
        },
        cyan: {
          DEFAULT: "var(--color-cyan)",
          light: "var(--color-cyan-light)",
          deep: "var(--color-cyan-deep)",
          foreground: "var(--color-cyan-foreground)",
        },
        coral: {
          DEFAULT: "var(--color-coral)",
          light: "var(--color-coral-light)",
          deep: "var(--color-coral-deep)",
          foreground: "var(--color-coral-foreground)",
        },
        mint: {
          DEFAULT: "var(--color-mint)",
          light: "var(--color-mint-light)",
          deep: "var(--color-mint-deep)",
          foreground: "var(--color-mint-foreground)",
        },
        lavender: {
          DEFAULT: "var(--color-lavender)",
          light: "var(--color-lavender-light)",
          deep: "var(--color-lavender-deep)",
          foreground: "var(--color-lavender-foreground)",
        },
      },
    },
  },
  plugins: [],
}

export default config
