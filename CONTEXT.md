# Portfolio Redesign (Material 3 Expressive)

A personal portfolio web application redesigned strictly adhering to the Material 3 Expressive design system with bespoke typography and spring-motion physics.

## Language

**Expressive Shape**:
One of the 35 distinct geometric silhouettes introduced in Material 3 Expressive (such as Cookie-4/6/8/12, Clover, Arch, Pill, Semicircle, Sunny, Soft Burst) used for avatars, badges, card silhouettes, and interactive spring-morphing transitions.
_Avoid_: Random SVG blob, generic rounded rectangle, border-radius hack.

**Tonal Container**:
A Material 3 surface layer (`surfaceContainerLowest`, `surfaceContainerLow`, `surfaceContainer`, `surfaceContainerHigh`, `surfaceContainerHighest`) that conveys elevation and visual grouping through mathematical luminance and tone rather than heavy drop shadows or glassmorphism blur.
_Avoid_: Flat card, dark overlay, generic grey box, frosted glass blur that compromises contrast.

**M3 Scaffold**:
The top-level application framework providing an Expressive Top App Bar, Floating Navigation Pill / Rail, Extended Floating Action Button (FAB), and continuous fluid document scroll.
_Avoid_: Wheel-locked card stack, artificial 100vh truncation, unconstrained multi-page jump.

**Dynamic Multi-Seed**:
The per-section algorithmic color derivation system where each portfolio section calculates dedicated Primary, Secondary, Tertiary, and Surface Container roles from a designated seed color.
_Avoid_: Hardcoded random hex palette, arbitrary Tailwind color classes without semantic role mapping.

**Shape Morphing**:
A continuous spring-based transition between two distinct geometric paths (e.g., circle to cookie, squircle to clover) during interactive states or scroll events.
_Avoid_: Simple scale animation, CSS opacity fade.

**Extended FAB**:
An elevated or tonal floating action button with expressive rounded corners and label-expansion driven by user scroll or section intent.
_Avoid_: Generic fixed round button without state or label transition.
