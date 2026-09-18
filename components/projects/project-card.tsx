import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { ProjectIcon } from "@/components/projects/project-icon";
import { ProjectPreview } from "@/components/projects/project-preview";
import type { Project } from "@/data/projects";
import { localePath, type Locale, type Translation } from "@/lib/i18n";

export function ProjectCard({
  project,
  locale,
  actions,
}: {
  project: Project;
  locale: Locale;
  actions: Translation["projectActions"];
}) {
  const caseStudyHref = localePath(locale, `projects/${project.slug}`);

  return (
    <article className="project-card group" data-project={project.slug}>
      <ProjectPreview slug={project.slug} locale={locale} />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <ProjectIcon id={project.slug} className="size-10" size={18} />
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-semibold text-faint">{project.index}</p>
              <h3 className="mt-0.5 truncate text-xl font-semibold text-fg">{project.title}</h3>
            </div>
          </div>
          <span className="status-dot mt-2 size-2 shrink-0 rounded-full" title={project.status} />
        </div>

        <p className="mt-3 text-xs font-semibold leading-relaxed text-project-accent">
          {project.positioning}
        </p>
        <p className="mt-4 text-sm leading-6 text-muted">{project.summary}</p>

        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {project.highlights.slice(0, 4).map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-muted">
              <Check size={13} strokeWidth={2} className="mt-0.5 shrink-0 text-project-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-1.5" aria-label={project.technologies.join(", ")}>
          {project.technologies.slice(0, 5).map((technology) => (
            <span key={technology} className="tech-tag">{technology}</span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7">
          <Link href={caseStudyHref} className="link-arrow text-sm font-semibold">
            {actions.readCaseStudy}
            <ArrowRight size={15} strokeWidth={1.7} className="directional-icon" />
          </Link>
          <a
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow text-sm text-muted"
          >
            {actions.viewRepository}
            <ArrowUpRight size={15} strokeWidth={1.7} />
          </a>
        </div>
      </div>
    </article>
  );
}
