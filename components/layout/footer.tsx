"use client";

import { Code2, MessageCircle, Users } from "lucide-react";
import { usePreferences } from "@/components/providers/preferences-provider";
import { site } from "@/data/site";
import { translations } from "@/lib/i18n";

export function Footer() {
  const year = new Date().getFullYear();
  const { locale } = usePreferences();
  const copy = translations[locale];

  return (
    <footer className="border-t border-line">
      <div className="container-site flex flex-col gap-6 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-fg">{site.name}</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            {copy.footer.role}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <nav aria-label={copy.footer.navigationLabel} className="flex flex-wrap items-center gap-4">
            <a
              href={site.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-fg transition-colors hover:text-accent"
            >
              <Code2 size={15} strokeWidth={1.6} />
              GitHub
            </a>
            <a
              href={site.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-fg transition-colors hover:text-accent"
            >
              <Users size={15} strokeWidth={1.6} />
              {copy.contact.facebook}
            </a>
            <a
              href={site.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-fg transition-colors hover:text-accent"
            >
              <MessageCircle size={15} strokeWidth={1.6} />
              {copy.contact.whatsapp}
            </a>
          </nav>
          <p className="font-mono text-[11px] tracking-wide text-faint">
            © {year}
          </p>
        </div>
      </div>
    </footer>
  );
}
