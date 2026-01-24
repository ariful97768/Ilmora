"use server";
import { auth } from "@/auth";
import getDb from "@/database/mongodb";
import { ObjectId } from "mongodb";
import {
  getCurrentSemester,
  getRollAndRegistrationNumber,
} from "../utils/helper-functions";
import {
  InsertFacultyOnDB,
  InsertStudentOnDB,
  NewFacultyInput,
  NewStudentInput,
} from "../types";

type PropsType =
  | {
      data: NewFacultyInput;
      role: "Faculty";
    }
  | {
      data: NewStudentInput;
      role: "Student";
    };

// Import statements ends here and Function Component Starts
export async function completeProfile({ data, role }: PropsType): Promise<{
  success: boolean;
  message: string;
  data?: { insertedId: string };
}> {
  // User authentication, valid role and userId validation
  const { userId } = data;
  if (!userId)
    return {
      success: false,
      message: "User Id as userId is not available in the provided data",
    };

  // Session validation
  const session = await auth();
  if (!session || !session.user) {
    return { success: false, message: "User is not authenticated" };
  }

  // Role validation
  if (role !== session.user.role)
    return {
      success: false,
      message: "Can not complete the profile with different role",
    };

  // Get database collections
  const { users, students, faculties } = await getDb();

  // Proceed with Student collection insertion if `data.role` and role in user collection is "Student" and email is valid
  const userData = await users.findOne(
    { _id: new ObjectId(session.user.id) },
    { projection: { email: 1, role: 1 } },
  );

  // Error handling for null user data, mismatched email and role
  if (!userData) {
    return {
      success: false,
      message: "User does not exists, can not update profile!",
    };
  }
  if (data.email !== userData.email) {
    return {
      success: false,
      message: "Email does not match",
    };
  }
  if (role !== userData.role) {
    return {
      success: false,
      message: `Role does not match. Trying to update profile as '${role}' but the user is '${userData.role}'`,
    };
  }

  // Proceed with Student collection insertion if `data.role` and role in user collection is "Student" and email is valid
  if (role === "Student") {
    // Get roll, registration number and current semester from utility functions
    const currentSemester = getCurrentSemester();
    const { rollNum, registrationNumber } = await getRollAndRegistrationNumber(
      data.department,
    );

    // Create Student Profile
    const studentData: InsertStudentOnDB = {
      userId: data.userId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      image: "image should be stored on the cloud",
      gender: data.gender,
      paymentStatus: "Unpaid",
      rollNumber: rollNum,
      registrationNumber: registrationNumber,
      dateOfBirth: data.dateOfBirth,
      address: data.address,
      admissionDate: new Date().toISOString(),
      currentSemester: currentSemester,
      department: data.department,
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Insert user profile and update the user status to active
    const [studentProfile] = await Promise.all([
      students.insertOne(studentData),
      users.updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            status: "Active",
            updatedAt: new Date().toISOString(),
          },
        },
      ),
    ]);

    if (studentProfile.insertedId) {
      return {
        success: true,
        message: "Student profile created successfully",
        data: { insertedId: studentProfile.insertedId.toString() },
      };
    }
  }

  // Proceed with Faculty collection insertion if `data.role` and role in user collection is "Faculty" and email is valid
  if (role === "Faculty") {
    // Create Faculty Profile
    const facultyData: InsertFacultyOnDB = {
      userId: data.userId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      image: data.image,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      address: data.address,
      department: data.department,
      about: data.about,
      education: data.education,
      joiningDate: data.joiningDate,
      status: "Active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Insert user profile and update the user status to active
    const [facultyProfile] = await Promise.all([
      faculties.insertOne(facultyData),
      users.updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            status: "Active",
            updatedAt: new Date().toISOString(),
          },
        },
      ),
    ]);

    if (facultyProfile.insertedId) {
      return {
        success: true,
        message: "Faculty profile created successfully",
        data: { insertedId: facultyProfile.insertedId.toString() },
      };
    }
  }

  return {
    success: false,
    message: "Something went wrong",
  };
}
