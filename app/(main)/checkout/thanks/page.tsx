import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import Button from "@/components/Button";

export default function Page({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) {
  const order = searchParams.order;

  if (!order) {
    return redirect("/");
  }

  return (
    <main className="flex-1 bg-gray-100">
      <div className="container py-8 md:py-10 lg:py-14 xl:py-20">
        <div className="flex w-full flex-col items-center gap-y-10 rounded-md bg-white px-4 py-10">
          <div className="text-center">
            <CheckCircle size={80} className="mx-auto text-primary-100" />
            <h1 className="text-3xl font-medium">Order completed!</h1>
            <p className="text-primary-100">Order ID: #{order}</p>
          </div>
          <p className="mx-auto w-full max-w-4xl text-center text-gray-500">
            Thank you Joe for buying Candleaf. The nature is grateful to you.
            Now that your order is confirmed it will be ready to ship in 2 days.
            Please check your inbox in the future for your order updates.
          </p>
          <Link href="/">
            <Button>Back to shopping</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
