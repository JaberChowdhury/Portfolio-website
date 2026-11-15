"use client"

import React, { createContext, useContext, useMemo } from "react"
import messagesEn from "@/messages/en.json"

const I18nContext = createContext<{ messages: Record<string, any> }>({
  messages: messagesEn,
})

export function I18nProvider({
  children,
  messages = messagesEn,
}: {
  children: React.ReactNode
  messages?: Record<string, any>
}) {
  return (
    <I18nContext.Provider value={{ messages }}>
      {children}
    </I18nContext.Provider>
  )
}

function resolvePath(messages: any, path: string): any {
  if (!path) return messages
  const segments = path.split(".")
  let curr: any = messages
  for (const seg of segments) {
    if (curr && typeof curr === "object" && seg in curr) {
      curr = curr[seg]
    } else {
      return undefined
    }
  }
  return curr
}

export function useTranslations(namespace?: string) {
  const { messages } = useContext(I18nContext)

  return useMemo(() => {
    const t = (key?: string): any => {
      const fullPath = [namespace, key].filter(Boolean).join(".")
      const val = resolvePath(messages, fullPath)
      if (val !== undefined && val !== null) {
        return typeof val === "string" ? val : val
      }
      return key || namespace || ""
    }

    t.raw = (key?: string): any => {
      const fullPath = [namespace, key].filter(Boolean).join(".")
      const val = resolvePath(messages, fullPath)
      return val !== undefined ? val : []
    }

    return t
  }, [messages, namespace])
}
