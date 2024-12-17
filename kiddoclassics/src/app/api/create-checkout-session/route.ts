import { NextResponse } from "next/server";
import Stripe from "stripe";
import https from "https";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

// Custom HTTPS Agent for bypassing SSL verification locally
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Temporarily bypass SSL verification (local only)
});

export async function POST(req: Request) {
  console.log("ENV Check: SUPABASE_URL:", process.env.SUPABASE_URL);
  console.log("ENV Check: SUPABASE_ANON_KEY:", process.env.SUPABASE_ANON_KEY);

  try {
    // Parse the request body
    const { childName, genre, theme } = await req.json();
    console.log("Received Data:", { childName, genre, theme });

    if (!childName || !genre || !theme) {
      console.error("Validation Error: Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create Stripe Checkout Session
    console.log("Creating Stripe Checkout Session...");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Custom Song for ${childName}`,
              description: `A ${genre} song about ${theme}.`,
            },
            unit_amount: 1999, // $19.99
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.DOMAIN_URL}/success`,
      cancel_url: `${process.env.DOMAIN_URL}/`,
    });

    console.log("Stripe Checkout Session Created:", session.id);

    // Insert into Supabase using a direct fetch request
    console.log("Inserting Data into Supabase...");
    const insertResponse = await fetch(`${process.env.SUPABASE_URL}/rest/v1/sessions`, {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      agent: httpsAgent, // Bypass SSL for local development
      body: JSON.stringify({
        session_id: session.id,
        child_name: childName,
        genre: genre,
        theme: theme,
      }),
    });

    const insertData = await insertResponse.json();

    if (!insertResponse.ok) {
      console.error("Supabase Insert Error:", insertData);
      return NextResponse.json(
        { error: `Failed to write to Supabase: ${insertData.message || "Unknown error"}` },
        { status: 500 }
      );
    }

    console.log("Data Successfully Inserted into Supabase");

    // Return Stripe Checkout URL
    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error(
      "Unexpected Server Error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
