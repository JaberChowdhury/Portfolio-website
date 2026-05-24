"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Drawer,
  IconButton,
  Button,
  Link as MuiLink,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import Logo from "../Logo";
import { useLanguage } from "@/context/LanguageContext";

const HamburgerIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      d="M3 12h18M3 6h18M3 18h18"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      d="M18 6L6 18M6 6l12 12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Navbar() {
  const theme = useTheme();
  const gridLineColor = theme.palette.divider;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const { t, toggleLanguage, language } = useLanguage();

  const navLinks = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.works, href: "#works" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.process, href: "#process" },
    { label: t.nav.pricing, href: "#pricing" },
    { label: t.nav.testimonials, href: "#testimonials" },
    { label: t.nav.faq, href: "#faq" },
    { label: t.nav.contact, href: "#contact" },
  ];

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
          <Box
            key={link.label}
            sx={{ position: "relative", display: "inline-block" }}
          >
            <MuiLink
              href={link.href}
              underline="none"
              color="inherit"
              onClick={() => setActiveLink(link.href)}
              sx={{
                letterSpacing: "0.05em",
                fontSize: "0.75rem",
                fontWeight: 700,
                transition: "opacity 0.2s",
                "&:hover": { opacity: 0.6 },
                position: "relative",
                zIndex: 1,
              }}
            >
              {link.label}
            </MuiLink>
            {activeLink === link.href && (
              <motion.div
                layoutId="navbar-underline"
                style={{
                  position: "absolute",
                  bottom: -6,
                  left: 0,
                  right: 0,
                  height: 2,
                  backgroundColor: "black",
                  borderRadius: 2,
                }}
              />
            )}
          </Box>
        ))}
      </Stack>

      {/* Right: Extras & Mobile Menu Toggle */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          onClick={toggleLanguage}
          color="inherit"
          sx={{
            fontWeight: "bold",
            display: { xs: "none", sm: "block" },
            minWidth: "auto",
            p: 0,
            border: "none",
            "&:hover": { backgroundColor: "transparent", opacity: 0.7 },
          }}
        >
          {language === "en" ? "EN | BN" : "BN | EN"}
        </Button>

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
              onClick={() => {
                setActiveLink(link.href);
                handleDrawerToggle();
              }}
              sx={{
                fontSize: "2rem",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
              }}
            >
              {link.label}
            </MuiLink>
          ))}
          <Box sx={{ mt: 4, pt: 4, borderTop: `1px solid ${gridLineColor}` }}>
            <Button
              onClick={() => {
                toggleLanguage();
                handleDrawerToggle();
              }}
              color="inherit"
              sx={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                justifyContent: "flex-start",
                p: 0,
              }}
            >
              {language === "en" ? "LANGUAGE: EN | BN" : "ভাষা: BN | EN"}
            </Button>
          </Box>
        </Stack>
      </Drawer>
    </Box>
  );
}
