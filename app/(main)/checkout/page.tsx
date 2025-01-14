import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const OrderForm = dynamic(() => import("./(components)/OrderForm"), {
  ssr: false,
});
const ProductSummary = dynamic(() => import("./(components)/ProductSummary"), {
  ssr: false,
});

export default function Page({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) {
  const type = searchParams.type;
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[70vh] items-center justify-center">
          <CircleNotch
            className="size-8 animate-spin text-primary-100"
            weight="bold"
          />
        </main>
      }
    >
      <main className="relative py-8 md:py-10 lg:py-14 xl:py-20">
        <div className="absolute inset-0 z-0 hidden grid-cols-2 md:grid">
          <span className="bg-white"></span>
          <span className="bg-gray-100"></span>
        </div>
        <div className="container relative z-10 grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2 xl:gap-x-20 2xl:gap-x-40">
          <OrderForm type={type} />
          <ProductSummary type={type} />
        </div>
      </main>
    </Suspense>
  );
}
