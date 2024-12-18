import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabaseClient";

// Configuration to disable body parsing by Next.js for raw webhook body
export const config = { api: { bodyParser: false } };

// Stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

// Helper to convert request body to Buffer
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
    // Convert raw body into Buffer
    const rawBody = await getRawBody(req);

    // Validate the webhook event
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

  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Checkout session completed:", session.id);

      // Retrieve email from session payload or fetch additional details if missing
      let customerEmail =
        session.customer_details?.email || session.customer_email || null;

      if (!customerEmail) {
        console.log("Email not found in session, fetching full session details...");
        const fullSession = await stripe.checkout.sessions.retrieve(session.id);
        customerEmail =
          fullSession.customer_details?.email || fullSession.customer_email || null;

        if (!customerEmail && fullSession.customer) {
          console.log("Fetching customer details...");
          const customer = (await stripe.customers.retrieve(
            fullSession.customer as string
          )) as Stripe.Customer;
          customerEmail = customer.email || null;
        }
      }

      console.log(`Resolved Customer Email: ${customerEmail}`);

      // Update Supabase with email and status
      const { error: supabaseError } = await supabase
        .from("sessions")
        .update({ email: customerEmail, status: "pending_generation" })
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

  // Acknowledge the event
  return NextResponse.json({ received: true }, { status: 200 });
}
