"use client";

import { Languages, Moon, Sun } from "lucide-react";
import { usePreferences } from "@/components/providers/preferences-provider";
import { translations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function PreferenceControls({ compact = false }: { compact?: boolean }) {
  const { locale, theme, toggleLocale, toggleTheme } = usePreferences();
  const copy = translations[locale].nav;
  const ThemeIcon = theme === "dark" ? Sun : Moon;
  const themeLabel = theme === "dark" ? copy.switchToLight : copy.switchToDark;

  return (
    <div
      className="flex shrink-0 items-center gap-1"
      aria-label={locale === "ar" ? "إعدادات العرض" : "Display preferences"}
    >
      <button
        type="button"
        onClick={toggleLocale}
        aria-label={copy.switchLanguage}
        title={copy.switchLanguage}
        className={cn(
          "flex h-9 items-center justify-center gap-2 border border-line px-2 text-xs font-medium text-muted transition-colors hover:border-line-strong hover:bg-surface hover:text-fg",
          compact ? "min-w-11" : "min-w-24",
        )}
      >
        <Languages size={16} strokeWidth={1.6} />
        <span>{compact ? (locale === "en" ? "AR" : "EN") : copy.switchLanguageShort}</span>
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={themeLabel}
        title={themeLabel}
        className="flex size-9 items-center justify-center border border-line text-muted transition-colors hover:border-line-strong hover:bg-surface hover:text-fg"
      >
        <ThemeIcon size={17} strokeWidth={1.6} />
      </button>
    </div>
  );
}
