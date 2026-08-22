import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role}`;

export default function OgImage() {
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
            gap: 16,
            fontSize: 22,
            letterSpacing: "0.14em",
            color: "#7c7c86",
            textTransform: "uppercase",
          }}
        >
          <span>Full-stack</span>
          <span style={{ color: "#ffb224" }}>/</span>
          <span>AI</span>
          <span style={{ color: "#ffb224" }}>/</span>
          <span>SaaS</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: "-0.02em" }}>
            {site.name}
          </div>
          <div style={{ fontSize: 40, color: "#a2a2ac", marginTop: 18 }}>
            Full-Stack &amp; AI SaaS Engineer
          </div>
          <div
            style={{
              width: 96,
              height: 6,
              backgroundColor: "#ffb224",
              marginTop: 36,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#7c7c86",
          }}
        >
          <span>github.com/{site.github.handle}</span>
          <span>SaaS platforms · AI systems · business applications</span>
        </div>
      </div>
    ),
    size,
  );
}
