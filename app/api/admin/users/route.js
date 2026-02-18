// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// const JWT_SECRET = process.env.JWT_SECRET;

// export async function GET() {
//   const token = cookies().get("token")?.value;

//   if (!token) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);

//     if (decoded.role !== "admin") {
//       return NextResponse.json({ message: "Forbidden" }, { status: 403 });
//     }

//     return NextResponse.json({ message: "Welcome Admin" });
//   } catch (err) {
//     return NextResponse.json({ message: "Invalid token" }, { status: 401 });
//   }
// }
