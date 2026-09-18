import type { Metadata } from "next";
import { site } from "@/data/site";
import { localePath, type Locale } from "@/lib/i18n";

type PageMetadataInput = {
  title: string;
  description: string;
  locale: Locale;
  path?: string;
};

export function buildMetadata({
  title,
  description,
  locale,
  path = "",
}: PageMetadataInput): Metadata {
  const localizedPath = localePath(locale, path);
  const alternatePath = localePath(locale === "en" ? "ar" : "en", path);
  const canonical = new URL(localizedPath, site.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        [locale]: canonical,
        [locale === "en" ? "ar" : "en"]: new URL(alternatePath, site.url).toString(),
        "x-default": new URL(localePath("en", path), site.url).toString(),
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: `${site.name} — ${site.role}`,
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_EG"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function personJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: locale === "ar" ? "محمود عادل" : site.name,
    jobTitle:
      locale === "ar"
        ? "مهندس برمجيات متكامل ومنصات SaaS بالذكاء الاصطناعي"
        : site.role,
    url: new URL(localePath(locale), site.url).toString(),
    sameAs: [site.github.url, site.facebook.url],
    knowsAbout: [
      "Full-stack engineering",
      "SaaS architecture",
      "Multi-tenant systems",
      "Retrieval-augmented generation",
      "AI agents",
      "Next.js",
      "TypeScript",
      "MongoDB",
      "Flutter",
    ],
  };
}
