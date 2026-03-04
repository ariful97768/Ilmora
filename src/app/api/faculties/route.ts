import { getAllFaculty } from "@/lib/backend-actions/get-faculty";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = parseInt(searchParams.get("skip") || "0");

    const faculties = await getAllFaculty({ limit, skip });

    // if user is not authenticated then returns null
    if (!faculties) {
      return NextResponse.json(
        { success: false, message: "User is not authenticated" },
        { status: 403 }
      );
    }

    if (faculties.length === 0) {
      return NextResponse.json(
        { success: false, message: "No faculties found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        data: faculties,
        message: "Faculties fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
