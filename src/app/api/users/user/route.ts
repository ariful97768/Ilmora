import db from "@/app/database/mongodb";
import { CreateUserInput, UserResponse, InsertUserOnDB } from "@/lib/types";
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

// made separate functions for better reusability on other cases

export async function createUser(data: CreateUserInput): Promise<UserResponse> {
  if (!data.name || !data.email) {
    throw new Error(
      "Missing required fields. Required: name, email, password."
    );
  }
  if (data.provider === "credentials" && !data.password) {
    throw new Error("Password is missing for credentials sign in.");
  }

  const isExist = await db.users.findOne({ email: data.email });

  if (isExist) {
    throw new Error("User already exits.");
  }

  let user: InsertUserOnDB;
  if (data.provider === "credentials") {
    user = {
      name: data.name,
      email: data.email,
      image: data.image || null,
      role: data.role || "student",
      provider: data.provider,
      password: data.password,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } else {
    user = {
      name: data.name,
      email: data.email,
      image: data.image || null,
      role: data.role || "student",
      provider: data.provider,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  const result = await db.users.insertOne(user);

  if (result.acknowledged) {
    return {
      success: true,
      message: "User created successfully",
      data: {
        id: result.insertedId.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
        provider: user.provider,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
  throw new Error("Failed to create user.");
}

export async function verifySignin(credentials: {
  email: string;
  password?: string;
}): Promise<UserResponse> {
  const userExist = await db.users.findOne({
    email: credentials.email,
  });

  if (!userExist) throw new Error("User does not exist.");

  if (userExist.provider === "credentials" && !credentials.password) {
    throw new Error("Password required for verification.");
  }

  if (
    userExist.provider === "credentials" &&
    userExist.password !== credentials.password
  ) {
    throw new Error("Wrong password.");
  }

  return {
    success: true,
    message: "User verification successful.",
    data: {
      id: userExist._id.toString(),
      role: userExist.role,
      name: userExist.name,
      email: userExist.email,
      image: userExist.image,
      provider: userExist.provider,
      isActive: userExist.isActive,
      createdAt: userExist.createdAt,
      updatedAt: userExist.updatedAt,
    },
  };
}
