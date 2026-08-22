import type { Project } from "@/data/projects";
import type { Locale } from "@/lib/i18n";
import {
  EntryHighlights,
  EntryIndex,
  EntryLinks,
  EntrySummary,
  EntryTech,
  EntryTitle,
} from "@/components/projects/pieces";

const visualCopy = {
  en: {
    model: "One tenant model · one inventory ledger",
    surfaces: [
      { label: "Storefront", detail: "Customer browsing, cart and checkout" },
      { label: "POS terminal", detail: "Barcode checkout, 80mm thermal receipts" },
      { label: "Operations", detail: "Inventory ledger, delivery driver tracking" },
    ],
  },
  ar: {
    model: "نموذج مستأجر واحد · سجل مخزون واحد",
    surfaces: [
      { label: "واجهة المتجر", detail: "التصفح والسلة وإتمام الطلب للعميل" },
      { label: "نقطة البيع", detail: "دفع بالباركود وإيصالات حرارية 80mm" },
      { label: "التشغيل", detail: "سجل المخزون وتتبع سائقي التوصيل" },
    ],
  },
} as const;

/** Composition 04 — surface triptych under one tenant model. */
export function LumoraEntry({ project, locale }: { project: Project; locale: Locale }) {
  const copy = visualCopy[locale];

  return (
    <article className="border-t border-line py-14 first:border-t-0 md:py-20">
      <div className="grid gap-x-16 gap-y-6 md:grid-cols-[minmax(0,1fr)_22rem]">
        <div>
          <EntryIndex project={project} />
          <EntryTitle
            slug={project.slug}
            title={project.title}
            positioning={project.positioning}
          />
        </div>
        <div className="md:pt-9">
          <EntrySummary>{project.summary}</EntrySummary>
        </div>
      </div>

      {/* Triptych */}
      <div className="mt-12">
        <p className="eyebrow mb-4">{copy.model}</p>
        <div className="grid divide-y divide-line border-y border-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {copy.surfaces.map((surface) => (
            <div key={surface.label} className="px-0 py-5 md:px-6 md:first:pl-0 md:last:pr-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg">
                {surface.label}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {surface.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      <EntryHighlights items={project.highlights.slice(3)} />
      <EntryTech items={project.technologies} />
      <EntryLinks slug={project.slug} repository={project.repository} />
    </article>
  );
}
