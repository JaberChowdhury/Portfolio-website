import { Box, Divider, Link, Typography } from "@mui/material";
import type { MDXComponents } from "mdx/types";
import NextLink from "next/link";
import { useMDXComponents as getThemeComponents } from "nextra-theme-blog";
import type { ReactNode } from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  const themeComponents = getThemeComponents();
  return {
    ...themeComponents,
    wrapper: ({ children }: { children: ReactNode }) => <>{children}</>,
    h1: ({ children }: { children: ReactNode }) => (
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 800,
          mt: 5,
          mb: 2,
          textTransform: "uppercase",
          fontFamily: "inherit",
          letterSpacing: "-0.02em",
        }}
      >
        {children}
      </Typography>
    ),
    h2: ({ children }: { children: ReactNode }) => (
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: 700,
          mt: 4,
          mb: 2,
          textTransform: "uppercase",
          fontFamily: "inherit",
          letterSpacing: "-0.01em",
        }}
      >
        {children}
      </Typography>
    ),
    h3: ({ children }: { children: ReactNode }) => (
      <Typography
        variant="h5"
        component="h3"
        sx={{
          fontWeight: 700,
          mt: 3,
          mb: 1.5,
          textTransform: "uppercase",
          fontFamily: "inherit",
          letterSpacing: "-0.01em",
        }}
      >
        {children}
      </Typography>
    ),
    p: ({ children }: { children: ReactNode }) => (
      <Typography
        variant="body1"
        sx={{
          lineHeight: 1.8,
          mb: 2.5,
          color: "text.primary",
          fontSize: "1.05rem",
        }}
      >
        {children}
      </Typography>
    ),
    a: ({ href, children }: { href?: string; children: ReactNode }) => (
      <Link
        href={href || "#"}
        component={NextLink}
        sx={{
          color: "text.primary",
          fontWeight: 700,
          textDecoration: "underline",
          "&:hover": { opacity: 0.7 },
        }}
      >
        {children}
      </Link>
    ),
    ul: ({ children }: { children: ReactNode }) => (
      <Box component="ul" sx={{ pl: 3, mb: 3, lineHeight: 1.8 }}>
        {children}
      </Box>
    ),
    ol: ({ children }: { children: ReactNode }) => (
      <Box component="ol" sx={{ pl: 3, mb: 3, lineHeight: 1.8 }}>
        {children}
      </Box>
    ),
    li: ({ children }: { children: ReactNode }) => (
      <Box
        component="li"
        sx={{ mb: 1, fontSize: "1.05rem", color: "text.primary" }}
      >
        {children}
      </Box>
    ),
    hr: () => (
      <Divider sx={{ my: 5, borderColor: "divider", borderBottomWidth: 1 }} />
    ),
    blockquote: ({ children }: { children: ReactNode }) => (
      <Box
        component="blockquote"
        sx={{
          borderLeft: "4px solid",
          borderColor: "text.primary",
          pl: 3,
          my: 4,
          fontStyle: "italic",
          color: "text.secondary",
          "& p": { m: 0 }, // remove margins on child paragraphs inside blockquote
        }}
      >
        {children}
      </Box>
    ),
    ...components,
  };
}
