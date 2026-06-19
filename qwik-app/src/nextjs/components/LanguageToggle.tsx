/** @jsxImportSource react */
"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"

export function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function toggleLanguage(nextLocale: string) {
    if (nextLocale !== locale) {
      router.replace(pathname, { locale: nextLocale })
    }
  }

  return (
    <div className="relative flex w-[100px] items-center rounded-full border border-border/50 bg-muted/50 p-1 shadow-inner backdrop-blur-sm">
      <button
        onClick={() => toggleLanguage("en")}
        className={`relative z-10 w-1/2 rounded-full py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${
          locale === "en"
            ? "text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => toggleLanguage("bn")}
        className={`relative z-10 w-1/2 rounded-full py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${
          locale === "bn"
            ? "text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        BN
      </button>

      {/* Animated Sliding Highlight */}
      <motion.div
        className="absolute left-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-full bg-primary shadow-sm"
        animate={{
          x: locale === "en" ? 0 : "100%",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      />
    </div>
  )
}
