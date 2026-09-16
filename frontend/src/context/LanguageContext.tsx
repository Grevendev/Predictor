import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";

import { translations } from "../translations/translations";

export type Language = "sv" | "en";

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  translations: (typeof translations)[Language];
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "predictor-language";

function getInitialLanguage(): Language {
  const storedLanguage = localStorage.getItem(STORAGE_KEY);

  if (storedLanguage === "en") {
    return "en";
  }

  return "sv";
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({
  children
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(
    getInitialLanguage
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  function toggleLanguage() {
    setLanguage((currentLanguage) =>
      currentLanguage === "sv" ? "en" : "sv"
    );
  }

  const currentTranslations = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        translations: currentTranslations
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used within a LanguageProvider"
    );
  }

  return context;
}