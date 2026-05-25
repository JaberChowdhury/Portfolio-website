"use client";

import { Paper } from "@mui/material";

interface ReadmeRendererProps {
  html: string;
}

export default function ReadmeRenderer({ html }: ReadmeRendererProps) {
  const codeSurfaceColor =
    "rgba(var(--mui-palette-text-primaryChannel) / 0.05)";
  const syntaxMutedColor = "var(--mui-palette-text-secondary)";
  const syntaxDangerColor = "var(--mui-palette-error-main)";
  const syntaxStringColor = "var(--mui-palette-info-main)";
  const syntaxTitleColor = "var(--mui-palette-secondary-main)";
  const syntaxNumberColor = "var(--mui-palette-warning-main)";

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        color: "var(--mui-palette-text-primary)",
        padding: 0,
        boxSizing: "border-box",
        position: "relative",
        width: "100%",
        minHeight: "300px",

        // Custom styling for parsed README HTML
        "& h1, & h2, & h3, & h4": {
          fontFamily: "inherit",
          fontWeight: 700,
          color: "var(--mui-palette-text-primary)",
          borderBottom: "1px solid var(--mui-palette-divider)",
          pb: 1,
          mt: 4.5,
          mb: 2,
        },
        "& h1": { fontSize: "24px" },
        "& h2": { fontSize: "20px" },
        "& h3": { fontSize: "17px" },
        "& p": {
          fontSize: "14px",
          lineHeight: 1.65,
          color: "var(--mui-palette-text-primary)",
          mb: 2.5,
        },
        "& ul, & ol": {
          pl: 3,
          mb: 2.5,
          fontSize: "14px",
          color: "var(--mui-palette-text-primary)",
        },
        "& li": {
          mb: 1,
          color: "var(--mui-palette-text-primary)",
        },
        "& pre": {
          backgroundColor: codeSurfaceColor,
          padding: 2.5,
          borderRadius: "4px",
          border: "1px solid var(--mui-palette-divider)",
          overflowX: "auto",
          fontFamily: "monospace",
          my: 3,
        },
        "& code": {
          backgroundColor: codeSurfaceColor,
          px: 0.8,
          py: 0.4,
          borderRadius: "3px",
          fontFamily: "monospace",
          fontSize: "13px",
          color: "var(--mui-palette-text-primary)",
        },
        "& a": {
          color: "var(--mui-palette-primary-main)",
          textDecoration: "underline",
          fontWeight: 700,
          "&:hover": {
            color: "var(--mui-palette-text-primary)",
          },
        },
        "& table": {
          width: "100%",
          borderCollapse: "collapse",
          my: 3,
        },
        "& th, & td": {
          border: "1px solid var(--mui-palette-divider)",
          padding: 1.5,
          textAlign: "left",
          fontSize: "13px",
        },
        "& th": {
          backgroundColor: codeSurfaceColor,
          fontWeight: 700,
        },

        // highlight.js Syntax Highlighting styling (Brutalist Code Colors integrated with theme)
        "& .hljs": {
          display: "block",
          overflowX: "auto",
          padding: "0.5em",
          color: "var(--mui-palette-text-primary)",
        },
        "& .hljs-comment, & .hljs-quote": {
          color: syntaxMutedColor,
          fontStyle: "italic",
        },
        "& .hljs-keyword, & .hljs-selector-tag, & .hljs-subst": {
          color: syntaxDangerColor,
          fontWeight: "bold",
        },
        "& .hljs-string, & .hljs-regexp, & .hljs-addition, & .hljs-attribute, & .hljs-meta-string":
          {
            color: syntaxStringColor,
          },
        "& .hljs-title, & .hljs-section, & .hljs-doctag, & .hljs-name, & .hljs-selector-id, & .hljs-selector-class":
          {
            color: syntaxTitleColor,
            fontWeight: "bold",
          },
        "& .hljs-variable, & .hljs-template-variable, & .hljs-type, & .hljs-selector-attr, & .hljs-selector-pseudo, & .hljs-number":
          {
            color: syntaxNumberColor,
          },
        "& .hljs-symbol, & .hljs-bullet, & .hljs-meta, & .hljs-built_in, & .hljs-class, & .hljs-title.class_":
          {
            color: syntaxStringColor,
          },
        "& .hljs-emphasis": {
          fontStyle: "italic",
        },
        "& .hljs-strong": {
          fontWeight: "bold",
        },
      }}
    >
      <div
        style={{ position: "relative", zIndex: 1 }}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static readme rendering
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Paper>
  );
}
