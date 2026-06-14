"use client"

import { useState } from "react"
import { motion } from "framer-motion"
// import { ArrowUpRight } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import AnimatedTextBorder from "@/components/AnimatedTextBorder"

const FIRST_NAME = "JABER"

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const letterVariants = {
  hidden: {
    y: 200,
    rotate: 8,
    opacity: 0,
  },
  show: {
    y: 0,
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export default function HeroSection() {
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
      <motion.div
        animate={{
          x: mouse.x - 350,
          y: mouse.y - 350,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 30,
        }}
        className="pointer-events-none absolute h-[700px] w-[700px] rounded-full bg-primary/20 blur-[160px]"
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 2,
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <h2 className="pointer-events-none bg-linear-to-r from-foreground/5 via-foreground/10 to-foreground/5 bg-clip-text text-[22vw] font-black tracking-[-0.08em] text-transparent select-none">
          CHOWDHURY
        </h2>
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        {/* Badge */}
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="mb-10 inline-flex items-center gap-3 rounded-full border border-border/50 bg-card/40 px-4 py-2 backdrop-blur-3xl"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />

          <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
            Available For Work
          </span>
        </motion.div>

        {/* Main Name */}
        <div className="overflow-hidden">
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-wrap text-[20vw] leading-[0.82] font-black tracking-[-0.08em] uppercase md:text-[10rem] lg:text-[14rem] xl:text-[16rem]"
          >
            {FIRST_NAME.split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="hero-title mx-2 inline-block drop-shadow-[0_0_60px_hsl(var(--primary)/0.15)]"
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Middle Name */}
        <motion.h2
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.8,
            duration: 1,
          }}
          className="bg-gradient-to-r from-primary via-foreground to-primary bg-[length:300%_300%] bg-clip-text text-4xl font-light tracking-[0.45em] text-transparent uppercase md:text-6xl"
          style={{
            animation: "gradientMove 8s ease infinite",
          }}
        >
          HOSSAIN
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.2,
          }}
          className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          Frontend and Backend programmer crafting immersive digital experiences
          through modern web technologies, thoughtful systems design , and
          interactions that feel effortless.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.5,
          }}
          className="mt-12 flex flex-wrap gap-4"
        >
          {/*<motion.div
            whileHover={{
              scale: 1.04,
              y: -2,
            }}
            whileTap={{
              scale: 0.96,
            }}
          >
            <Button size="lg" className="group rounded-full px-8">
              View Projects
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </motion.div>*/}

          {/*<motion.div
            whileHover={{
              scale: 1.04,
              y: -2,
            }}
            whileTap={{
              scale: 0.96,
            }}
          >
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-border bg-card/30 px-8 backdrop-blur-xl"
            >
              Contact Me
            </Button>
          </motion.div>*/}
        </motion.div>

        {/* Footer Meta */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 2,
          }}
          className="mt-24 flex flex-wrap gap-6 text-xs tracking-[0.3em] text-muted-foreground uppercase"
        >
          <span>Frontend Developer</span>
          <span>UI Architect</span>
          <span>Motion Enthusiast</span>
        </motion.div>
      </div>

      <style jsx global>{`
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
