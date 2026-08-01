"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/routing"
import { Segmented } from "@/components/pouf/Segmented"

export function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Segmented
      value={locale}
      label="Language"
      tone="purple"
      options={[
        { value: "en", label: "EN" },
        { value: "bn", label: "BN" },
      ]}
      onChange={(nextLocale) => {
        if (nextLocale !== locale) {
          router.replace(pathname, { locale: nextLocale })
        }
      }}
    />
  )
}
