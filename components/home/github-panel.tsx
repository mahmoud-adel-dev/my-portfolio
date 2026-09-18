import { ArrowUpRight, Braces, GitBranch, TerminalSquare } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { site } from "@/data/site";
import { translations, type Locale } from "@/lib/i18n";

export function GithubPanel({ locale }: { locale: Locale }) {
  const copy = translations[locale].githubPanel;

  return (
    <section className="border-t border-line">
      <div className="container-site py-20 md:py-24">
        <div className="github-panel grid gap-10 p-7 md:grid-cols-[minmax(0,1fr)_18rem] md:items-center md:p-10">
          <div className="max-w-2xl">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 className="mt-4 text-2xl font-semibold text-balance md:text-3xl">{copy.title}</h2>
            <p className="mt-4 max-w-xl leading-7 text-muted">{copy.body}</p>
            <div className="mt-7">
              <ButtonLink href={site.github.url} variant="secondary" external>
                @{site.github.handle}
                <ArrowUpRight size={16} strokeWidth={1.7} />
              </ButtonLink>
            </div>
          </div>

          <div aria-hidden="true" className="github-visual">
            <span><TerminalSquare size={18} /> repositories</span>
            <span><GitBranch size={18} /> CI / deployment</span>
            <span><Braces size={18} /> typed systems</span>
          </div>
        </div>
      </div>
    </section>
  );
}
