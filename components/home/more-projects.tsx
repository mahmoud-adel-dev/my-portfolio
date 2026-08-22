"use client";

import { ArrowUpRight } from "lucide-react";
import { ProjectIcon } from "@/components/projects/project-icon";
import { usePreferences } from "@/components/providers/preferences-provider";
import { Section } from "@/components/ui/section";
import { secondaryProjects } from "@/data/projects";
import { localizeSecondaryProjects } from "@/data/project-localizations";
import { translations } from "@/lib/i18n";

/**
 * Quieter index for the rest of the repository list — an editorial table,
 * not another set of cards.
 */
export function MoreProjects() {
  const { locale } = usePreferences();
  const copy = translations[locale].moreProjects;
  const localizedProjects = localizeSecondaryProjects(secondaryProjects, locale);

  return (
    <Section
      index="02"
      eyebrow={copy.eyebrow}
      title={copy.title}
      lead={copy.lead}
    >
      <ul className="border-t border-line">
        {localizedProjects.map((project) => (
          <li key={project.title} className="border-b border-line">
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 py-6 transition-colors hover:bg-surface/60 md:grid-cols-[3rem_14rem_minmax(0,1fr)_auto] md:items-center md:gap-x-6 md:px-4"
            >
              <ProjectIcon id={project.icon} className="size-10" size={18} />
              <span className="self-center text-sm font-medium text-fg transition-colors group-hover:text-accent">
                {project.title}
              </span>
              <span className="col-start-2 max-w-2xl text-sm leading-relaxed text-muted md:col-start-auto">
                {project.description}
              </span>
              <span className="col-start-2 flex items-center justify-between gap-6 md:col-start-auto md:justify-start">
                <span className="hidden font-mono text-[11px] uppercase tracking-[0.08em] text-faint lg:block">
                  {project.stack}
                </span>
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.5}
                  className="shrink-0 text-faint transition-[color,translate] duration-150 group-hover:-translate-y-0.5 group-hover:text-accent"
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
        {copy.history}: github.com/mahmoud-adel-dev
      </p>
    </Section>
  );
}
