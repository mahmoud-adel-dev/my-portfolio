"use client";

import { usePreferences } from "@/components/providers/preferences-provider";
import { Section } from "@/components/ui/section";
import { getCapabilities } from "@/data/expertise";
import { translations } from "@/lib/i18n";

/** "What I Build" — four capability areas separated by hairlines, no cards. */
export function Capabilities() {
  const { locale } = usePreferences();
  const copy = translations[locale].capabilities;
  const capabilities = getCapabilities(locale);

  return (
    <Section
      id="expertise"
      index="03"
      eyebrow={copy.eyebrow}
      title={copy.title}
      lead={copy.lead}
    >
      <div className="grid gap-x-14 gap-y-12 md:grid-cols-2">
        {capabilities.map((capability, i) => (
          <div
            key={capability.title}
            className="border-t border-line pt-7 first:pt-7"
          >
            <p aria-hidden="true" className="font-mono text-xs text-accent">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 text-lg font-semibold text-fg">
              {capability.title}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              {capability.description}
            </p>
            <ul className="mt-5 space-y-2">
              {capability.points.map((point) => (
                <li
                  key={point}
                  className="flex items-baseline gap-3 text-sm text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[7px] size-1 shrink-0 bg-accent/70"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
