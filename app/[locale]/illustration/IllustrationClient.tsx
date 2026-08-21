"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, X, Check, Maximize2, RotateCw } from "lucide-react"
import Image from "next/image"
import {
  UPPERCASE_LETTERS,
  LOWERCASE_LETTERS,
  NUMBERS,
  SYMBOLS,
  IllustrationItem,
} from "./data"
import { Card, CardContent } from "@/components/ui/card"

function IllustrationModal({
  item,
  onClose,
  hasSvg,
}: {
  item: IllustrationItem
  onClose: () => void
  hasSvg: boolean
}) {
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [copied, setCopied] = useState(false)
  const svgUrl = `/illustrations/${item.id}.svg`

  const copySvg = async () => {
    if (!hasSvg) return
    try {
      const res = await fetch(svgUrl)
      if (!res.ok) throw new Error("Failed to fetch SVG")
      const svgText = await res.text()
      await navigator.clipboard.writeText(svgText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Could not copy SVG:", err)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative z-10 flex max-h-[90dvh] w-full max-w-3xl flex-col overflow-y-auto rounded-2xl border border-border/50 bg-card shadow-2xl sm:rounded-3xl md:flex-row md:overflow-visible"
      >
        {/* Preview Area */}
        <div className="relative flex min-h-[200px] flex-1 items-center justify-center overflow-hidden border-b border-border/50 bg-muted/30 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] p-6 sm:min-h-[300px] sm:p-12 md:border-r md:border-b-0 dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]">
          <div
            className="flex h-full w-full items-center justify-center transition-transform duration-200"
            style={{
              transform: `scale(${scale}) rotate(${rotation}deg)`,
            }}
          >
            {hasSvg ? (
              <div className="relative h-[100px] w-[100px] sm:h-[120px] sm:w-[120px]">
                <Image
                  src={svgUrl}
                  alt={item.label}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="text-6xl font-black text-muted-foreground/20 sm:text-8xl">
                {item.label}
              </div>
            )}
          </div>
        </div>

        {/* Controls Area */}
        <div className="flex w-full flex-col gap-5 bg-card p-4 sm:gap-8 sm:p-6 md:w-80">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold tracking-tight sm:text-xl">
                Character <span className="text-primary">{item.label}</span>
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">
                ID: {item.id}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-4 sm:space-y-6">
            {/* Scale Tweak */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <label className="flex items-center gap-2 font-medium">
                  <Maximize2 className="h-3.5 w-3.5 text-muted-foreground sm:h-4 sm:w-4" />{" "}
                  Scale
                </label>
                <span className="text-muted-foreground">
                  {scale.toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
              />
            </div>

            {/* Rotation Tweak */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <label className="flex items-center gap-2 font-medium">
                  <RotateCw className="h-3.5 w-3.5 text-muted-foreground sm:h-4 sm:w-4" />{" "}
                  Rotation
                </label>
                <span className="text-muted-foreground">{rotation}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={rotation}
                onChange={(e) => setRotation(parseInt(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
              />
            </div>
          </div>

          {/* Action */}
          <button
            onClick={copySvg}
            disabled={!hasSvg}
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium transition-all active:scale-95 sm:py-3 sm:text-sm ${
              !hasSvg
                ? "cursor-not-allowed bg-muted text-muted-foreground"
                : copied
                  ? "border border-green-500/20 bg-green-500/10 text-green-500"
                  : "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" /> Copied Code!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />{" "}
                {hasSvg ? "Copy SVG Code" : "No SVG to Copy"}
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function IllustrationGrid({
  title,
  items,
  onSelect,
  availableSvgs,
}: {
  title: string
  items: IllustrationItem[]
  onSelect: (item: IllustrationItem) => void
  availableSvgs: string[]
}) {
  return (
    <div className="mb-10 sm:mb-16">
      <h2
        data-cursor="text"
        className="mb-4 text-xl font-bold tracking-tight sm:mb-6 sm:text-2xl"
      >
        {title}
      </h2>
      <div className="grid grid-cols-3 gap-2 min-[400px]:grid-cols-4 sm:grid-cols-6 sm:gap-3 md:grid-cols-8 md:gap-4 lg:grid-cols-12">
        {items.map((item) => {
          const hasSvg = availableSvgs.includes(`${item.id}.svg`)

          return (
            <Card
              key={item.id}
              onClick={() => onSelect(item)}
              className="group cursor-pointer overflow-hidden rounded-xl border-border/50 bg-card/40 transition-all hover:border-primary/50 hover:bg-card/60 hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)] active:scale-95"
            >
              <CardContent className="flex aspect-square flex-col items-center justify-center gap-1.5 p-2 sm:p-3">
                <div className="flex w-full flex-1 items-center justify-center">
                  {hasSvg ? (
                    <div className="relative flex h-full w-full scale-110 items-center justify-center transition-transform duration-500 group-hover:scale-130">
                      <Image
                        src={`/illustrations/${item.id}.svg`}
                        alt={item.label}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-7 w-7 items-center justify-center rounded border border-dashed border-muted-foreground/30 font-mono text-[10px] text-muted-foreground/30 transition-colors group-hover:border-primary/50 group-hover:text-primary sm:h-8 sm:w-8 sm:text-xs">
                      {item.label}
                    </div>
                  )}
                </div>
                <span className="text-[9px] font-medium text-muted-foreground uppercase sm:text-[10px]">
                  {item.label}
                </span>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default function IllustrationClient({
  availableSvgs,
}: {
  availableSvgs: string[]
}) {
  const [selectedItem, setSelectedItem] = useState<IllustrationItem | null>(
    null
  )

  return (
    <div className="container mx-auto min-h-screen max-w-7xl px-4 pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32">
      <div className="mb-10 sm:mb-16">
        <h1
          data-cursor="text"
          className="mb-3 text-2xl font-extrabold tracking-tight sm:mb-4 sm:text-4xl lg:text-5xl"
        >
          Character Illustrations
        </h1>
        <p className="max-w-2xl text-xs text-muted-foreground sm:text-sm md:text-base">
          A collection of custom SVG illustrations for every character, number,
          and symbol.
        </p>
      </div>

      <IllustrationGrid
        title="Uppercase Letters"
        items={UPPERCASE_LETTERS}
        onSelect={setSelectedItem}
        availableSvgs={availableSvgs}
      />
      <IllustrationGrid
        title="Lowercase Letters"
        items={LOWERCASE_LETTERS}
        onSelect={setSelectedItem}
        availableSvgs={availableSvgs}
      />
      <IllustrationGrid
        title="Numbers"
        items={NUMBERS}
        onSelect={setSelectedItem}
        availableSvgs={availableSvgs}
      />
      <IllustrationGrid
        title="Symbols"
        items={SYMBOLS}
        onSelect={setSelectedItem}
        availableSvgs={availableSvgs}
      />

      <AnimatePresence>
        {selectedItem && (
          <IllustrationModal
            item={selectedItem}
            hasSvg={availableSvgs.includes(`${selectedItem.id}.svg`)}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
