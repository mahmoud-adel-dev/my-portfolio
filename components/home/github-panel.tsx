"use client";

import { ArrowUpRight } from "lucide-react";
import { usePreferences } from "@/components/providers/preferences-provider";
import { ButtonLink } from "@/components/ui/button-link";
import { site } from "@/data/site";
import { translations } from "@/lib/i18n";

/**
 * GitHub section — a quiet panel pointing at the source of truth.
 * The homepage never depends on the GitHub API; projects are curated locally.
 */
export function GithubPanel() {
  const { locale } = usePreferences();
  const copy = translations[locale].githubPanel;

  return (
    <section className="border-t border-line">
      <div className="container-site py-20 md:py-24">
        <div className="flex flex-col gap-8 border border-line bg-surface px-7 py-10 md:flex-row md:items-center md:justify-between md:px-12">
          <div className="max-w-xl">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
              {copy.title}
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              {copy.body}
            </p>
          </div>
          <ButtonLink href={site.github.url} variant="secondary" external className="shrink-0 self-start md:self-center">
            @{site.github.handle}
            <ArrowUpRight size={16} strokeWidth={1.5} />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
