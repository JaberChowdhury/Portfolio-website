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
      <div className="mb-4 font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase">
        LIVE PREVIEW
      </div>

      <div className="flex h-[280px] w-full flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm sm:h-[400px] md:h-[600px]">
        {/* Browser Header Bar */}
        <div className="flex items-center gap-2.5 border-b border-border bg-muted/50 px-3 py-2 select-none sm:gap-4 sm:px-4 sm:py-3">
          {/* Window Dots */}
          <div className="flex gap-1.5 sm:gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-destructive/80 sm:h-3 sm:w-3" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 sm:h-3 sm:w-3" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/80 sm:h-3 sm:w-3" />
          </div>

          {/* Reload Button */}
          <button
            onClick={reloadIframe}
            className="text-muted-foreground transition-colors hover:text-primary focus:outline-none"
            aria-label="Reload preview"
          >
            <RotateCw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>

          {/* Address Bar */}
          <div className="flex flex-grow items-center overflow-hidden rounded border border-border bg-background px-2.5 py-1 font-mono text-[11px] text-ellipsis whitespace-nowrap text-muted-foreground sm:text-xs">
            <span className="truncate">{homepage}</span>
          </div>

          {/* Open in New Tab */}
          <a
            href={homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary focus:outline-none"
            aria-label="Open in new tab"
          >
            <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </a>
        </div>

        {/* Iframe Content */}
        <div className="relative h-full w-full flex-grow bg-background">
          <iframe
            ref={iframeRef}
            src={homepage}
            title={`${repoName} Live Demo`}
            className="h-full w-full border-none bg-background"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  )
}
