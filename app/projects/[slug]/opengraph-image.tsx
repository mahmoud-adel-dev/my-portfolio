import { ImageResponse } from "next/og";
import { getProject } from "@/data/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProjectOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  const title = project?.title ?? "Project";
  const positioning = project?.positioning ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0b0b0d",
          color: "#ededef",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.14em",
            color: "#ffb224",
            textTransform: "uppercase",
          }}
        >
          Case study
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: "-0.02em" }}>
            {title}
          </div>
          <div style={{ fontSize: 34, color: "#a2a2ac", marginTop: 16, maxWidth: 940 }}>
            {positioning}
          </div>
          <div
            style={{
              width: 96,
              height: 6,
              backgroundColor: "#ffb224",
              marginTop: 32,
            }}
          />
        </div>

        <div style={{ display: "flex", fontSize: 22, color: "#7c7c86" }}>
          Mahmoud Adel — Full-Stack &amp; AI SaaS Engineer
        </div>
      </div>
    ),
    size,
  );
}
