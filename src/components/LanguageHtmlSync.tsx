"use client";

import { useEffect } from "react";
import { useLanguageStore } from "@/store/languageStore";

/**
 * Syncs the current language from the Zustand store to the <html> element's
 * `data-lang` attribute. This enables pure-CSS font switching for Bangla (bn)
 * without requiring per-component font logic.
 */
export default function LanguageHtmlSync() {
  const language = useLanguageStore((s) => s.language);

  useEffect(() => {
    document.documentElement.setAttribute("data-lang", language);
  }, [language]);

  return null;
}
