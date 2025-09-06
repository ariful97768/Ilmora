export interface BaseUser {
  name: string;
  email: string;
  password?: string;
  image: string | null;
  role: "student" | "faculty" | "admin";
}

export type DbResponseUser = {
  success: boolean;
  message: string;
  data: BaseUser & {
    id: string;
    cratedAt: string;
    updatedAt: string;
  };
};
