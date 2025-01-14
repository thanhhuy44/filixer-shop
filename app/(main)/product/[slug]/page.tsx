import { notFound } from "next/navigation";
import React from "react";

import { ApiResponse, Product, ProductInventory } from "@/types";
import request from "@/utils/axiosClient";

import ProductInfo from "./(components)/ProductInfo";
import ProductSwiper from "./(components)/ProductSwiper";

const getData = async (slug: string): Promise<Product> => {
  try {
    const response: ApiResponse = await request.get("/products/info/" + slug);
    return response.data;
  } catch (e) {
    console.log("🚀 ~ getData ~ error:", e);
    const error = e as ApiResponse;
    if (error.statusCode === 404) {
      throw notFound();
    }
    throw new Error("Failed to fetch product!");
  }
};

const getInventories = async (id: string): Promise<ProductInventory[]> => {
  try {
    const response: ApiResponse = await request.get(
      "/products/inventories/" + id
    );
    return response.data;
  } catch (error) {
    console.log("🚀 ~ getData ~ error:", error);
    throw new Error("Failed to fetch product!");
  }
};

export default async function page({ params }: { params: { slug: string } }) {
  const product = await getData(params.slug);
  const inventories = await getInventories(product._id);
  return (
    <main className="py-8 md:py-10 lg:py-14 xl:py-20">
      <section className="container grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
        <ProductSwiper images={product.thumbnails} />
        <ProductInfo product={product} inventories={inventories} />
      </section>
      <section></section>
    </main>
  );
}
