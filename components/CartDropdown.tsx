"use client";

import { ShoppingCartSimple, X } from "@phosphor-icons/react/dist/ssr";
import { useLocalStorage } from "@uidotdev/usehooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { ProductCart } from "@/types";

import Button, { EButton } from "./Button";
import QuantityInput from "./QuantityInput";

export default function CartDropdown() {
  const router = useRouter();
  // const { width } = useWindowSize();
  const [open] = useState<boolean>(false);
  const [cartItems, setCartItems] = useLocalStorage<ProductCart[]>("cart", []);

  return (
    <div className="relative p-1">
      {cartItems.length ? (
        <p className="absolute right-0 top-0 z-0 translate-x-[15%] translate-y-[-15%] text-sm">
          {cartItems.length}
        </p>
      ) : null}
      <button
        onClick={() => {
          router.push("/cart");
          // if ((width as number) >= 640) {
          //   setOpen((prev) => !prev);
          // }
        }}
        className="relative z-10"
        type="button"
      >
        <ShoppingCartSimple size={24} />
      </button>
      <div
        className={`absolute right-0 top-full mt-2 w-[320px] origin-top rounded-xl bg-white shadow duration-150 ${
          open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
      >
        <div className="p-4">
          {cartItems.length ? (
            <div className="space-y-2">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center gap-x-2">
                  <Image
                    src={item.product.thumbnails[0].url}
                    alt={item.product.name}
                    width={100}
                    height={100}
                    className="size-14 rounded object-cover object-center"
                  />
                  <div className="flex-1">
                    <p className="line-clamp-1 text-sm font-semibold">
                      {item.product.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="flex-1 text-xs text-gray-400">
                        Size: {item.variant.size.name} - Color:{" "}
                        {item.variant.color.name}
                      </p>
                      <div>
                        <QuantityInput
                          buttonClassName="!size-4 !text-[10px]"
                          inputClassName="!h-4 !w-6 text-[10px] !leading-none"
                          min={1}
                          value={item.amount}
                          onValueChange={(value) => {
                            setCartItems((prev) =>
                              prev.map((prevItem) =>
                                prevItem.variant._id === item.variant._id
                                  ? { ...prevItem, amount: value }
                                  : prevItem
                              )
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button
                      onClick={() => {
                        setCartItems((prev) =>
                          prev.filter(
                            (prevItem) =>
                              prevItem.variant._id !== item.variant._id
                          )
                        );
                      }}
                      variant={EButton.outline}
                      className="!border-none bg-red-400 !p-[2px] !text-white duration-150 hover:!bg-red-500"
                    >
                      <X className="size-3" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="border-t pt-3">
                <Button className="w-full">Checkout</Button>
              </div>
            </div>
          ) : (
            <div className="px-2 py-8">
              <p className="text-center text-gray-300">Empty cart!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
