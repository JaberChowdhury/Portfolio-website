import React, { useId } from "react"

interface DynamicWaveDividerProps {
  /** Height of the wave section in pixels (scales the original vector aspect ratio) */
  height?: number
  /** Width of a single wave cycle/hill in pixels (lower number = more hills) */
  hillWidth?: number
  /** Optional extra classes for the background wrapper */
  className?: string
  /** Flip the wave upside down if needed */
  upsideDown?: boolean
}

export const DynamicWaveDivider: React.FC<DynamicWaveDividerProps> = ({
  height = 10,
  hillWidth = 40, // Decrease this number to pack even MORE hills tightly together
  className = "",
  upsideDown = false,
}) => {
  const patternId = useId()

  // The original vector pattern is designed with a native 20x4.428 bounding box per loop.
  // We use viewBox mapping inside the pattern to scale it perfectly to your dynamic props.
  return (
    <div
      className={`w-full overflow-hidden bg-[var(--background)] leading-[0] ${className}`}
    >
      <svg
        className={`w-full fill-current text-[var(--primary)] ${upsideDown ? "rotate-180" : ""}`}
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
            {/* Exactly one perfect loop segment isolated from the original Arc source vector */}
            <path
              d="M0 0
                 C3.766 0 5.407 1.455 6.726 2.623
                 C8.026 3.775 8.844 4.428 10.527 4.428
                 C12.210 4.428 13.028 3.775 14.328 2.623
                 C15.646 1.455 17.288 0 20.519 0
                 V4.428
                 H0
                 Z"
            />
          </pattern>
        </defs>
        {/* Fills the container across any display size with the repeating pattern */}
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  )
}

export default DynamicWaveDivider
