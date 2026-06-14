import React, { useId } from "react"
import { cn } from "@/lib/utils"

interface DynamicWaveDividerProps {
  /** Height of the wave section in pixels (scales the original vector aspect ratio) */
  height?: number
  /** Width of a single wave cycle/hill in pixels (lower number = more hills) */
  hillWidth?: number
  /** Optional extra classes for the background wrapper */
  className?: string
  /** Optional extra classes for the svg wave itself (e.g. text-muted/30) */
  waveClass?: string
  /** Flip the wave upside down if needed */
  upsideDown?: boolean
}

export const DynamicWaveDivider: React.FC<DynamicWaveDividerProps> = ({
  height = 14,
  hillWidth = 40,
  className = "",
  waveClass = "",
  upsideDown = false,
}) => {
  const patternId = useId()

  return (
    <div
      className={cn(
        "relative z-10 -mt-[1px] -mb-[1px] w-full overflow-hidden leading-[0]",
        className
      )}
    >
      <svg
        className={cn(
          "block w-full",
          upsideDown ? "rotate-180" : "",
          waveClass
        )}
        style={{ height: `${height}px` }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            width={hillWidth}
            height={height}
            patternUnits="userSpaceOnUse"
            viewBox="0 0 20 4.428"
            preserveAspectRatio="none"
          >
            {/* The solid filled wave */}
            <path
              className="fill-current"
              d="M0 0
                 C3.766 0 5.407 1.455 6.726 2.623
                 C8.026 3.775 8.844 4.428 10.527 4.428
                 C12.210 4.428 13.028 3.775 14.328 2.623
                 C15.646 1.455 17.288 0 20.519 0
                 V4.428
                 H0
                 Z"
            />
            {/* The theme-oriented border line */}
            <path
              className="stroke-foreground/15 dark:stroke-white/20"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              fill="none"
              d="M0 0
                 C3.766 0 5.407 1.455 6.726 2.623
                 C8.026 3.775 8.844 4.428 10.527 4.428
                 C12.210 4.428 13.028 3.775 14.328 2.623
                 C15.646 1.455 17.288 0 20.519 0"
            />
          </pattern>
        </defs>

        {/* Fill the container with the combined pattern */}
        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
        />
      </svg>
    </div>
  )
}

export default DynamicWaveDivider
