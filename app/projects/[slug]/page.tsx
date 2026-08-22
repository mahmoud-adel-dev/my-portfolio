import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/projects/case-study";
import { projects, getProject } from "@/data/projects";
import { buildMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return buildMetadata({
    title: `${project.title} — ${project.positioning}`,
    description: project.summary,
    path: `projects/${project.slug}`,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project || !project.caseStudy) notFound();

  return <CaseStudy project={project} />;
}
