/* === API Response types ==== */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/* ==== User types ==== */
export interface BaseUser {
  name: string;
  email: string;
  provider: "google" | "facebook" | "credentials";
  image: string | null;
  role: "user" | "student" | "faculty" | "admin";
  isActive: boolean;
}

export type CreateUserInput =
  | (Omit<BaseUser, "isActive" | "provider"> & {
      provider: "google" | "facebook";
    })
  | (Omit<BaseUser, "isActive" | "provider"> & {
      provider: "credentials";
      password: string;
    });

export type InsertUserOnDB = CreateUserInput & {
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
};

export type UserFromDB = Omit<InsertUserOnDB, "password"> & {
  id: string;
};

/* ==== Students types ==== */

export interface BaseStudent {
  userId: string;
  rollNumber: string;
  registrationNumber: string;
  dateOfBirth: string;
  address: string;
  phone: string;
  guardianId?: string;
  admissionDate: string;
  currentSemester:
    | "1st Semester"
    | "2nd Semester"
    | "3rd Semester"
    | "4th Semester";
  department: "Computer Science" | "Mathematics" | "Physics" | "Chemistry";
  status: "Active" | "Graduated" | "Suspended" | "Dropped";
}

export interface InsertStudentOnDB extends BaseStudent {
  createdAt: string;
  updatedAt: string;
}

export interface StudentFromDB extends InsertStudentOnDB {
  id: string;
}

/* === Type specific API response === */
export type UserResponse = ApiResponse<UserFromDB>;
export type StudentResponse = ApiResponse<StudentFromDB>;
