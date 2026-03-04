import { auth } from "@/auth";
import getDb from "@/database/mongodb";
import { InsertFacultyOnDB, NewFacultyInput } from "@/lib/types";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ facultyId: string }> }
) {
  try {
    // check if user is authenticated
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }
    // get database collection
    const { faculties } = await getDb();

    // faculty id is passed as a params
    const { facultyId } = await params;

    const faculty = await faculties.findOne({
      _id: new ObjectId(facultyId),
    });

    if (!faculty) {
      {
        return NextResponse.json(
          { message: "Faculty does not exist" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Faculty data found successfully",
        data: faculty,
      },
      {
        status: 200,
      }
    );
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : "Unknown error happened while searching for faculty data";

    return NextResponse.json(
      { message },
      {
        status: 500,
      }
    );
  }
}

// Create new faculty if faculty data is not available.
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ facultyId: string }> }
) {
  try {
    const session = await auth();
    if (!session || !session.user.email) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }
    // get data from the request body
    const data: NewFacultyInput = await req.json();

    // get database collection
    const { admins, faculties } = await getDb();

    // the params is the faculty id, but the email is passed here to this endpoint
    const email = (await params).facultyId;

    const [isAdmin, isFaculty] = await Promise.all([
      admins.findOne({ email: session.user.email, isActive: true }),
      faculties.findOne({ email }),
    ]);

    if (!isAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Your are not authorized to perform this action.",
        },
        { status: 403 }
      );
    }

    if (isFaculty) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is already taken.",
        },
        { status: 400 }
      );
    }
    // const password =

    const facultyData: InsertFacultyOnDB = {
      ...data,
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await faculties.insertOne(facultyData);
    if (!result.insertedId) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create faculty account.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, result }, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Error while processing the request.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
