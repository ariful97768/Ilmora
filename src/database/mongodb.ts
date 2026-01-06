import {
  Department,
  InsertFacultyOnDB,
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

const database = (async () => {
  const c = await clientPromise;
  return c.db("Ilmora");
})();

async function getDb() {
  const db = await database;
  const collection = {
    users: db.collection<User>("Users"),
    admins: db.collection("Admins"),
    students: db.collection<Student>("Students"),
    faculties: db.collection<InsertFacultyOnDB>("Faculties"),
    departments: db.collection<Department>("Departments"),
    enrollments: db.collection("Enrollments"),
    courses: db.collection("Courses"),
    assignments: db.collection("Assignments"),
  };
  return collection;
}

export default getDb;

// types for database collection
type Student = InsertStudentOnDB & {
  readonly _id?: ObjectId;
};

type User = InsertUserOnDB & {
  readonly _id?: ObjectId;
};
