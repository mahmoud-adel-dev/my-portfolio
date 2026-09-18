"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { isLocale, localePath, translations } from "@/lib/i18n";

export default function NotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = isLocale(params.locale) ? params.locale : "en";
  const copy = translations[locale].notFound;

  return (
    <div className="container-site flex min-h-[72vh] flex-col items-start justify-center py-28">
      <p className="eyebrow">404</p>
      <h1 className="display-2 mt-6">{copy.title}</h1>
      <p className="mt-4 max-w-md leading-7 text-muted">{copy.body}</p>
      <Link href={localePath(locale)} className="link-arrow mt-9 text-sm font-semibold">
        <ArrowLeft size={15} strokeWidth={1.7} className="directional-icon" />
        {copy.back}
      </Link>
    </div>
  );
}
