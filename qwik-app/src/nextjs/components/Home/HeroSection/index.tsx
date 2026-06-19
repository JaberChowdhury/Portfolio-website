/** @jsxImportSource react */
"use client"

import { useState } from "react"
import withWaveDivider from "@/components/Wavedivider"
import { useTranslations } from "next-intl"
// import { Button } from "@/components/ui/button"
// import AnimatedTextBorder from "@/components/AnimatedTextBorder"

export function Hero() {
  const t = useTranslations("Hero")
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  })

  return (
    <section
      id="home"
      onMouseMove={(e) => {
        setMouse({
          x: e.clientX,
          y: e.clientY,
        })
      }}
      className="_bg-background relative flex min-h-screen items-center overflow-hidden text-foreground"
    >
      {/* Grid */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-size-[80px_80px]" />
      </div>

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22 viewBox=%220 0 200 200%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22/%3E%3C/filter%3E%3Crect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')",
        }}
      />

      {/* Mouse Spotlight */}
      <div
        className="pointer-events-none absolute top-0 left-0 h-[700px] w-[700px] rounded-full bg-primary/20 blur-[160px] transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${mouse.x - 350}px, ${mouse.y - 350}px)`,
        }}
      />

      {/* Center Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[220px]" />

      {/* Radial Theme Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, hsl(var(--primary) / 0.05), transparent 65%)",
        }}
      />

      {/* Huge Background Name */}
      <div className="absolute inset-0 flex animate-in items-center justify-center duration-1000 fill-mode-both fade-in">
        <h2
          data-cursor="text"
          className="marlin-font preserve-design last-name pointer-events-none mt-50 bg-linear-to-r from-foreground/5 via-foreground/10 to-foreground/5 bg-clip-text text-[14vw] font-black tracking-[-0.08em] text-transparent select-none"
        >
          CHOWDHURY
        </h2>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        {/* Badge */}
        <div className="mb-10 inline-flex animate-in items-center gap-3 rounded-full border border-border/50 bg-card/40 px-4 py-2 backdrop-blur-3xl delay-200 duration-1000 fill-mode-both fade-in slide-in-from-top-4">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />

          <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
            {t("available")}
          </span>
        </div>

        {/* Main Name */}
        <div className="overflow-hidden">
          <h1 className="marlin-font preserve-design flex animate-in flex-wrap text-[20vw] leading-[0.82] font-black tracking-[-0.08em] uppercase duration-1000 fill-mode-both fade-in slide-in-from-bottom-8 md:text-[10rem] lg:text-[14rem] xl:text-[16rem]">
            <span
              data-cursor="cover"
              className="preserve-design hero-title inline-block drop-shadow-[0_0_60px_hsl(var(--primary)/0.15)]"
            >
              JABER
            </span>
          </h1>
        </div>

        {/* Middle Name */}
        <h2
          data-cursor="text"
          className="marlin-font preserve-design animate-in bg-gradient-to-r from-primary via-foreground to-primary bg-[length:300%_300%] bg-clip-text text-4xl font-light tracking-[0.45em] text-transparent uppercase delay-300 duration-1000 fill-mode-both fade-in slide-in-from-bottom-4 md:text-6xl"
          style={{
            animation: "gradientMove 8s ease infinite",
          }}
        >
          HOSSAIN
        </h2>

        {/* Description */}
        <p className="mt-10 max-w-2xl animate-in text-lg leading-relaxed text-muted-foreground delay-500 duration-1000 fill-mode-both fade-in slide-in-from-bottom-4 md:text-xl">
          {t("description")}
        </p>

        {/* CTA */}
        <div className="mt-12 flex animate-in flex-wrap gap-4 delay-700 duration-1000 fill-mode-both fade-in slide-in-from-bottom-4">
          {/*
          <div className="transition-transform duration-300 hover:scale-105 active:scale-95">
            <Button size="lg" className="group rounded-full px-8">
              View Projects
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </div>
          */}

          {/*
          <div className="transition-transform duration-300 hover:scale-105 active:scale-95">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-border bg-card/30 px-8 backdrop-blur-xl"
            >
              Contact Me
            </Button>
          </div>
          */}
        </div>

        {/* Footer Meta */}
        <div className="mt-24 flex animate-in flex-wrap gap-6 text-xs tracking-[0.3em] text-muted-foreground uppercase delay-1000 duration-1000 fill-mode-both fade-in">
          <span>{t("tag1")}</span>
          <span>{t("tag2")}</span>
          <span>{t("tag3")}</span>
        </div>
      </div>

      <style>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  )
}

const HeroSection = withWaveDivider(Hero)

export default HeroSection
