"use client";

import Link from "next/link";
import { Dialog } from "@base-ui/react/dialog";
import { Code2, Facebook, MessageCircle, X } from "lucide-react";
import { site } from "@/data/site";
import { localePath, type Locale, type Translation } from "@/lib/i18n";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  copy: Translation;
};

export function MobileNav({ open, onClose, locale, copy }: MobileNavProps) {
  const primaryLinks = [
    {
      href: `${localePath(locale)}#work`,
      label: copy.nav.selectedWork,
      meta: copy.nav.selectedWorkMeta,
    },
    {
      href: `${localePath(locale)}#expertise`,
      label: copy.nav.expertise,
      meta: copy.nav.expertiseMeta,
    },
    {
      href: `${localePath(locale)}#about`,
      label: copy.nav.about,
      meta: copy.nav.aboutMeta,
    },
    {
      href: `${localePath(locale)}#contact`,
      label: copy.nav.contact,
      meta: copy.nav.contactMeta,
    },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm transition-opacity" />
        <Dialog.Popup className="fixed inset-x-0 top-0 z-50 max-h-[100svh] overflow-y-auto border-b border-line bg-background px-5 pt-4 pb-10 outline-none sm:px-8">
          <Dialog.Title className="sr-only">{copy.nav.menu}</Dialog.Title>

          <div className="mx-auto flex h-12 max-w-[80rem] items-center justify-between">
            <span className="eyebrow">{copy.nav.menu}</span>
            <Dialog.Close aria-label={copy.nav.closeMenu} className="control-button size-9">
              <X size={20} strokeWidth={1.7} />
            </Dialog.Close>
          </div>

          <nav aria-label={copy.nav.mobileLabel} className="mx-auto mt-7 max-w-[80rem]">
            <ul className="border-y border-line">
              {primaryLinks.map((link) => (
                <li key={link.href} className="border-b border-line last:border-b-0">
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="group flex flex-col gap-1.5 py-5 sm:flex-row sm:items-baseline sm:justify-between"
                  >
                    <span className="text-2xl font-semibold text-fg transition-colors group-hover:text-accent">
                      {link.label}
                    </span>
                    <span className="eyebrow">{link.meta}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <SocialLink href={site.github.url} icon={Code2} label="GitHub" />
              <SocialLink href={site.facebook.url} icon={Facebook} label={copy.contact.facebook} />
              <SocialLink
                href={site.whatsapp.url}
                icon={MessageCircle}
                label={copy.contact.whatsapp}
              />
            </div>
          </nav>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: typeof Code2;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="social-pill"
    >
      <Icon size={16} strokeWidth={1.7} />
      {label}
    </a>
  );
}
