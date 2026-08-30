# 0002 - Pure Material 3 Expressive Priority Over Hallmark Glassmorphism

## Context
Hallmark design emphasizes frosted glass (`backdrop-filter: blur()`), subtle border gradients, and sensory cues. However, Material 3 Expressive relies fundamentally on a mathematical luminance tonal system (`surfaceContainerLowest` through `surfaceContainerHighest`), strict color contrast ratios, and authentic surface tinting.

## Decision
We prioritize pure Material 3 Expressive specifications above all else. If any glassmorphism or sensory cues conflict with M3 tonal container contrast or authentic Material feel, they are discarded. All elevation is expressed through M3 tonal luminance rather than artificial blur or drop-shadow gimmicks.

## Consequences
- Ensures 100% adherence to authentic Material Design 3 Expressive guidelines.
- Preserves high-contrast readability and token integrity across light and dark themes.
