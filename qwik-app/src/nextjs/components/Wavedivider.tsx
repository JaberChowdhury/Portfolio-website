/** @jsxImportSource react */
// import React, { useId } from "react"
// import { cn } from "@/lib/utils" // Assuming you are using shadcn or a clsx/tailwind-merge utility

// interface ArcWaveDividerProps {
//   /** Height of the wave section in pixels (scales the original vector aspect ratio) */
//   height?: number
//   /** Width of a single wave cycle/hill in pixels (lower number = more hills) */
//   hillWidth?: number
//   /** Optional extra classes for the background wrapper (crucial for setting the bg-color) */
//   className?: string
//   /** Optional extra classes for the svg wave itself (crucial for setting the text-color) */
//   waveClass?: string
//   /** Flip the wave upside down if needed */
//   upsideDown?: boolean
// }

// export const Wavedivider: React.FC<ArcWaveDividerProps> = ({
//   height = 14,
//   hillWidth = 40,
//   className = "",
//   waveClass = "",
//   upsideDown = false,
// }) => {
//   const patternId = useId()

//   return (
//     <div
//       className={cn(
//         // Added translate-y-[1px] to ensure sub-pixel gaps never appear across different zooms
//         "relative z-10 -mt-[1px] -mb-[1px] w-full translate-y-[1px] overflow-hidden leading-[0]",
//         className
//       )}
//     >
//       <svg
//         className={cn(
//           "block w-full",
//           upsideDown ? "rotate-180" : "",
//           waveClass
//         )}
//         style={{ height: `${height}px` }}
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <defs>
//           <pattern
//             id={patternId}
//             width={hillWidth}
//             height={height}
//             patternUnits="userSpaceOnUse"
//             viewBox="0 0 20 4.428"
//             preserveAspectRatio="none"
//           >
//             {/* The solid filled wave body */}
//             <path
//               className="fill-current"
//               d="M0 0 C3.766 0 5.407 1.455 6.726 2.623 C8.026 3.775 8.844 4.428 10.527 4.428 C12.210 4.428 13.028 3.775 14.328 2.623 C15.646 1.455 17.288 0 20.519 0 V4.428 H0 Z"
//             />
//             {/* The seamless border line */}
//             <path
//               className="stroke-current"
//               strokeWidth="2"
//               vectorEffect="non-scaling-stroke"
//               fill="none"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M0 0 C3.766 0 5.407 1.455 6.726 2.623 C8.026 3.775 8.844 4.428 10.527 4.428 C12.210 4.428 13.028 3.775 14.328 2.623 C15.646 1.455 17.288 0 20.519 0"
//             />
//           </pattern>
//         </defs>

//         {/* Fill the container with the combined pattern */}
//         <rect width="100%" height="100%" fill={`url(#${patternId})`} />
//       </svg>
//     </div>
//   )
// }

// export default Wavedivider

import React from "react"

/* ============================================================================
 * 1. HOC PROPS DEFINITION
 * ============================================================================ */
export interface WaveDividerOptions {
  /** Tailwind class for the wave background color (e.g., 'bg-blue-600'). This is the color of the section BELOW. */
  waveClassName?: string
  /** Exact CSS background color (e.g., '#3139FB'). Overrides waveClassName if provided. */
  waveColor?: string

  /** * CRITICAL FIX FOR THE GAP:
   * Tailwind class for the container's background (e.g., 'bg-[#F5F4E2]').
   * This MUST match the background color of the Wrapped Component to hide the gap.
   */
  containerClassName?: string
  /** Exact CSS background color for the container. Overrides containerClassName. */
  containerColor?: string

  /** Height of the wave section in pixels */
  waveHeight?: number
  /** Width of a single wave cycle/hill in pixels */
  waveHillWidth?: number
  /** Custom SVG data URI or URL for the mask. Defaults to the Arc wave. */
  waveMaskImage?: string
  /** Flip the wave upside down */
  waveUpsideDown?: boolean
}

/* ============================================================================
 * 2. THE HIGHER-ORDER COMPONENT (HOC)
 * ============================================================================ */
export default function withWaveDivider<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  // Return a new component that accepts both the original props AND wave options
  return function ComponentWithWave(props: P & WaveDividerOptions) {
    // 1. Extract wave-specific props
    const {
      waveClassName = "",
      waveColor,
      containerClassName = "",
      containerColor,
      waveHeight = 14,
      waveHillWidth = 40,
      waveMaskImage,
      waveUpsideDown = false,
      // 2. Collect the rest of the props to pass to the wrapped component
      ...componentProps
    } = props

    // Default Arc wave path encoded for CSS masking
    const defaultSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 20 4.428' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 C3.766 0 5.407 1.455 6.726 2.623 C8.026 3.775 8.844 4.428 10.527 4.428 C12.210 4.428 13.028 3.775 14.328 2.623 C15.646 1.455 17.288 0 20.519 0 V4.428 H0 Z'/%3E%3C/svg%3E`
    const maskSvg = waveMaskImage || defaultSvg

    return (
      <div
        className={`relative flex w-full flex-col ${!containerColor ? containerClassName : ""}`}
        style={{ backgroundColor: containerColor }}
      >
        {/* Render the original component and pass its standard props down */}
        <WrappedComponent {...(componentProps as P)} />

        {/* Attach the wave divider to the bottom.
          The -mt-[1px] pulls the wave up slightly to overlap any sub-pixel aliasing seams.
        */}
        <div
          className={`relative z-10 -mt-[1px] w-full ${
            waveUpsideDown ? "rotate-180" : ""
          } ${!waveColor ? waveClassName : ""}`}
          style={{
            height: `${waveHeight}px`,
            backgroundColor: waveColor, // Direct color injection if requested
            maskImage: `url("${maskSvg}")`,
            maskSize: `${waveHillWidth}px 100%`, // 100% height prevents vertical mask clipping gaps
            maskRepeat: "repeat-x",
            WebkitMaskImage: `url("${maskSvg}")`,
            WebkitMaskSize: `${waveHillWidth}px 100%`,
            WebkitMaskRepeat: "repeat-x",
          }}
        />
      </div>
    )
  }
}

/* ============================================================================
 * 3. EXAMPLE USAGE
//  * ============================================================================ */

// // A simple, standard React component (No wave logic inside it at all)
// interface HeroSectionProps {
//   title: string
//   subtitle: string
// }

// function HeroSection({ title, subtitle }: HeroSectionProps) {
//   return (
//     // Note: We keep the bg color here for standalone use, but the HOC container will also inherit it.
//     <section className="flex flex-col items-center justify-center bg-[#F5F4E2] px-6 pt-20 pb-16 text-center text-gray-800">
//       <h1 className="mb-4 text-4xl font-bold md:text-5xl">{title}</h1>
//       <p className="max-w-lg text-gray-500">{subtitle}</p>
//     </section>
//   )
// }

// // Wrap the component with our HOC to give it "wave powers"
// const HeroWithWave = withWaveDivider(HeroSection)
