import type { CSSProperties } from "react";

// ─── Shared Inline Styles ─────────────────────────────────────────────────────

export const labelStyle: CSSProperties = {
  // fontFamily: "'Share Tech Mono', monospace",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.1em",
  color: "var(--mui-palette-text-secondary)",
  marginBottom: 6,
};

export const bodyStyle: CSSProperties = {
  // fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 400,
  fontSize: 13,
  lineHeight: 1.55,
  color: "var(--mui-palette-text-primary)",
  margin: 0,
};
