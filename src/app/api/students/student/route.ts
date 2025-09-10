import db from "@/app/database/mongodb";
import { BaseStudent, InsertStudentOnDB, StudentResponse } from "@/lib/types";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextResponse) {
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
    } catch (err) {
      const message =
        typeof err === "object" && err !== null && "message" in err
          ? err.message
          : "Error processing request.";
      return NextResponse.json({ success: false, error: message });
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

// made separate functions for better reusability on other cases

export async function getStudentData(
  id: string | null
): Promise<StudentResponse> {
  // missing credentials error
  if (!id) throw new Error("Missing required fields. Required: id");

  // check if the user requesting is valid
  const validUserReq = await db.users.findOne({ _id: new ObjectId(id) });

  if (!validUserReq) {
    throw new Error("Requested user is not a valid user.");
  }
  // check if student exist
  const student = await db.students.findOne({ userId: id });

  if (!student) {
    throw new Error("Student is not registered.");
  }

  return {
    success: true,
    message: "Student account retrieved successfully.",
    data: {
      id: student._id.toString(),
      userId: student.userId,
      rollNumber: student.rollNumber,
      registrationNumber: student.registrationNumber,
      phone: student.phone,
      address: student.address,
      dateOfBirth: student.dateOfBirth,
      currentSemester: student.currentSemester,
      department: student.department,
      guardianId: student.guardianId,
      admissionDate: student.admissionDate,
      status: student.status,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    },
  };
}

export async function createStudent(
  data: Omit<
    BaseStudent,
    "rollNumber" | "registrationNumber" | "admissionDate" | "status"
  >
): Promise<StudentResponse> {
  const requiredFields: (keyof Omit<
    BaseStudent,
    "rollNumber" | "registrationNumber" | "admissionDate" | "status"
  >)[] = [
    "userId",
    "address",
    "currentSemester",
    "dateOfBirth",
    "department",
    "phone",
  ];

  const missingFields = requiredFields.filter((item) => !data[item]);

  if (missingFields.length > 0) {
    throw new Error(
      `Missing required fields. Required: ${missingFields.join(", ")}`
    );
  }
  // check if exists
  const isExist = await db.students.findOne({ userId: data.userId });
  if (isExist) throw new Error("Student account already exists.");

  const roll = (
    (await db.students.countDocuments({
      status: "Active",
      department: data.department,
    })) + 1
  )
    .toString()
    .padStart(4, "0");

  const rollNum = data.department.slice(0, 2).toUpperCase() + roll;
  const registrationNumber = new Date().getFullYear().toString() + roll;

  // insert on db
  const studentData: InsertStudentOnDB = {
    userId: data.userId,
    rollNumber: rollNum,
    registrationNumber: registrationNumber,
    phone: data.phone,
    address: data.address,
    dateOfBirth: data.dateOfBirth,
    currentSemester: data.currentSemester,
    department: data.department,
    guardianId: data.guardianId,
    admissionDate: new Date().toISOString(),
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const result = await db.students.insertOne(studentData);

  // throw error if acknowledge false
  if (!result.insertedId) throw new Error("Failed to create student account.");

  // return data only if acknowledge true
  return {
    success: true,
    message: "Student account created successfully.",
    data: {
      id: result.insertedId.toString(),
      userId: data.userId,
      rollNumber: rollNum,
      registrationNumber: registrationNumber,
      phone: data.phone,
      address: data.address,
      dateOfBirth: data.dateOfBirth,
      currentSemester: data.currentSemester,
      department: data.department,
      guardianId: data.guardianId,
      admissionDate: new Date().toISOString(),
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
}
