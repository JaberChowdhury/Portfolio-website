"use client"

interface BrowserPreviewProps {
  homepage: string
  repoName: string
}

export default function BrowserPreview({
  homepage,
  repoName,
}: BrowserPreviewProps) {
  return (
    <div className="mb-12 w-full">
      <div className="mb-4 font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase">
        LIVE PREVIEW
      </div>

      <figure className="w-full overflow-hidden rounded-2xl border border-border bg-paper-2">
        <div className="h-[400px] w-full md:h-[600px]">
          <iframe
            src={homepage}
            title={`${repoName} Live Demo`}
            className="h-full w-full border-none bg-paper-2"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </figure>
    </div>
  )
}
