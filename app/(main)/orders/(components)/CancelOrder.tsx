"use client";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import * as React from "react";

import Button from "@/components/Button";
import { ApiResponse, EOrderStatus, Order } from "@/types";
import request from "@/utils/axiosClient";

function CancelOrder({ order }: { order: Order }) {
  const router = useRouter();
  const [loading, startTransition] = React.useTransition();

  const onCancelOrder = async () => {
    try {
      await request.patch(`/orders/${order._id}/cancel`);
      router.replace("/orders/cancel?order=" + order._id);
    } catch (e) {
      const error = e as ApiResponse;
      console.error("🚀 ~ onCancelOrder ~ error:", error);
      throw new Error("Failed to cancel order!");
    }
  };

  return (
    <div className="">
      <Button
        onClick={() => {
          startTransition(onCancelOrder);
        }}
        disabled={
          loading ||
          !(
            order.status === EOrderStatus.PROCESSING ||
            order.status === EOrderStatus.APPROVED
          )
        }
        className="float-end"
      >
        {loading ? (
          <CircleNotch className="mx-auto animate-spin" weight="bold" />
        ) : (
          "Cancel Order"
        )}
      </Button>
    </div>
  );
}

export default CancelOrder;
