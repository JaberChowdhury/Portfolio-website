import React from "react"
import { Loader2 } from "lucide-react"

export default function Loader() {
  return (
    <div className="flex w-full items-center justify-center p-12">
      <div className="flex flex-col items-center gap-4 text-muted-foreground">
        <Loader2 className="size-10 animate-spin text-primary" />
        <p className="animate-pulse text-sm font-medium tracking-widest uppercase">
          Loading Typography...
        </p>
      </div>
    </div>
  )
}
