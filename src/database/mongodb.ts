import {
  Department,
  Faculty,
  InsertStudentOnDB,
  InsertUserOnDB,
} from "@/lib/types";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI environment variable is not defined.");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (!(global as any)._mongoClientPromise) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any)._mongoClientPromise = client.connect();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const clientPromise: Promise<MongoClient> = (global as any)._mongoClientPromise;

export const database = (async () => {
  const c = await clientPromise;
  return c.db("Ilmora");
})();

const db = {
  users: (await database).collection<User>("Users"),
  students: (await database).collection<Student>("Students"),
  faculties: (await database).collection<Faculty>("Faculties"),
  departments: (await database).collection<Department>("Departments"),
  enrollments: (await database).collection("Enrollments"),
  courses: (await database).collection("Courses"),
  assignments: (await database).collection("Assignments"),
};

export default db;

// types for database collection
type Student = InsertStudentOnDB & {
  readonly _id?: ObjectId;
};

type User = InsertUserOnDB & {
  readonly _id?: ObjectId;
};
