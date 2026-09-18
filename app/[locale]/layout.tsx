import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SkipLink } from "@/components/layout/skip-link";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { site } from "@/data/site";
import {
  isLocale,
  localePath,
  supportedLocales,
  translations,
  type Locale,
} from "@/lib/i18n";
import { buildMetadata, personJsonLd } from "@/lib/metadata";

import "@fontsource-variable/noto-sans-arabic";
import "@/styles/globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: candidate } = await params;
  const locale: Locale = isLocale(candidate) ? candidate : "en";
  const copy = translations[locale];
  const title = locale === "ar" ? `محمود عادل — ${copy.hero.role}` : `${site.name} — ${site.role}`;
  const base = buildMetadata({ title, description: copy.hero.lede, locale });

  return {
    ...base,
    metadataBase: new URL(site.url),
    title: {
      default: title,
      template: locale === "ar" ? `%s — محمود عادل` : `%s — ${site.name}`,
    },
    authors: [{ name: site.name, url: site.github.url }],
    creator: site.name,
    keywords: [
      "full-stack engineer",
      "AI SaaS engineer",
      "multi-tenant architecture",
      "RAG",
      "AI agents",
      "Next.js",
      "TypeScript",
      "Flutter",
      "MongoDB",
      "مهندس برمجيات",
      "منصات SaaS",
    ],
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0d0f" },
    { media: "(prefers-color-scheme: light)", color: "#f4f6f8" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: candidate } = await params;
  if (!isLocale(candidate)) notFound();

  const locale = candidate;
  const copy = translations[locale];
  const jsonLd = JSON.stringify(personJsonLd(locale)).replace(/</g, "\\u003c");

  return (
    <html
      lang={locale}
      dir={copy.direction}
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <SkipLink label={copy.skipToContent} />
          <Header locale={locale} copy={copy} />
          <main id="main" className="flex-1">{children}</main>
          <Footer copy={copy} locale={locale} />
        </ThemeProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </body>
    </html>
  );
}
