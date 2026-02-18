import connectToDB from "@/lib/mongodb";
import Product from "@/models/Product";

async function seed() {
  await connectToDB();

  await Product.deleteMany({}); // remove existing

  await Product.insertMany([
    {
      name: "Wireless Headphones",
      price: 2999,
      rating: 4.5,
      description: "High-quality headphones with noise cancellation.",
      image: "/mouse.jpg",
    },
    {
      name: "Smart Watch",
      price: 4999,
      rating: 4.2,
      description: "Stylish smartwatch with multiple features.",
      image: "/mouse.jpg",
    },
    {
      name: "Bluetooth Speaker",
      price: 1999,
      rating: 4.6,
      description: "Portable speaker with amazing sound quality.",
      image: "/mouse.jpg",
    },
  ]);

  console.log("Seeded products ✅");
}

seed()
  .then(() => process.exit()) // exit after seeding
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
