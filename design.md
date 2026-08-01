# Design — Jaber Chowdhury · Portfolio

A locked design system for this portfolio. Every page redesign reads this file
before emitting code. Do not regenerate per page — extend or amend this file when
the system needs to grow.

Produced by `hallmark redesign` in the **pouf** (1st-Pouf claymorphism) theme.
All production code that deviates from this system is a slop-test failure.

## Genre

claymorphism — "soft software, absurdly built". Pastel canvas with raised,
cushioned surfaces: every card, button, blob and row reads as soft clay with an
inner top light, an inner floor shadow, and a cast drop. Nunito Variable
display/body, plain-English copy, a five-tone pastel accent system. The
aesthetic of a toy you'd want to press.

## Macrostructure family

- **Home page:** KPI-stat hero (availability dot + blob stats + CTA), then
  cushion sections — Technology (puffy cards with tonal progress), Projects
  (cushion grid), Competitive Programming (stat cards + achievement rows),
  Experience / Education (row-cushions), Contact (cushioned form card). The
  cushion IS the divider; section gaps are the negative space.
- **Content / lab pages** (`/projects`, `/projects/[name]/[branch]`, `/dungeon`,
  `/ui`, `/font-preview`): same tokens, same cushion voice; content is a single
  column of cushions on the pastel canvas.

## Theme — pouf

Pastel by default, with an opt-in dark variant (`<html class="dark">` — driven
by next-themes). Accents stay pastel in both themes (they are the brand); only
the page `bg` / `ink` / `surface` flip.

- `--color-bg`      #f0e9ff   canvas (light pastel lavender)
- `--color-surface` #ffffff   cushions (cards / rows / menus)
- `--color-ink`     #3a2e5c   text on the page (dark plum)
- `--color-muted`   #71609b   secondary text (clears AA on bg and surface)
- `--color-pink`    #ffb3d1   tone accent
- `--color-purple`  #c9a8ff   tone accent (the default "brand" tone)
- `--color-blue`    #9ec8ff   tone accent
- `--color-mint`    #a8f0d0   tone accent (semantic `--up`)
- `--color-yellow`  #ffe58a   tone accent (semantic `--warn`)
- `--color-orange`  #ffb38a   tone accent

Dark: `--color-bg #12111a`, `--color-surface #211f2b`, `--color-ink #f7f3ff`,
`--color-muted #b8afcb`. Accent cushions and their ink (`--on-accent`, pinned
dark `#2a2145`) are unchanged.

**Ink-on-pastel rule:** text that sits ON a pastel fill uses `--on-accent`
(dark ink), never white. This is a WCAG decision from the reference fork and is
non-negotiable. `--on-accent` resolves to `--ink` in light mode and stays dark
in dark mode because the accents do.

## Canvas treatment

- Flat pastel `--color-bg`, no background imagery, no blooms, no glassmorphism,
  no gradients. Depth comes from cushions only.
- Banned: gradient text, glassmorphism, dark-only sections, white-on-pastel.

## Cushions (the clay recipe)

- **Card** `pouf-card`: `inset 0 -10px 0 rgba(201,168,255,.35)` (floor),
  `inset 0 6px 0 rgba(255,255,255,.9)` (top light),
  `0 20px 40px rgba(58,46,92,.15)` (drop). Radius 32px. Surface `#fff`.
- **Control** (buttons, pills): heavier inset bevels, radius 20px, pressed state
  flattens to `--pouf-control-active`.
- **Row** `pouf-row`: tighter padding, same recipe — "every row a cushion".
- **Blob**: 24px radius pastel disc holding an icon, with its own bevels.
- Provided as Tailwind utilities `cushion-card`, `cushion-control`,
  `cushion-control-active`, `cushion-blob`, `cushion-field`, `cushion-row`,
  `cushion-row-hover` in `components/pouf/pouf.css`. Tones compose via
  `.tone-*` / `toneClass()`.

## Typography

- **Everything:** Nunito Variable (`@fontsource-variable/nunito`, family
  `"Nunito Variable"`), weight 700 body / up to 900 for display and controls.
  Rounded, friendly, kid-shaped. This is the signature pouf move.
- **Display:** `Heading` (pouf) — 48px/28px/19px, `font-black`, tight tracking.
- **Eyebrows:** pouf `Eyebrow` — 14px, tracking 2px, uppercase, `--color-muted`.
- **Mono:** `abcfont` (self-hosted woff2) for the `/font-preview` page and
  numerics; `Text mono` sets a system mono stack.
- Bengali: "Sohid Osman Hadi" (unchanged, bn locale only) via `.sohid-font`.

## Spacing

Pouf scale `--s1..--s8` (6/8/12/16/20/24/32/40px). One content shell: `max-w-6xl`
for grids, gutter `px-(--s5) md:px-(--s8)`. Major sections separated by
`--s7`–`--s8`; the gap is the divider.

## Motion

- Cushion press (translateY + shadow flatten), card `lift` / `tilt-left` /
  `tilt-right` on hover (composed in `Card motion`), 120–160ms.
- Framer-motion used sparingly for section reveals only, honoring
  `prefers-reduced-motion: reduce` (`useReducedMotion`).
- No slide, no bounce, no marquee, no counters unless genuine data.

## Microinteractions stance

- Cards: lift / tilt on hover (cushion vocabulary), pressed state flattens.
- Buttons: `:active` presses in (translateY 2px + active shadow); `disabled`
  reads as pressed-flat.
- Focus-visible: 3px `--ink` outline (pouf base).
- Every interactive element has a state response (hover, focus-visible, active,
  disabled).

## CTA voice

- **Primary:** a solid pastel `Button` (purple default), ink `--on-accent`
  label, cushion control shadow.
- **Quiet / tertiary:** `variant="quiet"` — outlined pill, fills on hover.
- Forms: `Field` + `Input`/`Textarea` with `cushion-field` (focus ring = purple
  inset), `Button type="submit"`.

## Per-page allowances

- Home page MAY use the KPI-stat hero with `Stat`/`Blob`, availability `Dot`,
  and `Highlight` swatches. Icons-as-decoration are allowed (they're the
  clay vocabulary — blobs hold icons).
- Content/lab pages: cushions + type. The content column stays centered and
  quiet; the cushion is the surface.

## What every page MUST share

- The wordmark ("Jaber.dev" — Nunito 900, ink) in the pouf floating pill
  `Navbar` (`components/pouf/navbar.tsx`), with locale-aware links and the
  EN/BN `Segmented` language toggle.
- The pastel tone system (pink/purple/blue/mint/yellow/orange) via
  `toneClass()`; tones are pastel and never the dominant page colour.
- Ink-on-pastel (`--on-accent`), never white-on-pastel.
- Nunito Variable everywhere (bn: Sohid Osman Hadi).
- The cushion CTA voice.
- Section-heading rhythm: `Eyebrow` (uppercase, 2px tracking), then a
  `Heading` display, then a muted `Text` line.
- `overflow-x: clip` on html and body (root).

## What pages MAY differ on

- Heading size and eyebrow content per page.
- Card physics within the cushion vocabulary (lift vs tilt, motion none).
- Which tone leads a given section.

## Tokens / source of truth

- `components/pouf/pouf.css` — the single Tailwind v4 entry (imported by
  `app/globals.css`): `@theme` palette + radii, `:root` legacy aliases, the
  clay recipe, `.tone-*`, cushion `@utility`s, dark overrides. Do NOT fork
  this file; extend via `app/globals.css` if the system needs to grow.
- `app/globals.css` — imports pouf.css + Nunito; maps shadcn-semantic tokens
  (`--background`, `--foreground`, `--card`, `--primary`, …) onto pouf vars so
  any legacy shadcn/ui primitive degrades gracefully; keeps `@font-face`
  blocks (marlin / abcfont / Sentient / Sohid) for `/font-preview`.
- `components/pouf/` — the UI kit (Button, Card, RowCard, Heading/Text/
  Eyebrow/Highlight, Blob/Dot, Stat/Metric, Navbar/Footer/NavLink, Segmented,
  Tabs/Accordion, Field/Input/Select, Dialog/Sheet/Tooltip, Progress, Status,
  Skeleton/Empty/ErrorNote, Icon). Consume these; do not restyle them inline.
