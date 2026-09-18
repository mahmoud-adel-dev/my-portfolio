import { NextRequest, NextResponse } from "next/server";
import { recordVisit, updateSessionDuration } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { type, sessionId, path, locale, referrer, duration } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    if (type === "heartbeat" || typeof duration === "number") {
      await updateSessionDuration(sessionId, duration);
      return NextResponse.json({ success: true });
    }

    const userAgent = req.headers.get("user-agent") || "";
    const clientReferrer = referrer || req.headers.get("referer") || "direct";

    const visit = await recordVisit({
      sessionId,
      path: path || "/",
      locale: locale || "en",
      referrer: clientReferrer,
      userAgent,
    });

    return NextResponse.json({ success: true, visitId: visit.id });
  } catch (error) {
    console.error("Failed to track visit:", error);
    return NextResponse.json({ error: "Tracking failed" }, { status: 500 });
  }
}
