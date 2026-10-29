import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en');

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('preferred-language', lang);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && ['en', 'it'].includes(savedLanguage)) {
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