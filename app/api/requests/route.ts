import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import {
  createProjectRequest,
  deleteProjectRequest,
  getProjectRequests,
  updateRequestStatus,
  type RequestStatus,
} from "@/lib/storage";

// Public: Submit a project inquiry
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, phone, serviceType, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 },
      );
    }

    const created = await createProjectRequest({
      name,
      email,
      phone,
      serviceType: serviceType || "General Inquiry",
      budget,
      message,
    });

    return NextResponse.json({ success: true, request: created });
  } catch (error) {
    console.error("Failed to save request:", error);
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }
}

// Protected: Get all inquiries
export async function GET() {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const requests = await getProjectRequests();
  return NextResponse.json({ success: true, requests });
}

// Protected: Update inquiry status
export async function PATCH(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "ID and status are required" }, { status: 400 });
    }

    const validStatuses: RequestStatus[] = ["new", "in_review", "contacted", "archived"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const updated = await updateRequestStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, request: updated });
  } catch (error) {
    console.error("Failed to update request:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// Protected: Delete inquiry
export async function DELETE(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deleted = await deleteProjectRequest(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    console.error("Failed to delete request:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
