"use client";

import { usePreferences } from "@/components/providers/preferences-provider";
import { translations } from "@/lib/i18n";

export function SkipLink() {
  const { locale } = usePreferences();

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-on-accent"
    >
      {translations[locale].skipToContent}
    </a>
  );
}
