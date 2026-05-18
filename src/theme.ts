"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-mui-color-scheme",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#7c3aed", // Deep Purple for your light mode text
        },
        secondary: {
          main: "#db2777", // Pink for your light mode text gradient
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#10b981", // Emerald Green for your dark mode text
        },
        secondary: {
          main: "#059669", // Darker Emerald for your dark mode text gradient
        },
      },
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  // ... keep your MuiCssBaseline styleOverrides below this

  // Global style overrides
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          position: "relative",
          minHeight: "100vh",
          margin: 0,
          transition: "background-color 0.3s ease, background-image 0.3s ease",

          // --- LIGHT MODE BACKGROUND (Default) ---
          backgroundColor: "#fdfcfb",
          backgroundImage: `
            radial-gradient(circle at 15% 75%, rgba(216, 180, 254, 0.4) 0%, transparent 40%),
            radial-gradient(circle at 85% 25%, rgba(255, 218, 185, 0.5) 0%, transparent 40%),
            radial-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 20px 20px",
          backgroundPosition: "0 0, 0 0, -10px -10px",

          // --- DARK MODE BACKGROUND ---
          ...themeParam.applyStyles("dark", {
            backgroundColor: "#030711",
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 60%),
              radial-gradient(circle at 80% 20%, rgba(5, 150, 105, 0.05) 0%, transparent 40%)
            `,
            backgroundSize: "auto",
            backgroundPosition: "auto",
          }),
        },
      }),
    },
  },
});

export default theme;
