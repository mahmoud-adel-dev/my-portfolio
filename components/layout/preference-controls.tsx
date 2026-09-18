"use client";

import Link from "next/link";
import { Languages, Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { alternateLocale, type Locale, type Translation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type PreferenceControlsProps = {
  locale: Locale;
  copy: Translation["nav"];
  compact?: boolean;
};

export function PreferenceControls({
  locale,
  copy,
  compact = false,
}: PreferenceControlsProps) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const nextLocale = alternateLocale(locale);
  const segments = pathname.split("/");
  segments[1] = nextLocale;
  const localeHref = segments.join("/") || `/${nextLocale}`;
  const themeLabel =
    resolvedTheme === "dark" ? copy.switchToLight : copy.switchToDark;

  function rememberLocale() {
    document.cookie = `portfolio-locale=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }

  function toggleTheme() {
    const fallbackTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const currentTheme = resolvedTheme ?? fallbackTheme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  }

  return (
    <div
      className="flex shrink-0 items-center gap-1.5"
      aria-label={locale === "ar" ? "إعدادات العرض" : "Display preferences"}
    >
      <Link
        href={localeHref}
        hrefLang={nextLocale}
        onClick={rememberLocale}
        aria-label={copy.switchLanguage}
        title={copy.switchLanguage}
        className={cn(
          "control-button gap-2 px-2.5 text-xs font-semibold",
          compact ? "min-w-10" : "min-w-[5.75rem]",
        )}
      >
        <Languages size={16} strokeWidth={1.7} />
        <span>{compact ? nextLocale.toUpperCase() : copy.switchLanguageShort}</span>
      </Link>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={themeLabel}
        title={themeLabel}
        className="control-button relative size-9"
      >
        <Sun className="theme-icon-light absolute" size={17} strokeWidth={1.7} />
        <Moon className="theme-icon-dark absolute" size={17} strokeWidth={1.7} />
      </button>
    </div>
  );
}
