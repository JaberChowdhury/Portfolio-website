"use client";

import React, { useState } from "react";
import { Box, Typography, Stack, Drawer, IconButton, Link as MuiLink } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import Logo from "./Logo";

const navLinks = [
  { label: "001/ HOME", href: "#home" },
  { label: "002/ WORKS", href: "#works" },
  { label: "003/ SERVICES", href: "#services" },
  { label: "004/ PRICING", href: "#pricing" },
  { label: "005/ FAQ", href: "#faq" },
  { label: "006/ CONTACT", href: "#contact" },
];

const HamburgerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Navbar() {
  const theme = useTheme();
  const gridLineColor = theme.palette.divider;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 2, md: 4 },
        py: 2,
        borderBottom: `1px solid ${gridLineColor}`,

        // --- Glassmorphism Effect ---
        backgroundColor: alpha(theme.palette.background.default, 0.7),
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Left: The Interactive Framer Motion Logo */}
      <Box sx={{ zIndex: 120 }}>
        <MuiLink href="#home" underline="none">
          <Logo />
        </MuiLink>
      </Box>

      {/* Center: Desktop Menu */}
      <Stack
        direction="row"
        spacing={4}
        sx={{ display: { xs: "none", lg: "flex" } }}
      >
        {navLinks.map((link) => (
          <MuiLink
            key={link.label}
            href={link.href}
            underline="none"
            color="inherit"
            sx={{
              letterSpacing: "0.05em",
              fontSize: "0.75rem",
              fontWeight: 700,
              transition: "opacity 0.2s",
              "&:hover": { opacity: 0.6 },
            }}
          >
            {link.label}
          </MuiLink>
        ))}
      </Stack>

      {/* Right: Extras & Mobile Menu Toggle */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography
          variant="caption"
          sx={{ fontWeight: "bold", display: { xs: "none", sm: "block" } }}
        >
          EN | PT
        </Typography>

        {/* Mobile Hamburger Button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { lg: "none" }, zIndex: 120 }}
        >
          {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
        </IconButton>
      </Box>

      {/* Mobile Slide Menu (Drawer) */}
      <Drawer
        anchor="top"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "100%",
            backgroundColor: theme.palette.background.default,
            pt: 12, // Push content below the navbar
            pb: 4,
            px: 4,
          },
        }}
      >
        <Stack spacing={4} sx={{ mt: 2 }}>
          {navLinks.map((link) => (
            <MuiLink
              key={link.label}
              href={link.href}
              underline="none"
              color="black"
              onClick={handleDrawerToggle} // Close menu on click
              sx={{
                fontSize: "2rem",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                // transition: "opacity 0.2s",
                // "&:hover": { opacity: 0.6 },
              }}
            >
              {link.label}
            </MuiLink>
          ))}
          <Box sx={{ mt: 4, pt: 4, borderTop: `1px solid ${gridLineColor}` }}>
            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
              LANGUAGE: EN | PT
            </Typography>
          </Box>
        </Stack>
      </Drawer>
    </Box>
  );
}
