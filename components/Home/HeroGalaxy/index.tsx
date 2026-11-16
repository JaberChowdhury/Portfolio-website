"use client"

import React, { useEffect, useRef, useState } from "react"
import { useTranslations } from "@/lib/i18n"
import { ArrowDownRight, ArrowUpRight, Sparkles, Terminal } from "lucide-react"
import { SiGithub } from "react-icons/si"
import { Button } from "@/components/ui/button"

export interface TechItemDef {
  label: string
  category: string
  color: string
}

export const GALAXY_TECHS: TechItemDef[] = [
  { label: "React", category: "Frontend", color: "#61dafb" },
  { label: "Next.js", category: "Fullstack", color: "#e8b82a" },
  { label: "TypeScript", category: "Language", color: "#3178c6" },
  { label: "Rust", category: "Systems", color: "#f74c00" },
  { label: "Python", category: "AI & Data", color: "#3776ab" },
  { label: "PostgreSQL", category: "Database", color: "#336791" },
  { label: "Docker", category: "DevOps", color: "#2496ed" },
  { label: "Tailwind CSS", category: "Styling", color: "#38bdf8" },
  { label: "Node.js", category: "Runtime", color: "#22c55e" },
  { label: "C++", category: "Algorithms", color: "#00599c" },
  { label: "Linux", category: "OS", color: "#facc15" },
  { label: "Antigravity", category: "Agents", color: "#a855f7" },
  { label: "Claude AI", category: "Intelligence", color: "#d97757" },
  { label: "Redis", category: "Cache", color: "#dc2626" },
  { label: "Kubernetes", category: "Cloud", color: "#326ce5" },
  { label: "Astro", category: "Static Web", color: "#ff5d01" },
  { label: "Bun", category: "Runtime", color: "#f472b6" },
  { label: "Git", category: "VCS", color: "#f05032" },
]

export function HeroGalaxyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight)

    const handleResize = () => {
      if (!canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }
    window.addEventListener("resize", handleResize)

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.targetX = e.clientX - rect.left - width / 2
      mouseRef.current.targetY = e.clientY - rect.top - height / 2
      mouseRef.current.active = true
    }

    const onPointerLeave = () => {
      mouseRef.current.active = false
      mouseRef.current.targetX = 0
      mouseRef.current.targetY = 0
    }

    window.addEventListener("pointermove", onPointerMove)
    document.addEventListener("pointerleave", onPointerLeave)

    const arms = 5
    const turns = 1.15
    const items = GALAXY_TECHS
    let time = 0

    const render = () => {
      time += 0.0028
      const m = mouseRef.current
      m.x += (m.targetX - m.x) * 0.05
      m.y += (m.targetY - m.y) * 0.05

      ctx.clearRect(0, 0, width, height)

      const cx = width / 2 + m.x * 0.08
      const cy = height / 2 + m.y * 0.08
      const maxR = Math.hypot(width, height) * 0.52

      // Draw faint construction curves
      ctx.save()
      const isDark = document.documentElement.classList.contains("dark")
      const lineColor = isDark ? "rgba(232, 184, 42, 0.07)" : "rgba(212, 160, 23, 0.12)"
      const tickColor = isDark ? "rgba(240, 237, 223, 0.12)" : "rgba(28, 29, 25, 0.14)"

      for (let j = 0; j < arms; j++) {
        const phase = (j * Math.PI * 2) / arms + time * 0.4
        ctx.beginPath()
        for (let step = 0; step <= 80; step++) {
          const tFrac = step / 80
          const theta = tFrac * turns * Math.PI * 2
          const r = tFrac * maxR
          const a = theta + phase
          const x = cx + r * Math.cos(a)
          const y = cy + r * Math.sin(a)
          if (step === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = lineColor
        ctx.lineWidth = 1
        ctx.setLineDash([4, 6])
        ctx.stroke()
        ctx.setLineDash([])

        // Subtle cross-ticks
        for (let k = 1; k <= 5; k++) {
          const tFrac = 0.35 + (k / 5) * 0.6
          const theta = tFrac * turns * Math.PI * 2
          const r = tFrac * maxR
          const a = theta + phase
          const x = cx + r * Math.cos(a)
          const y = cy + r * Math.sin(a)
          const tx = -Math.sin(a) * 5
          const ty = Math.cos(a) * 5
          ctx.beginPath()
          ctx.moveTo(x - tx, y - ty)
          ctx.lineTo(x + tx, y + ty)
          ctx.strokeStyle = tickColor
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
      ctx.restore()

      // Spiral nodes
      const count = items.length
      const slotsPerArm = Math.ceil(count / arms)

      for (let i = 0; i < count; i++) {
        const item = items[i]
        const armIdx = i % arms
        const slotIdx = Math.floor(i / arms)
        const armPhase = (armIdx * Math.PI * 2) / arms

        // Progress along conveyor
        const baseProgress = (slotIdx + 0.5) / slotsPerArm
        const cycleProgress = (baseProgress + time * 0.7) % 1
        const theta = cycleProgress * turns * Math.PI * 2
        const r = 90 + cycleProgress * (maxR - 90)
        const angle = theta + armPhase + time * 0.4

        const x = cx + r * Math.cos(angle)
        const y = cy + r * Math.sin(angle)

        // Fade in when born at center, fade out near edge
        let alpha = 1
        if (cycleProgress < 0.15) {
          alpha = cycleProgress / 0.15
        } else if (cycleProgress > 0.85) {
          alpha = (1 - cycleProgress) / 0.15
        }

        // Distance from center stack keep-out pocket
        const distFromCenter = Math.hypot(x - cx, y - cy)
        if (distFromCenter < 140) {
          alpha *= Math.max(0, (distFromCenter - 60) / 80)
        }

        if (alpha <= 0.01) continue

        // Card geometry
        const scale = 0.8 + cycleProgress * 0.35
        const cardW = 110 * scale
        const cardH = 36 * scale

        ctx.save()
        ctx.translate(x, y)
        ctx.globalAlpha = Math.min(1, Math.max(0, alpha))

        // Ambient colored glow
        ctx.beginPath()
        ctx.arc(0, 0, 18 * scale, 0, Math.PI * 2)
        ctx.fillStyle = item.color
        ctx.globalAlpha = alpha * 0.15
        ctx.fill()
        ctx.globalAlpha = alpha

        // Card container
        ctx.beginPath()
        const rad = 10 * scale
        ctx.roundRect(-cardW / 2, -cardH / 2, cardW, cardH, rad)
        ctx.fillStyle = isDark
          ? "rgba(26, 27, 24, 0.85)"
          : "rgba(250, 248, 242, 0.88)"
        ctx.fill()

        ctx.strokeStyle = isDark
          ? "rgba(240, 237, 223, 0.15)"
          : "rgba(28, 29, 25, 0.12)"
        ctx.lineWidth = 1
        ctx.stroke()

        // Colored status dot
        ctx.beginPath()
        ctx.arc(-cardW / 2 + 14 * scale, 0, 3.5 * scale, 0, Math.PI * 2)
        ctx.fillStyle = item.color
        ctx.fill()

        // Tech Label
        ctx.fillStyle = isDark ? "#f0eddf" : "#1c1d19"
        ctx.font = `600 ${Math.round(11 * scale)}px "JetBrains Mono", monospace`
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"
        ctx.fillText(item.label, -cardW / 2 + 23 * scale, 0)

        ctx.restore()
      }

      animRef.current = requestAnimationFrame(render)
    }

    animRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("pointermove", onPointerMove)
      document.removeEventListener("pointerleave", onPointerLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  )
}

/**
 * Single-stage radial poster hero matching ArtCraft's architecture:
 * 1. Centered expansive brand masthead ("JABER.DEV" with letter choreography)
 * 2. Tuned radial galaxy spiral background
 * 3. Soft contrast pocket (Hero Scrim)
 * 4. High-impact headline, bio lede, and dual action CTAs
 * 5. HUD meta badges / proof points
 */
export function ArtcraftStyleHero() {
  const t = useTranslations("Hero")
  const [hovered, setHovered] = useState(false)

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col justify-center overflow-hidden">
      {/* 1. Spiral Galaxy Canvas (Artcraft Engine) */}
      <HeroGalaxyCanvas />

      {/* 2. Soft Scrim Contrast Pocket */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
      >
        <div
          className="h-[580px] w-[90vw] max-w-4xl rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--background) 86%, transparent) 20%, color-mix(in srgb, var(--background) 40%, transparent) 70%, transparent 100%)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
        />
      </div>

      {/* 3. Central Stack Layer (z-20) */}
      <div className="relative z-20 mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-12 text-center sm:px-6 md:px-8">
        {/* Availability Badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/90 px-4 py-1.5 shadow-2xs backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-pear)]/50 sm:mb-7">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-mint)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-mint)]" />
          </span>
          <span className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            01 ⁄ Full Stack Engineer · System Architect
          </span>
        </div>

        {/* Brand Masthead: JABER CHOWDHURY */}
        <div
          className="group relative cursor-default select-none"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            className="flex items-center justify-center font-black tracking-tighter text-foreground uppercase"
            style={{
              fontSize: "clamp(2.75rem, 8vw, 6.75rem)",
              lineHeight: 0.95,
              textShadow: hovered
                ? "0 0 24px color-mix(in srgb, var(--color-pear) 35%, transparent)"
                : "0 0 10px color-mix(in srgb, var(--background) 80%, transparent)",
              transition: "text-shadow 400ms ease",
            }}
          >
            {"JABER".split("").map((ch, i) => (
              <span
                key={i}
                className="inline-block transition-transform duration-300 group-hover:-translate-y-1"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {ch}
              </span>
            ))}
            <span className="mx-2 text-[var(--color-pear)] sm:mx-3">.</span>
            {"DEV".split("").map((ch, i) => (
              <span
                key={i}
                className="inline-block text-[var(--color-pear-deep)] transition-transform duration-300 group-hover:-translate-y-1 dark:text-[var(--color-pear)]"
                style={{ transitionDelay: `${(i + 5) * 30}ms` }}
              >
                {ch}
              </span>
            ))}
          </div>

          <p className="mt-2 font-mono text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase sm:text-sm">
            MD JABER HOSSAIN CHOWDHURY
          </p>
        </div>

        {/* Display Headline */}
        <h1 className="mt-6 max-w-3xl font-sans text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          Crafting resilient web architectures,{" "}
          <span className="font-serif font-normal italic text-[var(--color-pear-deep)] dark:text-[var(--color-pear)]">
            autonomous agents
          </span>{" "}
          and real-time systems.
        </h1>

        {/* Bio Lede */}
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
          {t("description")}
        </p>

        {/* Dual Actions CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Button
            variant="rose"
            size="lg"
            href="#projects"
            className="rounded-full shadow-md"
            frontClassName="rounded-full"
          >
            <span className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider uppercase sm:text-sm">
              <span>{t("exploreWork")}</span>
              <ArrowDownRight className="h-4 w-4" />
            </span>
          </Button>

          <a
            href="#contact"
            className="hum-btn hum-btn--soft min-h-[44px] rounded-full px-6 py-2.5 font-mono text-xs font-semibold tracking-wider uppercase sm:text-sm"
          >
            <span>{t("getInTouch")}</span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </a>
        </div>

        {/* HUD Proof Points & Links */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-dashed border-border/80 pt-6 font-mono text-xs text-muted-foreground">
          <a
            href="https://github.com/JaberChowdhury"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <SiGithub className="h-3.5 w-3.5 text-[var(--color-pear)]" />
            <span>GitHub Profile</span>
          </a>
          <span className="text-border">/</span>
          <div className="inline-flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-[var(--color-cyan)]" />
            <span>Competitive Programmer</span>
          </div>
          <span className="text-border">/</span>
          <div className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[var(--color-mint)]" />
            <span>TypeScript · React · Rust</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtcraftStyleHero
