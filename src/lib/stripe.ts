import Stripe from "stripe";

// Initialize the Stripe client
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia", // Update to the correct API version
});
