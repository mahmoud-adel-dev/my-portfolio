"use client";

import Link from "next/link";
import { Dialog } from "@base-ui-components/react/dialog";
import { Code2, MessageCircle, Users, X } from "lucide-react";
import { usePreferences } from "@/components/providers/preferences-provider";
import { site } from "@/data/site";
import { translations } from "@/lib/i18n";

/**
 * Mobile navigation: a full-height overlay panel (Base UI dialog) rather than
 * a shrunken desktop bar. Focus trapping, Escape and backdrop click are
 * handled by the dialog primitive; links close it explicitly.
 */
export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { locale } = usePreferences();
  const copy = translations[locale];
  const primaryLinks = [
    { href: "/#work", label: copy.nav.selectedWork, meta: copy.nav.selectedWorkMeta },
    { href: "/#expertise", label: copy.nav.expertise, meta: copy.nav.expertiseMeta },
    { href: "/#about", label: copy.nav.about, meta: copy.nav.aboutMeta },
    { href: "/#contact", label: copy.nav.contact, meta: copy.nav.contactMeta },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm transition-opacity duration-200" />
        <Dialog.Popup className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background px-6 pt-4 pb-10 outline-none">
          <Dialog.Title className="sr-only">{copy.nav.menu}</Dialog.Title>

          <div className="mx-auto flex h-12 max-w-[74rem] items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-faint">
              {copy.nav.menu}
            </span>
            <Dialog.Close
              aria-label={copy.nav.closeMenu}
              className="flex size-9 items-center justify-center text-fg"
            >
              <X size={20} strokeWidth={1.5} />
            </Dialog.Close>
          </div>

          <nav aria-label={copy.nav.mobileLabel} className="mt-6">
            <ul className="divide-y divide-line border-y border-line">
              {primaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between"
                  >
                    <span className="text-2xl font-medium text-fg">
                      {link.label}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-faint">
                      {link.meta}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 text-sm">
              <a
                href={site.github.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="inline-flex items-center gap-2 text-fg transition-colors hover:text-accent"
              >
                <Code2 size={16} strokeWidth={1.6} />
                GitHub
              </a>
              <a
                href={site.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="inline-flex items-center gap-2 text-fg transition-colors hover:text-accent"
              >
                <Users size={16} strokeWidth={1.6} />
                {copy.contact.facebook}
              </a>
              <a
                href={site.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="inline-flex items-center gap-2 text-fg transition-colors hover:text-accent"
              >
                <MessageCircle size={16} strokeWidth={1.6} />
                {copy.contact.whatsapp}
              </a>
            </div>
          </nav>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
