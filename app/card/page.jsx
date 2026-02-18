// "use client";
// import { cookies } from "next/headers";
// import { connectDB } from "@/lib/db";
// import Product from "@/models/Product";
// import { useEffect, useState } from "react";

// export default async function CartPage() {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         async function fetchUser() {
//             const res = await fetch("/api/cart", {
//                 method: "GET",
//                 headers: { "Content-Type": "application/json" },
//             });
//             const data = await res.json();

//             // console.log(data);
//             // console.log(data.user);
//             // console.log(data.user.name);
//             // alert("Welcome to the dashboard, " + data.user.name);

//             // console.log("vbhdsvsdjvbhbj nihsdjcv njdk iuvsn nn");
//             if (!data.success) {
//                 window.location.replace("/login"); // redirect if token invalid
//             } else {
//                 setUser(data.user); // set user data
//             }
//         }
//         fetchUser();
//     }, []);



//   return (
//     <div className="p-10">
//       <h1 className="text-2xl font-bold">Cart</h1>

//       {products.map((p) => {
//         const item = cart.find((i) => i.productId === p._id.toString());

//         return (
//           <div key={p._id} className="border p-4 mt-4">
//             <h2>{p.name}</h2>
//             <p>₹ {p.price}</p>
//             <p>Qty: {item.qty}</p>
//             <p>Total: ₹ {p.price * item.qty}</p>
//           </div>
//         );
//       })}
//     </div>
//   );
// }


import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export default async function CartPage() {
  await connectDB();

  const cookieStore = cookies();
  const cartCookie = cookieStore.get("cart");
  const cart = cartCookie ? JSON.parse(cartCookie.value) : [];

  if (cart.length === 0) {
    return <p className="p-10">Cart is empty</p>;
  }

  const productIds = cart.map((i) => i.productId);
  const products = await Product.find({ _id: { $in: productIds } }).lean();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Cart</h1>

      {products.map((p) => {
        const item = cart.find((i) => i.productId === p._id.toString());

        return (
          <div key={p._id} className="border p-4 mt-4">
            <h2>{p.name}</h2>
            <p>₹ {p.price}</p>
            <p>Qty: {item.qty}</p>
            <p>Total: ₹ {p.price * item.qty}</p>
          </div>
        );
      })}
    </div>
  );
}
