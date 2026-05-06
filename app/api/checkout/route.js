import { Client, Environment } from "square";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Connect to Square Sandbox
    const client = new Client({
      environment: Environment.Sandbox, 
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
    });

    // Create the $9.00 Checkout Link
    const response = await client.checkoutApi.createPaymentLink({
      idempotencyKey: crypto.randomUUID(), // Prevents duplicate charges
      quickPay: {
        name: "Unlock Legal Deduction PDF",
        priceMoney: {
          amount: BigInt(900), // FIX: Square strictly requires BigInt for money!
          currency: "USD" 
        },
        locationId: process.env.SQUARE_LOCATION_ID
      }
    });

    // Return the secure URL to the frontend
    return NextResponse.json({ url: response.result.paymentLink.url });
    
  } catch (error) {
    console.error("Square Error:", error);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
