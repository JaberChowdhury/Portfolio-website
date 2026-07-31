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
import { Button } from "@/components/ui/button"

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
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
        className="relative z-10 flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-2xl md:flex-row"
      >
        {/* Preview Area */}
        <div className="relative flex min-h-[300px] flex-1 items-center justify-center overflow-hidden border-b border-border/50 bg-muted/30 bg-[radial-gradient(oklch(0.42_0.015_250_/_0.18)_1px,transparent_1px)] [background-size:16px_16px] p-12 md:border-r md:border-b-0">
          <div
            className="flex h-full w-full items-center justify-center transition-transform duration-200"
            style={{
              transform: `scale(${scale}) rotate(${rotation}deg)`,
            }}
          >
            {hasSvg ? (
              <div className="relative h-[120px] w-[120px]">
                <Image
                  src={svgUrl}
                  alt={item.label}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="text-8xl font-black text-muted-foreground/20">
                {item.label}
              </div>
            )}
          </div>
        </div>

        {/* Controls Area */}
        <div className="flex w-full flex-col gap-8 bg-card p-6 md:w-80">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-ink">
                Character <span className="text-cyan">{item.label}</span>
              </h3>
              <p className="mt-1 text-sm text-ink-2">
                ID: {item.id}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-ink-2 transition-colors hover:bg-paper-3 hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-6">
            {/* Scale Tweak */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 font-medium text-ink">
                  <Maximize2 className="h-4 w-4 text-ink-2" /> Scale
                </label>
                <span className="text-ink-2">
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
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-paper-3 accent-primary"
              />
            </div>

            {/* Rotation Tweak */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 font-medium text-ink">
                  <RotateCw className="h-4 w-4 text-ink-2" />{" "}
                  Rotation
                </label>
                <span className="text-ink-2">{rotation}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={rotation}
                onChange={(e) => setRotation(parseInt(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-paper-3 accent-primary"
              />
            </div>
          </div>

          {/* Action */}
          <Button
            onClick={copySvg}
            disabled={!hasSvg}
            variant={!hasSvg || copied ? "secondary" : "default"}
            className={`w-full ${copied ? "bg-mint text-ink hover:bg-mint" : ""}`}
          >
            {copied ? (
              <>
                <Check /> Copied Code!
              </>
            ) : (
              <>
                <Copy />{" "}
                {hasSvg ? "Copy SVG Code" : "No SVG to Copy"}
              </>
            )}
          </Button>
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
    <div className="mb-16">
      <h2
        data-cursor="text"
        className="mono-label mb-6 text-ink-2"
      >
        {title}
      </h2>
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
        {items.map((item) => {
          const hasSvg = availableSvgs.includes(`${item.id}.svg`)

          return (
            <div
              key={item.id}
              onClick={() => onSelect(item)}
              className="hum-card hum-card--plain group flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden p-3"
            >
              <div className="flex w-full flex-1 items-center justify-center">
                {hasSvg ? (
                  <div className="relative flex h-full w-full scale-125 items-center justify-center transition-transform duration-500 group-hover:scale-150">
                    <Image
                      src={`/illustrations/${item.id}.svg`}
                      alt={item.label}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-ink-2/30 font-mono text-xs text-ink-2/30 transition-colors group-hover:border-cyan/50 group-hover:text-cyan">
                    {item.label}
                  </div>
                )}
              </div>
              <span className="mono-label text-[10px] text-ink-2">
                {item.label}
              </span>
            </div>
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
    <div className="container mx-auto min-h-screen px-4 py-20 pt-32">
      <div className="mb-16">
        <p className="mono-label mb-4 text-ink-2">Vector Gallery</p>
        <h1
          data-cursor="text"
          className="text-4xl font-bold tracking-tight text-ink lg:text-6xl"
        >
          <span className="hl hl--coral">Character Illustrations</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-2">
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
