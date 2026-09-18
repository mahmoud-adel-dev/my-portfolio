"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = window.sessionStorage.getItem("portfolio_session_id");
  if (!id) {
    id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    window.sessionStorage.setItem("portfolio_session_id", id);
  }
  return id;
}

export function TrackerProvider({
  children,
  locale = "en",
}: {
  children: React.ReactNode;
  locale?: string;
}) {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());
  const sessionIdRef = useRef<string>("");

  useEffect(() => {
    sessionIdRef.current = getOrCreateSessionId();
    startTimeRef.current = Date.now();

    // Ignore admin routes from client analytics
    if (pathname.startsWith("/admin")) return;

    // Track page visit
    try {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          path: pathname,
          locale,
          referrer: typeof document !== "undefined" ? document.referrer : "",
        }),
      }).catch(() => {});
    } catch {}

    // Heartbeat for session duration
    const sendDuration = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      if (elapsed < 3) return;

      const payload = JSON.stringify({
        type: "heartbeat",
        sessionId: sessionIdRef.current,
        duration: Math.round(elapsed),
      });

      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/analytics/track", new Blob([payload], { type: "application/json" }));
      } else {
        fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    };

    const interval = setInterval(sendDuration, 15000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendDuration();
      }
    };

    const handleBeforeUnload = () => {
      sendDuration();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      sendDuration();
    };
  }, [pathname, locale]);

  // Global click tracker
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest("a, button[data-track-click]");
      if (!target) return;

      const isAnchor = target.tagName === "A";
      const href = isAnchor ? (target as HTMLAnchorElement).href : target.getAttribute("data-track-url") || "";
      const label =
        target.getAttribute("data-track-label") ||
        target.textContent?.trim() ||
        href ||
        "interactive-click";
      const category = target.getAttribute("data-track-category") || (isAnchor ? "link" : "button");

      if (!href && !label) return;

      const payload = {
        sessionId: sessionIdRef.current || getOrCreateSessionId(),
        targetUrl: href || label,
        label: label.slice(0, 80),
        category,
      };

      try {
        if (navigator.sendBeacon) {
          navigator.sendBeacon("/api/analytics/click", new Blob([JSON.stringify(payload)], { type: "application/json" }));
        } else {
          fetch("/api/analytics/click", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            keepalive: true,
          }).catch(() => {});
        }
      } catch {}
    };

    window.addEventListener("click", handleClick, { capture: true });
    return () => {
      window.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  return <>{children}</>;
}
