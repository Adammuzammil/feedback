"use client";
import { Button } from "@/components/ui/button";
import { getStripe } from "@/lib/stripe-client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  price: string;
};

const SubscribeButton = ({ price }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async (price: string) => {
    setLoading(true);
    setError(null); // Reset any previous errors
    try {
      const response = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      });

      // Check if the response is ok
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Checkout session creation failed");
      }

      const { sessionId } = await response.json();

      const stripe = await getStripe();
      if (stripe) {
        stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error(error);
      // Ensure error is set with a meaningful message
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <Button
      onClick={() => handleCheckout(price)}
      className="bg-indigo-700"
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </>
      ) : (
        "Subscribe"
      )}
    </Button>
  );
};

export default SubscribeButton;
