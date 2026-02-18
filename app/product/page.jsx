// "use client";

// import Image from "next/image";

// const products = [
// //   { id: 1, name: "Wireless Headphones", price: 2999, rating: 4.5, image: "/headphones.jpg" },
// //   { id: 2, name: "Smart Watch", price: 4999, rating: 4.2, image: "/watch.jpg" },
// //   { id: 3, name: "Bluetooth Speaker", price: 1999, rating: 4.6, image: "/speaker.jpg" },
//   { id: 1, name: "Gaming Mouse", price: 1499, rating: 4.4, image: "/mouse.jpg" },
//   { id: 2, name: "Gaming Mouse", price: 1499, rating: 4.4, image: "/mouse.jpg" },
//   { id: 3, name: "Gaming Mouse", price: 1499, rating: 4.4, image: "/mouse.jpg" },
//   { id: 4, name: "Gaming Mouse", price: 1499, rating: 4.4, image: "/mouse.jpg" },
//   { id: 5, name: "Gaming Mouse", price: 1499, rating: 4.4, image: "/mouse.jpg" },
//   { id: 6, name: "Gaming Mouse", price: 1499, rating: 4.4, image: "/mouse.jpg" },
// //   { id: 5, name: "Keyboard", price: 999, rating: 4.3, image: "/keyboard.jpg" },
// ];

// export default function ProductsPage() {
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>

//       {/* Products Row */}
//       <div className="flex flex-wrap justify-center gap-4">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 w-1/5 min-w-[180px]"
//           >
//             <Image
//               src={product.image}
//               alt={product.name}
//               width={150}
//               height={150}
//               className="rounded-lg mx-auto"
//             />

//             <h2 className="mt-2 text-lg font-semibold text-center">
//               {product.name}
//             </h2>

//             <p className="text-green-600 font-bold mt-1 text-center">
//               ₹ {product.price}
//             </p>

//             <p className="text-yellow-500 text-sm text-center">
//               ⭐ {product.rating}
//             </p>

//             <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-1 rounded-lg">
//               View
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }






// import { connectDB } from "@/lib/db"
// import Product from "@/models/Product";
// import Image from "next/image";
// import Link from "next/link";
// import { connect } from "node:http2";

// export default async function ProductsPage() {
//   await connectDB()
//   const products = await Product.find({}).lean();

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>

//       <div className="flex flex-wrap justify-center gap-4">
//         {products.map((product) => (
//           <Link
//             href={`/product/${product._id}`}
//             key={product._id}
//             className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 w-1/5 min-w-[180px]"
//           >
//             <Image
//               src={product.image}
//               alt={product.name}
//               width={150}
//               height={150}
//               className="rounded-lg mx-auto"
//             />

//             <h2 className="mt-2 text-lg font-semibold text-center">
//               {product.name}
//             </h2>

//             <p className="text-green-600 font-bold mt-1 text-center">
//               ₹ {product.price}
//             </p>

//             <p className="text-yellow-500 text-sm text-center">
//               ⭐ {product.rating}
//             </p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }






// app/product/page.jsx
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Image from "next/image";
import Link from "next/link";
// import { useState } from "react";

export default async function ProductsPage() {
    // const [products, setProducts] = useState([]);
  // Connect to MongoDB
  await connectDB();

  // Fetch all products
  const products = await Product.find({}).lean();
// setProducts( await Product.findMany({}).lean());

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>

      <div className="flex flex-wrap justify-center gap-4">
        {products.map((product) => (
          <Link
            href={`/product/${product._id}`}
            key={product._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 w-1/5 min-w-[180px] flex flex-col items-center"
          >
            {/* Only render Image if product.image exists, else show fallback */}
            <Image
              src={product.image || "/mouse.jpg"} // fallback.png should be in public folder
              alt={product.name || "Product Image"}
              width={150}
              height={150}
              className="rounded-lg mx-auto"
            />

            <h2 className="mt-2 text-lg font-semibold text-center">
              {product.name || "Unnamed Product"}
            </h2>

            <p className="text-green-600 font-bold mt-1 text-center">
              ₹ {product.price ?? "N/A"}
            </p>

            <p className="text-yellow-500 text-sm text-center">
              ⭐ {product.rating ?? 0}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
