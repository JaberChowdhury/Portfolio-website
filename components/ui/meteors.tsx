"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"

interface MeteorsProps {
  number?: number
  minDelay?: number
  maxDelay?: number
  minDuration?: number
  maxDuration?: number
  angle?: number
  className?: string
}

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215, // Default falls down-left
  className,
}: MeteorsProps) => {
  const mounted = useMounted()

  const meteorStyles = React.useMemo(() => {
    return Array.from({ length: number }, (_, i) => {
      const r1 = pseudoRandom(i * 4 + 1)
      const r2 = pseudoRandom(i * 4 + 2)
      const r3 = pseudoRandom(i * 4 + 3)
      const r4 = pseudoRandom(i * 4 + 4)

      return {
        "--angle": angle + "deg",
        top: Math.floor(r1 * 400) - 200 + "px",
        left: Math.floor(r2 * 1400) - 200 + "px",
        animationDelay:
          (r3 * (maxDelay - minDelay) + minDelay).toFixed(2) + "s",
        animationDuration:
          Math.floor(r4 * (maxDuration - minDuration) + minDuration) + "s",
      }
    })
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle])

  if (!mounted) return null

  return (
    <>
      <style>{`
        @keyframes custom-meteor-fall {
          0% {
            transform: rotate(var(--angle)) translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(var(--angle)) translateX(-1500px);
            opacity: 0;
          }
        }
        .animate-custom-meteor {
          animation: custom-meteor-fall var(--duration, 5s) linear infinite;
        }
      `}</style>

      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          style={{
            ...style,
            // Override the default duration with the random one
            animationDuration: style.animationDuration,
            animationDelay: style.animationDelay,
          }}
          className={cn(
            "animate-custom-meteor pointer-events-none absolute size-0.5 rounded-full bg-foreground/40 shadow-[0_0_0_1px_var(--border)] dark:bg-foreground/60 dark:shadow-[0_0_0_1px_var(--border)]",
            className
          )}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[100px] -translate-y-1/2 bg-gradient-to-r from-foreground/40 to-transparent dark:from-foreground/60" />
        </span>
      ))}
    </>
  )
}
