import { Section } from "@/components/ui/section";
import { getStackGroups } from "@/data/expertise";
import { translations, type Locale } from "@/lib/i18n";

/**
 * "Built With" — technologies organized by responsibility.
 * A typographic index: label, note, then the tools. No logos, no percentages.
 */
export function Stack({ locale }: { locale: Locale }) {
  const copy = translations[locale].stack;
  const stackGroups = getStackGroups(locale);

  return (
    <Section
      index="04"
      eyebrow={copy.eyebrow}
      title={copy.title}
      lead={copy.lead}
    >
      <dl className="border-t border-line">
        {stackGroups.map((group) => (
          <div
            key={group.label}
            className="grid gap-x-10 gap-y-2 border-b border-line py-6 md:grid-cols-[9rem_13rem_minmax(0,1fr)] md:items-baseline"
          >
            <dt className="text-sm font-semibold text-fg">
              {group.label}
            </dt>
            <dd className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
              {group.note}
            </dd>
            <dd className="text-sm leading-loose text-muted">
              {group.items.join("  ·  ")}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
