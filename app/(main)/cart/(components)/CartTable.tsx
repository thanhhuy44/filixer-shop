"use client";

import { Trash } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";
import { useLocalStorage } from "@uidotdev/usehooks";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import Button from "@/components/Button";
import { DataTable } from "@/components/DataTable";
import QuantityInput from "@/components/QuantityInput";
import { ProductCart } from "@/types";
import { formatMoney } from "@/utils/helpers";

// const HEADs = ["Product", "Price", "Quantity", "Total"];

export default function CartTable() {
  const [cartItems, setCartItems] = useLocalStorage<ProductCart[]>("cart", []);
  const subTotal = cartItems.length
    ? cartItems.reduce(
        (prev, curr) => prev + curr.amount * curr.product.price,
        0
      )
    : 0;

  const columns: ColumnDef<ProductCart>[] = [
    {
      accessorKey: "product",
      header: "Product",
      cell: ({ row }) => (
        <div className="flex items-center gap-x-2">
          <Image
            width={500}
            height={500}
            src={row.original.product.thumbnails[0].url}
            alt=""
            className="size-20 rounded-lg object-cover object-center"
          />
          <span>{row.original.product.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <p>
          <span className="text-xs text-gray-400 line-through">
            {formatMoney(row.original.product.originPrice)}
          </span>
          {"   "}
          <strong className="">
            {formatMoney(row.original.product.price)}
          </strong>
        </p>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <QuantityInput
          value={row.original.amount}
          min={0}
          onValueChange={(value) => {
            setCartItems((prev) =>
              prev.map((item) =>
                item.variant._id === row.original.variant._id
                  ? { ...item, amount: value }
                  : item
              )
            );
          }}
        />
      ),
    },
    {
      accessorKey: "action",
      header: "",
      cell: ({ row }) => (
        <button
          onClick={() => {
            setCartItems((prev) =>
              prev.filter(
                (item) => item.variant._id !== row.original.variant._id
              )
            );
          }}
          className="hover:text-red-500"
        >
          <Trash size={24} />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={cartItems} />
      <div>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-end gap-x-10 gap-y-4">
            <div>
              <strong>Sub-total*: </strong>
              <strong className="text-primary-100">
                {formatMoney(subTotal)}
              </strong>
            </div>
            <div>
              <Link href="/checkout?type=cart">
                <Button disabled={subTotal <= 0}>Check out</Button>
              </Link>
            </div>
          </div>
          <p className="text-right text-xs italic text-gray-500">
            {"(*)Tax and shipping cost will be calculated later"}
          </p>
        </div>
      </div>
    </div>
  );
}
