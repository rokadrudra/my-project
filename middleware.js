// // import { NextResponse } from "next/server";

// // export function middleware(req) {
// //   const url = req.nextUrl.clone(); // current URL
// //   const token = req.cookies.get("token"); // JWT / session stored in cookies

// //   // 1️⃣ User is on login page
// //   if (url.pathname === "/login" && token) {
// //     // User already logged in → redirect to dashboard
// //     url.pathname = "/dashboard";
// //     return NextResponse.redirect(url);
// //   }

// //   // 2️⃣ If user is not logged in → allow
// //   return NextResponse.next();
// // }

// // // Apply middleware only on login page
// // export const config = {
// //   matcher: ["/login"],
// // };

// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// // export function middleware(req) {
// //   const token = req.cookies.get("token")?.value;
// //   const url = req.nextUrl.clone();

// //   console.log("Token in middleware:", token);


// //   // Already logged in → redirect login → dashboard
// //   if (url.pathname === "/login" && token) {
// //     try {
// //       jwt.verify(token, JWT_SECRET);
// //       url.pathname = "/dashboard";
// //       return NextResponse.redirect(url);
// //     } catch (err) {
// //       return NextResponse.next();
// //     }
// //   }

// //   // Protect dashboard
// //   if (url.pathname.startsWith("/dashboard") && !token) {
// //     url.pathname = "/login";
// //     return NextResponse.redirect(url);
// //   }

// //   return NextResponse.next();
// // }

// // export const config = {
// //   matcher: ["/login"],
// // };


// export function middleware(req) {
//   const token = req.cookies.get("token")?.value;
//   const url = req.nextUrl.clone();

//   // Already logged in → redirect login → dashboard
//   if (url.pathname === "/login" && token) {
//     url.pathname = "/dashboard";
//     return NextResponse.redirect(url);
//   }

//   // Protect dashboard → redirect to login if token missing
//   if (url.pathname.startsWith("/dashboard") && !token) {
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/login", "/dashboard/:path*"],
// };


// // import { NextResponse } from "next/server";

// export function middleware(request) {
//   const isAdmin = false; // check cookie / token

//   if (!isAdmin && request.nextUrl.pathname.startsWith("/admin")) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }
// }



// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// export function middleware(req) {
//   const token = req.cookies.get("token")?.value;
//   const { pathname } = req.nextUrl;

//   // 🔐 If user is logged in and tries to access login → dashboard
//   if (pathname === "/login" && token) {
//     // const decoded = jwt.verify(token, JWT_SECRET);

//   // if(decoded.role === "admin"){
//   //    return NextResponse.redirect(new URL("/admin", req.url));
//   // }
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }

//   // 🔐 Protect dashboard (user must be logged in)
//   if (pathname.startsWith("/dashboard") && !token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   // 🔐 Protect admin page (admin only)
//   if (pathname.startsWith("/admin")) {
//     if (!token) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }

//     try {
//       const decoded = jwt.verify(token, JWT_SECRET);

//       // ❌ Not admin → block
//       if (decoded.role !== "admin") {
//         return NextResponse.redirect(new URL("/dashboard", req.url));
//       }
//     } catch (err) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }

//   return NextResponse.next();
// }

// // ✅ Apply middleware only where needed
// export const config = {
//   matcher: [
//     "/login",
//     "/dashboard/:path*",
//     "/admin/:path*",
//   ],
// };


















// ....




// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "secretkey";



// export function middleware(req) {
//   const token = req.cookies.get("token")?.value;
//   const { pathname } = req.nextUrl;

//   // Login page
//   if (pathname === "/login" && token) {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     return NextResponse.redirect(
//       new URL(decoded.user.role === "admin" ? "/admin" : "/dashboard", req.url)
//     );
//   }

//   // Protect dashboard
//   if (pathname.startsWith("/dashboard")) {
//     if (!token) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
//     if (decoded.user.role === "admin") {
//       return NextResponse.redirect(new URL("/admin", req.url));
//     }
//   }

//   // Protect admin
//   if (pathname.startsWith("/admin")) {
//     if (!token) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
//     if (decoded.user.role !== "admin") {
//       return NextResponse.redirect(new URL("/dashboard", req.url));
//     }
//   }

//   return NextResponse.next();
// }


import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "secretkey");

  let payload = null;

  // 1. Try to verify the token ONLY if it exists
  if (token) {
    try {
      const verified = await jwtVerify(token, secret);
      payload = verified.payload;

      // NOW you can print safely to the console
      console.log("--- User Decoded ---");
      console.log("Name:", payload.name);
      console.log("Role:", payload.role);
    } catch (err) {
      console.log("Token verification failed:", err.message);
      // If token is fake/expired, treat user as logged out
    }
  }

  // 2. Logic: Redirect logged-in users away from /login
  if (pathname === "/login" && payload) {
    const target = payload.role === "admin" ? "/admin" : "/dashboard";
    return NextResponse.redirect(new URL(target, req.url));
  }

  // 3. Logic: Protect /dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!payload) return NextResponse.redirect(new URL("/login", req.url));
    
    // Redirect Admin away from standard dashboard
    if (payload.role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  // 4. Logic: Protect /admin
  if (pathname.startsWith("/admin")) {
    if (!payload) return NextResponse.redirect(new URL("/login", req.url));

    // Redirect regular users away from admin area
    if (payload.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/admin/:path*"],
};