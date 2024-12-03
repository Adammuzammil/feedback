import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { price, quantity = 1 } = await req.json();
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401,
      }
    );
  }

  const userSubscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  });
  let customer;
  if (userSubscription) {
    // get the stripe customer
    customer = {
      id: userSubscription.stripeCustomerId,
    };
  } else {
    // create user subscription
    const customerData: {
      metadata: {
        dbId: string;
      };
    } = {
      metadata: {
        dbId: userId,
      },
    };

    const response = await stripe.customers.create(customerData);

    customer = { id: response.id };

    await db.insert(subscriptions).values({
      userId,
      stripeCustomerId: customer.id,
    });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  if (!customer?.id) {
    return NextResponse.json(
      { error: "Failed to get a customer id" },
      { status: 500 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${baseUrl}/payments/checkout-success`,
      customer: customer?.id,
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price,
          quantity,
        },
      ],
    });

    if (session) {
      return NextResponse.json(
        { sessionId: session.id },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to create a session" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create a session" },
      { status: 500 }
    );
  }
}
