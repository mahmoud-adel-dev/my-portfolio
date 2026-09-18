import { z } from "zod";

const absoluteUrl = z
  .string()
  .trim()
  .url()
  .transform((value) => value.replace(/\/$/, ""));

type SiteUrlOptions = {
  nodeEnv?: string;
  allowLocalProduction?: boolean;
};

export function resolveSiteUrl(
  configuredUrl: string | undefined,
  options: SiteUrlOptions = {},
): string {
  const nodeEnv = options.nodeEnv ?? process.env.NODE_ENV;

  // 1. Check browser origin if client-side
  const browserOrigin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : undefined;

  // 2. Check Vercel auto-provided domain
  const rawVercel =
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    process.env.VERCEL_URL ||
    process.env.NEXT_PUBLIC_SITE_URL;

  const vercelOrigin = rawVercel
    ? `https://${rawVercel.replace(/^https?:\/\//, "")}`
    : undefined;

  const fallback =
    browserOrigin ||
    vercelOrigin ||
    (nodeEnv === "production"
      ? "https://mahmoud-adel-dev-my-portfolio.vercel.app"
      : "http://localhost:3000");

  let candidate = configuredUrl || vercelOrigin || fallback;

  // If in production and candidate is http://localhost, use Vercel / browser fallback
  if (nodeEnv === "production" && !options.allowLocalProduction) {
    if (
      candidate.includes("localhost") ||
      candidate.includes("127.0.0.1") ||
      !candidate.startsWith("https://")
    ) {
      candidate =
        browserOrigin && browserOrigin.startsWith("https://")
          ? browserOrigin
          : vercelOrigin || "https://mahmoud-adel-dev-my-portfolio.vercel.app";
    }
  }

  const parsed = absoluteUrl.safeParse(candidate);
  if (parsed.success) {
    return parsed.data;
  }

  return fallback;
}
