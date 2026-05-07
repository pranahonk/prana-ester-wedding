'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { translations, Language } from '../data/translations';

type TranslationShape = typeof translations['id'];

interface LanguageContextValue {
  lang: Language;
  t: TranslationShape;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'id';
    const stored = localStorage.getItem('lang');
    return stored === 'id' || stored === 'en' ? stored : 'id';
  });

  function setLang(newLang: Language) {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  }

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang] as TranslationShape, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within <LanguageProvider>');
  return ctx;
}
