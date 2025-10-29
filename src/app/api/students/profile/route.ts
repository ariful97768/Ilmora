import { auth } from "@/auth";
import { getStudentProfile } from "@/lib/backend-actions/get-student-data";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session || !session?.user.id)
    return NextResponse.json(
      {
        success: false,
        message: "User does not exist in the server",
      },
      {
        status: 403,
      }
    );

  try {
    const student = (await getStudentProfile(session.user.id)).data;
    console.log(student);
    return NextResponse.json(
      {
        success: true,
        message: "Student profile successfully retrieved",
        data:student,
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Some unknown error happened while retrieving profile data";
    return NextResponse.json({ success: false, message }, { status: 200 });
  }
}
