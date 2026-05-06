import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // FIX: Bypassing the broken NPM package and talking DIRECTLY to Square Sandbox
    const response = await fetch("https://connect.squareupsandbox.com/v2/online-checkout/payment-links", {
      method: "POST",
      headers: {
        "Square-Version": "2024-01-18",
        "Authorization": `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idempotency_key: crypto.randomUUID(),
        quick_pay: {
          name: "Unlock Legal Deduction PDF",
          price_money: {
            amount: 900, // Standard number. No BigInt needed!
            currency: "USD"
          },
          location_id: process.env.SQUARE_LOCATION_ID
        }
      })
    });

    const data = await response.json();

    // If Square rejects the keys, this will log exactly why
    if (data.errors) {
      console.error("Square API Error:", data.errors);
      return NextResponse.json({ error: "Square rejected the request" }, { status: 500 });
    }

    // Return the secure URL to the frontend
    return NextResponse.json({ url: data.payment_link.url });
    
  } catch (error) {
    console.error("System Error:", error);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
