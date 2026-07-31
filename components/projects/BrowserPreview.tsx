"use client"

import { ExternalLink, RotateCw } from "lucide-react"
import { useRef } from "react"

interface BrowserPreviewProps {
  homepage: string
  repoName: string
}

export default function BrowserPreview({
  homepage,
  repoName,
}: BrowserPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const reloadIframe = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src
    }
  }

  return (
    <div className="mb-12 w-full">
      <div className="mono-label mb-4">Live Preview</div>

      <div className="flex h-[400px] w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-paper-2 md:h-[600px]">
        {/* Browser Header Bar */}
        <div className="flex items-center gap-4 border-b border-white/10 bg-paper px-4 py-3 select-none">
          {/* Window Dots */}
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-white/15" />
            <div className="h-3 w-3 rounded-full bg-white/25" />
            <div className="h-3 w-3 rounded-full bg-cyan/40" />
          </div>

          {/* Reload Button */}
          <button
            onClick={reloadIframe}
            aria-label="Reload preview"
            className="text-ink-2 transition-colors hover:text-cyan focus:outline-none"
          >
            <RotateCw className="h-4 w-4" />
          </button>

          {/* Address Bar */}
          <div className="flex flex-grow items-center overflow-hidden rounded-md border border-white/10 bg-paper-2 px-3 py-1.5 font-mono text-xs text-ellipsis whitespace-nowrap text-ink-2">
            {homepage}
          </div>

          {/* Open in New Tab */}
          <a
            href={homepage}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open in new tab"
            className="text-ink-2 transition-colors hover:text-cyan focus:outline-none"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Iframe Content */}
        <div className="relative h-full w-full flex-grow bg-paper">
          <iframe
            ref={iframeRef}
            src={homepage}
            title={`${repoName} Live Demo`}
            className="h-full w-full border-none bg-paper"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  )
}
