"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, X, Check } from "lucide-react"
import Image from "next/image"
import {
  UPPERCASE_LETTERS,
  LOWERCASE_LETTERS,
  NUMBERS,
  SYMBOLS,
  IllustrationItem,
} from "./data"

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
        className="absolute inset-0 bg-background/80"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative z-10 flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-paper-2 shadow-2xl md:flex-row"
      >
        {/* Preview Area */}
        <div className="relative flex min-h-[300px] flex-1 items-center justify-center overflow-hidden bg-paper p-12 md:border-r md:border-white/10">
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
              <div className="text-8xl font-black text-ink-2/40">
                {item.label}
              </div>
            )}
          </div>
        </div>

        {/* Controls Area */}
        <div className="flex w-full flex-col gap-8 p-6 md:w-80">
          <div className="flex items-center justify-between">
            <div>
              <div className="mono-label mb-2">Character</div>
              <h3 className="text-xl font-semibold text-ink">{item.label}</h3>
              <p className="mt-1 font-mono text-xs text-ink-2">ID: {item.id}</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-full p-2 text-ink-2 transition-colors hover:bg-paper-3 hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-6">
            {/* Scale Tweak */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="mono-label">Scale</span>
                <span className="font-mono text-xs text-ink-2">
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
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-paper-3 accent-cyan"
              />
            </div>

            {/* Rotation Tweak */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="mono-label">Rotation</span>
                <span className="font-mono text-xs text-ink-2">
                  {rotation}°
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={rotation}
                onChange={(e) => setRotation(parseInt(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-paper-3 accent-cyan"
              />
            </div>
          </div>

          {/* Action */}
          <button
            onClick={copySvg}
            disabled={!hasSvg}
            className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors ${
              !hasSvg
                ? "cursor-not-allowed bg-paper-3 text-ink-2/60"
                : copied
                  ? "bg-paper-3 text-cyan"
                  : "bg-paper-3 text-ink hover:bg-cyan hover:text-background"
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
    <section className="mb-16">
      <div className="mb-6">
        <div className="mono-label mb-2">Glyph Set</div>
        <h2 data-cursor="text" className="text-2xl font-semibold text-ink">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
        {items.map((item) => {
          const hasSvg = availableSvgs.includes(`${item.id}.svg`)

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className="group flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl bg-paper-2 p-3 transition-all duration-300 hover:bg-paper-3 hover:shadow-glow-cyan"
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
                  <div className="flex h-8 w-8 items-center justify-center rounded border border-dashed border-white/15 font-mono text-xs text-ink-2/40">
                    {item.label}
                  </div>
                )}
              </div>
              <span className="font-mono text-[10px] tracking-wider text-ink-2/60 uppercase transition-colors group-hover:text-cyan">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </section>
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
    <div className="mx-auto min-h-screen max-w-6xl px-6 pb-24 md:px-10">
      <header className="head-hang">
        <div className="head-hang__eyebrow">
          <span className="mono-label">Assets</span>
        </div>
        <h1 data-cursor="text" className="head-hang__title">
          Character Illustrations
        </h1>
        <p className="head-hang__body">
          A collection of custom SVG illustrations for every character, number,
          and symbol.
        </p>
      </header>

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
