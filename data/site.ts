import { resolveSiteUrl } from "@/lib/site-url";

const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL, {
  allowLocalProduction: process.env.ALLOW_LOCAL_SITE_URL === "true",
});

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
  contactEmail: "",
} as const;

export type Site = typeof site;
