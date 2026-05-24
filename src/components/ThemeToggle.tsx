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
      color="inherit"
      sx={{
        p: 0.75,
        borderRadius: 0,
        "&:hover": { opacity: 0.7 },
      }}
    >
      {currentMode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
