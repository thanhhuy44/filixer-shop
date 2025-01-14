"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import * as React from "react";

import { DataTable } from "@/components/DataTable";
import { Order, ProductOrder } from "@/types";
import { formatMoney } from "@/utils/helpers";

function OrderTable({ order }: { order: Order }) {
  const columns: ColumnDef<ProductOrder>[] = [
    {
      accessorKey: "product",
      header: "Product",
      cell: ({ row }) => (
        <div className="flex items-center gap-x-2">
          <Image
            src={row.original.product.thumbnails[0].url}
            alt={row.original.product.name}
            width={200}
            height={200}
            className="size-10 rounded-md object-cover object-center md:size-14 lg:size-20"
          />
          <h6 className="min-w-[160px] text-sm font-medium md:text-base">
            {row.original.product.name}
          </h6>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <p>{formatMoney(row.original.product.price)}</p>,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => <p>{row.original.amount}</p>,
    },
    {
      accessorKey: "total",
      header: "Total Price",
      cell: ({ row }) => (
        <p>{formatMoney(row.original.amount * row.original.product.price)}</p>
      ),
    },
  ];

  return <DataTable columns={columns} data={order.orderProducts} />;
}

export default OrderTable;
