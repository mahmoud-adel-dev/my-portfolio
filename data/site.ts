/**
 * Central site configuration.
 *
 * NEXT_PUBLIC_SITE_URL — canonical production origin (used for metadata,
 * Open Graph, sitemap and robots). Falls back to localhost in development.
 * Set it in `.env.local` / the hosting provider before deploying.
 *
 * contactEmail — intentionally empty until a real address is provided.
 * The contact section renders it only when non-empty; no fake data is shown.
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const site = {
  name: "Mahmoud Adel",
  shortName: "Mahmoud",
  initials: "MA",
  role: "Full-Stack & AI SaaS Engineer",
  tagline:
    "I design and build scalable SaaS products, AI-powered platforms, and production-ready business systems.",
  url: siteUrl,
  github: {
    handle: "mahmoud-adel-dev",
    url: "https://github.com/mahmoud-adel-dev",
  },
  facebook: {
    label: "Facebook",
    url: "https://www.facebook.com/adelvipp555",
  },
  whatsapp: {
    display: "011 4055 8803",
    url: "https://wa.me/201140558803",
  },
  /**
   * Replace with a real address to enable email links in the contact section.
   */
  contactEmail: "",
} as const;

export type Site = typeof site;
