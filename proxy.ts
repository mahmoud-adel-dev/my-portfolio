import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

const PUBLIC_FILE = /\.[^/]+$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_FILE.test(pathname) ||
    isLocale(firstSegment)
  ) {
    return NextResponse.next();
  }

  const savedLocale = request.cookies.get("portfolio-locale")?.value;
  const acceptedLanguage = request.headers.get("accept-language") ?? "";
  const locale = isLocale(savedLocale)
    ? savedLocale
    : acceptedLanguage.toLowerCase().startsWith("ar")
      ? "ar"
      : defaultLocale;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
