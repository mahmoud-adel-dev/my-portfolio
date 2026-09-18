import { NextRequest, NextResponse } from "next/server";
import { recordClick } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { sessionId, targetUrl, label, category } = body;

    if (!sessionId || !targetUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const click = await recordClick({
      sessionId,
      targetUrl,
      label: label || targetUrl,
      category: category || "external",
    });

    return NextResponse.json({ success: true, clickId: click.id });
  } catch (error) {
    console.error("Failed to track click:", error);
    return NextResponse.json({ error: "Click tracking failed" }, { status: 500 });
  }
}
