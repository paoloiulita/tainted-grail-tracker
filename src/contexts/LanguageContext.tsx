import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Language } from '../types';

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    localStorage.setItem('preferred-language', nextLanguage);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage === 'en' || savedLanguage === 'it') {
      setLanguageState(savedLanguage);
    }
  }, []);

  const value = {
    language,
    setLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}