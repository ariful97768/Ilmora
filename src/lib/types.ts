/* === API Response types ==== */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/* ==== Common pre-defined types ==== */
type AuthProvider = "google" | "facebook" | "github" | "credentials";
type UserGender = "Male" | "Female";
type SocialProvider = { provider: Exclude<AuthProvider, "credentials"> };
type CredentialsProvider = { provider: "credentials"; password: string };
type DepartmentTypes =
  | "Computer Science"
  | "Mathematics"
  | "Physics"
  | "Chemistry";
type SemesterTypes =
  | "1st Semester"
  | "2nd Semester"
  | "3rd Semester"
  | "4th Semester";
type PaymentStatus = "Paid" | "Unpaid";
type UserStatus = "Pending" | "Active" | "Inactive";
type StudentStatus = "Active" | "Graduated" | "Suspended" | "Dropped";
type FacultyStatus = "Active" | "Inactive" | "Retired";
type UserRole = "Student" | "Faculty" | "Admin";

/* ==== User types ==== */
export interface BaseUser {
  email: string;
  provider: AuthProvider;
  role: UserRole;
  status: UserStatus;
}

export type NewUserInput = Omit<BaseUser, "status" | "role"> & {
  role: Exclude<UserRole, "Admin">;
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
  name: string;
  email: string;
  image: string;
  gender: UserGender;
  paymentStatus: PaymentStatus;
  rollNumber: string;
  registrationNumber: string;
  dateOfBirth: string;
  address: string;
  phone: string;
  admissionDate: string;
  currentSemester: SemesterTypes;
  department: DepartmentTypes;
  status: StudentStatus;
}

// export interface StudentProfile {
//   name: string;
//   email: string;
//   image: string;
//   dateOfBirth: string;
//   phone: string;
//   address: string;
//   admissionDate: string;
//   department: DepartmentTypes;
//   currentSemester: SemesterTypes;
// }

export type NewStudentInput = Omit<
  BaseStudent,
  | "rollNumber"
  | "paymentStatus"
  | "registrationNumber"
  | "currentSemester"
  | "admissionDate"
  | "status"
>;

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
export type FacultyResponse = ApiResponse<FacultyFromDB>;

/* === Faculty types === */
export interface BaseFaculty {
  userId: string;
  name: string;
  image: string;
  email: string;
  phone: string;
  gender: UserGender;
  dateOfBirth: string;
  address: string;
  department: DepartmentTypes;
  about: string;
  education: {
    university: string;
    degree: string;
    startDate: string;
    endDate: string;
  };
  joiningDate: string;
  status: FacultyStatus;
}

export type NewFacultyInput = Omit<BaseFaculty, "status">;

export type InsertFacultyOnDB = BaseFaculty & {
  createdAt: string;
  updatedAt: string;
};

export interface FacultyFromDB extends InsertFacultyOnDB {
  id: string;
}
