import React from "react";

import { ApiResponse, Collection, Product } from "@/types";
import { serverFetch } from "@/utils/server-fetch";

import Hero from "./(components)/Hero";
import LearnMore from "./(components)/LearnMore";
import Popular from "./(components)/Popular";
import Products from "./(components)/Products";
import Review from "./(components)/Review";

const getLatestProducts = async (): Promise<Product[]> => {
  try {
    const response = await serverFetch("/products");
    return response.data;
  } catch (e) {
    const error = e as ApiResponse;
    console.error("🚀 ~ getLatestProducts ~ error:", error);
    throw new Error("Failed to fetch latest products!");
  }
};

const getPopular = async (): Promise<Collection> => {
  try {
    const response = await serverFetch("/shop-collections/info/popular");
    return response.data;
  } catch (e) {
    const error = e as ApiResponse;
    console.error("🚀 ~ getPopular ~ error:", error);
    throw new Error("Failed to fetch popular collection!");
  }
};

export default async function Page() {
  const latestProduct = await getLatestProducts();
  const popular = await getPopular();
  return (
    <main>
      <Hero />
      <Products data={latestProduct} />
      <LearnMore />
      <Review />
      <Popular data={popular.products} />
    </main>
  );
}
