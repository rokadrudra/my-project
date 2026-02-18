import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const cartCookie = cookieStore.get("cart");

  const cart = cartCookie ? JSON.parse(cartCookie.value) : [];

  return NextResponse.json({
    success: true,
    cart,
  });
}

export async function POST(req) {
  const { productId, qty = 1 } = await req.json();

  const cookieStore = cookies();
  const cartCookie = cookieStore.get("cart");

  let cart = cartCookie ? JSON.parse(cartCookie.value) : [];

  const existing = cart.find((i) => i.productId === productId);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ productId, qty });
  }

  cookieStore.set("cart", JSON.stringify(cart), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ success: true });
}
