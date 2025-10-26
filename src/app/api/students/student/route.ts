import db from "@/database/mongodb";
import { createStudent } from "@/lib/backend-actions/create-student";
import { getStudentData } from "@/lib/backend-actions/get-student-data";
import { StudentInput } from "@/lib/types";
import { ObjectId } from "mongodb";
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
    const { searchParams } = new URL(req.url);
    const reqUserEmail = searchParams.get("req-user");

    if (!reqUserEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Requested user's email is not provided",
        },
        { status: 403 }
      );
    }
    // admin check
    const isAdmin = await db.users.findOne({
      email: reqUserEmail,
      isActive: true,
      role: "admin",
    });

    if (!isAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Your are not authorize to perform this action.",
        },
        { status: 403 }
      );
    }

    // insert data
    let data: StudentInput;
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
    await db.users.updateOne(
      { _id: new ObjectId(data.userId) },
      { $set: { role: "student" } }
    );
    return NextResponse.json(
      {
        success: true,
        message: "User promoted successfully",
        insertedId: student.data.id,
      },
      { status: 201 }
    );
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
