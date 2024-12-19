import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabaseClient";

// Configuration to disable body parsing by Next.js for raw webhook body
export const config = { api: { bodyParser: false } };

// Stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia", // Correct API version
});

// Helper function to convert request body to a Buffer
async function getRawBody(req: NextRequest): Promise<Buffer> {
  const chunks: Uint8Array[] = [];
  const reader = req.body?.getReader();
  if (!reader) throw new Error("Readable stream not found in request");

  let done = false;
  while (!done) {
    const { value, done: isDone } = await reader.read();
    if (value) chunks.push(value);
    done = isDone;
  }
  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Webhook Error:", message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  // Handle "checkout.session.completed" event
  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("Checkout session completed:", session.id);

      // Extract customer email from session
      const email = session.customer_email;

      // Update Supabase with session status and email
      const { error: supabaseError } = await supabase
        .from("sessions")
        .update({ email, status: "completed" })
        .eq("session_id", session.id);

      if (supabaseError) {
        console.error("Supabase Update Error:", supabaseError.message);
        return NextResponse.json(
          { error: "Failed to update session in Supabase" },
          { status: 500 }
        );
      }

      console.log(`Session ${session.id} updated successfully in Supabase.`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("Processing Error:", message);
      return NextResponse.json(
        { error: `Processing Error: ${message}` },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
