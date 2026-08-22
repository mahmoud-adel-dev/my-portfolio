"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { isLocale, type Locale } from "@/lib/i18n";

export type Theme = "dark" | "light";

type PreferencesContextValue = {
  locale: Locale;
  theme: Theme;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  toggleTheme: () => void;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function isTheme(value: string | null): value is Theme {
  return value === "dark" || value === "light";
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("portfolio-locale");
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";

    const frame = window.requestAnimationFrame(() => {
      if (isLocale(savedLocale)) setLocaleState(savedLocale);
      setTheme(isTheme(savedTheme) ? savedTheme : preferredTheme);
      setReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const root = document.documentElement;
    root.lang = locale;
    root.dir = locale === "ar" ? "rtl" : "ltr";
    root.dataset.theme = theme;
    window.localStorage.setItem("portfolio-locale", locale);
    window.localStorage.setItem("portfolio-theme", theme);
  }, [locale, ready, theme]);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((current) => (current === "en" ? "ar" : "en"));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({ locale, theme, setLocale, toggleLocale, toggleTheme }),
    [locale, setLocale, theme, toggleLocale, toggleTheme],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }

  return context;
}
