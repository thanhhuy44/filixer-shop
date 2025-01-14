import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import React from "react";

import Button from "@/components/Button";
import { ApiResponse, EOrderStatus, Order } from "@/types";
import request from "@/utils/axiosClient";

const getOrder = async (id: string): Promise<Order> => {
  try {
    const response = await request.get("/orders/" + id);
    return response.data;
  } catch (e) {
    const error = e as ApiResponse;
    if (error.statusCode === 404) {
      return notFound();
    }
    throw new Error("Failed to fetch order!");
  }
};

export default async function Page({
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
  const orderData = await getOrder(order);

  if (orderData.status !== EOrderStatus.CANCEL) {
    return redirect("/");
  }

  return (
    <main className="flex-1 bg-gray-100">
      <div className="container py-8 md:py-10 lg:py-14 xl:py-20">
        <div className="flex w-full flex-col items-center gap-y-10 rounded-md bg-white px-4 py-10">
          <div className="text-center">
            <CheckCircle size={80} className="mx-auto text-primary-100" />
            <h1 className="text-3xl font-medium">Cancel success!</h1>
            <p className="text-primary-100">Order ID: #{order}</p>
          </div>
          <p className="mx-auto w-full max-w-4xl text-center text-gray-500">
            If you have any questions or need further assistance, please contact
            our support team.
          </p>
          <Link href="/">
            <Button>Back to shopping</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
