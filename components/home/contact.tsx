"use client";

import { Code2, MessageCircle, Users } from "lucide-react";
import { usePreferences } from "@/components/providers/preferences-provider";
import { ButtonLink } from "@/components/ui/button-link";
import { site } from "@/data/site";
import { translations } from "@/lib/i18n";

/** Contact channels are configured centrally in data/site.ts. */
export function Contact() {
  const { locale } = usePreferences();
  const copy = translations[locale].contact;

  return (
    <section id="contact" className="border-t border-line">
      <div className="container-site py-24 md:py-36">
        <p className="eyebrow">07 / {copy.eyebrow}</p>
        <h2 className="display-1 mt-8 max-w-3xl text-balance">
          {copy.title}
        </h2>
        <p className="lede mt-8 max-w-xl">
          {copy.body}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ButtonLink href={site.whatsapp.url} external>
            <MessageCircle size={17} strokeWidth={1.6} />
            {copy.whatsapp}
            <bdi className="font-mono text-xs">{site.whatsapp.display}</bdi>
          </ButtonLink>
          <ButtonLink href={site.facebook.url} variant="secondary" external>
            <Users size={17} strokeWidth={1.6} />
            {copy.facebook}
          </ButtonLink>
          <ButtonLink href={site.github.url} variant="secondary" external>
            <Code2 size={17} strokeWidth={1.6} />
            {copy.github}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
