import db from "@/database/mongodb";
import { Faculty } from "@/lib/types";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const allFaculty = searchParams.get("all-faculty");
    const facultyId = searchParams.get("faculty-id");
    const reqUserEmail = searchParams.get("req-user");

    if (!facultyId) {
      return NextResponse.json(
        { message: "Faculty id must be provided." },
        { status: 400 }
      );
    }
    if (!reqUserEmail) {
      return NextResponse.json(
        { message: "Requested user's id must be provided." },
        { status: 400 }
      );
    }

    const validUser = await db.users.findOne({ email: reqUserEmail });

    if (!validUser) {
      return NextResponse.json(
        { message: "Requested user does not exists." },
        { status: 401 }
      );
    }

    if (!validUser.isActive) {
      return NextResponse.json(
        { message: "Requested user does not have access to this resource." },
        { status: 403 }
      );
    }

    // if api includes all user true and is admin then send all data
    if (allFaculty === "true") {
      if (validUser.role !== "admin") {
        return NextResponse.json(
          {
            message: "Requested user must be an admin to access this resource.",
          },
          { status: 403 }
        );
      } else {
        const allFaculty = await db.faculties.find().toArray();
        return NextResponse.json(
          {
            success: true,
            message: "All faculty data found successfully.",
            data: allFaculty,
          },
          {
            status: 200,
          }
        );
      }
    }

    const faculty = await db.faculties.findOne({
      userId: facultyId,
    });

    if (!faculty) {
      {
        return NextResponse.json(
          { message: "User is not a faculty." },
          { status: 404 }
        );
      }
    }
    return NextResponse.json(
      {
        success: true,
        message: "Faculty data found successfully.",
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
        : "Unknown error happened while searching for data.";

    return NextResponse.json(
      { message },
      {
        status: 500,
      }
    );
  }
}

// Create new faculty if faculty data is not available. if available then update with new data and update user role
export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reqUserEmail = searchParams.get("req-user");

    const isAdmin = await db.admins.findOne({
      email: reqUserEmail,
      isActive: true,
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

    const data: Faculty = await req.json();
    const reqFields: (keyof Faculty)[] = [
      "userId",
      "phone",
      "department",
      "about",
      "education",
      "joiningDate",
      "status",
      "createdAt",
      "updatedAt",
    ];

    const missingFields = reqFields.filter((item) => !data[item]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields. Required: ${missingFields.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    const [user, faculty] = await Promise.all([
      db.users.findOne({ _id: new ObjectId(data.userId) }),
      db.faculties.findOne({ userId: data.userId }),
    ]);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User is not registered.",
        },
        { status: 400 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "User account is inactive.",
        },
        { status: 403 }
      );
    }

    if (user.role === "faculty" && faculty) {
      return NextResponse.json(
        {
          success: false,
          message: "User already promoted.",
        },
        { status: 400 }
      );
    }

    if (user.role !== "faculty" && faculty) {
      const [result] = await Promise.all([
        db.faculties.updateOne(
          { userId: data.userId },
          { $set: { ...data, updatedAt: new Date().toISOString() } }
        ),
        db.users.updateOne(
          { _id: new ObjectId(data.userId) },
          { $set: { role: "faculty", updatedAt: new Date().toISOString() } }
        ),
      ]);
      return NextResponse.json({ success: true, result }, { status: 201 });
    }

    const result = await db.faculties.insertOne(data);
    if (!result.insertedId) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to create faculty account.",
        },
        { status: 400 }
      );
    }
    await db.users.updateOne(
      { _id: new ObjectId(data.userId) },
      { $set: { role: "faculty" } }
    );

    return NextResponse.json({ success: true, result }, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Error while processing the request.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
