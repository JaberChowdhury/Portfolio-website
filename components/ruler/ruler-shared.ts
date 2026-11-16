// Ruler configuration and tunables

export interface MeasuredSection {
  id: string
  label: string
  index: number
  anchor: number
  bottom: number
  isHero: boolean
}

export type RulerMode = "full" | "static"
export type RulerSide = "left" | "right"

/** Height of sticky header/nav if any (0 if rail travels full height or under nav) */
export const NAV_H = 56

/** Shared zoom morph state */
export const rulerZoom = { target: 0, p: 0, dragging: false }

/** Screen-space y-spans of the heading words' settled riding columns */
export const railOccupancy: {
  spans: { top: number; bottom: number; k: number }[]
} = {
  spans: [],
}

export const rulerLayoutDefaults = {
  side: 1, // 1 = right, 0 = left
  edgePad: 12,
  railW: 54,
  minorPct: 1,
  labelPct: 5,
  thresholdPct: 12,
  headingPx: 30,
  ridingPx: 16,
  queuePx: 14,
  topPad: 28,
  currentGap: 24,
  queueSlot: 20,
  queuePad: 36,
  textPad: 0,
}

export const rulerMotionDefaults = {
  flipZone: 180,
  detachZone: 200,
  stagger: 0.14,
  arc: 24,
  jumpDur: 1.1,
  snapDelay: 400,
  snapDur: 0.7,
  introDur: 0.8,
  introStagger: 0.008,
  velRadius: 160,
  velMax: 0.5,
  zoomInDelay: 150,
  zoomOutDelay: 150,
  zoomLerp: 10,
  dragLerp: 0.18,
}

export const rulerLookDefaults = {
  minorAlpha: 0.35,
  majorAlpha: 0.75,
  labelAlpha: 0.6,
  minorLen: 8,
  majorLen: 16,
  ghostAlpha: 0.9,
  ghostThick: 2,
  queueAlpha: 0.35,
  yieldPad: 20,
  needleFadePct: 2,
  bracketAlpha: 0.12,
  mapAlpha: 0.85,
  frostSolid: 35,
  frostGamma: 2.2,
}

export function rulerMap(vh: number, pad: number) {
  const base = NAV_H + pad
  return {
    base,
    span: Math.max(1, vh - NAV_H - 2 * pad),
    drift: (p: number) => base - p * (NAV_H + 2 * pad),
  }
}

export const clamp01 = (x: number) => Math.max(0, Math.min(1, x))

export const easeOutExpo = (t: number) =>
  t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
