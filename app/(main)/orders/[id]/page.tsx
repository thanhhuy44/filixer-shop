import { notFound } from "next/navigation";
import * as React from "react";

import { ApiResponse, Order } from "@/types";
import request from "@/utils/axiosClient";
import { formatMoney } from "@/utils/helpers";

import CancelOrder from "../(components)/CancelOrder";
import OrderTable from "../(components)/OrderTable";

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

async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const id = params.id;
  const order = await getOrder(id);

  return (
    <main className="container space-y-8 py-10">
      <section>
        <h1 className="text-center text-3xl font-bold">Order Detail</h1>
        <p className="mt-3 text-center lg:mt-6">
          Status:{" "}
          <span className="font-semibold capitalize">
            {order.status.toLowerCase()}
          </span>
        </p>
      </section>
      <section>
        <OrderTable order={order} />
        <div className="mt-5 overflow-hidden">
          <div className="grid rounded-md border sm:grid-cols-2">
            <div className="p-2 md:p-4">
              <table>
                <tbody>
                  <tr className="text-xs md:text-sm">
                    <td className="px-2 py-1">Full Name:</td>
                    <td className="px-2 py-1">
                      <strong>{order.recipientName}</strong>
                    </td>
                  </tr>
                  <tr className="text-xs md:text-sm">
                    <td className="px-2 py-1">Email:</td>
                    <td className="px-2 py-1">
                      <strong>{order.email}</strong>
                    </td>
                  </tr>
                  <tr className="text-xs md:text-sm">
                    <td className="px-2 py-1">Phone:</td>
                    <td className="px-2 py-1">
                      <strong>{order.phoneNumber}</strong>
                    </td>
                  </tr>
                  <tr className="text-xs md:text-sm">
                    <td className="px-2 py-1">Province:</td>
                    <td className="px-2 py-1">
                      <strong>{order.province}</strong>
                    </td>
                  </tr>
                  <tr className="text-xs md:text-sm">
                    <td className="px-2 py-1">District:</td>
                    <td className="px-2 py-1">
                      <strong>{order.district}</strong>
                    </td>
                  </tr>
                  <tr className="text-xs md:text-sm">
                    <td className="px-2 py-1">Ward:</td>
                    <td className="px-2 py-1">
                      <strong>{order.wardOrCommune}</strong>
                    </td>
                  </tr>
                  {order.address ? (
                    <tr className="text-xs md:text-sm">
                      <td className="px-2 py-1">Address:</td>
                      <td className="px-2 py-1">
                        <strong>{order.address}</strong>
                      </td>
                    </tr>
                  ) : null}
                  {order.shippingNote ? (
                    <tr className="text-xs md:text-sm">
                      <td className="px-2 py-1">Note:</td>
                      <td className="px-2 py-1">
                        <strong>{order.shippingNote}</strong>
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
            <div className="p-2 max-sm:order-first max-sm:border-b sm:border-l md:p-4">
              <table>
                <tbody>
                  <tr className="text-xs md:text-sm">
                    <td className="px-2 py-1">Products Price:</td>
                    <td className="px-2 py-1">
                      <strong>{formatMoney(order.totalPrice)}</strong>
                    </td>
                  </tr>
                  <tr className="text-xs md:text-sm">
                    <td className="px-2 py-1">Shipping fee:</td>
                    <td className="px-2 py-1">
                      <strong>{formatMoney(30000)}</strong>
                    </td>
                  </tr>
                  <tr className="text-xs md:text-sm">
                    <td className="px-2 py-1">Total:</td>
                    <td className="px-2 py-1">
                      <strong>{formatMoney(order.totalPrice + 30000)}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section>
        <CancelOrder order={order} />
      </section>
    </main>
  );
}

export default Page;
