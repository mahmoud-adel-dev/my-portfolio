"use client";

import { Section } from "@/components/ui/section";
import { usePreferences } from "@/components/providers/preferences-provider";
import { projects } from "@/data/projects";
import { localizeProjects } from "@/data/project-localizations";
import { translations } from "@/lib/i18n";
import { ChatziEntry } from "@/components/home/work/chatzi-entry";
import { AidlEntry } from "@/components/home/work/aidl-entry";
import { SealsEntry } from "@/components/home/work/seals-entry";
import { LumoraEntry } from "@/components/home/work/lumora-entry";

const compositions = {
  chatzi: ChatziEntry,
  aidl: AidlEntry,
  seals: SealsEntry,
  lumora: LumoraEntry,
} as const;

export function SelectedWork() {
  const { locale } = usePreferences();
  const copy = translations[locale].selectedWork;
  const localizedProjects = localizeProjects(projects, locale);

  return (
    <Section
      id="work"
      index="01"
      eyebrow={copy.eyebrow}
      title={copy.title}
      lead={copy.lead}
    >
      <div>
        {localizedProjects.map((project) => {
          const Entry = compositions[project.slug as keyof typeof compositions];
          return <Entry key={project.slug} project={project} locale={locale} />;
        })}
      </div>
    </Section>
  );
}
