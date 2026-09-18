import { ArrowUpRight } from "lucide-react";
import { ProjectIcon } from "@/components/projects/project-icon";
import { Section } from "@/components/ui/section";
import { secondaryProjects } from "@/data/projects";
import { localizeSecondaryProjects } from "@/data/project-localizations";
import { site } from "@/data/site";
import { translations, type Locale } from "@/lib/i18n";

export function MoreProjects({ locale }: { locale: Locale }) {
  const copy = translations[locale].moreProjects;
  const localizedProjects = localizeSecondaryProjects(secondaryProjects, locale);

  return (
    <Section index="02" eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead}>
      <div className="grid gap-4 md:grid-cols-3">
        {localizedProjects.map((project) => (
          <a
            key={project.title}
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-project group"
          >
            <div className="flex items-start justify-between gap-5">
              <ProjectIcon id={project.icon} />
              <ArrowUpRight
                size={17}
                strokeWidth={1.6}
                className="text-faint transition-[color,translate] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-fg transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>
            <p className="mt-5 text-[11px] leading-relaxed text-faint">{project.stack}</p>
          </a>
        ))}
      </div>

      <a
        href={site.github.url}
        target="_blank"
        rel="noopener noreferrer"
        className="link-arrow mt-8 text-sm font-semibold"
      >
        {copy.history}
        <ArrowUpRight size={15} strokeWidth={1.7} />
      </a>
    </Section>
  );
}
