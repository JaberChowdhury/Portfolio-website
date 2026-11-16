"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import gsap from "gsap"
import { lenisRef } from "@/lib/lenis-ref"
import HeadingFlow from "./heading-flow"
import {
  clamp01,
  easeOutExpo,
  railOccupancy,
  rulerMap,
  rulerZoom,
  rulerLayoutDefaults as layout,
  rulerMotionDefaults as mt,
  rulerLookDefaults as lk,
  type MeasuredSection,
  type RulerMode,
  type RulerSide,
} from "./ruler-shared"

export const PORTFOLIO_SECTIONS = [
  { id: "home", label: "HOME" },
  { id: "skills", label: "SKILLS" },
  { id: "projects", label: "PROJECTS" },
  { id: "programming", label: "COMPETITIONS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "education", label: "EDUCATION" },
  { id: "contact", label: "CONTACT" },
  { id: "learning", label: "LEARNING" },
]

export default function ScrollRuler() {
  const [mode, setMode] = useState<RulerMode | null>(null)
  const [geom, setGeom] = useState({ docH: 0, vh: 0, vw: 0 })
  const [sections, setSections] = useState<MeasuredSection[]>([])

  const railRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const needleRef = useRef<HTMLDivElement>(null)
  const readoutRef = useRef<HTMLSpanElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)
  const ghostLineRef = useRef<HTMLDivElement>(null)
  const bracketRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const tickRowRefs = useRef<(HTMLDivElement | null)[]>([])
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([])
  const digitRefs = useRef<(HTMLSpanElement | null)[]>([])

  const fs = useRef({
    vel: 0,
    lastY: 0,
    introDone: false,
    prevDigits: [-1, -1, -1],
    prevPct: -1,
    readoutAbove: false,
    geom: { docH: 0, vh: 0, vw: 0 },
    zoomIntent: false,
    zoomTimer: 0,
    zoomWrote: false,
    ghostActive: false,
    ghostY: 0,
    dragStartY: 0,
    dragMoved: 0,
  })
  fs.current.geom = geom

  // Media query check: show ruler only on desktop fine pointer (width >= 1024px)
  useEffect(() => {
    const mobileUa = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
    const fineMq = window.matchMedia(
      "(pointer: fine) and (hover: hover) and (min-width: 1024px)"
    )
    const motionMq = window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    )
    const apply = () => {
      setMode(
        !mobileUa && fineMq.matches
          ? motionMq.matches
            ? "full"
            : "static"
          : null
      )
    }
    apply()

    fineMq.addEventListener("change", apply)
    motionMq.addEventListener("change", apply)
    return () => {
      fineMq.removeEventListener("change", apply)
      motionMq.removeEventListener("change", apply)
    }
  }, [])

  useEffect(() => {
    const st = fs.current
    return () => {
      window.clearTimeout(st.zoomTimer)
      rulerZoom.target = 0
      rulerZoom.p = 0
      rulerZoom.dragging = false
    }
  }, [])

  const side: RulerSide = layout.side >= 0.5 ? "right" : "left"
  const railW = layout.railW

  // Tag document with ruler attribute so custom scrollbar styles apply
  useEffect(() => {
    if (!mode) return
    const root = document.documentElement
    root.dataset.ruler = mode === "full" ? "on" : "static"
    root.dataset.rulerSide = side
    root.style.setProperty("--ruler-rail", `${railW}px`)
    return () => {
      delete root.dataset.ruler
      delete root.dataset.rulerSide
      root.style.removeProperty("--ruler-rail")
    }
  }, [mode, side, railW])

  // Measure document geometry
  useEffect(() => {
    if (!mode) return
    const measure = () => {
      const next = {
        docH: document.documentElement.scrollHeight,
        vh: window.innerHeight,
        vw: window.innerWidth,
      }
      setGeom((prev) =>
        prev.docH === next.docH && prev.vh === next.vh && prev.vw === next.vw
          ? prev
          : next
      )
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener("resize", measure)
    document.fonts?.ready.then(measure).catch(() => {})
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [mode])

  // Measure sections
  useEffect(() => {
    if (!mode || !geom.docH) return
    const out: MeasuredSection[] = []
    for (const s of PORTFOLIO_SECTIONS) {
      const el = document.getElementById(s.id)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      const isHero = s.id === "home"
      const anchor = rect.top + window.scrollY
      out.push({
        id: s.id,
        label: s.label,
        index: out.length,
        anchor,
        bottom: rect.bottom + window.scrollY,
        isHero,
      })
    }
    setSections(out)
  }, [mode, geom])

  // Generate tick marks
  const ticks = useMemo(() => {
    if (!mode || !geom.docH) return []
    const out: { pct: number; docY: number; major: boolean; alpha: number }[] = []
    for (let p = 0; p <= 100 + 1e-6; p += layout.minorPct) {
      const pct = Math.round(p * 100) / 100
      const major = Math.abs(pct % layout.labelPct) < 1e-6
      out.push({
        pct,
        docY: (pct / 100) * geom.docH,
        major,
        alpha: major ? lk.majorAlpha : lk.minorAlpha,
      })
    }
    lineRefs.current.length = out.length
    tickRowRefs.current.length = out.length
    labelRefs.current.length = out.length
    return out
  }, [mode, geom.docH])

  // Intro cascade animation for ticks
  useEffect(() => {
    if (mode !== "full" || !ticks.length) return
    const els = lineRefs.current.filter((el): el is HTMLSpanElement => !!el)
    if (!els.length) return

    gsap.set(els, { scaleX: 0, opacity: 0 })
    const tl = gsap.timeline()
    tl.to(els, {
      scaleX: 1,
      opacity: (i: number) => ticks[i]?.alpha ?? 0.35,
      duration: mt.introDur,
      stagger: mt.introStagger,
      ease: "power3.out",
      overwrite: true,
      onComplete: () => {
        fs.current.introDone = true
      },
    })

    return () => {
      tl.kill()
      fs.current.introDone = true
    }
  }, [mode, ticks])

  // Animation frame loop
  useEffect(() => {
    if (!mode || !geom.docH) return
    const full = mode === "full"

    const tick = (_time: number, deltaMs: number) => {
      const st = fs.current
      const { docH, vh } = st.geom
      if (!vh) return
      const dt = Math.min(deltaMs / 1000, 0.1) || 0.016
      const scrollY = window.scrollY
      const maxScroll = Math.max(1, docH - vh)
      const progress = clamp01(scrollY / maxScroll)

      const raw = (scrollY - st.lastY) / dt
      st.lastY = scrollY
      st.vel += (raw - st.vel) * (1 - Math.exp(-6 * dt))

      const map = rulerMap(vh, layout.edgePad)
      const drift = map.drift(progress)

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(0, ${
          -scrollY + drift
        }px, 0)`
      }

      const ny = map.base + progress * map.span
      if (needleRef.current) {
        needleRef.current.style.transform = `translate3d(0, ${ny}px, 0)`
        needleRef.current.style.opacity = String(
          clamp01(progress / Math.max(0.001, lk.needleFadePct / 100))
        )
      }

      const above = ny > vh - 26
      if (readoutRef.current && above !== st.readoutAbove) {
        st.readoutAbove = above
        readoutRef.current.style.top = above ? "-14px" : "4px"
      }

      const pct = Math.round(progress * 100)
      if (pct !== st.prevPct) {
        st.prevPct = pct
        railRef.current?.setAttribute("aria-valuenow", String(pct))
        const str = String(pct).padStart(3, "0")
        for (let c = 0; c < 3; c++) {
          const d = str.charCodeAt(c) - 48
          if (d !== st.prevDigits[c]) {
            st.prevDigits[c] = d
            const col = digitRefs.current[c]
            if (col) col.style.transform = `translateY(${-d}em)`
          }
        }
      }

      // Zoom morph
      if (full) {
        rulerZoom.target = st.zoomIntent || rulerZoom.dragging ? 1 : 0
        rulerZoom.p +=
          (rulerZoom.target - rulerZoom.p) * (1 - Math.exp(-mt.zoomLerp * dt))
        if (rulerZoom.target === 0 && rulerZoom.p < 0.0005) rulerZoom.p = 0
        if (rulerZoom.target === 1 && rulerZoom.p > 0.9995) rulerZoom.p = 1
      }
      const z = full ? rulerZoom.p : 0

      // Map bracket
      if (bracketRef.current) {
        const b = bracketRef.current
        b.style.transform = `translate3d(0, ${
          map.base + (scrollY / docH) * map.span
        }px, 0)`
        b.style.height = `${(vh / docH) * map.span}px`
        b.style.opacity = String(z)
      }

      // Hover ghost
      if (ghostRef.current) {
        const g = ghostRef.current
        if (st.ghostActive) {
          g.style.transform = `translate3d(0, ${st.ghostY}px, 0)`
          g.style.opacity = String(lk.ghostAlpha * (0.2 + 0.8 * z))
        } else {
          g.style.opacity = "0"
        }
      }

      // Ticks
      if (full && st.introDone && ticks.length) {
        const needleDocY = progress * docH
        const velNorm = clamp01(Math.abs(st.vel) / 3000)
        const writeZoom = z > 0 || st.zoomWrote
        const spans = railOccupancy.spans

        for (let i = 0; i < ticks.length; i++) {
          const liveY = ticks[i].docY - scrollY + drift
          const compactY = map.base + (ticks[i].pct / 100) * map.span
          if (writeZoom) {
            const row = tickRowRefs.current[i]
            if (row) {
              row.style.transform =
                z > 0
                  ? `translate3d(0, ${z * (compactY - liveY)}px, 0)`
                  : ""
            }
          }

          // Proximity yield
          const lab = labelRefs.current[i]
          if (lab) {
            const y = liveY + z * (compactY - liveY)
            let fade = 1
            if (lk.yieldPad > 0 && z < 1) {
              for (const spn of spans) {
                const d =
                  y < spn.top
                    ? spn.top - y
                    : y > spn.bottom
                    ? y - spn.bottom
                    : 0
                if (d < lk.yieldPad) {
                  const f = 1 - spn.k * (1 - d / lk.yieldPad)
                  if (f < fade) fade = f
                }
              }
            }
            lab.style.opacity = String(
              lk.labelAlpha * (1 - (1 - fade) * (1 - z))
            )
          }

          const el = lineRefs.current[i]
          if (!el) continue
          const dist = Math.abs(ticks[i].docY - needleDocY)
          if (dist < mt.velRadius && mt.velRadius > 0) {
            const t = 1 - dist / mt.velRadius
            const boost = velNorm * t * t
            el.style.transform = `scaleX(${1 + mt.velMax * boost})`
            el.style.opacity = String(
              Math.min(1, ticks[i].alpha + 0.5 * boost)
            )
          } else {
            el.style.transform = "scaleX(1)"
            el.style.opacity = String(ticks[i].alpha)
          }
        }
        st.zoomWrote = z > 0
      }
    }

    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
    }
  }, [mode, geom, ticks])

  if (!mode || !geom.docH) return null

  const sideStyle =
    side === "right" ? { right: 0 as const } : { left: 0 as const }
  const outerProp = side === "right" ? "right" : "left"

  const scheduleZoom = (on: boolean) => {
    const st = fs.current
    window.clearTimeout(st.zoomTimer)
    st.zoomTimer = window.setTimeout(
      () => {
        st.zoomIntent = on
      },
      on ? mt.zoomInDelay : mt.zoomOutDelay
    )
  }

  const jumpTo = (clientY: number) => {
    const st = fs.current
    const map = rulerMap(st.geom.vh, layout.edgePad)
    const p = clamp01((clientY - map.base) / map.span)
    const target = p * Math.max(1, st.geom.docH - st.geom.vh)
    const lenis = lenisRef.current
    if (lenis) {
      const dist = Math.abs(target - window.scrollY)
      lenis.scrollTo(target, {
        duration:
          mt.jumpDur * (0.4 + 0.6 * Math.min(1, dist / (st.geom.vh * 2.5))),
        easing: easeOutExpo,
      })
    } else {
      window.scrollTo({ top: target, behavior: "smooth" })
    }
  }

  const railClick = (e: React.MouseEvent) => {
    if (fs.current.dragMoved > 4) return
    jumpTo(e.clientY)
    if (mode === "full" && ghostLineRef.current) {
      gsap.fromTo(
        ghostLineRef.current,
        { opacity: 1 },
        { opacity: lk.ghostAlpha, duration: 0.45 }
      )
    }
  }

  const railPointerEnter = () => scheduleZoom(true)
  const railPointerLeave = () => {
    fs.current.ghostActive = false
    if (!rulerZoom.dragging) scheduleZoom(false)
  }

  const railPointerMove = (e: React.PointerEvent) => {
    const st = fs.current
    const map = rulerMap(st.geom.vh, layout.edgePad)
    const y = Math.max(map.base, Math.min(map.base + map.span, e.clientY))
    const p = clamp01((y - map.base) / map.span)
    st.ghostActive = true
    st.ghostY = y
    if (rulerZoom.dragging) {
      st.dragMoved = Math.max(
        st.dragMoved,
        Math.abs(e.clientY - st.dragStartY)
      )
      lenisRef.current?.scrollTo(
        p * Math.max(1, st.geom.docH - st.geom.vh),
        { lerp: mt.dragLerp }
      )
    }
  }

  const railPointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    const st = fs.current
    st.dragStartY = e.clientY
    st.dragMoved = 0
    rulerZoom.dragging = true
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const railPointerUp = (e: React.PointerEvent) => {
    if (!rulerZoom.dragging) return
    rulerZoom.dragging = false
    const rect = railRef.current?.getBoundingClientRect()
    const inside =
      !!rect &&
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    if (!inside) {
      fs.current.ghostActive = false
      scheduleZoom(false)
    }
  }

  return (
    <>
      <div
        ref={railRef}
        role="scrollbar"
        aria-controls="main"
        aria-orientation="vertical"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        aria-label="Page position"
        className="fixed inset-y-0 z-40 cursor-crosshair overflow-hidden select-none"
        style={{ ...sideStyle, width: railW }}
        onClick={railClick}
        onPointerEnter={mode === "full" ? railPointerEnter : undefined}
        onPointerLeave={mode === "full" ? railPointerLeave : undefined}
        onPointerMove={mode === "full" ? railPointerMove : undefined}
        onPointerDown={mode === "full" ? railPointerDown : undefined}
        onPointerUp={mode === "full" ? railPointerUp : undefined}
        onPointerCancel={mode === "full" ? railPointerUp : undefined}
      >
        {/* Frosted underlay */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            backgroundColor: "color-mix(in srgb, var(--background) 55%, transparent)",
            maskImage: frostMask(side, lk.frostSolid, lk.frostGamma),
            WebkitMaskImage: frostMask(side, lk.frostSolid, lk.frostGamma),
          }}
        />

        {/* Tick track */}
        <div
          ref={trackRef}
          aria-hidden
          className="absolute inset-x-0 top-0"
          style={{ height: geom.docH }}
        >
          {ticks.map((t, i) => (
            <div
              key={t.pct}
              ref={(el) => {
                tickRowRefs.current[i] = el
              }}
              className="absolute inset-x-0"
              style={{ top: t.docY, height: 0 }}
            >
              <span
                ref={(el) => {
                  lineRefs.current[i] = el
                }}
                className="absolute block bg-foreground/75"
                style={{
                  [outerProp]: 0,
                  top: 0,
                  width: t.major ? lk.majorLen : lk.minorLen,
                  height: 1,
                  opacity: mode === "full" ? 0 : t.alpha,
                  transformOrigin: `${outerProp} center`,
                }}
              />
              {t.major && (
                <span
                  ref={(el) => {
                    labelRefs.current[i] = el
                  }}
                  className="absolute -translate-y-1/2 font-mono text-muted-foreground"
                  style={{
                    [outerProp]: lk.majorLen + 4,
                    top: 0,
                    fontSize: 9,
                    letterSpacing: "0.08em",
                    opacity: lk.labelAlpha,
                  }}
                >
                  {t.pct}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Visible-span bracket (zoomed state) */}
        {mode === "full" && (
          <div
            ref={bracketRef}
            aria-hidden
            className="absolute inset-x-0 top-0"
            style={{ height: 0, opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-foreground"
              style={{ opacity: lk.bracketAlpha }}
            />
            <span
              className="absolute inset-x-0 top-0 block bg-foreground/60"
              style={{ height: 1 }}
            />
            <span
              className="absolute inset-x-0 bottom-0 block bg-foreground/60"
              style={{ height: 1 }}
            />
          </div>
        )}

        {/* Needle with Pear Accent */}
        <div
          ref={needleRef}
          aria-hidden
          className="absolute inset-x-0 top-0"
          style={{ height: 0 }}
        >
          <span
            className="absolute inset-x-0 block bg-[var(--color-pear)]"
            style={{
              top: 0,
              height: 2,
              boxShadow: "0 0 8px var(--color-pear)",
            }}
          />
          <span
            ref={readoutRef}
            className="absolute whitespace-nowrap font-mono text-[var(--color-pear-deep)] dark:text-[var(--color-pear)] font-semibold"
            style={{
              [outerProp]: 4,
              top: 4,
              fontSize: 9,
              letterSpacing: "0.08em",
            }}
          >
            <span className="ruler-digits">
              {[0, 1, 2].map((c) => (
                <span
                  key={c}
                  ref={(el) => {
                    digitRefs.current[c] = el
                  }}
                  className="ruler-digit-col"
                >
                  {"0123456789".split("").map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </span>
              ))}
            </span>
            <span style={{ marginLeft: 2 }}>%</span>
          </span>
        </div>
      </div>

      {/* Hover ghost line */}
      {mode === "full" && (
        <div
          ref={ghostRef}
          aria-hidden
          className="pointer-events-none fixed inset-y-0 z-40"
          style={{
            ...sideStyle,
            width: railW,
            height: 0,
            opacity: 0,
            top: 0,
          }}
        >
          <div
            ref={ghostLineRef}
            className="absolute block bg-[var(--color-pear)]/70"
            style={{
              [outerProp]: 0,
              top: -lk.ghostThick / 2,
              width: railW,
              height: lk.ghostThick,
              opacity: lk.ghostAlpha,
            }}
          />
        </div>
      )}

      <HeadingFlow
        mode={mode}
        side={side}
        sections={sections}
        geom={geom}
      />
    </>
  )
}

function frostMask(side: RulerSide, solid: number, gamma: number): string {
  const dir = side === "right" ? "to left" : "to right"
  const stops = [`black ${solid.toFixed(0)}%`]
  const steps = 8
  for (let k = 1; k < steps; k++) {
    const x = k / steps
    const a = Math.pow(1 - x, gamma)
    const pos = solid + x * (100 - solid)
    stops.push(`rgba(0,0,0,${a.toFixed(3)}) ${pos.toFixed(1)}%`)
  }
  stops.push("transparent 100%")
  return `linear-gradient(${dir}, ${stops.join(", ")})`
}
