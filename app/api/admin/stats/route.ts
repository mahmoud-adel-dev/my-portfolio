import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import { clearAllAnalytics, getAnalyticsSummary } from "@/lib/storage";

export async function GET() {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const summary = await getAnalyticsSummary();
    return NextResponse.json({ success: true, summary });
  } catch (error) {
    console.error("Failed to load admin stats:", error);
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { action } = await req.json().catch(() => ({}));
    if (action === "clear_analytics") {
      await clearAllAnalytics();
      return NextResponse.json({ success: true, message: "Analytics data reset successfully" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Failed to execute action:", error);
    return NextResponse.json({ error: "Action failed" }, { status: 500 });
  }
}
