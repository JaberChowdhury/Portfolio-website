# Design — Jaber Chowdhury · Portfolio

A locked design system for this portfolio. Every page redesign reads this file
before emitting code. Do not regenerate per page — extend or amend this file when
the system needs to grow.

Produced by `hallmark redesign` in the **Aurora** theme. All production code that
deviates from this system is a slop-test failure.

## Genre

atmospheric — the AI-creative product register (Suno / Runway / late-night
tooling). Dark canvas with radial cyan blooms, weighty sans display, Sentient
serif body, plain-English copy, single cool accent. The aesthetic of a tool you'd
want to use after dark.

## Macrostructure family

- **Home page:** Hanging section heads — headings float above each section in
  negative space, no borders, no rules. Single-column body. Negative-space
  dividers (the gap IS the divider — no hairlines). No imagery; typography
  carries everything. Fade-up reveal only.
- **Content / lab pages** (`/projects`, `/projects/[name]/[branch]`, `/dungeon`,
  `/ui`, `/font-preview`, `/illustration`): same tokens, same CTA voice; content
  is a single column on the dark canvas, blooms stay behind the type.

## Theme — Aurora

Dark-only. Deep cool night-blue ground (never pure black), two fixed cool cyan
radial blooms behind the content, weighty sans display + Sentient serif body,
single cyan accent. No light sections, no glassmorphism, no hairlines, no
gradient text, no italic headers.

- `--color-paper`    oklch(15% 0.015 210)   canvas (dark, cool — never #000)
- `--color-paper-2`  oklch(19% 0.02 215)    elevated card
- `--color-paper-3`  oklch(24% 0.025 215)   hover card
- `--color-ink`      oklch(94% 0.008 200)   near-white cool text
- `--color-ink-2`    oklch(78% 0.012 210)   muted body (light grey on dark)
- `--color-cyan`     oklch(78% 0.11 200)    THE accent — links, tags, blooms, focus
- `--color-cyan-2`   oklch(64% 0.12 205)    accent deep (hover / press)

**One-accent rule:** cyan is the single accent. Warm hues only if a single
"ember" moment is truly needed — max one small tag per page, never on display.

## Canvas treatment

- Two radial-gradient blooms in cyan, ~20–30% viewport footprint each, fixed,
  no animation. Implemented once at the page root (`.aurora-canvas`).
- Banned: whole-page rotating mesh "aurora blob", gradient text, glassmorphism,
  animated blooms.

## Typography

- **Display:** Geist Sans 600 (weighty sans), plain English, letter-spacing
  tight (`-0.03em`). Display can reach `clamp(3rem, 6vw + 1rem, 6rem)`.
  Bengali: "Sohid Osman Hadi" (unchanged, bn locale only).
- **Body:** Sentient serif (self-hosted woff2, 400/500/700) — the signature
  Aurora move. Body copy in Sentient 400, `--color-ink-2`.
- **Mono:** Geist Mono, uppercase labels only, 11px, tracking `0.10–0.12em`.
  Eyebrows / stat labels / section indices.
- **No italic headers.** Emphasis is weight (600–700), cyan accent, or the `.hl`
  drawn underline.

## Spacing

Tailwind default 4-pt scale. One content shell everywhere: `max-w-3xl` for body
copy (single column), `max-w-6xl` for grids, gutter `px-6 md:px-10`. Sections
separated by generous negative space — `--space-3xl` minimum between major
sections; the gap is the divider, no rules between sections.

## Motion

- `--ease-fade: cubic-bezier(0.22, 1, 0.36, 1)` — the ONLY easing. Fade-in
  only, orchestrated once as a fade-up stagger per section.
- No slide, no bounce, no marquee, no counters unless they are genuine data.
- `prefers-reduced-motion: reduce` → opacity/colour only, reveals instant.

## Microinteractions stance

- Cards: lift toward the user with a soft cyan glow shadow on hover (elevated
  `paper-3`, glow, no border).
- Links / CTAs: cyan on hover, underline sweeps in.
- Every interactive element has a state response (hover, focus-visible, active,
  disabled).

## CTA voice

- **Primary:** typographic-only — a word in Geist 600, cyan (or ink that turns
  cyan), a drawn underline + arrow. Looks like a headline that happens to be
  clickable. No box, no fill, no border.
- **Tertiary / link:** same voice smaller; muted, cyan on hover.
- No filled pill buttons except where a form genuinely needs a submit surface —
  even then, a quiet cyan text button wins.

## Per-page allowances

- Home page MAY use the aurora canvas blooms + fade-up reveals. No photography,
  no icons-as-decoration.
- Content/lab pages: typography + blooms only. The content column stays centered
  and quiet; the type is the surface.

## What every page MUST share

- The wordmark ("Jaber.dev" — Geist 600, ink, cyan dot or underline) and its
  placement in the N5 floating pill.
- The cyan accent system. Cyan ≤ ~5% of viewport except blooms.
- Geist Sans + Sentient serif + Geist Mono (bn: Sohid Osman Hadi).
- The CTA voice (typographic-only word).
- Section-heading rhythm: Geist Mono eyebrow (index + label), then a Hanging
  Geist 600 display heading floating above the section body in negative space,
  then a Sentient body line.
- `overflow-x: clip` on html and body (root).
- Dark-only canvas — never a light section.

## What pages MAY differ on

- Heading size and eyebrow content per page.
- Card physics within the single-column rhythm (soft glow lift only).
- The exact bloom placement behind each section.

## Tokens / source of truth

- `app/globals.css` — `:root` holds raw vars; `@theme inline` maps them into
  Tailwind utilities (`bg-paper`, `text-ink-2`, `bg-cyan`, `shadow-glow-cyan`,
  …). `.dark`/`.light` are aliases — Aurora is dark-only, so both resolve to the
  same dark palette.
- `app/[locale]/layout.tsx` — font variables `--font-geist-sans`,
  `--font-sentient`, `--font-geist-mono`.
