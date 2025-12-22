/* === API Response types ==== */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/* ==== User types ==== */
type AuthProvider = "google" | "facebook" | "github" | "credentials";
type UserStatus = "pending" | "active" | "inactive";
type UserRole = "student" | "faculty" | "admin";

export interface BaseUser {
  email: string;
  provider: AuthProvider;
  role: UserRole;
  status: UserStatus;
}

type SocialProvider = { provider: Exclude<AuthProvider, "credentials"> };
type CredentialsProvider = { provider: "credentials"; password: string };

export type NewUserInput = Omit<BaseUser, "status" | "role"> & {
  role: Exclude<UserRole, "admin">;
} & (SocialProvider | CredentialsProvider);

export type InsertUserOnDB = NewUserInput & {
  createdAt: string;
  updatedAt: string;
  status: UserStatus;
};

export type UserFromDB = Omit<InsertUserOnDB, "password" | "role"> & {
  id: string;
  role: UserRole;
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
