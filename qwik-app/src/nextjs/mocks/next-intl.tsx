/** @jsxImportSource react */
import React, { createContext, useContext, useState, useMemo } from 'react';
import en from '../../messages/en.json';
import bn from '../../messages/bn.json';

const dictionaries: any = { en, bn };

export const LocaleContext = createContext<any>(null);

export function useTranslations(namespace?: string) {
  const context = useContext(LocaleContext);
  const locale = context?.locale || 'en';
  const dict = dictionaries[locale] || dictionaries['en'];
  
  const t: any = (key: string, options?: any) => {
    let obj = namespace ? (dict[namespace] || {}) : dict;
    const parts = key.split('.');
    for (const p of parts) {
      if (obj) obj = obj[p];
    }
    if (typeof obj === 'string') {
      let str = obj;
      if (options) {
        for (const [k, v] of Object.entries(options)) {
          if (typeof v === 'function') {
            // basic xml replacement
            str = str.replace(new RegExp(`<${k}>(.*?)</${k}>`, 'g'), v('$1') as any);
          } else {
            str = str.replace(`{${k}}`, String(v));
          }
        }
      }
      return str;
    }
    // Fallback logic
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };
  
  t.raw = (key: string) => {
    let obj = namespace ? (dict[namespace] || {}) : dict;
    const parts = key.split('.');
    for (const p of parts) {
      if (obj) obj = obj[p];
    }
    return obj || [];
  };
  
  t.markup = t;
  
  return t;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  return context?.locale || 'en';
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState('en');
  const value = useMemo(() => ({ locale, setLocale }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
