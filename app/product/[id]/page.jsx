
// // import { connectDB } from "@/lib/db"
// // import Product from "@/models/Product";
// // import Image from "next/image";

// // export default async function ProductPage({ params }) {
// //   const { id } = await params;

// //   await connectDB()
// //   const product = await Product.findById(id);

// //   if (!product) {
// //     return <p className="text-center mt-10">Product not found!</p>;
// //   }

// //   return (
    
// //     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
// //       <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-8 grid md:grid-cols-2 gap-8">
// //         {/* Image */}
// //         <div className="flex justify-center">
// //           <Image
// //             src={product.image}
// //             alt={product.name}
// //             width={350}
// //             height={350}
// //             className="rounded-lg"
// //           />
// //         </div>

// //         {/* Info */}
// //         <div>
// //           <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

// //           <p className="text-green-600 text-2xl font-semibold mt-2">
// //             ₹ {product.price}
// //           </p>

// //           <p className="text-yellow-500 mt-2">⭐ {product.rating} / 5</p>

// //           <p className="text-gray-600 mt-4">{product.description}</p>

// //           <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
// //             Add to Cart
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import { connectDB } from "@/lib/db";
// import Product from "@/models/Product";
// import Image from "next/image";
// import AddToCartButton from "@/components/AddToCartButton";

// export default async function ProductPage({ params }) {
//   // const { id } = await params;

//   // const router = useRouter();
//   // await connectDB();
//   // const product = await Product.findById(id);

//   // if (!product) {
//   //   return <p className="text-center mt-10">Product not found!</p>;
//   // }

//   // const card  =  (e) => {
//   //   e.preventDefault();
//   //   router.push(`/cart/${id}`);
//   // }
//     const { id } = await params;

//   await connectDB();
//   const product = await Product.findById(id).lean(); // .lean() faster performance mate

//   if (!product) {
//     return <p className="text-center mt-10 text-red-500">Product not found!</p>;
//   }


//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-8 grid md:grid-cols-2 gap-8">

//         <div className="flex justify-center">
//           {product.image ? (
//             <Image
//               src={product.image}
//               alt={product.name}
//               width={350}
//               height={350}
//               className="rounded-lg"
//             />
//           ) : (
//             <Image
//               src="/mouse.jpg"
//               alt="No image"
//               width={350}
//               height={350}
//               className="rounded-lg"
//             />
            
//           )}
//         </div>

//         <div>
//           <h1 className="text-3xl font-bold">{product.name}</h1>
//           <p className="text-green-600 text-2xl mt-2">₹ {product.price}</p>
//           <p className="text-yellow-500 mt-2">⭐ {product.rating} / 5</p>
//           <p className="text-gray-600 mt-4">{product.description}</p>
//          <AddToCartButton id={id} />        </div>
//       </div>
//     </div>
//   );
// }



