"use client";

import { ExternalLink, RotateCw } from "lucide-react";
import { useRef } from "react";

interface BrowserPreviewProps {
  homepage: string;
  repoName: string;
}

export default function BrowserPreview({ homepage, repoName }: BrowserPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const reloadIframe = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div className="mb-12 w-full">
      <div className="font-mono text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">
        LIVE PREVIEW
      </div>

      <div className="flex flex-col w-full h-[400px] md:h-[600px] bg-background border border-border shadow-sm rounded-md overflow-hidden">
        
        {/* Browser Header Bar */}
        <div className="bg-muted/50 border-b border-border px-4 py-3 flex items-center gap-4 select-none">
          
          {/* Window Dots */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>

          {/* Reload Button */}
          <button 
            onClick={reloadIframe}
            className="text-muted-foreground hover:text-primary transition-colors focus:outline-none"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          {/* Address Bar */}
          <div className="flex-grow bg-background border border-border rounded px-3 py-1.5 text-xs font-mono text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap flex items-center">
            {homepage}
          </div>

          {/* Open in New Tab */}
          <a
            href={homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors focus:outline-none"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Iframe Content */}
        <div className="flex-grow relative w-full h-full bg-background">
          <iframe
            ref={iframeRef}
            src={homepage}
            title={`${repoName} Live Demo`}
            className="w-full h-full border-none bg-background"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
}
