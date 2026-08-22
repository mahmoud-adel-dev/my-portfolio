"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { usePreferences } from "@/components/providers/preferences-provider";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { translations } from "@/lib/i18n";

export function Hero() {
  const { locale } = usePreferences();
  const copy = translations[locale].hero;

  return (
    <section className="relative">
      <div className="container-site pt-28 pb-12 md:pt-36 md:pb-20">
        <Reveal>
          <p className="eyebrow flex flex-wrap items-center gap-3">
            {copy.disciplines[0]}
            <span aria-hidden="true" className="text-accent">/</span>
            {copy.disciplines[1]}
            <span aria-hidden="true" className="text-accent">/</span>
            {copy.disciplines[2]}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1
            className={`display-1 mt-6 text-balance ${
              locale === "ar" ? "max-w-5xl" : "max-w-4xl"
            }`}
          >
            {copy.name}
            <br />
            <span className="text-muted">
              {copy.role}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="lede mt-6 max-w-xl md:mt-7">
            {copy.lede}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-9">
            <ButtonLink href="/#work">
              {copy.explore}
              <ArrowDown size={16} strokeWidth={1.5} />
            </ButtonLink>
            <ButtonLink href={site.github.url} variant="secondary" external>
              {copy.github}
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </ButtonLink>
          </div>
        </Reveal>
      </div>

      {/* Live index of what is being built — real repositories, not decoration */}
      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-8">
          <p className="eyebrow shrink-0">{copy.currentlyBuilding}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label={copy.activeProjectsLabel}>
            {projects.map((project) => (
              <li key={project.slug} className="font-mono text-xs text-muted">
                <a
                  href={`/projects/${project.slug}`}
                  className="transition-colors hover:text-accent"
                >
                  {project.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
