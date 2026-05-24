"use client";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // Grab systemMode as well
  const { mode, systemMode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <IconButton disabled size="large" />;
  }

  // Determine the actual current visual mode
  const currentMode = mode === "system" ? systemMode : mode;

  return (
    <IconButton
      onClick={() => setMode(currentMode === "light" ? "dark" : "light")}
      sx={(theme) => ({
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 9999,
        backgroundColor: "background.paper",
        boxShadow: 2,
        ...theme.applyStyles("dark", {
          backgroundColor: "rgba(255, 255, 255, 0.05)",
        }),
      })}
    >
      {currentMode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
