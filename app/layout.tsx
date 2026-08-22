import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/layout/skip-link";
import { PreferencesProvider } from "@/components/providers/preferences-provider";
import { site } from "@/data/site";
import { personJsonLd } from "@/lib/metadata";

import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
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
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: `${site.name} — ${site.role}`,
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0d" },
    { media: "(prefers-color-scheme: light)", color: "#f6f7f8" },
  ],
  colorScheme: "light dark",
};

const preferencesScript = `
  (() => {
    try {
      const root = document.documentElement;
      const savedTheme = localStorage.getItem("portfolio-theme");
      const savedLocale = localStorage.getItem("portfolio-locale");
      const theme = savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
      const locale = savedLocale === "ar" ? "ar" : "en";
      root.dataset.theme = theme;
      root.lang = locale;
      root.dir = locale === "ar" ? "rtl" : "ltr";
    } catch {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: preferencesScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <PreferencesProvider>
          <SkipLink />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </PreferencesProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
      </body>
    </html>
  );
}
