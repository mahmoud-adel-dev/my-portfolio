"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePreferences } from "@/components/providers/preferences-provider";
import { ButtonLink } from "@/components/ui/button-link";
import { Diagram } from "@/components/projects/diagrams";
import { getAdjacentProjects, type Project } from "@/data/projects";
import { localizeProject } from "@/data/project-localizations";
import { translations } from "@/lib/i18n";

/**
 * Case-study body. A fixed editorial frame (label column + content column)
 * whose content is fully driven by the typed project data.
 */

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line">
      <div className="container-site grid gap-x-12 gap-y-6 py-14 md:grid-cols-[10rem_minmax(0,1fr)] md:py-16">
        <p className="eyebrow pt-1 md:text-end">{label}</p>
        <div className="max-w-3xl">{children}</div>
      </div>
    </section>
  );
}

export function CaseStudy({ project: sourceProject }: { project: Project }) {
  const { locale } = usePreferences();
  const copy = translations[locale].caseStudy;
  const project = localizeProject(sourceProject, locale);
  const cs = project.caseStudy;

  if (!cs) return null;

  return (
    <>
      {/* Header */}
      <header className="container-site pt-32 pb-14 md:pt-40 md:pb-20">
        <Link
          href="/#work"
          className="link-arrow -ml-0.5 font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft size={14} strokeWidth={1.5} className="directional-icon" />
          {copy.allWork}
        </Link>

        <div className="mt-10 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <span aria-hidden="true" className="font-mono text-sm text-accent">
            {project.index}
          </span>
          {project.status ? (
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
              {project.status}
            </span>
          ) : null}
        </div>

        <h1 className="display-1 mt-4 max-w-4xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          {project.positioning}
        </p>

        <p className="lede mt-8 max-w-2xl">{cs.intro}</p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <ButtonLink href={project.repository} external>
            {copy.viewRepository}
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </ButtonLink>
        </div>
      </header>

      <Block label={copy.context}>
        <div className="space-y-5 leading-relaxed text-muted">
          {cs.context.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </Block>

      <Block label={copy.overview}>
        <p className="leading-relaxed text-muted">{cs.overview}</p>
      </Block>

      <Block label={copy.challenges}>
        <ol className="space-y-8">
          {cs.challenges.map((challenge, i) => (
            <li key={challenge.title} className="grid gap-x-8 gap-y-2 sm:grid-cols-[3rem_1fr]">
              <span aria-hidden="true" className="font-mono text-xs text-accent sm:pt-1.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-base font-semibold text-fg">
                  {challenge.title}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                  {challenge.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Block>

      <Block label={copy.architecture}>
        <p className="max-w-2xl leading-relaxed text-muted">{cs.architecture.summary}</p>
        <div className="mt-8">
          <Diagram
            id={cs.architecture.diagram}
            caption={`${copy.diagramCaption} — ${project.title}`}
          />
        </div>
        <ul className="mt-8 space-y-3 border-l border-line pl-5">
          {cs.architecture.notes.map((note) => (
            <li key={note.slice(0, 32)} className="text-sm leading-relaxed text-faint">
              {note}
            </li>
          ))}
        </ul>
      </Block>

      <Block label={copy.features}>
        <div className="space-y-8">
          {cs.featureGroups.map((group) => (
            <div key={group.label}>
              <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-fg">
                {group.label}
              </h2>
              <ul className="mt-3 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.slice(0, 32)} className="flex items-baseline gap-3 text-sm leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-[9px] size-1 shrink-0 bg-accent/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Block>

      <Block label={copy.decisions}>
        <div className="space-y-7">
          {cs.decisions.map((decision) => (
            <div key={decision.title}>
              <h2 className="text-base font-semibold text-fg">
                {decision.title}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                {decision.detail}
              </p>
            </div>
          ))}
        </div>
      </Block>

      <Block label={copy.builtWith}>
        <dl className="border-t border-line">
          {cs.stack.map((group) => (
            <div
              key={group.label}
              className="grid gap-x-8 gap-y-1 border-b border-line py-5 md:grid-cols-[11rem_minmax(0,1fr)] md:items-baseline"
            >
              <dt className="text-sm font-semibold text-fg">
                {group.label}
              </dt>
              <dd className="text-sm leading-loose text-muted">
                {group.items.join("  ·  ")}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-10">
          <ButtonLink href={project.repository} variant="secondary" external>
            {copy.viewRepository}
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </ButtonLink>
        </div>
      </Block>

      <ProjectNav currentSlug={project.slug} />
    </>
  );
}

/* -------------------------------------------------------------------------- */

function ProjectNav({ currentSlug }: { currentSlug: string }) {
  const { locale } = usePreferences();
  const copy = translations[locale].caseStudy;
  const { next } = getAdjacentProjects(currentSlug);

  if (!next) return null;
  const localizedNext = localizeProject(next, locale);

  return (
    <nav aria-label={copy.nextLabel} className="border-t border-line">
      <Link
        href={`/projects/${localizedNext.slug}`}
        className="group container-site flex items-center justify-between gap-6 py-12 md:py-16"
      >
        <div>
          <p className="eyebrow">{copy.next}</p>
          <p className="mt-3 text-2xl font-semibold text-fg transition-colors group-hover:text-accent md:text-3xl">
            {localizedNext.title}
          </p>
          <p className="mt-2 hidden max-w-md text-sm text-muted md:block">
            {localizedNext.positioning}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="flex size-11 shrink-0 items-center justify-center border border-line-strong transition-colors group-hover:border-accent group-hover:text-accent"
        >
          <ArrowRight size={18} strokeWidth={1.5} className="directional-icon" />
        </span>
      </Link>
    </nav>
  );
}
