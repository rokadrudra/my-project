// import { connectDB } from "@/lib/db";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";
// import { loginSchema } from "@/app/schemas/auth.schemas";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     await connectDB();

//     const body = await request.json();

//     // ✅ Validate input using Zod
//     const parsed = loginSchema.safeParse(body);
//     if (!parsed.success) {
//       return NextResponse.json(
//         { success: false, errors: parsed.error.flatten().fieldErrors },
//         { status: 400 }
//       );
//     }

//     const { email, password } = parsed.data;

//     // ✅ Check email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "Email not registered" },
//         { status: 404 }
//       );
//     }

//     // ✅ Check password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { success: false, message: "Invalid password" },
//         { status: 401 }
//       );
//     }

//     // ✅ Success
//     return NextResponse.json(
//       {
//         success: true,
//         message: "Login successful",
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//         },
//       },
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { success: false, message: "Server error" },
//       { status: 500 }
//     );
//   }
// }









// this is a main code 







// import { connectDB } from "@/lib/db";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { loginSchema } from "@/app/schemas/auth.schemas";
// import { NextResponse } from "next/server";

// const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();
//     const parsed = loginSchema.safeParse(body);

//     if (!parsed.success) {
//       return NextResponse.json(
//         { success: false, errors: parsed.error.flatten().fieldErrors },
//         { status: 400 }
//       );
//     }

//     const { email, password } = parsed.data;
//     const user = await User.findOne({ email });
//     if (!user)
//       return NextResponse.json(
//     { success: false, message: "Email not registered" },
//     { status: 404 }
//   );

//   const admin = false;
//   if(email==="admin29@gmail.com"){
//     if(await bcrypt.compare(password, user.password)){
//       admin = true;
//     }
//   }
  
//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid)
//     return NextResponse.json(
//   { success: false, message: "Invalid password" },
//         { status: 401 }
//       );

//     const token = jwt.sign(
//       { id: user._id, email: user.email ,admin:admin},
//       JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     const response = NextResponse.json({
//       success: true,
//       message: "Login successful",
//       user: { id: user._id, name: user.name, email: user.email,admin:admin },
//     });

//     response.cookies.set("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60,
//       path: "/",
//     });

//     return response;
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { success: false, message: "Server error" },
//       { status: 500 }
//     );
//   }
// }









import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginSchema } from "@/app/schemas/auth.schemas";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Email not registered" },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    // ✅ Role from DB
    const isAdmin = user.role === "admin";
    console.log(isAdmin)

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role, // admin / user
        isAdmin:isAdmin
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

  //     // 🔑 Role cookie (for middleware)
  //   response.cookies.set("role", user.role, {
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "strict",
  //   path: "/",
  // });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
