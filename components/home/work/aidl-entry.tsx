import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import type { Locale } from "@/lib/i18n";
import {
  EntryHighlights,
  EntryIndex,
  EntryLinks,
  EntryTitle,
} from "@/components/projects/pieces";

type PipelineStep = {
  label: string;
  note: string;
  strong?: boolean;
  dashed?: boolean;
};

type AidlVisualCopy = {
  thesis: string;
  thesisAccent: string;
  lifecycle: string;
  pipeline: PipelineStep[];
};

const visualCopy: Record<Locale, AidlVisualCopy> = {
  en: {
    thesis: "Python computes.",
    thesisAccent: "AI explains.",
    lifecycle: "Analysis lifecycle",
    pipeline: [
      { label: "Upload dataset", note: "CSV · XLSX · JSON" },
      { label: "Validate & profile", note: "Schema · quality findings" },
      { label: "Deterministic engine", note: "Polars · SciPy · sklearn", strong: true },
      { label: "Contract check", note: "Zod-validated result" },
      { label: "AI narrative", note: "optional · guarded", dashed: true },
    ],
  },
  ar: {
    thesis: "Python يحسب.",
    thesisAccent: "الذكاء الاصطناعي يشرح.",
    lifecycle: "دورة التحليل",
    pipeline: [
      { label: "رفع البيانات", note: "CSV · XLSX · JSON" },
      { label: "التحقق والفحص", note: "Schema · نتائج الجودة" },
      { label: "المحرك الحتمي", note: "Polars · SciPy · sklearn", strong: true },
      { label: "فحص العقد", note: "نتيجة متحققة عبر Zod" },
      { label: "الشرح الذكي", note: "اختياري · محروس", dashed: true },
    ],
  },
};

/** Composition 02 — manifesto + pipeline strip. */
export function AidlEntry({ project, locale }: { project: Project; locale: Locale }) {
  const copy = visualCopy[locale];

  return (
    <article className="border-t border-line py-14 md:py-20">
      <EntryIndex project={project} />

      <div className="mt-3 grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div>
          <EntryTitle
            slug={project.slug}
            title={project.title}
            positioning={project.positioning}
          />
        </div>
        <p className="max-w-sm leading-relaxed text-muted lg:pt-1">
          {project.summary}
        </p>
      </div>

      {/* The thesis, set large */}
      <p className="display-2 mt-14 max-w-3xl">
        {copy.thesis}
        <br />
        <span className="text-muted">{copy.thesisAccent}</span>
      </p>

      {/* Analysis pipeline */}
      <ol
        aria-label={copy.lifecycle}
        className="mt-12 flex flex-wrap items-stretch gap-y-4"
      >
        {copy.pipeline.map((step, i) => (
          <li key={step.label} className="flex items-center">
            {i > 0 ? (
              <ArrowRight
                aria-hidden="true"
                size={14}
                strokeWidth={1.5}
                className="directional-icon mx-3 shrink-0 text-faint md:mx-4"
              />
            ) : null}
            <div
              className={`border px-4 py-3 ${
                step.strong
                  ? "border-line-strong bg-surface"
                  : step.dashed
                    ? "border-dashed border-line"
                    : "border-line"
              }`}
            >
              <p
                className={`font-mono text-[11px] uppercase tracking-[0.12em] ${
                  step.dashed ? "text-faint" : "text-fg"
                }`}
              >
                {step.label}
              </p>
              <p className="mt-1 text-[11px] text-faint">{step.note}</p>
            </div>
          </li>
        ))}
      </ol>

      <EntryHighlights items={project.highlights.slice(0, 5)} />
      <EntryLinks slug={project.slug} repository={project.repository} />
    </article>
  );
}
