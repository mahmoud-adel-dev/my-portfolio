import { Section } from "@/components/ui/section";
import { translations, type Locale } from "@/lib/i18n";

/** Concise About — engineering interests only, no invented biography. */
export function About({ locale }: { locale: Locale }) {
  const copy = translations[locale].about;

  return (
    <Section
      id="about"
      index="06"
      eyebrow={copy.eyebrow}
      title={copy.title}
    >
      <div className="grid gap-x-16 gap-y-8 md:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="max-w-2xl space-y-5 leading-relaxed text-muted">
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        <aside
          aria-label={copy.focusLabel}
          className="md:border-s md:border-line md:ps-10"
        >
          <p className="eyebrow">{copy.focusAreas}</p>
          <ul className="mt-4 space-y-2.5 font-mono text-xs leading-relaxed text-muted">
            {copy.focusItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>
    </Section>
  );
}
