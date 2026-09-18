import { ArrowUpRight, Code2, Facebook, MessageCircle } from "lucide-react";
import { site } from "@/data/site";
import { translations, type Locale } from "@/lib/i18n";

export function Contact({ locale }: { locale: Locale }) {
  const copy = translations[locale].contact;

  return (
    <section id="contact" className="contact-section border-t border-line">
      <div className="container-site py-24 md:py-32">
        <p className="eyebrow">07 / {copy.eyebrow}</p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_23rem] lg:items-end">
          <div>
            <h2 className="display-2 max-w-3xl text-balance">{copy.title}</h2>
            <p className="lede mt-6 max-w-2xl">{copy.body}</p>
          </div>

          <div className="grid gap-3">
            <ContactLink
              href={site.whatsapp.url}
              icon={MessageCircle}
              label={copy.whatsapp}
              detail={site.whatsapp.display}
              primary
            />
            <ContactLink href={site.facebook.url} icon={Facebook} label={copy.facebook} />
            <ContactLink href={site.github.url} icon={Code2} label={copy.github} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLink({
  href,
  icon: Icon,
  label,
  detail,
  primary = false,
}: {
  href: string;
  icon: typeof Code2;
  label: string;
  detail?: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={primary ? "contact-link contact-link-primary" : "contact-link"}
    >
      <span className="flex items-center gap-3">
        <Icon size={18} strokeWidth={1.7} />
        <span>
          <span className="block text-sm font-semibold">{label}</span>
          {detail ? <bdi className="mt-0.5 block text-xs opacity-75">{detail}</bdi> : null}
        </span>
      </span>
      <ArrowUpRight size={17} strokeWidth={1.7} />
    </a>
  );
}
