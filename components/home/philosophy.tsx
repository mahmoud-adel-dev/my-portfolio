import { Section } from "@/components/ui/section";
import { getPrinciples } from "@/data/expertise";
import { translations, type Locale } from "@/lib/i18n";

/** Engineering philosophy — numbered principles, typographic, two columns. */
export function Philosophy({ locale }: { locale: Locale }) {
  const copy = translations[locale].philosophy;
  const principles = getPrinciples(locale);

  return (
    <Section
      index="05"
      eyebrow={copy.eyebrow}
      title={copy.title}
      lead={copy.lead}
    >
      <ol className="grid gap-x-16 gap-y-10 md:grid-cols-2">
        {principles.map((principle, i) => (
          <li
            key={principle.title}
            className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4"
          >
            <span
              aria-hidden="true"
              className="pt-1 font-mono text-xs text-accent"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-base font-semibold text-fg">
                {principle.title}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                {principle.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
