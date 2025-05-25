import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL:
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_API_SERVER_URL
      : process.env.NEXT_PUBLIC_API_URL,
  validateStatus: (status) => {
    if (status >= 400 && status <= 599) {
      Promise.reject(status);
      return false;
    }
    return true;
  },
});

api.interceptors.request.use((request) => {
  if (request.url !== "/github/login") {
    const token = Cookies.get("token");
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

api.interceptors.response.use((response: AxiosResponse) => {
  return response.data;
});

export const formDataApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  validateStatus: (status) => {
    if (status >= 400 && status <= 599) {
      Promise.reject(status);
      return false;
    }
    return true;
  },
});

formDataApi.interceptors.request.use((request) => {
  if (request.url !== "/github/login") {
    const token = Cookies.get("token");
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

formDataApi.interceptors.response.use((response: AxiosResponse) => {
  return response.data;
});
