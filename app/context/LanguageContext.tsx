'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { translations, Language, Translations } from '../data/translations';

type TranslationShape = Translations[Language];

interface LanguageContextValue {
  lang: Language;
  t: TranslationShape;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'id',
  t: translations['id'],
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('id');

  useEffect(() => {
    const stored = localStorage.getItem('lang');
    if (stored === 'id' || stored === 'en') {
      setLangState(stored);
    }
  }, []);

  function setLang(newLang: Language) {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  }

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
