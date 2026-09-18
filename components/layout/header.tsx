"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PreferenceControls } from "@/components/layout/preference-controls";
import { site } from "@/data/site";
import { localePath, type Locale, type Translation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type HeaderProps = {
  locale: Locale;
  copy: Translation;
};

export function Header({ locale, copy }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const links = [
    { href: `${localePath(locale)}#work`, label: copy.nav.work },
    { href: `${localePath(locale)}#expertise`, label: copy.nav.expertise },
    { href: `${localePath(locale)}#about`, label: copy.nav.about },
    { href: `${localePath(locale)}#contact`, label: copy.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color] duration-200",
        scrolled || navOpen
          ? "border-line bg-background/92 backdrop-blur-xl"
          : "border-transparent bg-background/70 backdrop-blur-sm",
      )}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between">
        <Link
          href={localePath(locale)}
          className="group flex min-w-0 items-center gap-3"
          aria-label={`${site.name} — ${locale === "ar" ? "الرئيسية" : "home"}`}
        >
          <span aria-hidden="true" className="brand-mark">
            {site.initials}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-fg">{site.name}</span>
            <span className="hidden text-[11px] text-faint sm:block">Full-Stack · AI · SaaS</span>
          </span>
        </Link>

        <nav aria-label={copy.nav.primaryLabel} className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
          <span aria-hidden="true" className="h-5 w-px bg-line" />
          <PreferenceControls locale={locale} copy={copy.nav} />
          <a
            href={site.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="github-handle"
          >
            @{site.github.handle}
          </a>
        </nav>

        <div className="flex items-center gap-1.5 lg:hidden">
          <PreferenceControls locale={locale} copy={copy.nav} compact />
          <button
            type="button"
            onClick={() => setNavOpen(true)}
            aria-label={copy.nav.openMenu}
            aria-expanded={navOpen}
            className="control-button size-9"
          >
            <Menu size={20} strokeWidth={1.7} />
          </button>
        </div>
      </div>

      <MobileNav
        open={navOpen}
        onClose={() => setNavOpen(false)}
        locale={locale}
        copy={copy}
      />
    </header>
  );
}
