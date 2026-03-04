import db from "@/database/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.cookies.get("authjs.session-token");
    const allUsers = await db.users.find().toArray();
    console.log(cookie);
    return NextResponse.json({ message: "connected", cookie, allUsers });
  } catch (err) {
    return NextResponse.json({ message: err });
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     const data = await req.json();

//     console.log("Received data:", data);
//     if (!data.name || !data.email || !data.password) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Missing required fields",
//         },
//         { status: 400 }
//       );
//     }

//     // Check if user with the same email already exists
//     const isExist = await db.users.findOne({ email: data.email });

//     if (isExist) {
//       return NextResponse.json({
//         success: false,
//         message: "User already exists.",
//       });
//     }

//     const newUser = {
//       name: data.name,
//       email: data.email,
//       image: data.image || null,
//       password: data.password,
//       role: data.role || "Student",
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };
//     const result = await db.users.insertOne(newUser);

//     return NextResponse.json({
//       success: true,
//       message: "Data created successfully",
//       data: result,
//     });
//   } catch (err) {
//     console.error("Error :", err);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Error processing request",
//         error: err,
//       },
//       { status: 500 }
//     );
//   }
// }
