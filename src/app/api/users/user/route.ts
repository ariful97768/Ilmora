import createUser from "@/lib/backend-actions/create-user";
import verifySignin from "@/lib/backend-actions/verify-signin";
import { CreateUserInput } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const password = searchParams.get("password");

  try {
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing credentials. Required: email, password",
        },
        { status: 400 }
      );
    }

    const user = await verifySignin({
      email: email,
      password: password,
    });

    return NextResponse.json({ user }, { status: 200 });
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
    let data: CreateUserInput;
    try {
      data = await req.json();
    } catch (err) {
      return NextResponse.json(
        {
          success: false,
          message: "Request body must be a JSON object.",
          error: err,
        },
        { status: 400 }
      );
    }

    const user = await createUser(data);

    return NextResponse.json(user, { status: 201 });
  } catch (err: unknown) {
    const message =
      typeof err === "object" && err !== null && "message" in err
        ? (err as { message: string }).message
        : "Error processing request.";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 400 }
    );
  }
}
