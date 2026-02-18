// import { connectDB } from "@/lib/db";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";

// export async function POST(request) {
//   try {
//     await connectDB();

//     const { name, email, password } = await request.json();

//     // Validation
//     if (!name || !email || !password) {
//       return Response.json(
//         { success: false, message: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email: email.toLowerCase() });
//     if (existingUser) {
//       return Response.json(
//         { success: false, message: "Email already registered" },
//         { status: 409 }
//       );
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email: email.toLowerCase(),
//       password: hashedPassword
//     });

//     return Response.json({
//       success: true,
//       message: "User registered successfully",
//       user
//     });

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
import bcrypt from "bcryptjs";
// import { z } from "zod";
import { registerSchema } from "@/app/schemas/auth.schemas";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

        // ✅ ZOD VALIDATION
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, password, message} = parsed.data;

    // if(message){
    //   return NextResponse.json(
    //     { success: false, message: message },
    //     { status: 400 }
    //   );
    // }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
