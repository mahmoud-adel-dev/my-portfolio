import { Code2, Facebook, MessageCircle } from "lucide-react";
import { site } from "@/data/site";
import type { Locale, Translation } from "@/lib/i18n";

export function Footer({ copy, locale }: { copy: Translation; locale: Locale }) {
  return (
    <footer className="border-t border-line bg-surface/45">
      <div className="container-site flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="brand-mark size-9">{site.initials}</span>
            <div>
              <p className="text-sm font-semibold text-fg">{site.name}</p>
              <p className="mt-0.5 text-xs text-faint">{copy.footer.role}</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-xs leading-relaxed text-faint">
            © {new Date().getFullYear()} {site.name}. {locale === "ar" ? "مبني باستخدام Next.js وTypeScript." : "Built with Next.js and TypeScript."}
          </p>
        </div>

        <nav aria-label={copy.footer.navigationLabel} className="flex flex-wrap gap-3">
          <FooterLink href={site.github.url} label="GitHub" icon={Code2} />
          <FooterLink href={site.facebook.url} label={copy.contact.facebook} icon={Facebook} />
          <FooterLink
            href={site.whatsapp.url}
            label={copy.contact.whatsapp}
            icon={MessageCircle}
          />
        </nav>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: typeof Code2;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="social-pill">
      <Icon size={15} strokeWidth={1.7} />
      {label}
    </a>
  );
}
