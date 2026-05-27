"use client";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {
  Box,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguageStore } from "@/store/languageStore";

const sections = [
  { id: "home", labelEn: "HOME", labelBn: "হোম" },
  { id: "works", labelEn: "WORKS", labelBn: "কাজ" },
  { id: "services", labelEn: "SERVICES", labelBn: "সেবাসমূহ" },
  { id: "process", labelEn: "PROCESS", labelBn: "প্রক্রিয়া" },
  { id: "pricing", labelEn: "PRICING", labelBn: "মূল্য" },
  { id: "testimonials", labelEn: "TESTIMONIALS", labelBn: "প্রশংসাপত্র" },
  { id: "faq", labelEn: "FAQ", labelBn: "প্রশ্নাবলী" },
  { id: "contact", labelEn: "CONTACT", labelBn: "যোগাযোগ" },
];

export default function HomepageSidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const language = useLanguageStore((s) => s.language);
  const [activeSection, setActiveSection] = useState("home");
  const [isExpanded, setIsExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll spy implementation using IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Trigger when element is in the middle of the viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    for (const sec of sections) {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setMobileOpen(false);
    }
  };

  // Render list of navigation items
  const renderLinks = (fontSize = "0.75rem", _spacing = 1.5) => {
    return sections.map((sec) => {
      const label = language === "en" ? sec.labelEn : sec.labelBn;
      const isActive = activeSection === sec.id;

      return (
        <Box
          key={sec.id}
          onClick={() => handleScrollTo(sec.id)}
          sx={{
            cursor: "pointer",
            py: 0.75,
            px: 1.5,
            borderLeft: isActive
              ? "3px solid var(--mui-palette-text-primary)"
              : "3px solid transparent",
            bgcolor: isActive ? "action.selected" : "transparent",
            transition: "all 0.15s ease-out",
            "&:hover": {
              bgcolor: "action.hover",
              borderLeftColor: isActive
                ? "var(--mui-palette-text-primary)"
                : "var(--mui-palette-divider)",
            },
          }}
        >
          <Typography
            sx={{
              fontFamily: "monospace",
              fontSize,
              fontWeight: isActive ? 800 : 500,
              color: isActive ? "text.primary" : "text.secondary",
              letterSpacing: "0.08em",
            }}
          >
            {label}
          </Typography>
        </Box>
      );
    });
  };

  // Mobile View: Floating outline button that triggers a drawer
  if (isMobile) {
    return (
      <>
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{
            position: "fixed",
            right: 20,
            bottom: 20,
            zIndex: 90,
            bgcolor: "text.primary",
            color: "background.default",
            border: "1px solid var(--mui-palette-divider)",
            borderRadius: 0, // Brutalist sharp edges
            boxShadow: "3px 3px 0px var(--mui-palette-action-focus)",
            width: 48,
            height: 48,
            "&:hover": {
              bgcolor: "text.secondary",
              transform: "translate(-2px, -2px)",
              boxShadow: "5px 5px 0px var(--mui-palette-action-focus)",
            },
            transition: "all 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          aria-label="Open page outline"
        >
          <FormatListBulletedIcon />
        </IconButton>

        <Drawer
          anchor="bottom"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{
            zIndex: 1000,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "100%",
              backgroundColor: "background.paper",
              borderTop: "3px solid var(--mui-palette-text-primary)",
              p: 3,
              pb: 4,
            },
          }}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              pb: 1,
              borderBottom: "1px solid var(--mui-palette-divider)",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: "monospace",
                fontWeight: 800,
                letterSpacing: "0.05em",
              }}
            >
              {language === "en" ? "PAGE OUTLINE" : "পৃষ্ঠার আউটলাইন"}
            </Typography>
            <IconButton size="small" onClick={() => setMobileOpen(false)}>
              <ChevronRightIcon />
            </IconButton>
          </Stack>
          <Stack spacing={0.5}>{renderLinks("0.85rem")}</Stack>
        </Drawer>
      </>
    );
  }

  // Desktop View: Notch-inspired collapse/expand side dock
  return (
    <Box
      sx={{
        position: "fixed",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 90,
        display: "flex",
        alignItems: "center",
      }}
    >
      <AnimatePresence initial={false} mode="wait">
        {!isExpanded ? (
          // Collapsed Dot Indicators Mode
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Box
              sx={{
                bgcolor: "background.paper",
                border: "1px solid var(--mui-palette-text-primary)",
                borderRight: "none",
                py: 2,
                px: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
                boxShadow: "-3px 3px 0px var(--mui-palette-text-primary)",
              }}
            >
              {/* Expand Button */}
              <IconButton
                size="small"
                onClick={() => setIsExpanded(true)}
                sx={{
                  color: "text.primary",
                  p: 0.25,
                  borderRadius: 0,
                  "&:hover": { bgcolor: "action.hover" },
                }}
                title="Expand outline"
              >
                <ChevronLeftIcon fontSize="small" />
              </IconButton>

              {/* Dots list with tooltips */}
              <Stack spacing={1.5} sx={{ alignItems: "center" }}>
                {sections.map((sec) => {
                  const label = language === "en" ? sec.labelEn : sec.labelBn;
                  const isActive = activeSection === sec.id;

                  return (
                    <Tooltip
                      key={sec.id}
                      title={label}
                      placement="left"
                      arrow
                      slotProps={{
                        tooltip: {
                          sx: {
                            bgcolor: "text.primary",
                            color: "background.default",
                            fontFamily: "monospace",
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            borderRadius: 0,
                            border: "1px solid var(--mui-palette-divider)",
                          },
                        },
                        arrow: {
                          sx: { color: "text.primary" },
                        },
                      }}
                    >
                      <Box
                        onClick={() => handleScrollTo(sec.id)}
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: 0, // Sharp square brutalist indicator
                          border: "1px solid var(--mui-palette-text-primary)",
                          bgcolor: isActive ? "text.primary" : "transparent",
                          cursor: "pointer",
                          transform: isActive
                            ? "rotate(45deg) scale(1.2)"
                            : "rotate(0deg)",
                          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                          "&:hover": {
                            bgcolor: isActive ? "text.primary" : "action.hover",
                            transform: "rotate(45deg) scale(1.3)",
                          },
                        }}
                      />
                    </Tooltip>
                  );
                })}
              </Stack>
            </Box>
          </motion.div>
        ) : (
          // Expanded Outline Navigation Panel Mode
          <motion.div
            key="expanded"
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Box
              sx={{
                width: 170,
                bgcolor: "background.paper",
                border: "1px solid var(--mui-palette-text-primary)",
                borderRight: "none",
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                boxShadow: "-4px 4px 0px var(--mui-palette-text-primary)",
              }}
            >
              {/* Header inside Sidebar */}
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  pb: 1,
                  borderBottom: "1px solid var(--mui-palette-divider)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    letterSpacing: "0.05em",
                    color: "text.secondary",
                  }}
                >
                  {language === "en" ? "OUTLINE" : "আউটলাইন"}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setIsExpanded(false)}
                  sx={{
                    color: "text.primary",
                    p: 0,
                    borderRadius: 0,
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <ChevronRightIcon fontSize="small" />
                </IconButton>
              </Stack>

              {/* Navigation links stack */}
              <Stack spacing={0.5}>{renderLinks()}</Stack>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
