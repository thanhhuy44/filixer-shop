import { QueryParams } from "@/types";
import { serverFetch } from "@/utils/server-fetch";

export const ProductServices = {
    getLatest: async (params?: QueryParams) => {
        return await serverFetch('/products', {
            
        })
    }
}