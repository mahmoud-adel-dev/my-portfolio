import { Bot, Boxes, CloudCog, ShoppingCart } from "lucide-react";
import { Section } from "@/components/ui/section";
import { getCapabilities } from "@/data/expertise";
import { translations, type Locale } from "@/lib/i18n";

const capabilityIcons = [Boxes, Bot, ShoppingCart, CloudCog] as const;

export function Capabilities({ locale }: { locale: Locale }) {
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
      <div className="grid border-s border-t border-line md:grid-cols-2">
        {capabilities.map((capability, index) => {
          const Icon = capabilityIcons[index] ?? Boxes;
          return (
            <article key={capability.title} className="capability-panel">
              <div className="flex items-center justify-between gap-4">
                <span className="capability-icon"><Icon size={19} strokeWidth={1.55} /></span>
                <span aria-hidden="true" className="font-mono text-xs font-semibold text-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-fg">{capability.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-muted">{capability.description}</p>
              <ul className="mt-5 space-y-2.5">
                {capability.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm leading-6 text-muted">
                    <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 bg-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
