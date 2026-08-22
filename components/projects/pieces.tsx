"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Code2 } from "lucide-react";
import { ProjectIcon } from "@/components/projects/project-icon";
import { usePreferences } from "@/components/providers/preferences-provider";
import type { Project } from "@/data/projects";
import { translations } from "@/lib/i18n";

/**
 * Small building blocks shared by the four work previews on the homepage.
 * Each preview composes them differently — the pieces stay quiet so the
 * compositions can differ.
 */

export function EntryIndex({ project }: { project: Project }) {
  return (
    <div className="flex items-baseline justify-between gap-6">
      <p className="font-mono text-sm text-faint" aria-hidden="true">
        {project.index}
      </p>
      {project.status ? (
        <p className="text-right font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
          {project.status}
        </p>
      ) : null}
    </div>
  );
}

export function EntryTitle({
  slug,
  title,
  positioning,
}: {
  slug: string;
  title: string;
  positioning: string;
}) {
  return (
    <h3 className="mt-3">
      <Link
        href={`/projects/${slug}`}
        className="group grid max-w-3xl grid-cols-[auto_minmax(0,1fr)] items-start gap-4"
      >
        <ProjectIcon id={slug} />
        <span className="min-w-0 pt-0.5">
          <span className="block text-2xl font-semibold text-fg transition-colors group-hover:text-accent md:text-3xl">
            {title}
          </span>
          <span className="mt-1.5 block font-mono text-[11px] uppercase tracking-[0.12em] text-faint transition-colors group-hover:text-muted">
            {positioning}
          </span>
        </span>
      </Link>
    </h3>
  );
}

export function EntrySummary({ children }: { children: string }) {
  return (
    <p className="mt-4 max-w-xl leading-relaxed text-muted">{children}</p>
  );
}

/** Compact capability list with scannable status icons. */
export function EntryHighlights({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid max-w-2xl gap-x-5 gap-y-2.5 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-xs leading-relaxed text-muted">
          <CheckCircle2
            aria-hidden="true"
            size={14}
            strokeWidth={1.7}
            className="mt-0.5 shrink-0 text-accent"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function EntryTech({ items }: { items: string[] }) {
  return (
    <p className="mt-4 text-xs leading-relaxed text-faint">
      {items.join(" · ")}
    </p>
  );
}

export function EntryLinks({ slug, repository }: { slug: string; repository: string }) {
  const { locale } = usePreferences();
  const copy = translations[locale].projectActions;

  return (
    <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
      <Link href={`/projects/${slug}`} className="link-arrow text-sm font-medium">
        {copy.readCaseStudy}
        <ArrowRight size={15} strokeWidth={1.5} className="directional-icon" />
      </Link>
      <a
        href={repository}
        target="_blank"
        rel="noopener noreferrer"
        className="link-arrow text-sm"
      >
        <Code2 size={15} strokeWidth={1.5} />
        {copy.viewRepository}
        <ArrowUpRight size={15} strokeWidth={1.5} />
      </a>
    </div>
  );
}
