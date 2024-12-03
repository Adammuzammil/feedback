"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ManageSubscription = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //   const redirectToCustomerPortal = async () => {
  //     setLoading(true);
  //     setError(null); // Reset any previous errors
  //     try {
  //       const { url } = await fetch("/api/stripe/create-portal", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }).then((res) => res.json());

  //       console.log("url", url);

  //       router.push(url);
  //     } catch (error) {
  //       console.error(error);
  //       // Ensure error is set with a meaningful message
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const handleSubs = () => {};

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <Button className="bg-indigo-700" disabled={loading}>
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </>
      ) : (
        <Link href={process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL!}>
          Manage your subscription
        </Link>
      )}
    </Button>
  );
};

export default ManageSubscription;
