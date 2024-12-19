import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabaseClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function POST(req: NextRequest) {
  console.log("ENV Check: SUPABASE_URL:", process.env.SUPABASE_URL);

  try {
    // Parse request body
    const { childName, genre, theme, email } = await req.json();
    console.log("Received Data:", { childName, genre, theme, email });

    if (!childName || !genre || !theme || !email) {
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
      customer_email: email,
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

    // Insert data into Supabase
    console.log("Inserting Data into Supabase...");
    const { error: supabaseError } = await supabase.from("sessions").insert([
      {
        session_id: session.id,
        child_name: childName,
        genre,
        theme,
        email,
        status: "pending_payment",
      },
    ]);

    if (supabaseError) {
      console.error("Supabase Insert Error:", supabaseError.message);
      return NextResponse.json(
        { error: `Failed to write to Supabase: ${supabaseError.message}` },
        { status: 500 }
      );
    }

    console.log("Data Successfully Inserted into Supabase");

    // Return Stripe Checkout URL
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Unexpected Server Error:", error.message || error);
    return NextResponse.json(
      { error: `Unexpected server error: ${error.message}` },
      { status: 500 }
    );
  }
}
