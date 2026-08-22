import type { Metadata } from "next";
import { site } from "@/data/site";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Path without leading slash, or undefined for the homepage. */
  path?: string;
};

/** Builds consistent Metadata for a page, relative to the canonical site URL. */
export function buildMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const url = new URL(path ? `/${path}` : "/", site.url);

  return {
    title,
    description,
    alternates: { canonical: url.toString() },
    openGraph: {
      title,
      description,
      url: url.toString(),
      siteName: `${site.name} — ${site.role}`,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/** JSON-LD Person graph — only truthy, publicly verifiable fields. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    sameAs: [site.github.url],
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
