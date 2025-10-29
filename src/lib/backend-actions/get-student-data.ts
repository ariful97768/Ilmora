import db from "@/database/mongodb";
import { ApiResponse, StudentProfile, StudentResponse } from "../types";
import { ObjectId } from "mongodb";

export async function getStudentData(id: string): Promise<StudentResponse> {
  // missing credentials error
  if (!id) throw new Error("Missing required fields. Required: id");

  // get student data
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
      paymentStatus: student.paymentStatus,
      status: student.status,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    },
  };
}

export async function getStudentProfile(
  id: string
): Promise<ApiResponse<StudentProfile>> {
  if (!id) throw new Error("Missing required fields. Required: id");

  const student = await db.users
    .aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $addFields: {
          idStr: { $toString: "$_id" },
        },
      },
      {
        $lookup: {
          from: "Students",
          localField: "idStr",
          foreignField: "userId",
          as: "studentInfo",
        },
      },
      {
        $unwind: "$studentInfo",
      },
      {
        $project: {
          name: 1,
          email: 1,
          image: 1,
          dateOfBirth: "$studentInfo.dateOfBirth",
          phone: "$studentInfo.phone",
          address: "$studentInfo.address",
          department: "$studentInfo.department",
          currentSemester: "$studentInfo.currentSemester",
          admissionDate:'$studentInfo.admissionDate'
        },
      },
    ])
    .toArray();

  if (!student.length) {
    throw new Error("An error happened while fetching user profile");
  }

  return {
    success: true,
    message: "Student profile retrieved successfully",
    data: student[0] as StudentProfile,
  };
}
