import { createStudent } from "@/lib/backend-actions/create-student";
import { getStudentData } from "@/lib/backend-actions/get-student-data";
import { BaseStudent } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id: string | null = searchParams.get("id");

    const student = await getStudentData(id);

    return NextResponse.json({ student }, { status: 200 });
  } catch (err) {
    const message =
      typeof err === "object" && err !== null && "message" in err
        ? err.message
        : "Error processing request.";

    return NextResponse.json(
      {
        success: false,
        message: message,
      },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let data: Omit<
      BaseStudent,
      "rollNumber" | "registrationNumber" | "admissionDate" | "status"
    >;
    try {
      data = await req.json();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error processing request.";
      return NextResponse.json(
        { success: false, error: message },
        { status: 500 }
      );
    }

    const student = await createStudent(data);

    return NextResponse.json({ data: student }, { status: 201 });
  } catch (err) {
    const message =
      typeof err === "object" && err !== null && "message" in err
        ? err.message
        : "Error processing request.";
    return NextResponse.json({
      success: false,
      message: message,
    });
  }
}
