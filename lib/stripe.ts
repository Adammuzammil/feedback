import Stripe from "stripe";

console.log(process.env.SECRET_KEY);

export const stripe = new Stripe(process.env.SECRET_KEY! || "", {
  apiVersion: "2024-10-28.acacia",
  typescript: true,
});
