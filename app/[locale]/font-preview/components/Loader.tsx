import React from "react"
import { Loader2 } from "lucide-react"

export default function Loader() {
  return (
    <div className="flex w-full items-center justify-center p-12">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="size-8 animate-spin text-cyan" />
        <p className="mono-label animate-pulse">Loading Typography...</p>
      </div>
    </div>
  )
}
