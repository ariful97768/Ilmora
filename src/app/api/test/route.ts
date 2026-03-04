import db from "@/database/mongodb";
import { sendEmail } from "@/lib/utils/nodemailer";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const email = searchParams.get("email");
  const all = searchParams.get("all");
  let result = "s";
  sendEmail();
  //  const admin= await db.students.find().toArray()
  // if (id) {
  //   // result = await db.users.findOne({ _id: new ObjectId(id as string) });
  //   result = await db.students.findOne({ userId: id });
  // }
  // if (email) {
  //   // result = await db.admins.insertOne ( {
  //   //      email: email,
  //   //   isActive: true,
  //   // })
  //   result = await db.users.updateOne({ email }, { $set: { role: "admin" } });
  // }
  // if (all) {
  //   result = await db.faculties.find().toArray();
  // }
  // console.log(result);
  return NextResponse.json({ result });
}

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const email = searchParams.get("email");

  let result;
  if (id) {
    result = await db.users.findOneAndUpdate(
      { _id: new ObjectId(id as string) },
      { $set: { role: "user" } }
    );
  }
  if (email) {
    result = await db.users.findOneAndUpdate(
      { email },
      { $set: { role: "user" } }
    );
  }
  return NextResponse.json({ result });
}
