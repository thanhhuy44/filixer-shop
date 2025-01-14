"use server";

import { ApiResponse } from "@/types";

export const serverFetch = async (
  path: string,
  params?: RequestInit,
): Promise<ApiResponse> => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api${path}`, {
    ...params,
  }).then(async (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(await res.json());
  });
};
