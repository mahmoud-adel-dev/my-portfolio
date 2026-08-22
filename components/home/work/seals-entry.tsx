import type { Project } from "@/data/projects";
import type { Locale } from "@/lib/i18n";
import {
  EntryHighlights,
  EntryIndex,
  EntryLinks,
  EntryTech,
  EntryTitle,
} from "@/components/projects/pieces";

const visualCopy = {
  en: {
    orgLabel: "Organization types",
    orgTypes: [
      { role: "Wholesaler", acts: "lists stock & quotes" },
      { role: "Business buyer", acts: "places wholesale orders" },
      { role: "Shipping company", acts: "fulfills deliveries" },
    ],
    core: "Transactional core",
    coreDetail:
      "Reserve → commit inventory under MongoDB transactions. Overselling is impossible under concurrent orders.",
    paymentDetail:
      "Orders carry three separate payment obligations: platform fee, merchandise and shipping. They settle over local rails with proof upload, while the platform never holds merchant funds.",
  },
  ar: {
    orgLabel: "أنواع المؤسسات",
    orgTypes: [
      { role: "مورد جملة", acts: "يعرض المخزون والأسعار" },
      { role: "مشترٍ تجاري", acts: "ينشئ طلبات جملة" },
      { role: "شركة شحن", acts: "تنفذ عمليات التوصيل" },
    ],
    core: "نواة المعاملات",
    coreDetail:
      "حجز ثم اعتماد للمخزون داخل معاملات MongoDB. يستحيل البيع الزائد مع الطلبات المتزامنة.",
    paymentDetail:
      "يحمل كل طلب ثلاثة التزامات دفع منفصلة: رسوم المنصة والبضاعة والشحن. تتم تسويتها عبر وسائل محلية مع رفع الإثبات، ولا تحتفظ المنصة بأموال التجار.",
  },
} as const;

/** Composition 03 — organization topology converging on a transactional core. */
export function SealsEntry({ project, locale }: { project: Project; locale: Locale }) {
  const copy = visualCopy[locale];

  return (
    <article className="border-t border-line py-14 md:py-20">
      <div className="grid gap-x-16 gap-y-6 md:grid-cols-[minmax(0,1fr)_22rem]">
        <div>
          <EntryIndex project={project} />
          <EntryTitle
            slug={project.slug}
            title={project.title}
            positioning={project.positioning}
          />
          <EntryHighlights items={project.highlights.slice(0, 4)} />
        </div>
        <p className="leading-relaxed text-muted md:pt-9">
          {project.summary}
        </p>
      </div>

      {/* Topology: three org types → transactional core */}
      <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1fr_auto_20rem]">
        <ul aria-label={copy.orgLabel} className="space-y-0 divide-y divide-line border-y border-line">
          {copy.orgTypes.map((org) => (
            <li
              key={org.role}
              className="flex items-baseline justify-between gap-4 py-3.5"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg">
                {org.role}
              </span>
              <span className="text-xs text-faint">{org.acts}</span>
            </li>
          ))}
        </ul>

        <p aria-hidden="true" className="hidden font-mono text-lg text-faint lg:block">
          <span className="directional-icon inline-block">→</span>
        </p>

        <div className="border border-accent/50 px-5 py-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
            {copy.core}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            {copy.coreDetail}
          </p>
        </div>
      </div>

      <p className="mt-6 max-w-xl text-xs leading-relaxed text-faint">
        {copy.paymentDetail}
      </p>

      <EntryTech items={project.technologies.slice(0, 6)} />
      <EntryLinks slug={project.slug} repository={project.repository} />
    </article>
  );
}
