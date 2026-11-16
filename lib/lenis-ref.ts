import type Lenis from "lenis"

/**
 * Shared ref holding the live Lenis instance.
 * Populated by SmoothScrollProvider and consumed by the ScrollRuler instrument.
 */
export const lenisRef: { current: Lenis | null } = { current: null }
