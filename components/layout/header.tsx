"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PreferenceControls } from "@/components/layout/preference-controls";
import { usePreferences } from "@/components/providers/preferences-provider";
import { site } from "@/data/site";
import { translations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const { locale } = usePreferences();
  const copy = translations[locale].nav;
  const links = [
    { href: "/#work", label: copy.work },
    { href: "/#expertise", label: copy.expertise },
    { href: "/#about", label: copy.about },
    { href: "/#contact", label: copy.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-300",
        scrolled || navOpen
          ? "border-b border-line bg-background/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="container-site flex h-16 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={`${site.name} — ${locale === "ar" ? "الرئيسية" : "home"}`}
        >
          <span
            aria-hidden="true"
            className="flex size-8 items-center justify-center border border-line-strong font-mono text-xs tracking-widest text-fg transition-colors group-hover:border-accent group-hover:text-accent"
          >
            {site.initials}
          </span>
          <span className="hidden text-sm font-medium text-fg sm:block">
            {site.name}
          </span>
        </Link>

        <nav aria-label={copy.primaryLabel} className="hidden items-center gap-5 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              {link.label}
            </Link>
          ))}
          <PreferenceControls />
          <a
            href={site.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-line-strong px-3 py-1.5 font-mono text-xs text-fg transition-colors hover:border-accent hover:text-accent"
          >
            @{site.github.handle}
          </a>
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          <PreferenceControls compact />
          <button
            type="button"
            onClick={() => setNavOpen(true)}
            aria-label={copy.openMenu}
            aria-expanded={navOpen}
            className="flex size-9 items-center justify-center text-fg"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <MobileNav open={navOpen} onClose={() => setNavOpen(false)} />
    </header>
  );
}
