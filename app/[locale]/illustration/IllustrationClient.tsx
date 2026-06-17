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
        className="relative z-10 flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-border/50 bg-card shadow-2xl md:flex-row"
      >
        {/* Preview Area */}
        <div className="relative flex min-h-[300px] flex-1 items-center justify-center overflow-hidden border-b border-border/50 bg-muted/30 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] p-12 md:border-r md:border-b-0 dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]">
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
              <h3 className="text-xl font-bold tracking-tight">
                Character <span className="text-primary">{item.label}</span>
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                ID: {item.id}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-6">
            {/* Scale Tweak */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 font-medium">
                  <Maximize2 className="h-4 w-4 text-muted-foreground" /> Scale
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
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 font-medium">
                  <RotateCw className="h-4 w-4 text-muted-foreground" />{" "}
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
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition-all ${
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
    <div className="mb-16">
      <h2
        data-cursor="text"
        className="mb-6 text-2xl font-semibold tracking-tight"
      >
        {title}
      </h2>
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
        {items.map((item) => {
          const hasSvg = availableSvgs.includes(`${item.id}.svg`)

          return (
            <Card
              key={item.id}
              onClick={() => onSelect(item)}
              className="group cursor-pointer overflow-hidden border-border/50 bg-card/40 transition-all hover:border-primary/50 hover:bg-card/60 hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)]"
            >
              <CardContent className="flex aspect-square flex-col items-center justify-center gap-2 p-3">
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
                    <div className="flex h-8 w-8 items-center justify-center rounded border border-dashed border-muted-foreground/30 font-mono text-xs text-muted-foreground/30 transition-colors group-hover:border-primary/50 group-hover:text-primary">
                      {item.label}
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-medium text-muted-foreground uppercase">
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
    <div className="container mx-auto min-h-screen px-4 py-20 pt-32">
      <div className="mb-16">
        <h1
          data-cursor="text"
          className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl"
        >
          Character Illustrations
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
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
