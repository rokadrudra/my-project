// import { connectDB } from "@/lib/db";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";

// export async function POST(request) {
//   try {
//     await connectDB();

//      const { name } = await request.json();
//      if (!name) {
//        return Response.json(
//          { success: false, message: "Email not registered" },
//          { status: 404 }
//         );
//       }
//       console.log(name);
//     const user = await User.findOne({ name });


//     return Response.json(
//       {
//         success: true,
//         message: "Login successful",
//         user
//       },
//       { status: 200 }
//     );

//   } catch (error) {
//     return Response.json(
//       { success: false, message: "Server error" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(request) {
  try {
    await connectDB();

    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Name is required" },
        { status: 400 }
      );
    }

    // const user = await User.find({ name });

    const users = await User.find({
      name: { $regex: name, $options: "i" } // case-insensitive search
    });

    return NextResponse.json(
      {
        success: true,
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
