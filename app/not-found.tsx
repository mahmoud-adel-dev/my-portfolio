"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePreferences } from "@/components/providers/preferences-provider";
import { translations } from "@/lib/i18n";

export default function NotFound() {
  const { locale } = usePreferences();
  const copy = translations[locale].notFound;

  return (
    <div className="container-site flex min-h-[70vh] flex-col items-start justify-center py-24">
      <p className="eyebrow">404</p>
      <h1 className="display-2 mt-6">{copy.title}</h1>
      <p className="mt-4 max-w-md leading-relaxed text-muted">
        {copy.body}
      </p>
      <Link href="/" className="link-arrow mt-10 text-sm font-medium">
        <ArrowLeft size={15} strokeWidth={1.5} className="directional-icon" />
        {copy.back}
      </Link>
    </div>
  );
}
