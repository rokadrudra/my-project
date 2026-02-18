import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  description: { type: String },
  image: { type: String, required: true }, // Cloud image URL
});

// Avoid recompiling model
export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
