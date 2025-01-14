import axios, { Axios, AxiosError } from "axios";

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export let source: any;

request.interceptors.request.use(function (config: any) {
  return config;
});

request.interceptors.response.use(
  (res) => {
    return res.data as any;
  },
  function (error: AxiosError) {
    console.error("🚀 ~ error:", error);
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        console.error(data);
        break;

      case 401:
        console.error("unauthorised");
        break;

      case 404:
        console.error("/not-found");
        break;

      case 500:
        console.error("/server-error");
        break;
    }
    return Promise.reject(error);
  },
);

export default request;
