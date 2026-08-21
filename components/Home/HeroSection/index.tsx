"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

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
      className="relative flex h-full min-h-0 w-full flex-col justify-center overflow-hidden text-foreground"
    >
      {/* Subtle Mouse Spotlight */}
      <div
        className="pointer-events-none absolute top-0 left-0 h-[450px] w-[450px] rounded-full bg-primary/[0.04] blur-[120px] transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${mouse.x - 225}px, ${mouse.y - 225}px)`,
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-12">
        {/* Availability Badge with Warm Terracotta/Sage Accent */}
        <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-3.5 py-1.5 shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c85a32] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c85a32]" />
          </span>
          <span className="text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase">
            {t("available")}
          </span>
        </div>

        {/* Main Name - Editorial Solid Typography */}
        <div className="overflow-hidden">
          <h1 className="marlin-font preserve-design text-5xl leading-none font-black tracking-tight text-foreground uppercase md:text-7xl lg:text-8xl">
            <span
              data-cursor="cover"
              className="preserve-design hero-title inline-block"
            >
              JABER
            </span>
          </h1>
        </div>

        {/* Middle Name - Subtitle in Clean Muted Text */}
        <h2
          data-cursor="text"
          className="marlin-font preserve-design mt-2 text-xl font-medium tracking-[0.25em] text-muted-foreground uppercase md:text-3xl lg:text-4xl"
        >
          HOSSAIN CHOWDHURY
        </h2>

        {/* Bio / Description with Crisp Readability */}
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base font-normal">
          {t("description")}
        </p>

        {/* Clean Tag Pills */}
        <div className="mt-8 flex flex-wrap gap-2.5 text-xs font-medium tracking-[0.15em] text-foreground uppercase">
          <span className="rounded-lg border border-border bg-card px-3.5 py-1.5 shadow-2xs">
            {t("tag1")}
          </span>
          <span className="rounded-lg border border-border bg-card px-3.5 py-1.5 shadow-2xs">
            {t("tag2")}
          </span>
          <span className="rounded-lg border border-border bg-card px-3.5 py-1.5 shadow-2xs">
            {t("tag3")}
          </span>
        </div>
      </div>
    </section>
  )
}

export default Hero
