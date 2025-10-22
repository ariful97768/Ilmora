import db from "@/database/mongodb";
import { BaseStudent, InsertStudentOnDB, StudentResponse } from "../types";

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
