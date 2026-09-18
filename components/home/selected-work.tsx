import { ProjectCard } from "@/components/projects/project-card";
import { Section } from "@/components/ui/section";
import { projects } from "@/data/projects";
import { localizeProjects } from "@/data/project-localizations";
import { translations, type Locale } from "@/lib/i18n";

export function SelectedWork({ locale }: { locale: Locale }) {
  const copy = translations[locale];
  const localizedProjects = localizeProjects(projects, locale);

  return (
    <Section
      id="work"
      index="01"
      eyebrow={copy.selectedWork.eyebrow}
      title={copy.selectedWork.title}
      lead={copy.selectedWork.lead}
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {localizedProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            locale={locale}
            actions={copy.projectActions}
          />
        ))}
      </div>
    </Section>
  );
}
