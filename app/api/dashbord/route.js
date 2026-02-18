// import { connectDB } from "@/lib/db";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";




// export async function PUT(request) {
//   try {
//     await connectDB();
//     const { email, name, password } = await request.json();

//     // 1️⃣ Validation
//     if (!email || !name) {
//       return Response.json(
//         { success: false, message: "All fields are required" },
//         { status: 400 }
//       );
//     }       


//     // 2️⃣ Check email and name
//     const user = await User.findOne({ email});
//     if (!user) {
//       return Response.json(
//         { success: false, message: "User not found with provided email and name" },
//         { status: 404 }
//       );
//     }
//     // 3️⃣ Update name

//     // ✅ change name (if provided)
//     if (name) {
//       user.name = name;
//     }

//     // ✅ change password (if provided)
//     if (password) {
//       const hashed = await bcrypt.hash(password, 10);
//       user.password = hashed;
//     }

//     await user.save();
//     // 4️⃣ Success
//     return Response.json(
//         {
//             success: true,
//             message: "Name updated successfully",
//             user
//         },
//         { status: 200 }
//     );
//     } catch (error) {
//     return Response.json(
//         { success: false, message: "Server error" },
//         { status: 500 }
//     );
//     }
// }



import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export async function GET(req) {
  try {
    await connectDB();
    const token = req.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    console.log("User in dashboard route:", user);

    return NextResponse.json({ success: true, user });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const token = req.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );

    const decoded = jwt.verify(token, JWT_SECRET);
    const body = await req.json();

    const updateData = {};
    if (body.name) updateData.name = body.name;
    if (body.password)
      updateData.password = await bcrypt.hash(body.password, 10);

    const user = await User.findByIdAndUpdate(decoded.id, updateData, {
      new: true,
    }).select("-password");

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
