// setup.ts
import { BaseUser } from "@/lib/types";
import { MongoClient, ServerApiVersion } from "mongodb";

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
  enrollments: (await database).collection("Enrollments"),
  courses: (await database).collection("Courses"),
  departments: (await database).collection("Departments"),
  assignments: (await database).collection("Assignments"),
};

export default db;

type User = BaseUser & {
  _id?: string;
  createdAt: string
  updatedAt: string
};
