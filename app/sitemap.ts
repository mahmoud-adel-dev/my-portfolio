import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { localePath, supportedLocales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", ...projects.map((project) => `projects/${project.slug}`)];

  return routes.flatMap((path) =>
    supportedLocales.map((locale) => ({
      url: new URL(localePath(locale, path), site.url).toString(),
      changeFrequency: "monthly" as const,
      priority: path ? 0.8 : 1,
      alternates: {
        languages: Object.fromEntries(
          supportedLocales.map((language) => [
            language,
            new URL(localePath(language, path), site.url).toString(),
          ]),
        ),
      },
    })),
  );
}
