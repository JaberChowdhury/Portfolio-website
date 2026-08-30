# 0001 - Replace CardStack with Continuous Fluid M3 Scaffold

## Context
The previous portfolio used a full-viewport wheel-locked `CardStack` where scrolling was intercepted to flip between full-screen stacked cards. While visually distinct, it restricted natural document flow, mobile gesture navigation, and native web accessibility. Material 3 Expressive is designed around fluid spatial surfaces, responsive containers, and standard navigation primitives (Top App Bar, Bottom Navigation Bar / Rail, Extended Floating Action Button).

## Decision
We replace the `CardStack` with a continuous fluid scroll document anchored by a pure Material 3 Expressive Scaffold:
- Large Collapsible Top App Bar with scroll-driven elevation and typography scale change.
- Floating M3 Expressive Navigation Bar / Rail for seamless section jumping.
- Extended Floating Action Button (FAB) for primary call-to-action with spring physics.
- Each section becomes an M3 Expressive Container with semantic tonal background shifts.

## Consequences
- Native accessibility and mobile gesture responsiveness are restored.
- Components can expand naturally according to their content without arbitrary 100vh truncation.
- Navigation remains rapid and expressive via fixed/floating M3 navigation controls.
