import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/projects/case-study";
import { getProject, projects } from "@/data/projects";
import { localizeProject } from "@/data/project-localizations";
import { isLocale, supportedLocales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return supportedLocales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const sourceProject = getProject(slug);
  if (!isLocale(locale) || !sourceProject) return {};

  const project = localizeProject(sourceProject, locale);
  return buildMetadata({
    title: `${project.title} — ${project.positioning}`,
    description: project.summary,
    locale,
    path: `projects/${project.slug}`,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project?.caseStudy) notFound();

  return <CaseStudy project={project} locale={locale} />;
}
