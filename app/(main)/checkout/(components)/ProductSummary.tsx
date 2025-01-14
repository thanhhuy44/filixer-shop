"use client";

import { useLocalStorage } from "@uidotdev/usehooks";
import Image from "next/image";
import React from "react";

import Button from "@/components/Button";
import { ProductCart } from "@/types";

export default function ProductSummary({ type = "cart" }: { type?: string }) {
  const [cart] = useLocalStorage<ProductCart[]>("cart", []);
  const [directCart] = useLocalStorage<ProductCart>("direct-cart");

  const productItems = type === "cart" ? cart : [directCart];
  const subTotal = productItems.length
    ? productItems.reduce(
        (prev, curr) => prev + curr.amount * curr.product.price,
        0
      )
    : 0;

  const ship = 30000;

  return (
    <div className="order-first flex flex-col gap-y-3 sm:gap-y-4 md:order-none lg:gap-y-8">
      {/* product list */}
      <div className="space-y-3">
        {/* product item */}
        {productItems.map((item, index) => (
          <div key={index} className="flex items-center gap-x-4">
            <div className="relative">
              <Image
                loading="lazy"
                src={item.product.thumbnails[0].url}
                alt="product-image"
                width={120}
                height={120}
                className="aspect-square size-24 rounded-md object-cover object-center"
              />
              <div className="absolute right-0 top-0 flex aspect-square min-w-5 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-primary-100">
                <p className="text-sm leading-none text-white">{item.amount}</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="line-clamp-2 text-base font-medium">
                {item.product.name}
              </p>
            </div>
            <div>
              <p className="text-xl font-semibold text-primary-100">
                {item.product.price}
              </p>
            </div>
          </div>
        ))}

        {/*  */}
      </div>
      <span className="w-full border-t border-primary-100/50"></span>
      <div className="flex items-stretch gap-x-2">
        <input
          type="text"
          placeholder="Coupon code"
          size={1}
          className="h-10 w-fit flex-1 rounded-md border border-gray-200 px-4 text-base"
        />
        <Button>Add code</Button>
      </div>
      <span className="w-full border-t border-primary-100/50"></span>
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between gap-x-4">
          <p>Subtotal</p>
          <p>
            <strong>{subTotal}</strong>
          </p>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <p>Shipping</p>
          <p>
            <strong>{ship}</strong>
          </p>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between gap-x-4">
          <p>Total</p>
          <p className="text-2xl text-primary-100">
            <strong>{subTotal + ship}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
