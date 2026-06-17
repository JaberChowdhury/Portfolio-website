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

      <div className="flex h-[400px] w-full flex-col overflow-hidden rounded-md border border-border bg-background shadow-sm md:h-[600px]">
        {/* Browser Header Bar */}
        <div className="flex items-center gap-4 border-b border-border bg-muted/50 px-4 py-3 select-none">
          {/* Window Dots */}
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-destructive/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>

          {/* Reload Button */}
          <button
            onClick={reloadIframe}
            className="text-muted-foreground transition-colors hover:text-primary focus:outline-none"
          >
            <RotateCw className="h-4 w-4" />
          </button>

          {/* Address Bar */}
          <div className="flex flex-grow items-center overflow-hidden rounded border border-border bg-background px-3 py-1.5 font-mono text-xs text-ellipsis whitespace-nowrap text-muted-foreground">
            {homepage}
          </div>

          {/* Open in New Tab */}
          <a
            href={homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary focus:outline-none"
          >
            <ExternalLink className="h-4 w-4" />
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
