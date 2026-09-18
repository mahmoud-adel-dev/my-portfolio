import { ImageResponse } from "next/og";
import { getProject } from "@/data/projects";
import { localizeProject } from "@/data/project-localizations";
import { isLocale } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project case study";

export default async function ProjectOgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: candidate, slug } = await params;
  const locale = isLocale(candidate) ? candidate : "en";
  const sourceProject = getProject(slug);
  const project = sourceProject ? localizeProject(sourceProject, locale) : undefined;
  const isArabic = locale === "ar";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0c0d0f",
          color: "#f2f4f5",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          direction: isArabic ? "rtl" : "ltr",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, color: "#e1852b" }}>
          {isArabic ? "دراسة حالة" : "CASE STUDY"}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700 }}>{project?.title ?? "Project"}</div>
          <div style={{ fontSize: 33, color: "#aeb5bd", marginTop: 18, maxWidth: 980 }}>
            {project?.positioning ?? ""}
          </div>
          <div style={{ width: 104, height: 6, backgroundColor: "#d97614", marginTop: 34 }} />
        </div>
        <div style={{ display: "flex", fontSize: 21, color: "#8e969f" }}>
          {isArabic ? "محمود عادل — مهندس برمجيات متكامل ومنصات SaaS" : "Mahmoud Adel — Full-Stack & AI SaaS Engineer"}
        </div>
      </div>
    ),
    size,
  );
}
