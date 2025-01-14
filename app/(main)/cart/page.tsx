import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

const CartTable = dynamic(() => import("./(components)/CartTable"), {
  ssr: false,
});

export default function Page() {
  return (
    <main className="py-8 lg:py-10">
      <section className="space-y-3">
        <h1 className="text-center text-3xl font-bold">Your cart items</h1>
        <div className="mx-auto w-fit">
          <Link
            href="/"
            className="mx-auto mt-2 text-center text-lg text-primary-100 underline xl:mt-4"
          >
            Back to shopping
          </Link>
        </div>
      </section>
      <section className="container mt-8 min-h-[50vh]">
        <CartTable />
      </section>
    </main>
  );
}
