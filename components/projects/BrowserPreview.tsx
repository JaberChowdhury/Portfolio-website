"use client"

import { ExternalLink } from "lucide-react"
import { useRef } from "react"
import { Icon } from "@/components/pouf/Icon"
import { IconButton } from "@/components/pouf/Button"
import { Row } from "@/components/pouf/layout"
import { Dot } from "@/components/pouf/media"
import { Card } from "@/components/pouf/surface"
import { Text } from "@/components/pouf/text"

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
    <div className="w-full">
      <Card variant="flush">
        <div className="flex items-center gap-(--s3) px-(--s4) pt-(--s4) pb-(--s3)">
          <div className="flex gap-[6px]">
            <Dot tone="pink" />
            <Dot tone="yellow" />
            <Dot tone="mint" />
          </div>

          <IconButton
            icon={<Icon name="history" size="sm" />}
            label="Reload preview"
            size="sm"
            variant="quiet"
            onClick={reloadIframe}
          />

          <div className="flex-1 min-w-0 truncate rounded-control bg-bg px-(--s4) py-[10px]">
            <Text size="sm" muted truncate>
              {homepage}
            </Text>
          </div>

          <a
            href={homepage}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open in new tab"
            className="text-muted transition-colors hover:text-ink"
          >
            <ExternalLink size={18} />
          </a>
        </div>

        <div className="relative h-[400px] w-full overflow-hidden rounded-b-card bg-bg md:h-[600px]">
          <iframe
            ref={iframeRef}
            src={homepage}
            title={`${repoName} Live Demo`}
            className="h-full w-full border-none bg-bg"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </Card>
    </div>
  )
}
