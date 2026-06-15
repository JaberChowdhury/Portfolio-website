"use client"

import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface MeteorsProps {
  number?: number
  minDelay?: number
  maxDelay?: number
  minDuration?: number
  maxDuration?: number
  angle?: number
  className?: string
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const meteorStyles = React.useMemo(() => {
    if (!mounted) return []
    return [...new Array(number)].map(() => {
      // If the user passes angle=45, it moves up-left. To make it fall from the top gracefully,
      // we randomly spread them across a larger area.
      return {
        "--angle": angle + "deg",
        top: Math.floor(Math.random() * window.innerHeight * 0.5) - 200 + "px",
        left: Math.floor(Math.random() * window.innerWidth * 1.5) - 400 + "px",
        animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
        animationDuration:
          Math.floor(
            Math.random() * (maxDuration - minDuration) + minDuration
          ) + "s",
      }
    })
  }, [mounted, number, minDelay, maxDelay, minDuration, maxDuration, angle])

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
            "animate-custom-meteor pointer-events-none absolute size-0.5 rounded-full bg-foreground/40 shadow-[0_0_0_1px_#ffffff10] dark:bg-foreground/60 dark:shadow-[0_0_0_1px_#ffffff20]",
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
