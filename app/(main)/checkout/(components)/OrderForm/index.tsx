"use client";

import "./styles.css";

import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { useLocalStorage } from "@uidotdev/usehooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import Button from "@/components/Button";
import Select from "@/components/Select";
import { VietNamProvinces } from "@/constants/vietnam-provinces";
import { ApiResponse, CreateOrderForm, ProductCart } from "@/types";
import { EPaymentMethod } from "@/types/enum";
import request from "@/utils/axiosClient";

export default function OrderForm({ type = "direct" }: { type: string }) {
  const router = useRouter();
  const { data } = useSession();
  const [cart] = useLocalStorage<ProductCart[]>("cart", []);
  const [directCart] = useLocalStorage<ProductCart>("direct-cart");
  const orderProducts = type === "direct" ? [directCart] : cart;
  const {
    control,
    formState: { isSubmitting },
    watch,
    setValue,
    register,
    handleSubmit,
    reset,
  } = useForm<CreateOrderForm>({
    defaultValues: {
      orderProducts: orderProducts.map((item) => ({
        product: item.product._id,
        variant: item.variant._id,
        amount: item.amount,
      })),
      user: data?.info._id,
      paymentMethod: EPaymentMethod.COD,
      totalPrice: orderProducts.length
        ? orderProducts.reduce(
            (prev, curr) => prev + curr.amount * curr.product.price,
            0
          )
        : 0,
    },
  });

  const currProvince = watch("province");
  const currDistrict = watch("district");

  const onSubmit = async (data: CreateOrderForm) => {
    try {
      const response = await request.post("/orders", { ...data });
      reset({
        address: "",
        district: "",
        email: "",
        orderProducts: [],
        paymentMethod: undefined,
        phoneNumber: "",
        province: "",
        recipientName: "",
        shippingNote: "",
        totalPrice: undefined,
        user: undefined,
        wardOrCommune: "",
      });
      router.replace("/checkout/thanks?order=" + response.data._id);
    } catch (e) {
      const error = e as ApiResponse;
      console.error("🚀 ~ onSubmit ~ error:", error);
      throw new Error("Order failed!");
    }
  };

  return (
    <div className="flex flex-col gap-y-4 sm:gap-y-6 md:gap-y-8 lg:gap-y-10 xl:gap-y-12 2xl:gap-y-14">
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-medium">Shipping information</h1>
          {/* <p className="text-sm">
            <span className="text-gray-800">Do you have an account? </span>
            <Link className="text-primary-100" href="/login">
              Login
            </Link>
          </p> */}
        </div>
        <div className="flex flex-col gap-y-3">
          <div>
            <input
              type="text"
              className="form-input"
              placeholder="Your name"
              {...register("recipientName")}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-3">
            <div>
              <input
                type="text"
                className="form-input"
                placeholder="Your email"
                {...register("email")}
              />
            </div>
            <div>
              <input
                type="text"
                className="form-input"
                placeholder="Your phone number"
                {...register("phoneNumber")}
              />
            </div>
          </div>
          <div>
            <Controller
              control={control}
              name="province"
              render={({ field: { value, onChange } }) => (
                <Select
                  className="form-input"
                  placeholder="Your Province"
                  value={value}
                  onValueChange={(value) => {
                    onChange(value);
                    setValue("district", "");
                    setValue("wardOrCommune", "");
                  }}
                  options={VietNamProvinces.map((province) => ({
                    label: province.name,
                    value: province.name,
                  }))}
                />
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-3">
            <Controller
              control={control}
              name="district"
              render={({ field: { value, onChange } }) => (
                <Select
                  className="form-input"
                  placeholder="Your District"
                  disable={!currProvince}
                  value={value}
                  onValueChange={(value) => {
                    onChange(value);
                    setValue("wardOrCommune", "");
                  }}
                  options={
                    VietNamProvinces.find(
                      (item) => item.name === currProvince
                    )?.districts.map((district) => ({
                      label: district.name,
                      value: district.name,
                    })) || []
                  }
                />
              )}
            />
            <Controller
              control={control}
              name="wardOrCommune"
              render={({ field: { value, onChange } }) => {
                const options =
                  VietNamProvinces.find(
                    (province) => province.name === currProvince
                  )?.districts.find(
                    (district) => district.name === currDistrict
                  )?.wards || [];
                return (
                  <Select
                    className="form-input"
                    placeholder="Your Ward"
                    disable={!currDistrict || !currProvince}
                    value={value}
                    onValueChange={onChange}
                    options={
                      options.length
                        ? options.map((option) => ({
                            label: option.name,
                            value: option.name,
                          }))
                        : []
                    }
                  />
                );
              }}
            />
          </div>
          <div>
            <input
              type="text"
              className="form-input"
              placeholder="Your address"
              {...register("address")}
            />
          </div>
          <div>
            <textarea
              className="form-input !h-auto py-3"
              placeholder="Shipping note (optional)"
              rows={4}
              {...register("shippingNote")}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <h1 className="text-xl font-medium">Payment method</h1>
        <div className="rounded-md border border-gray-200 p-4">
          <label
            htmlFor="COD"
            className="flex items-center gap-x-2 text-sm font-medium"
          >
            <input
              checked
              type="radio"
              id="COD"
              value="COD"
              className="w-fit"
            />
            Payment on delivery (COD)
          </label>
          <label
            htmlFor="COD-1"
            className="flex items-center gap-x-2 text-sm font-medium"
          >
            <input
              type="radio"
              id="COD-1"
              value="COD-2"
              disabled
              className="w-fit"
            />
            Visa card (coming soon)
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 items-center gap-4">
        <div>
          <Link href="/cart" className="text-sm text-primary-100 underline">
            Back to cart
          </Link>
        </div>
        <Button disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
          {isSubmitting ? (
            <CircleNotch className="mx-auto animate-spin" weight="bold" />
          ) : (
            "Order"
          )}
        </Button>
      </div>
    </div>
  );
}
