# 0003 - M3 Expressive Floating Navigation Pill, Extended FAB, and Pure Silent Interaction

## Context
Following the transition to a continuous fluid scroll document, the primary navigation controls and user actions need concrete interaction specifications that balance screen real estate, accessibility, and Material 3 Expressive standards.

## Decision
1. **Floating M3 Expressive Navigation Pill**: We place the primary navigation as a floating pill dock anchored at the bottom of the viewport with a spring-sliding active indicator that tracks sections via IntersectionObserver.
2. **Scroll-Reactive Collapsible Extended FAB**: The primary CTA is an Extended FAB anchored at the bottom-right. On fast downward scroll, it collapses into a compact standard FAB (icon-only); on scroll pause or scroll up, it smoothly re-expands with spring motion.
3. **Pure Silent Interaction**: Web Audio cues are omitted to maintain 100% pure Material 3 visual state feedback (state layer ink ripples, hover elevation shifts, and spring physics).

## Consequences
- Clean viewports without obstructing content on mobile or desktop.
- Complete fidelity to official Material 3 Expressive motion behaviors.
