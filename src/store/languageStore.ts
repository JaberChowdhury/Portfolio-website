import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Language = "en" | "bn";

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: "en",
      setLanguage: (language) => set({ language }),
      toggleLanguage: () =>
        set({ language: get().language === "en" ? "bn" : "en" }),
    }),
    { name: "app_lang" }
  )
);
