"use client";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Link as MuiLink,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguageStore } from "@/store/languageStore";
import Logo from "../Logo";
import ThemeToggle from "../ThemeToggle";

const translations = {
  en: {
    home: "HOME",
    works: "WORKS",
    projects: "PROJECTS",
    services: "SERVICES",
    process: "PROCESS",
    pricing: "PRICING",
    testimonials: "TESTIMONIALS",
    faq: "FAQ",
    contact: "CONTACT",
    lang: "LANGUAGE: EN | BN",
  },
  bn: {
    home: "০০১/ হোম",
    works: "০০২/ কাজ",
    projects: "০০৩/ প্রকল্পসমূহ",
    services: "০০৪/ সেবাসমূহ",
    process: "০০৫/ প্রক্রিয়া",
    pricing: "০০৬/ মূল্য",
    testimonials: "০০৭/ প্রশংসাপত্র",
    faq: "০০৮/ প্রশ্নাবলী",
    contact: "০০৯/ যোগাযোগ",
    lang: "ভাষা: EN | BN",
  },
};

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const gridLineColor = "var(--mui-palette-divider)";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/#home");
  const pathname = usePathname();

  const language = useLanguageStore((s) => s.language);
  const setLanguage = useLanguageStore((s) => s.setLanguage);
  const toggleLanguage = useLanguageStore((s) => s.toggleLanguage);
  const t = translations[language];

  // Enforce English language strictly on mobile viewports
  useEffect(() => {
    if (isMobile && language !== "en") {
      setLanguage("en");
    }
  }, [isMobile, language, setLanguage]);

  const navLinks = [
    { label: t.home, href: "/#home" },
    { label: t.works, href: "/#works" },
    { label: t.projects, href: "/projects" },
    { label: t.services, href: "/#services" },
    { label: t.process, href: "/#process" },
    { label: t.pricing, href: "/#pricing" },
    { label: t.testimonials, href: "/#testimonials" },
    { label: t.faq, href: "/#faq" },
    { label: t.contact, href: "/#contact" },
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
        backgroundColor:
          "rgba(var(--mui-palette-background-defaultChannel) / 0.7)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Left: The Interactive Framer Motion Logo */}
      <Box sx={{ zIndex: 120 }}>
        <MuiLink component={NextLink} href="/#home" underline="none">
          <Logo />
        </MuiLink>
      </Box>

      {/* Center: Desktop Menu */}
      <Stack
        direction="row"
        spacing={4}
        sx={{ display: { xs: "none", lg: "flex" } }}
      >
        {navLinks.map((link) => {
          const currentActive =
            pathname === "/projects" ? "/projects" : activeLink;
          const isLinkActive = currentActive === link.href;

          return (
            <Box
              key={link.label}
              sx={{ position: "relative", display: "inline-block" }}
            >
              <MuiLink
                component={NextLink}
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
              {isLinkActive && (
                <motion.div
                  layoutId="navbar-underline"
                  style={{
                    position: "absolute",
                    bottom: -6,
                    left: 0,
                    right: 0,
                    height: 2,
                    backgroundColor: "var(--mui-palette-text-primary)",
                    borderRadius: 2,
                  }}
                />
              )}
            </Box>
          );
        })}
      </Stack>

      {/* Right: Extras & Mobile Menu Toggle */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <ThemeToggle />

        <Button
          onClick={toggleLanguage}
          color="inherit"
          sx={{
            fontWeight: "bold",
            display: { xs: "none", lg: "block" },
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
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
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
            backgroundColor: "background.default",
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
              component={NextLink}
              href={link.href}
              underline="none"
              color="text.primary"
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

        </Stack>
      </Drawer>
    </Box>
  );
}
