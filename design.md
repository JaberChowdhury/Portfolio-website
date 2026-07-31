# Design — Jaber Chowdhury · Portfolio

A locked design system for this portfolio. Every page redesign reads this file
before emitting code. Do not regenerate per page — extend or amend this file when
the system needs to grow.

Produced by `hallmark redesign` in the **Hum** theme. All production code that
deviates from this system is a slop-test failure.

## Genre

playful — the post-Brilliant register. Warm, alive, smart-but-warm. Rounded sans
everywhere, multi-accent surfaces, mandatory hover-and-paint motion, one
character moment per page.

## Macrostructure family

- **Home page:** Marquee-style typographic hero + a Catalogue / Stat-Led spine.
  Sections alternate plain cream bands and single-accent tinted bands. Counters
  tick up. Cards are colour-shift (accent tint deepens on hover).
- **Content / lab pages** (`/projects`, `/projects/[name]/[branch]`, `/dungeon`,
  `/ui`, `/font-preview`, `/illustration`): Catalogue / Workbench family. Same
  tokens, same CTA voice; the content carries the page, enrichment only as
  thin Tier-A surface tint.

## Theme — Hum

Light cream ground, three accents on stage (each owns its own surface), rounded
sans type. Dark variant keeps the accents, inverts the ground to a warm
ink-tinted charcoal (never pure black).

- `--color-paper`   oklch(97% 0.012 95)   light · oklch(21.5% 0.015 250) dark
- `--color-paper-2` oklch(94.5% 0.016 95)
- `--color-paper-3` oklch(91.5% 0.02 95)
- `--color-ink`     oklch(20% 0.012 250)  (near-black, cool tilt — never pure black)
- `--color-ink-2`   oklch(42% 0.015 250)  (muted body)
- `--color-pear`    oklch(86% 0.18 95)    primary action, character mark
- `--color-cyan`    oklch(66% 0.18 235)   links, hover tints, community surfaces
- `--color-coral`   oklch(68% 0.24 18)    the single high-energy moment per page
- `--color-mint`    oklch(80% 0.16 150)   occasional, max one per page
- `--color-lavender`oklch(74% 0.16 305)   occasional, max one per page

**Three-rule for accents:** pear = primary action. Cyan = link / hover. Coral =
one emphatic moment. Never blend accents in gradients. Mint/lavender sparingly.

## Typography

- **Display / body:** Plus Jakarta Sans, weights 400/500/600/700 (rounded
  humanist, closed apertures). Display tracking `-0.025em`. Display weight 600–700.
  Bengali: "Sohid Osman Hadi" (unchanged, bn locale only).
- **Mono:** JetBrains Mono, weights 400/500. Uppercase mono labels only, 11px,
  tracking `0.10–0.12em`. Tabular numerals for counters/stats.
- **No serif anywhere.** No italic headers — emphasis is weight (500–700),
  accent colour, or the `.hl` drawn underline.

## Spacing

Tailwind default 4-pt scale. One content shell everywhere: `max-w-7xl` + gutter
`px-6 md:px-10`. Tinted bands are full-bleed wrappers whose inner content uses
the same shell — band content and plain content share identical left/right
edges.

## Motion

- `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)` — reserved for the primary
  CTA and the character moment (one each per page).
- `--ease-snap: cubic-bezier(0.22, 1, 0.36, 1)` — reveals and counter tick-ups.
- Push buttons: lift −2px + edge-grow on hover, press +3px + edge-shrink on
  active. Cards lift 4px + accent tint deepens on hover.
- `prefers-reduced-motion: reduce` → opacity/colour only, counters instant,
  marquee and star-burst disabled.

## Microinteractions stance

- Silent success. No toasts. Star-burst micro-celebration on one primary action.
- Every interactive element has some state response (hover, focus-visible,
  active, disabled).

## CTA voice

- **Primary:** push pill — pear fill, ink text, solid colour edge + soft ground
  shadow, press-down on active. `rounded-full`.
- **Secondary:** soft pill (flat, no colour edge) or outline pill (hairline +
  ink fill sweeps up on hover).
- **Tertiary / text link:** cyan link with arrow, underline on hover.

## Per-page allowances

- Home page MAY use enrichment: the character moment (Tier-A CSS) in the hero,
  one star-burst, tinted section bands. No photography.
- Content/lab pages: typography + surface tint only.

## What every page MUST share

- The wordmark ("Jaber.dev" pill lockup) and its placement.
- The accent system and placement (pear ≤ 5% of viewport, coral exactly one
  moment per page).
- Plus Jakarta Sans + JetBrains Mono (bn: Sohid Osman Hadi).
- The CTA voice (push pill / soft pill / cyan link).
- Section-heading rhythm: JetBrains Mono numeral+label eyebrow, then a big
  rounded display heading (`rounded-[1.5rem]` accent blob behind the
  emphasised word), then a short body line.
- The `.hl` highlighter for emphasised words — never a floating bar.
- `overflow-x: clip` on html and body (root).
- Multi-accent tinted bands vs plain cream bands alternating.

## What pages MAY differ on

- Macrostructure within the family (home sections may be Catalogue, Stat-Led,
  Bento-ish, or a numbered spine).
- Hero archetype on the home page (off-centre, split-screen, artefact-bleed —
  never the centred stack).
- Card physics (chunky push-edge, soft-lift, or flat tinted) — per section, but
  each section picks one.

## Tokens / source of truth

- `app/globals.css` — `:root`, `.dark`, `.light` hold the raw vars;
  `@theme inline` maps them into Tailwind utilities (`bg-pear`, `text-cyan`,
  `bg-coral/10`, `shadow-[0_4px_0_0_var(--primary-edge)]`, …).
- `components/ui/button.tsx` — the push-pill CTA system.
- `app/[locale]/layout.tsx` — font loading (Plus Jakarta Sans + JetBrains Mono).
