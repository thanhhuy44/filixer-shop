"use client";

import { ShoppingCart } from "@phosphor-icons/react";
import Link from "next/link";
import React, { useState } from "react";

import Button, { EButton } from "@/components/Button";
import QuantityInput from "@/components/QuantityInput";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Product, ProductCart, ProductInventory } from "@/types";
import { formatMoney } from "@/utils/helpers";

export default function ProductInfo({
  product,
  inventories,
}: {
  product: Product;
  inventories: ProductInventory[];
}) {
  const { _id, colors, sizes, name, description, price, originPrice } = product;
  const [size, setSize] = useState<string>(sizes[0]?._id);
  const [color, setColor] = useState<string>(colors[0]?._id);
  const [amount, setAmount] = useState<number>(1);
  const [cartItems, setCartItems] = useLocalStorage<Array<ProductCart>>(
    "cart",
    []
  );
  const [_, setDirectCart] = useLocalStorage<ProductCart>("direct-cart");
  const onAddToCart = async () => {
    const variant = inventories.find(
      (inventory) =>
        inventory.color._id === color && inventory.size._id === size
    ) as ProductInventory;
    const existItem = cartItems.find(
      (item) => item.variant._id === variant?._id && item.product._id === _id
    );
    setCartItems((prev) =>
      existItem
        ? prev.map((item) =>
            item.product._id === existItem.product._id &&
            item.variant._id === existItem.variant._id
              ? {
                  ...item,
                  amount: item.amount + amount,
                }
              : item
          )
        : [...prev, { product, amount, variant }]
    );
  };

  return (
    <div className="flex flex-col gap-y-4 py-4 lg:py-6 xl:gap-y-8 xl:py-10">
      <h1 className="text-xl font-medium xl:text-3xl">{name}</h1>
      <div>
        <p>
          <span className="text-sm text-gray-400 line-through">
            {formatMoney(originPrice)}
          </span>
          {"  "}
          <span className="text-xl font-semibold text-primary-100 xl:text-3xl">
            {formatMoney(price)}
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-y-1 whitespace-pre-line rounded-md bg-gray-50 p-2 text-sm lg:gap-y-3 lg:text-base xl:p-4">
        {/* <p>
          <strong>Wax: </strong>
          <span className="text-gray-600">
            Top grade Soy wax that delivers a smoke less, consistent burn
          </span>
        </p>
        <p>
          <strong>Fragrance: </strong>
          <span className="text-gray-600">
            Premium quality ingredients with natural essential oils
          </span>
        </p>
        <p>
          <strong>Burning Time: </strong>
          <span className="text-gray-600">70-75 hours</span>
        </p>
        <p>
          <strong>Dimension: </strong>
          <span className="text-gray-600">10cm x 5cm</span>
        </p>
        <p>
          <strong>Weight: </strong>
          <span className="text-gray-600">400g</span>
        </p> */}
        {description}
      </div>
      <div>
        <strong className="text-sm lg:text-base">Size:</strong>
        <div className="mt-1 flex items-stretch gap-x-2 lg:mt-3">
          {sizes.map((item, index) => {
            const isActive = item._id === size;
            return (
              <button
                key={index}
                className={`flex size-7 items-center justify-center border-2 text-sm font-medium lg:size-10 lg:text-base ${
                  isActive
                    ? "border-primary-100 text-primary-100"
                    : "border-gray-500"
                }`}
                onClick={() => setSize(item._id)}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
      {colors.length ? (
        <div>
          <strong className="text-sm lg:text-base">Color:</strong>
          <div className="mt-1 flex items-stretch gap-x-4 lg:mt-3">
            {colors.map((item, index) => {
              const isActive = item._id === color;
              return (
                <button
                  key={index}
                  className={`relative flex size-7 items-center justify-center rounded-full duration-200 before:absolute before:-inset-1 before:rounded-full before:border-2 lg:size-10 ${
                    isActive
                      ? "before:border-gray-700"
                      : "before:border-gray-300"
                  }`}
                  onClick={() => setColor(item._id)}
                >
                  <span
                    style={{
                      backgroundColor: item.code,
                    }}
                    className="size-full rounded-full"
                  ></span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
      <QuantityInput
        value={amount}
        onValueChange={(value) => setAmount(value)}
      />
      <div className="mt-2 flex items-stretch gap-x-3 md:mt-4 lg:mt-8">
        <Button
          onClick={onAddToCart}
          variant={EButton.outline}
          className="flex items-center gap-x-2"
        >
          <ShoppingCart size={18} />
          <p className="hidden lg:block">Add to cart</p>
        </Button>
        <div className="flex-1">
          <Link href="/checkout?type=direct" className="block flex-1">
            <Button
              onClick={() => {
                const variant = inventories.find(
                  (inventory) =>
                    inventory.color._id === color && inventory.size._id === size
                ) as ProductInventory;
                setDirectCart({
                  amount,
                  product,
                  variant,
                });
              }}
            >
              Buy now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
