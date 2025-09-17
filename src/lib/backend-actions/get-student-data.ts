import db from "@/app/database/mongodb";
import { StudentResponse } from "../types";
import { ObjectId } from "mongodb";

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
