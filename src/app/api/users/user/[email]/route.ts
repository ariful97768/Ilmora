import { getUserByEmail } from "@/lib/backend-actions/get-user-by-email";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  const email = (await params).email;
  try {
    const response = await getUserByEmail(email );

    return NextResponse.json(response);
  } catch (error) {
    const message =
      typeof error === "object" && error !== null && "message" in error
        ? error.message
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
