import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  // 1. Enable CSS variables for <InitColorSchemeScript />
  cssVariables: {
    colorSchemeSelector: "class",
  },
  defaultColorScheme: "light",
  // 2. Shared Core Settings
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.02em",
      textTransform: "uppercase",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
      textTransform: "uppercase",
    },
    body1: {
      fontWeight: 400,
      letterSpacing: "0.02em",
    },
    button: {
      fontWeight: 700,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
    },
  },
  shape: {
    borderRadius: 0, // Brutalist, sharp edges
  },

  // 3. Define both Light and Dark color schemes here
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#00FFFF", // Vibrant cyan
          contrastText: "#151515",
        },
        background: {
          default: "#E6E4DC", // Muted beige
          paper: "#DFDDD5",
        },
        text: {
          primary: "#2B2B2B", // Dark charcoal/greyscale
          secondary: "#5A5A5A",
        },
        divider: "rgba(0, 0, 0, 0.06)", // Brutalist grid line (Light)
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#00E5E5", // Adjusted cyan for dark mode
          contrastText: "#151515",
        },
        background: {
          default: "#151515", // Deep charcoal/black
          paper: "#1E1E1E",
        },
        text: {
          primary: "#E6E4DC", // Off-white
          secondary: "#9E9E9E",
        },
        divider: "rgba(255, 255, 255, 0.06)", // Brutalist grid line (Dark)
      },
    },
  },

  // 4. Global Overrides (Including the Background Grid)
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          // By using CSS variables here, the grid color changes instantly
          // without React needing to re-render the page!
          backgroundImage: `
            linear-gradient(var(--mui-palette-divider) 1px, transparent 1px),
            linear-gradient(90deg, var(--mui-palette-divider) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          backgroundAttachment: "fixed",
          backgroundColor: themeParam.palette.background.default,
        },
      }),
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "12px 24px",
          border: "1px solid",
        },
      },
    },
  },
});

// 5. Provide the default export expected by your layout.tsx
export default theme;
