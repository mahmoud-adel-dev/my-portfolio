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
  const fallback = "http://localhost:3000";
  const parsed = absoluteUrl.safeParse(configuredUrl || fallback);

  if (!parsed.success) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute URL.");
  }

  const url = new URL(parsed.data);
  const isLocal = url.hostname === "localhost" || url.hostname === "127.0.0.1";

  if (nodeEnv === "production" && !options.allowLocalProduction) {
    if (isLocal || url.protocol !== "https:") {
      throw new Error(
        "Production requires NEXT_PUBLIC_SITE_URL to use a public HTTPS origin.",
      );
    }
  }

  return parsed.data;
}
