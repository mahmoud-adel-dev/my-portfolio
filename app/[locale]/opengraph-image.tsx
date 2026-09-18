import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { isLocale, translations } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mahmoud Adel — Full-Stack & AI SaaS Engineer";

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: candidate } = await params;
  const locale = isLocale(candidate) ? candidate : "en";
  const copy = translations[locale].hero;
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
        <div style={{ display: "flex", gap: 16, fontSize: 22, color: "#9ba3ad" }}>
          {copy.disciplines.map((item, index) => (
            <div key={item} style={{ display: "flex", gap: 16 }}>
              {index > 0 ? <span style={{ color: "#d97614" }}>/</span> : null}
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 82, fontWeight: 700 }}>{copy.name}</div>
          <div style={{ fontSize: 39, color: "#aeb5bd", marginTop: 18, maxWidth: 1000 }}>
            {copy.role}
          </div>
          <div style={{ width: 104, height: 6, backgroundColor: "#d97614", marginTop: 34 }} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 21, color: "#8e969f" }}>
          <span>github.com/{site.github.handle}</span>
          <span>{isArabic ? "منتجات SaaS · أنظمة AI · تطبيقات أعمال" : "SaaS products · AI systems · business software"}</span>
        </div>
      </div>
    ),
    size,
  );
}
