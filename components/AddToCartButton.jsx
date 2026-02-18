"use client";

export default function AddToCartButton({ productId }) {
  const addToCart = async () => {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, qty: 1 }),
    });

    alert("Added to cart");
  };

  return (
    <button
      onClick={addToCart}
      className="mt-6 bg-black text-white px-6 py-2 rounded"
    >
      Add to Cart
    </button>
  );
}
